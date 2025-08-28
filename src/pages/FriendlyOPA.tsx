import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  FileText, 
  Calendar,
  Target,
  Shield,
  Globe,
  Building,
  Zap,
  Heart,
  Coins,
  Wallet,
  Gift,
  Lock,
  Lightbulb,
  Network
} from "lucide-react";

const FriendlyOPA = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <Handshake className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                Friendly OPA
              </h1>
              <p className="text-muted-foreground">
                Offres Publiques d'Acquisition Amicales et Transparentes
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
                  <p className="text-sm font-medium text-muted-foreground">OPA Actives</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valeur Totale</p>
                  <p className="text-2xl font-bold">€2.4M</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Participants</p>
                  <p className="text-2xl font-bold">847</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taux de Réussite</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
                <Target className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="philosophy" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="philosophy">Philosophie</TabsTrigger>
            <TabsTrigger value="jerrcoin">JerrCoin System</TabsTrigger>
            <TabsTrigger value="advantages">Avantages</TabsTrigger>
            <TabsTrigger value="active">OPA Actives</TabsTrigger>
            <TabsTrigger value="create">Créer OPA</TabsTrigger>
            <TabsTrigger value="governance">Gouvernance</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="philosophy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-primary" />
                  Philosophie de l'Écosystème Humanitisé
                </CardTitle>
                <CardDescription>
                  Réconcilier performance économique et valeurs humaines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-base leading-relaxed">
                    Dans un monde où la performance économique prime souvent sur l'humain, notre écosystème 
                    ambitionne de réconcilier business et valeurs humaines. Cette philosophie « humanitisée » – ou 
                    <strong> humanétique</strong> – vise à bâtir une économie plus équitable, solidaire et transparente.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-semibold">Habitants, pas Clients</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Les consommateurs deviennent des « habitants » – des membres à part entière 
                          de notre communauté avec une voix et une participation active.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-success/10 rounded-lg">
                            <Handshake className="h-5 w-5 text-success" />
                          </div>
                          <h4 className="font-semibold">Partenariats Humanisés</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Les entreprises partenaires sont intégrées dans un giron bienveillant où 
                          leur succès va de pair avec le bien-être de la communauté.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Notre Vision Révolutionnaire
                    </h4>
                    <p className="text-sm leading-relaxed">
                      Utiliser les nouvelles technologies (blockchain, cryptomonnaies) pour changer les règles 
                      du jeu économique, en mettant l'humain au centre. Il ne s'agit pas de philanthropie naïve, 
                      mais d'un modèle durable mêlant intérêt commun et croissance.
                    </p>
                  </div>
                  
                  <p className="text-base leading-relaxed">
                    Notre stratégie d'absorption s'inscrit dans cette tendance de fond : faire de chaque achat 
                    un investissement dans l'écosystème, et de chaque partenariat une opportunité d'innovation sociale. 
                    <strong> Chaque euro dépensé devient un investissement dans l'avenir de la communauté.</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jerrcoin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-6 w-6 text-primary" />
                  Concept : Intermédiation par la Crypto-Récompense
                </CardTitle>
                <CardDescription>
                  Le système révolutionnaire du JerrCoin (JRC)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Network className="h-5 w-5 text-primary" />
                        Fonctionnement du Système
                      </h4>
                      <div className="space-y-4">
                        <div className="flex gap-3 p-4 bg-primary/5 rounded-lg border">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                          <div>
                            <div className="font-medium">Achat via Notre Plateforme</div>
                            <div className="text-sm text-muted-foreground">Le client paie le montant du produit auprès de notre entité</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 p-4 bg-primary/5 rounded-lg border">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                          <div>
                            <div className="font-medium">Règlement Fournisseur</div>
                            <div className="text-sm text-muted-foreground">Nous réglons le fournisseur au prix normal</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 p-4 bg-success/5 rounded-lg border border-success/20">
                          <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center text-sm font-bold">3</div>
                          <div>
                            <div className="font-medium">Récompense JRC</div>
                            <div className="text-sm text-muted-foreground">100% de remboursement en JerrCoin</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-success/10 to-secondary/10 p-6 rounded-lg border">
                      <h5 className="font-semibold text-success mb-2">Exemple Concret</h5>
                      <p className="text-sm mb-3">Achat d'une voiture à 10 000€ :</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Prix payé :</span>
                          <span className="font-medium">10 000€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>JRC reçus :</span>
                          <span className="font-medium text-success">1 000 000 JRC</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          (1 JRC = 0,01€ à l'émission)
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Sécurité & Transparence Blockchain
                      </h4>
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Lock className="h-4 w-4 text-success" />
                              <span className="font-medium">Traçabilité Complète</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Toutes les transactions et attributions de JRC sont enregistrées 
                              de manière permanente et consultable publiquement.
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Zap className="h-4 w-4 text-primary" />
                              <span className="font-medium">Smart Contracts</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Automatisation des émissions de tokens et des paiements, 
                              réduisant les coûts et éliminant les erreurs.
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Globe className="h-4 w-4 text-secondary" />
                              <span className="font-medium">Interopérabilité</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Le JerrCoin sera accepté par un réseau croissant de partenaires, 
                              augmentant sa valeur d'usage.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advantages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-6 w-6 text-primary" />
                  Avantages pour les Habitants de l'Écosystème
                </CardTitle>
                <CardDescription>
                  Les bénéfices multiples de notre modèle humanitisé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-success/10 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-success" />
                        </div>
                        <h4 className="font-semibold text-lg">Pouvoir d'Achat Augmenté</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <p>
                          <strong>Double opportunité :</strong> Obtenez votre produit ET l'équivalent en JerrCoin.
                        </p>
                        <p>
                          <strong>Plus-value potentielle :</strong> Si la valeur du JRC augmente avec le développement 
                          de l'écosystème, votre pouvoir d'achat futur grandit d'autant.
                        </p>
                        <p>
                          <strong>Épargne automatique :</strong> Constituez une épargne au fil de vos achats quotidiens, 
                          réutilisable plus tard dans le réseau.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="font-semibold text-lg">Participation à la Croissance</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <p>
                          <strong>Propriétaire de l'écosystème :</strong> Détenir des JRC, c'est posséder une part 
                          de notre économie collaborative.
                        </p>
                        <p>
                          <strong>Intérêt aligné :</strong> Plus l'écosystème grandit (nouveaux partenaires, utilisateurs), 
                          plus la demande et l'utilité du JRC augmentent.
                        </p>
                        <p>
                          <strong>Richesse partagée :</strong> À l'inverse des modèles traditionnels, la croissance 
                          profite directement à tous les habitants.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-secondary/10 rounded-lg">
                          <Shield className="h-6 w-6 text-secondary" />
                        </div>
                        <h4 className="font-semibold text-lg">Sécurité et Confiance</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <p>
                          <strong>Garantie blockchain :</strong> Vos récompenses ne disparaîtront jamais et ne seront 
                          pas dévaluées arbitrairement.
                        </p>
                        <p>
                          <strong>Transparence totale :</strong> Historique infalsifiable et consultable de toutes 
                          vos récompenses.
                        </p>
                        <p>
                          <strong>Sans frais cachés :</strong> 100% de votre achat vous est reversé en valeur, 
                          aucune commission supplémentaire.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <Heart className="h-6 w-6 text-accent" />
                        </div>
                        <h4 className="font-semibold text-lg">Communauté et Sens</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <p>
                          <strong>Impact positif :</strong> Chaque achat contribue à renforcer un modèle équitable 
                          dont vous faites partie.
                        </p>
                        <p>
                          <strong>Fierté d'appartenance :</strong> Soutenez un mouvement de transformation économique 
                          et donnez du sens à vos dépenses.
                        </p>
                        <p>
                          <strong>Co-construction :</strong> En tant qu'habitant, vous co-construisez l'écosystème 
                          par vos choix de consommation.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-success/5 rounded-lg border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    En Résumé : Vous êtes à la fois...
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-background rounded-lg border">
                      <div className="font-medium">Consommateur</div>
                      <div className="text-xs text-muted-foreground">Produits & services</div>
                    </div>
                    <div className="p-3 bg-background rounded-lg border">
                      <div className="font-medium">Investisseur</div>
                      <div className="text-xs text-muted-foreground">Capital JerrCoin</div>
                    </div>
                    <div className="p-3 bg-background rounded-lg border">
                      <div className="font-medium">Sociétaire</div>
                      <div className="text-xs text-muted-foreground">Part de l'écosystème</div>
                    </div>
                    <div className="p-3 bg-background rounded-lg border">
                      <div className="font-medium">Habitant</div>
                      <div className="text-xs text-muted-foreground">Membre de la communauté</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Offres Publiques d'Acquisition en Cours</CardTitle>
                <CardDescription>
                  Participez aux OPA transparentes et démocratiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* OPA 1 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Building className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-semibold text-lg">TechCorp Solutions</h3>
                            <p className="text-sm text-muted-foreground">Secteur: Technologies</p>
                          </div>
                        </div>
                        <Badge className="bg-success text-success-foreground">En cours</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Prix Offert</p>
                          <p className="text-xl font-bold">€45.50 / action</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Prime</p>
                          <p className="text-xl font-bold text-success">+15%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fin de l'offre</p>
                          <p className="text-xl font-bold">12 jours</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Participation: 234/500 citoyens</span>
                          <span>46.8%</span>
                        </div>
                        <Progress value={46.8} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1">Participer</Button>
                        <Button variant="outline">Détails</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* OPA 2 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Globe className="h-8 w-8 text-accent" />
                          <div>
                            <h3 className="font-semibold text-lg">GreenEnergy Ltd</h3>
                            <p className="text-sm text-muted-foreground">Secteur: Énergies Renouvelables</p>
                          </div>
                        </div>
                        <Badge variant="outline">Analyse</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Prix Offert</p>
                          <p className="text-xl font-bold">€28.75 / action</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Prime</p>
                          <p className="text-xl font-bold text-success">+22%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Lancement prévu</p>
                          <p className="text-xl font-bold">8 jours</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Phase d'analyse communautaire</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Rejoindre l'Analyse
                      </Button>
                    </CardContent>
                  </Card>

                  {/* OPA 3 */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Zap className="h-8 w-8 text-secondary" />
                          <div>
                            <h3 className="font-semibold text-lg">FinanceInnovate</h3>
                            <p className="text-sm text-muted-foreground">Secteur: FinTech</p>
                          </div>
                        </div>
                        <Badge className="bg-warning text-warning-foreground">Vote Final</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Prix Offert</p>
                          <p className="text-xl font-bold">€67.25 / action</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Prime</p>
                          <p className="text-xl font-bold text-success">+18%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Vote se termine</p>
                          <p className="text-xl font-bold">2 jours</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Votes: Pour 89% | Contre 11%</span>
                          <span>456/500 votes</span>
                        </div>
                        <Progress value={91.2} className="h-2" />
                      </div>
                      
                      <Button className="w-full gradient-primary">
                        Voter Maintenant
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Proposer une Nouvelle OPA</CardTitle>
                <CardDescription>
                  Initiez une offre publique d'acquisition transparente et démocratique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company-name">Nom de l'Entreprise Cible</Label>
                      <Input id="company-name" placeholder="Ex: TechCorp Solutions" />
                    </div>
                    
                    <div>
                      <Label htmlFor="sector">Secteur d'Activité</Label>
                      <Input id="sector" placeholder="Ex: Technologies, Finance, Énergie" />
                    </div>
                    
                    <div>
                      <Label htmlFor="current-price">Prix Actuel de l'Action</Label>
                      <Input id="current-price" type="number" placeholder="0.00" />
                    </div>
                    
                    <div>
                      <Label htmlFor="offer-price">Prix Offert</Label>
                      <Input id="offer-price" type="number" placeholder="0.00" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="premium">Prime Offerte (%)</Label>
                      <Input id="premium" type="number" placeholder="15" />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">Durée de l'Offre (jours)</Label>
                      <Input id="duration" type="number" placeholder="30" />
                    </div>
                    
                    <div>
                      <Label htmlFor="min-participation">Participation Minimale</Label>
                      <Input id="min-participation" type="number" placeholder="100" />
                    </div>
                    
                    <div>
                      <Label htmlFor="budget">Budget Total (€)</Label>
                      <Input id="budget" type="number" placeholder="1000000" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="rationale">Justification Stratégique</Label>
                  <textarea 
                    id="rationale"
                    className="w-full min-h-[120px] p-3 border rounded-md bg-background text-foreground"
                    placeholder="Décrivez les raisons stratégiques, les synergies attendues, et les bénéfices pour la communauté..."
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button className="flex-1 gradient-primary">
                    Soumettre la Proposition
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Sauvegarder le Brouillon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gouvernance des OPA</CardTitle>
                <CardDescription>
                  Processus démocratique et transparent pour les décisions d'acquisition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Processus de Validation
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                          <div className="font-medium">Proposition Initiale</div>
                          <div className="text-sm text-muted-foreground">Dépôt et vérification</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                          <div className="font-medium">Analyse Communautaire</div>
                          <div className="text-sm text-muted-foreground">14 jours d'évaluation</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                          <div className="font-medium">Vote de Validation</div>
                          <div className="text-sm text-muted-foreground">Seuil 60% requis</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</div>
                        <div>
                          <div className="font-medium">Exécution OPA</div>
                          <div className="text-sm text-muted-foreground">Lancement officiel</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Critères de Participation
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium mb-2">Citoyens Éligibles</div>
                        <div className="text-sm text-muted-foreground">
                          • Minimum 100 GOLD tokens
                          • Historique de participation active
                          • Compte vérifié depuis 30 jours
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium mb-2">Pouvoir de Vote</div>
                        <div className="text-sm text-muted-foreground">
                          • 1 GOLD = 1 vote
                          • Maximum 1000 votes par citoyen
                          • Bonus pour ancienneté
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium mb-2">Incitations</div>
                        <div className="text-sm text-muted-foreground">
                          • Récompenses de participation
                          • Dividendes en cas de succès
                          • Bonus gouvernance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historique des OPA</CardTitle>
                <CardDescription>
                  Retour sur les offres publiques d'acquisition précédentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">DataSoft Inc.</div>
                      <div className="text-sm text-muted-foreground">Décembre 2024</div>
                    </div>
                    <div>
                      <div className="font-medium">€34.50 / action</div>
                      <div className="text-sm text-success">+20% prime</div>
                    </div>
                    <div>
                      <Badge className="bg-success text-success-foreground">Réussie</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">€850K</div>
                      <div className="text-sm text-muted-foreground">Valeur totale</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">CleanTech Solutions</div>
                      <div className="text-sm text-muted-foreground">Novembre 2024</div>
                    </div>
                    <div>
                      <div className="font-medium">€67.80 / action</div>
                      <div className="text-sm text-success">+18% prime</div>
                    </div>
                    <div>
                      <Badge className="bg-success text-success-foreground">Réussie</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">€1.2M</div>
                      <div className="text-sm text-muted-foreground">Valeur totale</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">RetailChain Corp</div>
                      <div className="text-sm text-muted-foreground">Octobre 2024</div>
                    </div>
                    <div>
                      <div className="font-medium">€23.45 / action</div>
                      <div className="text-sm text-destructive">+8% prime</div>
                    </div>
                    <div>
                      <Badge variant="destructive">Échouée</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">€450K</div>
                      <div className="text-sm text-muted-foreground">Valeur totale</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="framework" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cadre Légal et Réglementaire</CardTitle>
                <CardDescription>
                  Framework juridique pour les OPA transparentes et conformes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Conformité Réglementaire</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        <span className="text-sm">Directive MiFID II conforme</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        <span className="text-sm">Règlement MAR respecté</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        <span className="text-sm">AMF supervision active</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                        <span className="text-sm">RGPD data protection</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Protection des Investisseurs</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">Fonds de garantie activé</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">Audit indépendant obligatoire</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">Période de réflexion 48h</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">Transparence totale requise</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h5 className="font-semibold mb-2">Documentation Légale</h5>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-3 w-3" />
                      Règlement Intérieur
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-3 w-3" />
                      Code de Conduite
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-3 w-3" />
                      Politique KYC/AML
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-3 w-3" />
                      Terms & Conditions
                    </Button>
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

export default FriendlyOPA;