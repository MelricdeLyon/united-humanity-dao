import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { birth_date, amount_eur } = await req.json();

    if (!birth_date || !amount_eur) {
      throw new Error("birth_date and amount_eur are required");
    }

    console.log(`PER-JRC Quote request for user ${user.id}: ${amount_eur}€, birth_date: ${birth_date}`);

    // Get PER-JRC rules
    const { data: rules, error: rulesError } = await supabaseClient
      .from('perjr_rules')
      .select('*')
      .single();

    if (rulesError || !rules) {
      throw new Error("Failed to load PER-JRC rules");
    }

    // Check eligibility based on birth year
    const birthYear = new Date(birth_date).getFullYear();
    const eligible = birthYear <= rules.eligibility_birthyear_max;
    
    if (!eligible) {
      console.log(`User not eligible: born in ${birthYear}, max year: ${rules.eligibility_birthyear_max}`);
      return new Response(JSON.stringify({
        eligible: false,
        reason_if_not: `Vous n'êtes pas éligible au PER-JRC (né(e) après ${rules.eligibility_birthyear_max}).`
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Check if user already used their one-shot opportunity
    const { data: existingChange, error: changeError } = await supabaseClient
      .from('perjr_changes')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['committed', 'settled'])
      .single();

    if (existingChange) {
      console.log(`User already used PER-JRC: change ${existingChange.id}`);
      return new Response(JSON.stringify({
        eligible: false,
        reason_if_not: "Vous avez déjà réalisé votre change préférentiel PER-JRC."
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Check minimum amount
    if (amount_eur < rules.bronze_min_eur) {
      console.log(`Amount too low: ${amount_eur}€ < ${rules.bronze_min_eur}€`);
      return new Response(JSON.stringify({
        eligible: false,
        reason_if_not: `Le montant minimum pour accéder au PER-JRC est de ${rules.bronze_min_eur} €.`
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Determine tier based on amount
    let tier: string;
    let rate: number;
    
    if (amount_eur >= rules.gold_min_eur) {
      tier = 'or';
      rate = rules.gold_rate_eur_per_jrc;
    } else if (amount_eur >= rules.silver_min_eur) {
      tier = 'argent';
      rate = rules.silver_rate_eur_per_jrc;
    } else {
      tier = 'bronze';
      rate = rules.bronze_rate_eur_per_jrc;
    }

    // Calculate JRC preview and multiplier
    const jrc_preview = Math.floor(amount_eur / rate);
    const multiplier_vs_base = rules.base_rate_eur_per_jrc / rate;

    // Generate quote ID and expiration
    const quote_id = crypto.randomUUID();
    const quote_expires_at = new Date(Date.now() + rules.quote_lock_minutes * 60 * 1000).toISOString();

    // Store quote in database
    const { error: insertError } = await supabaseClient
      .from('perjr_changes')
      .insert({
        user_id: user.id,
        amount_eur,
        tier,
        rate_eur_per_jrc: rate,
        jrc_credited: jrc_preview,
        status: 'quoted',
        quote_id,
        quote_expires_at
      });

    if (insertError) {
      console.error("Failed to store quote:", insertError);
      throw new Error("Failed to generate quote");
    }

    console.log(`Quote generated: ${quote_id}, tier: ${tier}, rate: ${rate}, JRC: ${jrc_preview}, expires: ${quote_expires_at}`);

    return new Response(JSON.stringify({
      eligible: true,
      tier,
      rate_eur_per_jrc: rate,
      multiplier_vs_base,
      jrc_preview,
      quote_id,
      quote_expires_at,
      amount_eur
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in perjr-quote function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});