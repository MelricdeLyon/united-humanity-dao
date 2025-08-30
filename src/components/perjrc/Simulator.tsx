import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Calculator, Zap, Medal, Award, Crown } from "lucide-react";
import { usePERJRC } from "@/hooks/use-perjrc";
import { supabase } from "@/integrations/supabase/client";

interface SimulatorProps {
  onQuoteGenerated: () => void;
}

const Simulator = ({ onQuoteGenerated }: SimulatorProps) => {
  const [amount, setAmount] = useState(1500);
  const [birthDate, setBirthDate] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { rules, simulate, generateQuote, getTierInfo, currentQuote } = usePERJRC();

  // Charger la date de naissance du profil
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('birth_date')
          .single();
          
        if (profile?.birth_date) {
          setBirthDate(profile.birth_date);
        }
      } catch (error) {
        console.log("No profile found");
      }
    };

    loadUserProfile();
  }, []);

  // Simulation en temps réel
  const simulation = useMemo(() => {
    if (!birthDate || !rules) return null;
    return simulate({ amount_eur: amount, birth_date: birthDate });
  }, [amount, birthDate, simulate, rules]);

  const handleGenerateQuote = async () => {
    if (!birthDate) return;

    setIsGenerating(true);
    try {
      await generateQuote({
        amount_eur: amount,
        birth_date: birthDate
      });
      onQuoteGenerated();
    } catch (error) {
      console.error("Failed to generate quote:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return <Medal className="h-5 w-5" />;
      case 'argent': return <Award className="h-5 w-5" />;
      case 'or': return <Crown className="h-5 w-5" />;
      default: return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'from-amber-600 to-amber-800';
      case 'argent': return 'from-slate-400 to-slate-600';
      case 'or': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (!rules) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement des règles...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Simulateur */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Simulateur PER-JRC
          </CardTitle>
          <CardDescription>
            Ajustez le montant pour voir votre palier et les JRC obtenus
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Contrôle du montant */}
          <div className="space-y-4">
            <Label htmlFor="amount">Montant à déposer (€)</Label>
            
            {/* Slider */}
            <div className="px-4">
              <Slider
                value={[amount]}
                onValueChange={(value) => setAmount(value[0])}
                min={500}
                max={10000}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>500 €</span>
                <span>10 000+ €</span>
              </div>
            </div>
            
            {/* Champ numérique */}
            <div className="flex items-center space-x-2">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={500}
                max={50000}
                step={50}
                className="w-32"
              />
              <span className="text-muted-foreground">€</span>
            </div>

            {/* Boutons de montants prédéfinis */}
            <div className="flex flex-wrap gap-2">
              {[1500, 3000, 5000, 7500, 10000].map((preset) => (
                <Button
                  key={preset}
                  variant={amount === preset ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAmount(preset)}
                >
                  {preset.toLocaleString()} €
                </Button>
              ))}
            </div>
          </div>

          {/* Vérification du montant minimum */}
          {amount < rules.bronze_min_eur && (
            <Alert variant="destructive">
              <AlertDescription>
                Le montant minimum pour accéder au PER-JRC est de {rules.bronze_min_eur.toLocaleString()} €.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Résultats de la simulation */}
      {simulation && amount >= rules.bronze_min_eur && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Résultat de votre simulation
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Palier atteint */}
            <div className={`bg-gradient-to-r ${getTierColor(simulation.tier)} text-white p-6 rounded-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTierIcon(simulation.tier)}
                  <div>
                    <h3 className="text-2xl font-bold capitalize">{simulation.tier}</h3>
                    <p className="opacity-90">Palier atteint</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">
                    ×{simulation.multiplier_vs_base.toFixed(2)}
                  </p>
                  <p className="opacity-90 text-sm">vs taux de base</p>
                </div>
              </div>
            </div>

            {/* Détails du calcul */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Détails du change</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montant déposé :</span>
                    <span className="font-medium">{amount.toLocaleString()} €</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taux préférentiel :</span>
                    <span className="font-medium">{simulation.rate_eur_per_jrc.toFixed(6)} €/JRC</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">JRC par euro :</span>
                    <span className="font-medium">{Math.floor(1 / simulation.rate_eur_per_jrc)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">JRC obtenus :</span>
                    <span className="font-bold text-primary">
                      {simulation.jrc_amount.toLocaleString()} JRC
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Comparaison vs taux de base</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taux de base :</span>
                    <span className="font-medium">{rules.base_rate_eur_per_jrc.toFixed(3)} €/JRC</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">JRC au taux de base :</span>
                    <span className="font-medium">
                      {Math.floor(amount / rules.base_rate_eur_per_jrc).toLocaleString()} JRC
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">JRC bonus :</span>
                    <span className="font-bold text-green-600">
                      +{simulation.bonus_jrc.toLocaleString()} JRC
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foregreen">Multiplicateur :</span>
                    <Badge variant="secondary">
                      ×{simulation.multiplier_vs_base.toFixed(2)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI de gain */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-800">Votre avantage PER-JRC</h4>
              </div>
              <p className="text-green-700">
                Vous gagnez <strong>{simulation.bonus_jrc.toLocaleString()} JRC supplémentaires</strong> grâce 
                au taux préférentiel {simulation.tier.toUpperCase()}, soit{' '}
                <strong>{((simulation.multiplier_vs_base - 1) * 100).toFixed(0)}% de plus</strong> que le taux standard.
              </p>
            </div>

            {/* Bouton génération devis */}
            <Button 
              onClick={handleGenerateQuote}
              disabled={isGenerating}
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Génération du devis...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Générer mon devis (15 min)
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Simulator;