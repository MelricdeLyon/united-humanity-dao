import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTreasury } from "@/hooks/use-treasury";
import { 
  GraduationCap, 
  Users, 
  ArrowRight, 
  TrendingUp, 
  Euro, 
  Coins,
  Target,
  Clock,
  CheckCircle2,
  Calculator,
  Lightbulb
} from "lucide-react";

const KidJerrTab = () => {
  const { 
    kidJerrConfig, 
    lastKidJerrSimulation, 
    kidJerrExchanges,
    simulateKidJerrExchange, 
    processKidJerrExchange 
  } = useTreasury();
  
  const [exchangeAmount, setExchangeAmount] = useState<string>("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!kidJerrConfig) return null;

  const formatJerrCoin = (amount: bigint) => {
    return `${(Number(amount) / 1e12).toLocaleString('fr-FR')} billions`;
  };

  const allocationPercentage = (Number(kidJerrConfig.currentlyAllocated) / Number(kidJerrConfig.totalAllocation)) * 100;

  const handleSimulate = async () => {
    const amount = parseFloat(exchangeAmount);
    if (!amount || amount <= 0) return;
    
    setIsSimulating(true);
    try {
      await simulateKidJerrExchange({ exchangeAmountEUR: amount });
    } catch (error) {
      console.error('Simulation error:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleExchange = async () => {
    const amount = parseFloat(exchangeAmount);
    if (!amount || amount <= 0) return;
    
    setIsProcessing(true);
    try {
      await processKidJerrExchange({ exchangeAmountEUR: amount });
      setExchangeAmount("");
    } catch (error) {
      console.error('Exchange error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full">
          <GraduationCap className="h-6 w-6 text-accent" />
        </div>
        <h2 className="text-xl font-bold">Coffre KidJERR</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Chaque échange sur le réseau CydJerr libère automatiquement des JERR pour financer les projets éducatifs et jeunesse. 
          <strong> Ratio 1:1</strong> - 100€ échangés = 10,000 JERR débloqués pour KidJERR.
        </p>
      </div>

      {/* Vue d'ensemble du coffre */}
      <Card className="shadow-governance">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="mr-3 h-6 w-6 text-accent" />
              État du Coffre KidJERR
            </div>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              40T JERR Total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-accent">{formatJerrCoin(kidJerrConfig.totalAllocation)}</p>
              <p className="text-sm text-muted-foreground">Allocation totale</p>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <p className="text-2xl font-bold text-success">{formatJerrCoin(kidJerrConfig.currentlyAllocated)}</p>
              <p className="text-sm text-muted-foreground">Déjà débloqués</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">{formatJerrCoin(kidJerrConfig.availableBalance)}</p>
              <p className="text-sm text-muted-foreground">Disponible</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression du financement</span>
              <span className="font-medium">{allocationPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={allocationPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Mécanisme explicatif */}
      <Card className="border-accent/20 bg-gradient-to-br from-background to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-3 h-6 w-6 text-accent" />
            Comment ça fonctionne ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Euro className="h-6 w-6 text-primary" />
                </div>
                <p className="font-semibold mb-1">1. Vous échangez</p>
                <p className="text-sm text-muted-foreground">100€ = 10,000 JERR</p>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="h-6 w-6 text-accent" />
                </div>
                <p className="font-semibold mb-1">2. Déblocage automatique</p>
                <p className="text-sm text-muted-foreground">10,000 JERR pour KidJERR</p>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-6 w-6 text-success" />
                </div>
                <p className="font-semibold mb-1">3. Financement projets</p>
                <p className="text-sm text-muted-foreground">Éducation & jeunesse</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulateur d'échange */}
      <Card className="shadow-governance">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-3 h-6 w-6 text-primary" />
            Simulateur d'Impact
          </CardTitle>
          <CardDescription>
            Calculez l'impact de votre échange sur le financement KidJERR
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exchange-amount">Montant à échanger (€)</Label>
              <Input
                id="exchange-amount"
                type="number"
                placeholder="100"
                value={exchangeAmount}
                onChange={(e) => setExchangeAmount(e.target.value)}
                min="1"
                step="1"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSimulate} 
                disabled={!exchangeAmount || parseFloat(exchangeAmount) <= 0 || isSimulating}
                className="w-full"
              >
                {isSimulating ? "Calcul..." : "Simuler l'impact"}
              </Button>
            </div>
          </div>

          {lastKidJerrSimulation && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold text-accent">Résultats de la simulation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">JERR reçus</span>
                    <span className="font-medium text-primary">
                      {(Number(lastKidJerrSimulation.exchangeAmountJERR) / 1e12).toLocaleString()} billions
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">JERR débloqués pour KidJERR</span>
                    <span className="font-medium text-success">
                      {(Number(lastKidJerrSimulation.releasedForProjects) / 1e12).toLocaleString()} billions
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Impact sur le coffre</span>
                    <span className="font-medium text-accent">
                      {lastKidJerrSimulation.impactPercentage.toFixed(4)}%
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Projets impactés :</p>
                  {lastKidJerrSimulation.projectsImpact.map((project, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <CheckCircle2 className="h-3 w-3 text-success mr-2" />
                      <span>{project}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleExchange}
                disabled={isProcessing}
                className="w-full gradient-primary"
              >
                <Coins className="mr-2 h-4 w-4" />
                {isProcessing ? "Traitement..." : "Effectuer l'échange"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Projets financés */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-3 h-6 w-6 text-success" />
            Projets Financés par KidJERR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kidJerrConfig.projectsSupported.map((project, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{project}</h4>
                  <Badge variant="outline" className="text-xs">
                    Actif
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Bénéficie automatiquement des déblocages via le mécanisme 1:1
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historique des échanges récents */}
      {kidJerrExchanges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-3 h-6 w-6 text-muted-foreground" />
              Échanges Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {kidJerrExchanges.slice(-5).reverse().map((exchange) => (
                <div key={exchange.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">
                      {exchange.exchangeAmountEUR}€ → {(Number(exchange.exchangeAmountJERR) / 1e12).toLocaleString()} billions JERR
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(Number(exchange.releasedAmountJERR) / 1e12).toLocaleString()} billions débloqués pour KidJERR
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +1:1
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KidJerrTab;