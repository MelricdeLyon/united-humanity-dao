import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { 
  TerritorialEntity, 
  OrganizationalOrgan, 
  TerritorialPosition,
  TerritorialKPI,
  TerritorialBudget,
  CitizenParticipation 
} from "@/types/territorial";

export const useTerritorialEntities = () => {
  return useQuery({
    queryKey: ["territorial-entities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("territorial_entities")
        .select("*")
        .eq("is_active", true)
        .order("level", { ascending: true })
        .order("name");
      
      if (error) throw error;
      return data as TerritorialEntity[];
    },
  });
};

export const useTerritorialEntity = (id: string) => {
  return useQuery({
    queryKey: ["territorial-entity", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("territorial_entities")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();
      
      if (error) throw error;
      return data as TerritorialEntity;
    },
    enabled: !!id,
  });
};

export const useOrganizationalOrgans = (territorialEntityId: string) => {
  return useQuery({
    queryKey: ["organizational-organs", territorialEntityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("organizational_organs")
        .select("*")
        .eq("territorial_entity_id", territorialEntityId)
        .eq("is_active", true)
        .order("organ_type");
      
      if (error) throw error;
      return data as OrganizationalOrgan[];
    },
    enabled: !!territorialEntityId,
  });
};

export const useTerritorialPositions = (organId: string) => {
  return useQuery({
    queryKey: ["territorial-positions", organId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("territorial_positions")
        .select("*")
        .eq("organ_id", organId)
        .eq("is_active", true)
        .order("position_type");
      
      if (error) throw error;
      return data as TerritorialPosition[];
    },
    enabled: !!organId,
  });
};

export const useTerritorialKPIs = (territorialEntityId: string, organId?: string) => {
  return useQuery({
    queryKey: ["territorial-kpis", territorialEntityId, organId],
    queryFn: async () => {
      let query = supabase
        .from("territorial_kpis")
        .select("*")
        .eq("territorial_entity_id", territorialEntityId);
      
      if (organId) {
        query = query.eq("organ_id", organId);
      }
      
      const { data, error } = await query.order("measurement_date", { ascending: false });
      
      if (error) throw error;
      return data as TerritorialKPI[];
    },
    enabled: !!territorialEntityId,
  });
};

export const useTerritorialBudgets = (territorialEntityId: string) => {
  return useQuery({
    queryKey: ["territorial-budgets", territorialEntityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("territorial_budgets")
        .select("*")
        .eq("territorial_entity_id", territorialEntityId)
        .order("budget_year", { ascending: false });
      
      if (error) throw error;
      return data as TerritorialBudget[];
    },
    enabled: !!territorialEntityId,
  });
};

export const useCitizenParticipation = (territorialEntityId: string) => {
  return useQuery({
    queryKey: ["citizen-participation", territorialEntityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("citizen_participation")
        .select("*")
        .eq("territorial_entity_id", territorialEntityId)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as CitizenParticipation[];
    },
    enabled: !!territorialEntityId,
  });
};