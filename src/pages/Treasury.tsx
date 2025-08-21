import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vault, TrendingUp, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TreasuryData {
  id: string;
  total_supply: number;
  distributed_amount: number;
  status: string;
}

interface TreasuryVault {
  id: string;
  name: string;
  description: string;
  allocation_amount: number;
  spent_amount: number;
  vault_type: string;
}

const Treasury = () => {
  const navigate = useNavigate();
  const [treasuryData, setTreasuryData] = useState<TreasuryData | null>(null);
  const [vaults, setVaults] = useState<TreasuryVault[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreasuryData();
  }, []);

  const fetchTreasuryData = async () => {
    try {
      // Fetch main treasury data
      const { data: treasury } = await supabase
        .from("dao_treasury")
        .select("*")
        .single();

      // Fetch vault data
      const { data: vaultData } = await supabase
        .from("treasury_vaults")
        .select("*")
        .order("allocation_amount", { ascending: false });

      setTreasuryData(treasury);
      setVaults(vaultData || []);
    } catch (error) {
      console.error("Error fetching treasury data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatJerrCoin = (amount: number) => {
    if (amount >= 1e12) {
      return `${(amount / 1e12).toLocaleString()} T`;
    }
    return amount.toLocaleString();
  };

  const getVaultIcon = (vaultType: string) => {
    switch (vaultType) {
      case 'sales': return '💰';
      case 'activity_bonus': return '🎯';
      case 'transaction_bonus': return '⚡';
      case 'negative_loans': return '🏦';
      case 'insurance': return '🛡️';
      case 'team': return '👥';
      default: return '📦';
    }
  };

  const getVaultColor = (vaultType: string) => {
    switch (vaultType) {
      case 'sales': return 'from-amber-500 to-yellow-600';
      case 'activity_bonus': return 'from-blue-500 to-blue-600';
      case 'transaction_bonus': return 'from-purple-500 to-purple-600';
      case 'negative_loans': return 'from-green-500 to-green-600';
      case 'insurance': return 'from-red-500 to-red-600';
      case 'team': return 'from-gray-500 to-gray-600';
      default: return 'from-primary to-primary-light';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Vault className="h-16 w-16 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Chargement du trésor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 backdrop-blur"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-6 mb-6 rounded-full bg-white/10 backdrop-blur">
              <Vault className="h-16 w-16" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Trésor de la Nation
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Coffre-fort numérique sécurisé contenant {treasuryData ? formatJerrCoin(treasuryData.total_supply) : "500T"} JerrCoins
            </p>
            <Badge variant="secondary" className="text-lg px-6 py-2">
              <Shield className="mr-2 h-5 w-5" />
              Multi-Signature Sécurisé
            </Badge>
          </div>
        </div>
      </section>

      {/* Treasury Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-governance">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-success" />
                  Supply Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                  {treasuryData ? formatJerrCoin(treasuryData.total_supply) : "500T"} JerrCoins
                </p>
                <p className="text-muted-foreground">500 000 milliards de tokens</p>
              </CardContent>
            </Card>

            <Card className="shadow-governance">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Vault className="mr-2 h-5 w-5 text-primary" />
                  Distribué
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  {treasuryData ? formatJerrCoin(treasuryData.distributed_amount) : "0"} JerrCoins
                </p>
                <p className="text-muted-foreground">Tokens en circulation</p>
              </CardContent>
            </Card>

            <Card className="shadow-governance">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-secondary" />
                  Prix Initial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-secondary">0,01 €</p>
                <p className="text-muted-foreground">Par JerrCoin</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Treasury Vault */}
          <Card className="mb-12 shadow-elevated gradient-card border-0">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-8 bg-gradient-to-br from-primary to-primary-light rounded-full shadow-governance">
                <Vault className="h-24 w-24 text-white" />
              </div>
              <CardTitle className="text-3xl mb-2">Coffre-Fort Principal</CardTitle>
              <CardDescription className="text-lg">
                Trésor sécurisé de la Nation Numérique CydJerr
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="lg" 
                className="gradient-primary shadow-governance hover:shadow-elevated transition-all"
                onClick={() => navigate('/tresor/cofres')}
              >
                <Vault className="mr-2 h-5 w-5" />
                Explorer les Coffres Sectoriels
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Vault Preview Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaults.map((vault) => (
              <Card 
                key={vault.id} 
                className="hover:shadow-governance transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/tresor/vault/${vault.id}`)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${getVaultColor(vault.vault_type)} flex items-center justify-center text-2xl mb-2`}>
                    {getVaultIcon(vault.vault_type)}
                  </div>
                  <CardTitle className="text-lg">{vault.name}</CardTitle>
                  <CardDescription>{vault.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Allocation</span>
                    <span className="font-bold">{formatJerrCoin(vault.allocation_amount)} JC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Utilisé</span>
                    <span className="text-primary">{formatJerrCoin(vault.spent_amount)} JC</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Treasury;