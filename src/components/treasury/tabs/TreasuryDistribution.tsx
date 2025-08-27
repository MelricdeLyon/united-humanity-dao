import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTreasury } from "@/hooks/use-treasury";
import { PieChart, Target, Zap, Building, Shield, Users, ArrowUpRight } from "lucide-react";
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const TreasuryDistribution = () => {
  const { treasuryData, setActiveTab } = useTreasury();

  if (!treasuryData) return null;

  const formatJerrCoin = (amount: bigint) => {
    return `${(Number(amount) / 1e12).toLocaleString('fr-FR')} billions`;
  };

  const vaultData = [
    {
      name: 'Prêts négatifs',
      value: Number(treasuryData.vaults.negativeLoans) / 1e12,
      color: '#22c55e',
      icon: Building,
      description: 'Système de crédit à taux négatif',
      tab: 'negative-loans'
    },
    {
      name: 'Assurance',
      value: Number(treasuryData.vaults.insurance) / 1e12,
      color: '#ef4444',
      icon: Shield,
      description: 'Protection biens et personnes',
      tab: 'insurance'
    },
    {
      name: 'Bonus activité',
      value: Number(treasuryData.vaults.activityBonus) / 1e12,
      color: '#3b82f6',
      icon: Target,
      description: 'Récompenses interactions Nation',
      tab: 'activity-bonus'
    },
    {
      name: 'Bonus transactions',
      value: Number(treasuryData.vaults.txBonus) / 1e12,
      color: '#8b5cf6',
      icon: Zap,
      description: 'Bonus particuliers → professionnels',
      tab: 'transaction-bonus'
    },
    {
      name: 'Équipe CydJerr',
      value: Number(treasuryData.vaults.team) / 1e12,
      color: '#6b7280',
      icon: Users,
      description: 'Allocation équipe développement',
      tab: 'team'
    },
  ];

  const COLORS = vaultData.map(item => item.color);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full">
          <PieChart className="h-6 w-6 text-accent" />
        </div>
        <h2 className="text-xl font-bold">Répartition Détaillée</h2>
        <p className="text-muted-foreground">
          Cinq coffres structurent les 350 billions restants : activité, transactions, prêts négatifs, assurance, équipe.
        </p>
      </div>

      {/* Donut Chart */}
      <Card className="shadow-governance">
        <CardHeader>
          <CardTitle>Répartition des Coffres</CardTitle>
          <CardDescription>350 billions de JERR répartis par secteur</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8 bg-muted/30 rounded-lg">
            <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Graphique de répartition disponible bientôt</p>
          </div>
        </CardContent>
      </Card>

      {/* Vault Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vaultData.map((vault, index) => {
          const IconComponent = vault.icon;
          return (
            <Card 
              key={vault.name}
              className="hover:shadow-governance transition-all duration-300 cursor-pointer group"
              onClick={() => setActiveTab(vault.tab)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${vault.color}20` }}
                    >
                      <IconComponent 
                        className="h-5 w-5" 
                        style={{ color: vault.color }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">{vault.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {vault.description}
                      </CardDescription>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Allocation</span>
                    <Badge variant="outline" style={{ color: vault.color, borderColor: vault.color + '40' }}>
                      {vault.value} billions JERR
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pourcentage</span>
                    <span className="text-sm font-medium">
                      {((vault.value / 350) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Button */}
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Détails & Règles</h3>
              <p className="text-sm text-muted-foreground">
                Explorez chaque coffre pour comprendre les mécaniques et conditions d'accès
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {vaultData.map((vault) => (
                <Button
                  key={vault.tab}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setActiveTab(vault.tab)}
                >
                  {vault.name.split(' ')[0]}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreasuryDistribution;