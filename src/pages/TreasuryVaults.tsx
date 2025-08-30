import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Vault, TrendingUp, Users, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TreasuryVault {
  id: string;
  name: string;
  description: string;
  allocation_amount: number;
  spent_amount: number;
  vault_type: string;
}

const TreasuryVaults = () => {
  const navigate = useNavigate();
  const [vaults, setVaults] = useState<TreasuryVault[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVaults();
  }, []);

  const fetchVaults = async () => {
    try {
      const { data } = await supabase
        .from("treasury_vaults")
        .select("*")
        .order("allocation_amount", { ascending: false });

      setVaults(data || []);
    } catch (error) {
      console.error("Error fetching vaults:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatJerrCoin = (amount: number) => {
    if (amount >= 1e12) {
      return `${(amount / 1e12).toLocaleString()} billions`;
    }
    return amount.toLocaleString();
  };

  const getVaultDetails = (vaultType: string) => {
    switch (vaultType) {
      case 'sales':
        return {
          icon: '💰',
          color: 'from-amber-500 to-yellow-600',
          category: 'Ventes Publiques',
          details: 'Tokens destinés à la vente aux citoyens au prix de 0,01€ par JerrCoin'
        };
      case 'activity_bonus':
        return {
          icon: '',
          color: 'from-blue-500 to-blue-600',
          category: 'Récompenses',
          details: 'Bonus pour les interactions et activités des résidents dans la Nation'
        };
      case 'transaction_bonus':
        return {
          icon: '',
          color: 'from-purple-500 to-purple-600',
          category: 'Transactions',
          details: 'Bonus pour les transactions entre particuliers et professionnels'
        };
      case 'negative_loans':
        return {
          icon: '🏦',
          color: 'from-green-500 to-green-600',
          category: 'Services Financiers',
          details: 'Financement du système de prêts à taux négatifs'
        };
      case 'insurance':
        return {
          icon: '🛡️',
          color: 'from-red-500 to-red-600',
          category: 'Assurances',
          details: 'Financement du système d\'assurance biens et personnes'
        };
      case 'team':
        return {
          icon: '👥',
          color: 'from-gray-500 to-gray-600',
          category: 'Équipe',
          details: 'Allocation pour l\'équipe de développement CydJerr'
        };
      default:
        return {
          icon: '📦',
          color: 'from-primary to-primary-light',
          category: 'Général',
          details: 'Coffre général'
        };
    }
  };

  const calculateUsagePercentage = (spent: number, total: number) => {
    return (spent / total) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Vault className="h-16 w-16 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Chargement des coffres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-6"
            onClick={() => navigate('/tresor')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au Trésor Principal
          </Button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-6 mb-6 rounded-full bg-white/10 backdrop-blur">
              <Building className="h-16 w-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Coffres Sectoriels
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Répartition des 500 billions de JerrCoins par secteur d'activité
            </p>
          </div>
        </div>
      </section>

      {/* Vaults Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="shadow-governance">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <Vault className="mr-2 h-4 w-4" />
                  Coffres Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{vaults.length}</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-governance">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Total Alloué
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">
                  {formatJerrCoin(vaults.reduce((sum, v) => sum + v.allocation_amount, 0))} JC
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-governance">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4" />
                  Total Utilisé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-secondary">
                  {formatJerrCoin(vaults.reduce((sum, v) => sum + v.spent_amount, 0))} JC
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-governance">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <Building className="mr-2 h-4 w-4" />
                  Disponible
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-success">
                  {formatJerrCoin(vaults.reduce((sum, v) => sum + (v.allocation_amount - v.spent_amount), 0))} JC
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Vaults */}
          <div className="grid md:grid-cols-2 gap-8">
            {vaults.map((vault) => {
              const details = getVaultDetails(vault.vault_type);
              const usagePercentage = calculateUsagePercentage(vault.spent_amount, vault.allocation_amount);
              
              return (
                <Card 
                  key={vault.id} 
                  className="shadow-elevated hover:shadow-governance transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/tresor/vault/${vault.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${details.color} flex items-center justify-center text-3xl mr-4 shadow-md`}>
                          {details.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-1">{vault.name}</CardTitle>
                          <Badge variant="outline">{details.category}</Badge>
                        </div>
                      </div>
                      <Badge 
                        variant={usagePercentage > 50 ? "destructive" : "secondary"}
                        className="ml-2"
                      >
                        {usagePercentage.toFixed(1)}% utilisé
                      </Badge>
                    </div>
                    <CardDescription className="mt-3">
                      {details.details}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Allocation Amount */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Allocation Totale</span>
                        <span className="font-bold text-lg">
                          {formatJerrCoin(vault.allocation_amount)} JerrCoins
                        </span>
                      </div>
                      
                      {/* Usage Progress */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Utilisation</span>
                          <span className="text-sm text-primary">
                            {formatJerrCoin(vault.spent_amount)} / {formatJerrCoin(vault.allocation_amount)} JC
                          </span>
                        </div>
                        <Progress value={usagePercentage} className="h-2" />
                      </div>
                      
                      {/* Available Amount */}
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">Disponible</span>
                        <span className="font-bold text-success">
                          {formatJerrCoin(vault.allocation_amount - vault.spent_amount)} JerrCoins
                        </span>
                      </div>
                      
                      {/* Value in EUR */}
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Valeur (0,01€/JC)</span>
                        <span>{(vault.allocation_amount * 0.01 / 1e9).toFixed(2)}B €</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TreasuryVaults;