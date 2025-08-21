import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface TreasuryVault {
  id: string;
  name: string;
  description: string;
  allocation_amount: number;
  spent_amount: number;
  vault_type: string;
}

export default function TreasuryVaultDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vault, setVault] = useState<TreasuryVault | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVaultDetails();
  }, [id]);

  const fetchVaultDetails = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('treasury_vaults')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setVault(data);
    } catch (error) {
      console.error('Error fetching vault details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatJerrCoin = (amount: number): string => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(2)} milliards`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)} millions`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}k`;
    }
    return amount.toString();
  };

  const getVaultIcon = (vaultType: string) => {
    switch (vaultType) {
      case 'development': return '🚀';
      case 'marketing': return '📢';
      case 'operations': return '⚙️';
      case 'research': return '🔬';
      case 'security': return '🔒';
      case 'partnership': return '🤝';
      default: return '💰';
    }
  };

  const getVaultColor = (vaultType: string) => {
    switch (vaultType) {
      case 'development': return 'bg-blue-500/20 text-blue-700';
      case 'marketing': return 'bg-purple-500/20 text-purple-700';
      case 'operations': return 'bg-green-500/20 text-green-700';
      case 'research': return 'bg-orange-500/20 text-orange-700';
      case 'security': return 'bg-red-500/20 text-red-700';
      case 'partnership': return 'bg-indigo-500/20 text-indigo-700';
      default: return 'bg-gray-500/20 text-gray-700';
    }
  };

  const calculateUsagePercentage = (spent: number, total: number): number => {
    return Math.round((spent / total) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin text-6xl">💰</div>
          <p className="text-muted-foreground">Chargement des détails du coffre...</p>
        </div>
      </div>
    );
  }

  if (!vault) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Coffre non trouvé</h1>
          <Button onClick={() => navigate('/tresor/cofres')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux coffres
          </Button>
        </div>
      </div>
    );
  }

  const availableAmount = vault.allocation_amount - vault.spent_amount;
  const usagePercentage = calculateUsagePercentage(vault.spent_amount, vault.allocation_amount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/tresor/cofres')}
              className="hover:bg-secondary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux coffres
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{getVaultIcon(vault.vault_type)}</span>
              <div>
                <h1 className="text-3xl font-bold">{vault.name}</h1>
                <p className="text-muted-foreground">{vault.description}</p>
              </div>
            </div>
          </div>
          <Badge className={getVaultColor(vault.vault_type)}>
            {vault.vault_type}
          </Badge>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Allocation Totale</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatJerrCoin(vault.allocation_amount)}</div>
              <p className="text-xs text-muted-foreground">JerrCoins alloués</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Montant Utilisé</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatJerrCoin(vault.spent_amount)}</div>
              <p className="text-xs text-muted-foreground">{usagePercentage}% utilisé</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponible</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatJerrCoin(availableAmount)}</div>
              <p className="text-xs text-muted-foreground">{100 - usagePercentage}% disponible</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valeur Estimée</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{(vault.allocation_amount * 0.1).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Estimation EUR</p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Utilisation du Coffre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progression d'utilisation</span>
                <span className="text-sm text-muted-foreground">{usagePercentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${usagePercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Utilisé: {formatJerrCoin(vault.spent_amount)} JC</span>
                <span>Disponible: {formatJerrCoin(availableAmount)} JC</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations Détaillées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Type de Coffre</h3>
                <Badge className={getVaultColor(vault.vault_type)}>
                  {vault.vault_type}
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Statut</h3>
                <Badge variant={usagePercentage < 80 ? "default" : usagePercentage < 95 ? "secondary" : "destructive"}>
                  {usagePercentage < 80 ? "Optimal" : usagePercentage < 95 ? "Attention" : "Critique"}
                </Badge>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{vault.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}