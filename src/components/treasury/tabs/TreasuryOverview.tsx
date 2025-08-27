import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTreasury } from "@/hooks/use-treasury";
import { TrendingUp, Users, ShoppingCart, PieChart, Shield, GraduationCap } from "lucide-react";

const TreasuryOverview = () => {
  const { treasuryData, setActiveTab, isLoading } = useTreasury();

  const formatJerrCoin = (amount: bigint | number) => {
    const num = typeof amount === 'bigint' ? Number(amount) : amount;
    if (num >= 1e12) {
      return `${(num / 1e12).toLocaleString('fr-FR')} billions`;
    }
    return num.toLocaleString('fr-FR');
  };

  if (isLoading || !treasuryData) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-muted rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-24 bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const saleProgress = (Number(treasuryData.forSaleCitizens.amount) / Number(treasuryData.totalSupply)) * 100;
  const vaultProgress = 70; // 350T / 500T

  return (
    <div className="space-y-6">
      {/* En-tête avec description */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full">
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Économie JerrCoin</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            CydJerr émet 500 billions de JERR pour soutenir l'activité, la protection et la croissance de sa Nation numérique. 
            Découvrez la répartition transparente et comment participer.
          </p>
        </div>
      </div>

      {/* Supply totale avec progress bar */}
      <Card className="shadow-governance">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="mr-3 h-6 w-6 text-success" />
              Supply Totale
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              {formatJerrCoin(treasuryData.totalSupply)}
            </p>
            <p className="text-muted-foreground">JerrCoins émis</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Mis en vente citoyens</span>
              <span className="font-medium">{saleProgress.toFixed(1)}%</span>
            </div>
            <Progress value={saleProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {formatJerrCoin(treasuryData.forSaleCitizens.amount)} JERR disponibles
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Carte mise en vente citoyens */}
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-3 h-6 w-6 text-primary" />
            Mise en Vente Citoyens
          </CardTitle>
          <CardDescription>
            {formatJerrCoin(treasuryData.forSaleCitizens.amount)} JERR à {treasuryData.forSaleCitizens.priceEUR.toFixed(2)} €/JERR
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">150T</p>
              <p className="text-sm text-muted-foreground">JERR disponibles</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-secondary">0,01 €</p>
              <p className="text-sm text-muted-foreground">Prix par JERR</p>
            </div>
          </div>
          
          <Button 
            className="w-full gradient-primary"
            onClick={() => setActiveTab('pet')}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Découvrir comment participer
          </Button>
        </CardContent>
      </Card>

      {/* Mini aperçu répartition */}
      <Card className="hover:shadow-governance transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('distribution')}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <PieChart className="mr-3 h-6 w-6 text-accent" />
              Répartition des Coffres
            </div>
            <Button variant="ghost" size="sm">
              <span className="sr-only">Voir détails</span>
              →
            </Button>
          </CardTitle>
          <CardDescription>
            350 billions répartis en 6 coffres spécialisés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Coffres opérationnels</span>
              <span className="font-medium">{vaultProgress}%</span>
            </div>
            <Progress value={vaultProgress} className="h-2" />
            
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Bonus activité (50T)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Bonus transactions (50T)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Prêts négatifs (100T)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span>Assurance (100T)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                <span>KidJERR (40T)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                <span>Équipe (10T)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Plan Épargne Trading */}
      <Card className="border-accent/20 bg-gradient-to-br from-background to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-3 h-6 w-6 text-accent" />
            Plan Épargne Trading
          </CardTitle>
          <CardDescription>
            Participez au pool de trading et partagez les bénéfices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <p className="text-lg font-semibold text-accent">80/20</p>
              <p className="text-sm text-muted-foreground">Répartition des gains</p>
            </div>
            
            <Button 
              className="w-full gradient-secondary text-secondary-foreground"
              onClick={() => setActiveTab('pet')}
            >
              <Shield className="mr-2 h-4 w-4" />
              Découvrir le PET
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreasuryOverview;