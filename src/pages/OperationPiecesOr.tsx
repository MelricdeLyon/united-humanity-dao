import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Coins, 
  TrendingUp, 
  Target, 
  Users, 
  ArrowUpRight, 
  Shield,
  Zap,
  DollarSign,
  Vote
} from "lucide-react";

const OperationPiecesOr = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <Coins className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                Opération Pièces d'Or
              </h1>
              <p className="text-muted-foreground">
                Système économique décentralisé et tokenomics avancée
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Supply</p>
                  <p className="text-2xl font-bold">1,000,000</p>
                </div>
                <Coins className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prix Actuel</p>
                  <p className="text-2xl font-bold">€4.50</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Détenteurs</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Objectif Cap</p>
                  <p className="text-2xl font-bold">€4.5M</p>
                </div>
                <Target className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="governance">Gouvernance</TabsTrigger>
            <TabsTrigger value="treasury">Trésorerie</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Mécanismes d'Incitation
                  </CardTitle>
                  <CardDescription>
                    Récompenses automatisées pour les participants actifs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Participation Gouvernance</span>
                    <Badge variant="secondary">+10 GOLD/vote</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Délégation Active</span>
                    <Badge variant="secondary">+5 GOLD/mois</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Propositions Acceptées</span>
                    <Badge variant="secondary">+50 GOLD</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Contribution Technique</span>
                    <Badge variant="secondary">Variable</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Sécurité & Audit
                  </CardTitle>
                  <CardDescription>
                    Protocoles de sécurité et audits réguliers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Smart Contracts</span>
                    <Badge className="bg-success text-success-foreground">Audité</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Multi-sig Treasury</span>
                    <Badge className="bg-success text-success-foreground">Actif</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Timelock Governance</span>
                    <Badge className="bg-success text-success-foreground">48h</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bug Bounty</span>
                    <Badge variant="outline">€10,000</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Progression de l'Opération</CardTitle>
                <CardDescription>
                  Étapes de déploiement et adoption du système GOLD
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Phase 1: Lancement Initial</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Phase 2: Distribution Initiale</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Phase 3: Intégration Gouvernance</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Phase 4: Économie Circulaire</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tokenomics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribution des Tokens GOLD</CardTitle>
                <CardDescription>
                  Répartition transparente et équitable des pièces d'or
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Trésorerie Publique</span>
                      <div className="text-right">
                        <div className="font-semibold">40%</div>
                        <div className="text-sm text-muted-foreground">400,000 GOLD</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Récompenses Gouvernance</span>
                      <div className="text-right">
                        <div className="font-semibold">25%</div>
                        <div className="text-sm text-muted-foreground">250,000 GOLD</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Distribution Citoyens</span>
                      <div className="text-right">
                        <div className="font-semibold">20%</div>
                        <div className="text-sm text-muted-foreground">200,000 GOLD</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Développement</span>
                      <div className="text-right">
                        <div className="font-semibold">10%</div>
                        <div className="text-sm text-muted-foreground">100,000 GOLD</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Réserve d'Urgence</span>
                      <div className="text-right">
                        <div className="font-semibold">5%</div>
                        <div className="text-sm text-muted-foreground">50,000 GOLD</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    {/* Placeholder for pie chart */}
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <div className="text-center text-primary-foreground">
                        <div className="text-2xl font-bold">1M</div>
                        <div className="text-sm">GOLD Total</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Programmes de Staking</CardTitle>
                <CardDescription>
                  Participez à la sécurisation du réseau et gagnez des récompenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Flexible</CardTitle>
                      <CardDescription>Sortie à tout moment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-success mb-2">3.5% APY</div>
                      <div className="text-sm text-muted-foreground mb-4">Pas de période de blocage</div>
                      <Button className="w-full">Staker Maintenant</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">6 Mois</CardTitle>
                      <CardDescription>Engagement modéré</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-success mb-2">7% APY</div>
                      <div className="text-sm text-muted-foreground mb-4">Période de blocage: 6 mois</div>
                      <Button className="w-full">Staker Maintenant</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">12 Mois</CardTitle>
                      <CardDescription>Engagement long terme</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-success mb-2">12% APY</div>
                      <div className="text-sm text-muted-foreground mb-4">Période de blocage: 12 mois</div>
                      <Button className="w-full">Staker Maintenant</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pouvoir de Vote GOLD</CardTitle>
                <CardDescription>
                  Votre influence dans les décisions de la communauté
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-semibold">Vos GOLD</div>
                      <div className="text-sm text-muted-foreground">Tokens détenus</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">1,250</div>
                      <div className="text-sm text-muted-foreground">GOLD</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-semibold">Pouvoir de Vote</div>
                      <div className="text-sm text-muted-foreground">Influence dans les décisions</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">0.125%</div>
                      <div className="text-sm text-muted-foreground">Du total</div>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    <Vote className="mr-2 h-4 w-4" />
                    Participer aux Votes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treasury" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trésorerie GOLD</CardTitle>
                <CardDescription>
                  Gestion transparente des fonds communautaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Solde Total</span>
                      <div className="text-right">
                        <div className="font-semibold">€1,800,000</div>
                        <div className="text-sm text-muted-foreground">400k GOLD</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Réserves Actives</span>
                      <div className="text-right">
                        <div className="font-semibold">€1,200,000</div>
                        <div className="text-sm text-muted-foreground">267k GOLD</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Budget Développement</span>
                      <div className="text-right">
                        <div className="font-semibold">€450,000</div>
                        <div className="text-sm text-muted-foreground">100k GOLD</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Fonds d'Urgence</span>
                      <div className="text-right">
                        <div className="font-semibold">€150,000</div>
                        <div className="text-sm text-muted-foreground">33k GOLD</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Transactions Récentes</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span>Récompenses Gouvernance</span>
                        <span className="text-red-500">-2,500 GOLD</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Contribution Technique</span>
                        <span className="text-red-500">-5,000 GOLD</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Mint Nouveaux Tokens</span>
                        <span className="text-green-500">+10,000 GOLD</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Staking Rewards</span>
                        <span className="text-red-500">-1,200 GOLD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OperationPiecesOr;