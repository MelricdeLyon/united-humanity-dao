import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTreasury } from "@/hooks/use-treasury";
import { PERFORMANCE_SCENARIOS } from "@/hooks/use-treasury";
import { Shield, TrendingUp, Calculator, Info, CheckCircle } from "lucide-react";
import { PETSimulationInput } from "@/types/treasury";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const PETTab = () => {
  const { petConfig, simulatePET, lastSimulation, allocateToPET } = useTreasury();
  const [userHoldings, setUserHoldings] = useState("1000000"); // 1M JERR par défaut
  const [allocationPercent, setAllocationPercent] = useState([3]);
  const [selectedScenario, setSelectedScenario] = useState(PERFORMANCE_SCENARIOS[1]);
  const [isAllocating, setIsAllocating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(lastSimulation);

  if (!petConfig) return null;

  const handleSimulation = async () => {
    const input: PETSimulationInput = {
      userHoldingsJERR: BigInt(parseInt(userHoldings) || 0),
      tradablePartPercent: petConfig.tradablePartPercent,
      petAllocationPercent: allocationPercent[0],
      expectedPoolReturnPercent: selectedScenario.returnPercent,
    };

    const result = await simulatePET(input);
    setSimulationResult(result);
  };

  const handleAllocation = async () => {
    if (!simulationResult) return;
    
    setIsAllocating(true);
    try {
      const input: PETSimulationInput = {
        userHoldingsJERR: BigInt(parseInt(userHoldings) || 0),
        tradablePartPercent: petConfig.tradablePartPercent,
        petAllocationPercent: allocationPercent[0],
        expectedPoolReturnPercent: selectedScenario.returnPercent,
      };

      await allocateToPET(input);
      // Ici on pourrait ajouter une notification de succès
    } catch (error) {
      console.error('Erreur allocation PET:', error);
    } finally {
      setIsAllocating(false);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
  };

  const chartData = simulationResult ? [
    {
      name: 'Vous (80%)',
      value: simulationResult.residentProfit,
      fill: '#3b82f6'
    },
    {
      name: 'Trader (10%)',
      value: simulationResult.traderProfit,
      fill: '#8b5cf6'
    },
    {
      name: 'Bonus Trader',
      value: simulationResult.traderBonus,
      fill: '#06b6d4'
    },
    {
      name: 'Nation (min 5%)',
      value: simulationResult.nationNet,
      fill: '#10b981'
    }
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-shield/10 to-accent/10 rounded-full">
          <Shield className="h-6 w-6 text-accent" />
        </div>
        <h2 className="text-xl font-bold">Plan Épargne Trading (PET)</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Allouez 1 à 5 % de votre partie traidable au pool de trading et partagez les performances : 
          80 % pour vous, 20 % pour la Nation (dont 10 % trader, bonus jusqu'à 5 %, minimum 5 % pour la Nation).
        </p>
      </div>

      {/* Configuration */}
      <Card className="shadow-governance">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-3 h-5 w-5 text-primary" />
            Simulateur PET
          </CardTitle>
          <CardDescription>
            Configurez votre allocation et visualisez les gains potentiels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Holdings utilisateur */}
          <div className="space-y-2">
            <Label htmlFor="holdings">JERR détenus</Label>
            <Input
              id="holdings"
              type="number"
              value={userHoldings}
              onChange={(e) => setUserHoldings(e.target.value)}
              placeholder="Ex: 1000000"
            />
            <p className="text-xs text-muted-foreground">
              Partie traidable configurée à {petConfig.tradablePartPercent}% = {formatNumber(parseInt(userHoldings || "0") * petConfig.tradablePartPercent / 100)} JERR
            </p>
          </div>

          {/* Allocation Slider & Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Allocation au PET</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min={petConfig.minAllocationPercent}
                  max={petConfig.maxAllocationPercent}
                  step="0.1"
                  value={allocationPercent[0]}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || petConfig.minAllocationPercent;
                    const clampedValue = Math.min(Math.max(value, petConfig.minAllocationPercent), petConfig.maxAllocationPercent);
                    setAllocationPercent([clampedValue]);
                  }}
                  className="w-20 h-8 text-center text-sm"
                />
                <Badge variant="outline" className="min-w-[60px] justify-center">
                  {allocationPercent[0] % 1 === 0 ? allocationPercent[0] : allocationPercent[0].toFixed(1)}%
                </Badge>
              </div>
            </div>
            <Slider
              value={allocationPercent}
              onValueChange={setAllocationPercent}
              min={petConfig.minAllocationPercent}
              max={petConfig.maxAllocationPercent}
              step={0.1}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{petConfig.minAllocationPercent}%</span>
              <span>{petConfig.maxAllocationPercent}%</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Montant alloué: {formatNumber(parseInt(userHoldings || "0") * petConfig.tradablePartPercent / 100 * allocationPercent[0] / 100)} JERR
            </p>
            <p className="text-xs text-muted-foreground italic">
              💡 Vous pouvez saisir directement le pourcentage (ex: 2.3%) ou utiliser le curseur
            </p>
          </div>

          {/* Scénarios de performance */}
          <div className="space-y-3">
            <Label>Scénario de performance</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PERFORMANCE_SCENARIOS.map((scenario) => (
                <Card 
                  key={scenario.type}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedScenario.type === scenario.type 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="space-y-2">
                      <h4 className="font-medium">{scenario.name}</h4>
                      <p className="text-2xl font-bold text-primary">{scenario.returnPercent}%</p>
                      <p className="text-xs text-muted-foreground">{scenario.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button onClick={handleSimulation} className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            Simuler les gains
          </Button>
        </CardContent>
      </Card>

      {/* Résultats de simulation */}
      {simulationResult && (
        <Card className="shadow-governance">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-3 h-5 w-5 text-success" />
              Résultats de Simulation
            </CardTitle>
            <CardDescription>
              Répartition estimée des gains avec {selectedScenario.name} ({selectedScenario.returnPercent}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Métriques clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">Alloué</p>
                <p className="text-lg font-bold text-primary">
                  {formatNumber(Number(simulationResult.allocatedJERR))} JERR
                </p>
              </div>
              <div className="text-center p-3 bg-success/5 rounded-lg">
                <p className="text-sm text-muted-foreground">Profit Total</p>
                <p className="text-lg font-bold text-success">
                  {formatNumber(simulationResult.profitTotal)} JERR
                </p>
              </div>
              <div className="text-center p-3 bg-blue-500/5 rounded-lg">
                <p className="text-sm text-muted-foreground">Vos Gains</p>
                <p className="text-lg font-bold text-blue-600">
                  {formatNumber(simulationResult.residentProfit)} JERR
                </p>
              </div>
              <div className="text-center p-3 bg-accent/5 rounded-lg">
                <p className="text-sm text-muted-foreground">ROI</p>
                <p className="text-lg font-bold text-accent">
                  {((simulationResult.residentProfit / Number(simulationResult.allocatedJERR)) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Graphique de répartition */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis 
                    dataKey="name" 
                    fontSize={12}
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip formatter={(value: number) => [formatNumber(value) + ' JERR', 'Gains']} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Détail répartition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Vous (80%)</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                      {formatNumber(simulationResult.residentProfit)} JERR
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Nation (20%)</span>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                        {formatNumber(simulationResult.nationProfit)} JERR
                      </Badge>
                    </div>
                    <div className="text-xs space-y-1 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>• Trader (10%)</span>
                        <span>{formatNumber(simulationResult.traderProfit)} JERR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Bonus trader</span>
                        <span>{formatNumber(simulationResult.traderBonus)} JERR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Nation (min 5%)</span>
                        <span>{formatNumber(simulationResult.nationNet)} JERR</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Allocation */}
            <div className="space-y-4">
              <Button 
                onClick={handleAllocation}
                disabled={isAllocating}
                className="w-full gradient-primary"
                size="lg"
              >
                <Shield className="mr-2 h-4 w-4" />
                {isAllocating ? 'Allocation en cours...' : 'Allouer au PET'}
              </Button>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Paramètres modifiables à tout moment.</strong> Performances non garanties. 
                  Les calculs sont basés sur des projections et les gains réels peuvent varier.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pédagogie PET */}
      <Card className="border-accent/20 bg-gradient-to-br from-background to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-3 h-5 w-5 text-accent" />
            Comment fonctionne le PET ?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Règles</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Allocation entre 1% et 5% de la partie traidable</li>
                <li>• Partie traidable = {petConfig.tradablePartPercent}% de vos JERR</li>
                <li>• Répartition fixe 80/20</li>
                <li>• Trader rémunéré 10% + bonus performance</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Flexibilité</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Modification possible à tout moment</li>
                <li>• Retrait sans pénalité</li>
                <li>• Transparence totale sur les performances</li>
                <li>• Aucun engagement minimum</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PETTab;