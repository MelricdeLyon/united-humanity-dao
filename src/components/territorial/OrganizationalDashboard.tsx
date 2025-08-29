import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Scale, 
  FileText, 
  Wallet, 
  Shield, 
  Database, 
  Heart, 
  Vote, 
  CheckCircle,
  Settings,
  ExternalLink
} from "lucide-react";
import { useOrganizationalOrgans, useTerritorialKPIs, useTerritorialBudgets } from "@/hooks/use-territorial";
import type { OrganType } from "@/types/territorial";

interface OrganizationalDashboardProps {
  territorialEntityId: string;
  onOrganSelect: (organId: string, organType: OrganType) => void;
}

const organIcons: Record<OrganType, any> = {
  executive: Building2,
  council: Users,
  mediation_arbitrage: Scale,
  administration: FileText,
  treasury_finances: Wallet,
  compliance_security: Shield,
  digital_data: Database,
  thematic_services: Heart,
  participation: Vote,
  audit_ethics: CheckCircle
};

const organColors: Record<OrganType, string> = {
  executive: "border-red-200 bg-red-50",
  council: "border-blue-200 bg-blue-50",
  mediation_arbitrage: "border-purple-200 bg-purple-50",
  administration: "border-gray-200 bg-gray-50",
  treasury_finances: "border-green-200 bg-green-50",
  compliance_security: "border-orange-200 bg-orange-50",
  digital_data: "border-cyan-200 bg-cyan-50",
  thematic_services: "border-pink-200 bg-pink-50",
  participation: "border-indigo-200 bg-indigo-50",
  audit_ethics: "border-emerald-200 bg-emerald-50"
};

export const OrganizationalDashboard = ({ 
  territorialEntityId, 
  onOrganSelect 
}: OrganizationalDashboardProps) => {
  const { data: organs = [], isLoading: organsLoading } = useOrganizationalOrgans(territorialEntityId);
  const { data: kpis = [] } = useTerritorialKPIs(territorialEntityId);
  const { data: budgets = [] } = useTerritorialBudgets(territorialEntityId);

  if (organsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-16 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const calculateOrganEfficiency = (organType: OrganType) => {
    const organKPIs = kpis.filter(kpi => 
      organs.find(o => o.organ_type === organType)?.id === kpi.organ_id
    );
    
    if (organKPIs.length === 0) return 85; // Default efficiency
    
    const avgEfficiency = organKPIs.reduce((acc, kpi) => {
      const efficiency = kpi.kpi_target && kpi.kpi_value 
        ? Math.min((kpi.kpi_value / kpi.kpi_target) * 100, 100)
        : 85;
      return acc + efficiency;
    }, 0) / organKPIs.length;
    
    return Math.round(avgEfficiency);
  };

  const getOrganBudget = (organType: OrganType) => {
    const organBudget = budgets.find(b => b.organ_type === organType);
    return organBudget ? {
      allocated: organBudget.allocated_amount,
      spent: organBudget.spent_amount,
      utilization: (organBudget.spent_amount / organBudget.allocated_amount) * 100
    } : null;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Structure Organisationnelle</h2>
        <p className="text-muted-foreground">
          Gouvernance territoriale décentralisée avec 10 organes spécialisés
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {organs.map((organ) => {
          const Icon = organIcons[organ.organ_type];
          const efficiency = calculateOrganEfficiency(organ.organ_type);
          const budget = getOrganBudget(organ.organ_type);
          
          return (
            <Card 
              key={organ.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${organColors[organ.organ_type]}`}
              onClick={() => onOrganSelect(organ.id, organ.organ_type)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <CardTitle className="text-sm font-semibold truncate">
                    {organ.name}
                  </CardTitle>
                </div>
                <CardDescription className="text-xs line-clamp-2">
                  {organ.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Efficiency */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground">Efficacité</span>
                      <span className="text-xs font-medium">{efficiency}%</span>
                    </div>
                    <Progress value={efficiency} className="h-1" />
                  </div>

                  {/* Budget if available */}
                  {budget && (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Budget</span>
                        <span className="text-xs font-medium">
                          {Math.round(budget.utilization)}%
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
                      </div>
                    </div>
                  )}

                  {/* Smart Contract Status */}
                  <div className="flex items-center justify-between">
                    <Badge variant={organ.smart_contract_address ? "default" : "secondary"} className="text-xs">
                      {organ.smart_contract_address ? "Smart Contract" : "Traditionnel"}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Multi-sig info for treasury */}
                  {organ.organ_type === 'treasury_finances' && organ.multisig_threshold && (
                    <div className="text-xs text-muted-foreground">
                      Multi-sig: {organ.multisig_threshold}/{organ.multisig_signers}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {organs.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun organe configuré</h3>
            <p className="text-muted-foreground">
              Les organes organisationnels n'ont pas encore été configurés pour ce territoire.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};