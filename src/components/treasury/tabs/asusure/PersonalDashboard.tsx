import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Wallet, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  Users, 
  Shield,
  ArrowUp,
  ArrowDown,
  Car,
  Home,
  Heart,
  LucideIcon
} from "lucide-react";

const PersonalDashboard = () => {
  // Données mockées du compte utilisateur
  const userAccount = {
    automobile: {
      active: true,
      balance: 145, // Sur 150 JRC requis
      lastContribution: 5,
      lastContributionDate: "2024-01-15",
      requiredDeposit: 150,
      nextReconstitution: "2024-02-01"
    },
    habitation: {
      active: true,
      balance: 280, // Sur 300 JRC requis
      lastContribution: 20,
      lastContributionDate: "2024-01-15",
      requiredDeposit: 300,
      nextReconstitution: "2024-02-01"
    },
    sante: {
      active: false,
      balance: 0,
      lastContribution: 0,
      lastContributionDate: null,
      requiredDeposit: 150,
      nextReconstitution: null
    }
  };

  // Historique des contributions (mockées)
  const contributionHistory = [
    { date: "2024-01-15", pool: "automobile", amount: 5, reason: "Accident véhicule - Réparation" },
    { date: "2024-01-15", pool: "habitation", amount: 20, reason: "Dégât des eaux - Appartement" },
    { date: "2023-12-20", pool: "automobile", amount: 8, reason: "Vol accessoires - Voiture" },
    { date: "2023-12-10", pool: "habitation", amount: 15, reason: "Bris de glace - Fenêtre" },
  ];

  // Statistiques des pools
  const poolStats: Array<{
    name: string;
    icon: LucideIcon;
    participants: number;
    monthlyAverage: number;
    trend: "up" | "down";
    trendPercent: number;
  }> = [
    {
      name: "Automobile",
      icon: Car,
      participants: 2847,
      monthlyAverage: 5.4,
      trend: "down",
      trendPercent: -12
    },
    {
      name: "Habitation", 
      icon: Home,
      participants: 1923,
      monthlyAverage: 20.0,
      trend: "up",
      trendPercent: +8
    },
    {
      name: "Santé/Corporel",
      icon: Heart,
      participants: 3456,
      monthlyAverage: 7.5,
      trend: "down",
      trendPercent: -5
    }
  ];

  const totalBalance = userAccount.automobile.balance + userAccount.habitation.balance + userAccount.sante.balance;
  const totalRequired = userAccount.automobile.requiredDeposit + userAccount.habitation.requiredDeposit;
  const balancePercent = (totalBalance / totalRequired) * 100;

  return (
    <div className="space-y-6">
      {/* Vue d'ensemble du compte */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Solde Total</p>
                <p className="text-2xl font-bold text-primary">{totalBalance} JRC</p>
              </div>
              <Wallet className="h-8 w-8 text-primary/60" />
            </div>
            <Progress value={balancePercent} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {balancePercent.toFixed(1)}% du dépôt requis
            </p>
          </CardContent>
        </Card>

        <Card className="border-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pools Actifs</p>
                <p className="text-2xl font-bold text-secondary">2/3</p>
              </div>
              <Shield className="h-8 w-8 text-secondary/60" />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Automobile + Habitation
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reconstitution</p>
                <p className="text-2xl font-bold text-accent">25 JRC</p>
              </div>
              <Clock className="h-8 w-8 text-accent/60" />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Avant le 01/02/2024
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Détail par pool */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pool Automobile */}
        <Card className={userAccount.automobile.active ? "border-blue-200 bg-blue-50/30" : "opacity-60"}>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Car className="mr-2 h-4 w-4 text-blue-600" />
              Pool Automobile
              {userAccount.automobile.active && <Badge variant="outline" className="ml-2 text-xs">Actif</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Solde actuel</span>
              <span className="font-bold">{userAccount.automobile.balance} JRC</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Dépôt requis</span>
              <span className="text-sm">{userAccount.automobile.requiredDeposit} JRC</span>
            </div>
            {userAccount.automobile.active && (
              <>
                <Progress 
                  value={(userAccount.automobile.balance / userAccount.automobile.requiredDeposit) * 100} 
                  className="h-2"
                />
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dernière contribution</span>
                    <span className="text-red-600">-{userAccount.automobile.lastContribution} JRC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">À reconstituer</span>
                    <span className="font-medium text-warning">{userAccount.automobile.requiredDeposit - userAccount.automobile.balance} JRC</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Reconstituer (+{userAccount.automobile.requiredDeposit - userAccount.automobile.balance} JRC)
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pool Habitation */}
        <Card className={userAccount.habitation.active ? "border-green-200 bg-green-50/30" : "opacity-60"}>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Home className="mr-2 h-4 w-4 text-green-600" />
              Pool Habitation
              {userAccount.habitation.active && <Badge variant="outline" className="ml-2 text-xs">Actif</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Solde actuel</span>
              <span className="font-bold">{userAccount.habitation.balance} JRC</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Dépôt requis</span>
              <span className="text-sm">{userAccount.habitation.requiredDeposit} JRC</span>
            </div>
            {userAccount.habitation.active && (
              <>
                <Progress 
                  value={(userAccount.habitation.balance / userAccount.habitation.requiredDeposit) * 100} 
                  className="h-2"
                />
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dernière contribution</span>
                    <span className="text-red-600">-{userAccount.habitation.lastContribution} JRC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">À reconstituer</span>
                    <span className="font-medium text-warning">{userAccount.habitation.requiredDeposit - userAccount.habitation.balance} JRC</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Reconstituer (+{userAccount.habitation.requiredDeposit - userAccount.habitation.balance} JRC)
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pool Santé */}
        <Card className="opacity-60 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Heart className="mr-2 h-4 w-4 text-red-600" />
              Pool Santé/Corporel
              <Badge variant="outline" className="ml-2 text-xs">Inactif</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Dépôt requis</span>
              <span className="text-sm">{userAccount.sante.requiredDeposit} JRC</span>
            </div>
            <Button size="sm" className="w-full text-xs">
              Rejoindre ce Pool
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Historique des contributions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-3 h-5 w-5 text-primary" />
            Historique des Contributions
          </CardTitle>
          <CardDescription>
            Vos participations aux quote-parts des pools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contributionHistory.map((contribution, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-destructive/10 rounded">
                    <ArrowDown className="h-3 w-3 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">-{contribution.amount} JRC</p>
                    <p className="text-xs text-muted-foreground">{contribution.pool} • {contribution.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground max-w-48 truncate">
                    {contribution.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistiques des pools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-3 h-5 w-5 text-success" />
            Évolution des Pools
          </CardTitle>
          <CardDescription>
            Tendances des contributions moyennes mensuelles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {poolStats.map((pool, index) => (
              <div key={index} className="p-4 bg-background/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <pool.icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{pool.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {pool.trend === "up" ? (
                      <ArrowUp className="h-3 w-3 text-red-500" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-green-500" />
                    )}
                    <span className={`text-xs ${pool.trend === "up" ? "text-red-500" : "text-green-500"}`}>
                      {pool.trendPercent > 0 ? "+" : ""}{pool.trendPercent}%
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Participants</span>
                    <span className="font-medium">{pool.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Moyenne mensuelle</span>
                    <span className="font-bold">{pool.monthlyAverage.toFixed(1)} JRC</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerte reconstitution */}
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-warning">Reconstitution de Compte Requise</p>
              <p className="text-sm text-muted-foreground">
                Vous devez reconstituer 25 JRC avant le 01/02/2024 pour maintenir votre couverture. 
                Les fonds prélevés pour les quote-parts doivent être remplacés mensuellement.
              </p>
              <Button size="sm" className="mt-2">
                Reconstituer Maintenant (25 JRC)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDashboard;