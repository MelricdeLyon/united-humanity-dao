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

    const { quote_id, payment_intent_id } = await req.json();

    if (!quote_id) {
      throw new Error("quote_id is required");
    }

    console.log(`PER-JRC Commit request for user ${user.id}: quote ${quote_id}, payment: ${payment_intent_id}`);

    // Get the quote
    const { data: quote, error: quoteError } = await supabaseClient
      .from('perjr_changes')
      .select('*')
      .eq('quote_id', quote_id)
      .eq('user_id', user.id)
      .eq('status', 'quoted')
      .single();

    if (quoteError || !quote) {
      console.error("Quote not found or invalid:", quoteError);
      throw new Error("Quote not found or invalid");
    }

    // Check if quote has expired
    if (new Date(quote.quote_expires_at) < new Date()) {
      console.log(`Quote expired: ${quote.quote_expires_at}`);
      
      // Mark quote as expired
      await supabaseClient
        .from('perjrc_changes')
        .update({ status: 'expired' })
        .eq('id', quote.id);

      throw new Error("Quote has expired");
    }

    // Check if user already has a committed/settled change (double-check for race conditions)
    const { data: existingChange, error: existingError } = await supabaseClient
      .from('perjr_changes')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['committed', 'settled'])
      .neq('id', quote.id)
      .single();

    if (existingChange) {
      console.log(`User already has committed change: ${existingChange.id}`);
      throw new Error("You have already used your PER-JRC opportunity");
    }

    // Update quote to committed status
    const { data: updatedChange, error: updateError } = await supabaseClient
      .from('perjr_changes')
      .update({
        status: 'committed',
        payment_intent_id: payment_intent_id || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', quote.id)
      .select()
      .single();

    if (updateError || !updatedChange) {
      console.error("Failed to commit change:", updateError);
      throw new Error("Failed to commit change");
    }

    console.log(`Change committed: ${updatedChange.id}, JRC credited: ${updatedChange.jrc_credited}`);

    // In a real implementation, you would:
    // 1. Process the payment with the payment_intent_id
    // 2. Credit the JRC to the user's wallet
    // 3. Update status to 'settled' once everything is complete

    // For now, we'll immediately mark as settled (simplified)
    const { data: settledChange, error: settleError } = await supabaseClient
      .from('perjr_changes')
      .update({
        status: 'settled',
        updated_at: new Date().toISOString()
      })
      .eq('id', updatedChange.id)
      .select()
      .single();

    if (settleError) {
      console.error("Failed to settle change:", settleError);
      // Don't throw here, the change is committed, just log the issue
    }

    return new Response(JSON.stringify({
      change_id: updatedChange.id,
      status: settledChange?.status || 'committed',
      jrc_credited: updatedChange.jrc_credited
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in perjr-commit function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});