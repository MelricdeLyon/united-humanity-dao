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

    console.log(`PER-JRC Status request for user ${user.id}`);

    // Get user's PER-JRC changes
    const { data: changes, error: changesError } = await supabaseClient
      .from('perjr_changes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (changesError) {
      console.error("Failed to get user changes:", changesError);
      throw new Error("Failed to get user status");
    }

    // Find the most recent committed or settled change
    const lastCommittedChange = changes?.find(change => 
      change.status === 'committed' || change.status === 'settled'
    );

    const used = !!lastCommittedChange;

    console.log(`User PER-JRC status: used=${used}, total_changes=${changes?.length || 0}`);

    return new Response(JSON.stringify({
      used,
      last_change: lastCommittedChange || null,
      all_changes: changes || []
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in perjr-status function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});