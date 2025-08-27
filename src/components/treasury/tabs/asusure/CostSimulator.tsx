import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingDown, Users, AlertTriangle } from "lucide-react";

const CostSimulator = () => {
  const [claimAmount, setClaimAmount] = useState<number>(10000);
  const [poolSize, setPoolSize] = useState<number>(1000);
  const [poolType, setPoolType] = useState<string>("automobile");

  // Calcul de la quote-part individuelle
  const individualShare = claimAmount / poolSize;

  // Exemples prédéfinis de sinistres
  const claimExamples = {
    automobile: [
      { name: "Réparation légère", amount: 2000 },
      { name: "Accident moyen", amount: 8000 },
      { name: "Sinistre total", amount: 30000 }
    ],
    habitation: [
      { name: "Dégât des eaux", amount: 5000 },
      { name: "Vol avec effraction", amount: 15000 },
      { name: "Incendie majeur", amount: 100000 }
    ],
    sante: [
      { name: "Hospitalisation courte", amount: 8000 },
      { name: "Chirurgie complexe", amount: 25000 },
      { name: "Accident grave", amount: 50000 }
    ]
  };

  // Tailles de pool suggérées
  const poolSizes = [100, 500, 1000, 2500, 5000, 10000, 25000];

  const getPoolInfo = (type: string) => {
    switch (type) {
      case "automobile":
        return { deposit: 150, currentSize: 2847 };
      case "habitation":
        return { deposit: 300, currentSize: 1923 };
      case "sante":
        return { deposit: 150, currentSize: 3456 };
      default:
        return { deposit: 150, currentSize: 1000 };
    }
  };

  const poolInfo = getPoolInfo(poolType);
  const isAffordable = individualShare <= poolInfo.deposit;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-3 h-6 w-6 text-primary" />
            Simulateur de Quote-part
          </CardTitle>
          <CardDescription>
            Calculez l'impact financier d'un sinistre selon la taille du pool
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Configuration */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="pool-type">Type de Pool</Label>
                <Select value={poolType} onValueChange={setPoolType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automobile">Automobile (150 JRC)</SelectItem>
                    <SelectItem value="habitation">Habitation (300 JRC)</SelectItem>
                    <SelectItem value="sante">Santé/Corporel (150 JRC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="claim-amount">Montant du Sinistre (JRC)</Label>
                <Input
                  id="claim-amount"
                  type="number"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(Number(e.target.value))}
                  min="0"
                  step="100"
                />
              </div>

              <div>
                <Label htmlFor="pool-size">Nombre de Participants</Label>
                <Input
                  id="pool-size"
                  type="number"
                  value={poolSize}
                  onChange={(e) => setPoolSize(Number(e.target.value))}
                  min="1"
                  step="100"
                />
              </div>
            </div>

            {/* Résultat */}
            <div className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">
                  {individualShare.toFixed(2)} JRC
                </div>
                <p className="text-sm text-muted-foreground mb-4">Quote-part par personne</p>
                
                {isAffordable ? (
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    ✓ Couvert par le dépôt ({poolInfo.deposit} JRC)
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                    ⚠ Dépasse le dépôt ({poolInfo.deposit} JRC)
                  </Badge>
                )}
              </div>

              {/* Comparaison actuelle */}
              <div className="p-4 bg-background/50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pool actuel ({poolInfo.currentSize} membres)</span>
                  <span className="font-medium">{(claimAmount / poolInfo.currentSize).toFixed(2)} JRC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exemples rapides */}
          <div>
            <Label className="text-sm font-medium">Exemples de sinistres</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              {claimExamples[poolType as keyof typeof claimExamples]?.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setClaimAmount(example.amount)}
                  className="justify-between"
                >
                  <span className="text-xs">{example.name}</span>
                  <span className="text-xs font-mono">{example.amount.toLocaleString()}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparaison multi-tailles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingDown className="mr-3 h-5 w-5 text-success" />
            Impact de la Taille du Pool
          </CardTitle>
          <CardDescription>
            Plus il y a de participants, moins chacun paie pour le même sinistre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {poolSizes.map((size) => {
              const share = claimAmount / size;
              const isCurrentSize = size === poolInfo.currentSize;
              const isSelectedSize = size === poolSize;
              
              return (
                <div
                  key={size}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelectedSize 
                      ? 'bg-primary/10 border border-primary/20' 
                      : isCurrentSize
                      ? 'bg-secondary/10 border border-secondary/20'
                      : 'bg-background/50 hover:bg-background/80'
                  }`}
                  onClick={() => setPoolSize(size)}
                >
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {size.toLocaleString()} participants
                      {isCurrentSize && <Badge variant="outline" className="ml-2 text-xs">Actuel</Badge>}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{share.toFixed(2)} JRC</div>
                    <div className="text-xs text-muted-foreground">par personne</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message pédagogique */}
          <div className="mt-4 p-4 bg-info/5 rounded-lg border border-info/20">
            <div className="flex items-center text-info mb-2">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="font-medium">Principe de Mutualisation</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Avec {poolSizes[0]} membres, ce sinistre coûte <strong>{(claimAmount / poolSizes[0]).toFixed(0)} JRC</strong> par personne.
              Avec {poolSizes[poolSizes.length - 1].toLocaleString()} membres, seulement <strong>{(claimAmount / poolSizes[poolSizes.length - 1]).toFixed(2)} JRC</strong> par personne.
              C'est <strong>{Math.round((claimAmount / poolSizes[0]) / (claimAmount / poolSizes[poolSizes.length - 1]))}x moins cher</strong> !
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostSimulator;