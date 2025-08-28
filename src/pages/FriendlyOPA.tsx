import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
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
  Network,
  ArrowLeft
} from "lucide-react";

const FriendlyOPA = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>

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
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="philosophy">Philosophie</TabsTrigger>
            <TabsTrigger value="jerrcoin">JerrCoin System</TabsTrigger>
            <TabsTrigger value="advantages">Avantages</TabsTrigger>
            <TabsTrigger value="mechanism">Mécanisme Entreprises</TabsTrigger>
            <TabsTrigger value="targets">Entreprises Cibles</TabsTrigger>
            <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
            <TabsTrigger value="active">OPA Actives</TabsTrigger>
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

          <TabsContent value="mechanism" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-6 w-6 text-primary" />
                  Mécanisme pour les Entreprises Partenaires
                </CardTitle>
                <CardDescription>
                  Une stratégie gagnant-gagnant pour séduire et intégrer progressivement nos partenaires
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-success/10 to-primary/10 p-6 rounded-lg border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Handshake className="h-5 w-5 text-success" />
                    Notre Stratégie d'Absorption Amicale
                  </h4>
                  <p className="text-sm leading-relaxed mb-4">
                    Notre modèle est pensé pour <strong>séduire les entreprises partenaires et non les braquer</strong>. 
                    Cette stratégie dite « d'absorption » vise à intégrer progressivement des sociétés sélectionnées 
                    au sein de notre écosystème, dans une dynamique gagnant-gagnant.
                  </p>
                  <div className="text-sm italic text-muted-foreground">
                    « Nous croyons en vous et en vos produits. En vous associant à nous, vous deviendrez l'un des 
                    fers de lance d'un modèle qui peut décupler vos ventes tout en faisant œuvre de pionnier. »
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-success/10 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-success" />
                        </div>
                        <h4 className="font-semibold text-lg">Aucune Baisse de Revenu</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <p>
                          <strong>Prix inchangé :</strong> L'entreprise continue de vendre ses produits au prix normal.
                        </p>
                        <p>
                          <strong>Paiement intégral :</strong> Nous versons le montant complet en euros, 
                          aucune remise forcée ni perte de marge.
                        </p>
                        <p>
                          <strong>Rôle d'apporteur :</strong> Notre entité agit comme un revendeur agréé 
                          qui achète au prix public.
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
                        <h4 className="font-semibold text-lg">Volume de Ventes Supplémentaire</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <p>
                          <strong>Clientèle élargie :</strong> Nous redirigeons une clientèle ultra-motivée 
                          grâce à l'avantage JerrCoin.
                        </p>
                        <p>
                          <strong>Avantage concurrentiel :</strong> Les acheteurs privilégient naturellement 
                          les partenaires associés à notre offre.
                        </p>
                        <p>
                          <strong>Sans effort :</strong> L'entreprise bénéficie d'un afflux de nouveaux clients 
                          sans campagne marketing de sa part.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-secondary/10 rounded-lg">
                          <Lightbulb className="h-6 w-6 text-secondary" />
                        </div>
                        <h4 className="font-semibold text-lg">Marketing Innovant & Valorisant</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <p>
                          <strong>Image de pionnier :</strong> L'entreprise devient l'une des pionnières 
                          d'un modèle économique inédit.
                        </p>
                        <p>
                          <strong>Capital sympathie :</strong> Être choisi comme partenaire revêt un 
                          caractère valorisant et éthique.
                        </p>
                        <p>
                          <strong>Nouveaux segments :</strong> Attire les adeptes de crypto et les 
                          consommateurs responsables.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <Globe className="h-6 w-6 text-accent" />
                        </div>
                        <h4 className="font-semibold text-lg">Réseau International</h4>
                      </div>
                      <div className="space-y-3 text-sm">
                        <p>
                          <strong>Visibilité mondiale :</strong> Le JerrCoin transcende les frontières 
                          géographiques.
                        </p>
                        <p>
                          <strong>Clientèle élargie :</strong> Une entreprise locale peut attirer des 
                          clients étrangers membres de l'écosystème.
                        </p>
                        <p>
                          <strong>Expansion facilitée :</strong> Élargissement du marché sans déploiement 
                          international coûteux.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-success/5 p-6 rounded-lg border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Données et Insights Blockchain
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    Les transactions étant enregistrées sur blockchain, l'entreprise peut obtenir des analyses 
                    agrégées sur les comportements d'achat de cette nouvelle clientèle.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Données fiables en temps réel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Optimisation des stocks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Adaptation de l'offre</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-accent/10 to-secondary/10 p-6 rounded-lg border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-accent" />
                    Vers une Fusion Organique
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Si une entreprise partenaire voit son chiffre d'affaires exploser grâce à notre intervention, 
                    il sera naturel d'envisager un <strong>rapprochement capitalistique plus formel</strong>. 
                    Cependant, ce dernier ne sera pas subi : il résultera d'une volonté commune de consolider 
                    les liens, l'entreprise ayant constaté par elle-même les bénéfices du partenariat.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="targets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Entreprises Cibles et Synergies Envisagées
                </CardTitle>
                <CardDescription>
                  Secteurs clés sélectionnés pour leur pertinence stratégique et leur potentiel de synergie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* HTC */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Zap className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">HTC (High Tech Corporation)</h3>
                            <p className="text-muted-foreground">Technologies de pointe • Smartphones & Électronique</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-primary/5">Tech Leader</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Synergies Stratégiques</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                              <span><strong>Relance des ventes :</strong> Argument imbattable face à Apple/Samsung avec cashback crypto intégral</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                              <span><strong>Innovation perçue :</strong> Alliance "High-Tech & Crypto" différenciante</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                              <span><strong>Intégration produit :</strong> Wallet JerrCoin natif dans les smartphones HTC</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-primary/5 to-success/5 p-4 rounded-lg">
                          <h5 className="font-semibold mb-2">Exemple Concret</h5>
                          <p className="text-sm mb-3">Smartphone HTC à 500€ :</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Prix client :</span>
                              <span className="font-medium">500€</span>
                            </div>
                            <div className="flex justify-between">
                              <span>JRC reçus :</span>
                              <span className="font-medium text-success">50 000 JRC</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                              = Smartphone "gratuit" à terme si JRC s'apprécie
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* OL Télécom */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-accent/10 rounded-lg">
                            <Users className="h-8 w-8 text-accent" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">OL Télécom</h3>
                            <p className="text-muted-foreground">Télécommunications & Sport • Branche de l'Olympique Lyonnais</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-accent/5">Sport & Tech</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Fan Experience Enrichie</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                              <span><strong>Abonnements récompensés :</strong> OL TV + services aux couleurs du club avec cashback JRC</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                              <span><strong>Triple fidélisation :</strong> Fan ↔ Club ↔ Écosystème crypto</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                              <span><strong>Premier club pionnier :</strong> Football dans l'ère blockchain</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-4 rounded-lg">
                          <h5 className="font-semibold mb-2">Vision OL</h5>
                          <p className="text-sm italic">
                            "Faisons de l'OL le premier club de football au monde où soutenir son équipe 
                            permet aussi d'épargner pour son avenir – une vraie démonstration de 
                            'Plus unis, plus forts', en version économique !"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Opportunities.biz */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-secondary/10 rounded-lg">
                            <FileText className="h-8 w-8 text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">Opportunities.biz</h3>
                            <p className="text-muted-foreground">Finance d'entreprise • Spécialiste des OPA & M&A</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-secondary/5">Expertise M&A</Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-secondary/5 to-primary/5 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Partenaire Fonctionnel Stratégique</h4>
                          <p className="text-sm">
                            Intégrer ce cabinet nous donnerait l'expertise interne nécessaire pour mener nos 
                            futures acquisitions de manière efficace et sécurisée, tout en développant des 
                            montages innovants avec le JerrCoin.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium mb-2">Expertise Intégrée</h5>
                            <p className="text-sm text-muted-foreground">
                              Équipe dédiée de juristes, analystes financiers et négociateurs pour 
                              optimiser notre stratégie d'expansion.
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium mb-2">Volume Garanti</h5>
                            <p className="text-sm text-muted-foreground">
                              Client principal captif avec ambitions mondiales, assurant un flux 
                              continu d'opérations et d'honoraires.
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h5 className="font-medium mb-2">Finance 3.0</h5>
                            <p className="text-sm text-muted-foreground">
                              Pionnier des OPA hybrides avec paiements mixtes euros/JerrCoin, 
                              à l'intersection crypto et haute finance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pharma-France Phaedra */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-success/10 rounded-lg">
                            <Heart className="h-8 w-8 text-success" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">Pharma-France Phaedra</h3>
                            <p className="text-muted-foreground">Pharmaceutique & Santé • Médicaments innovants</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-success/5">Santé Humanisée</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Santé & Pouvoir d'Achat</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                              <span><strong>Coût allégé :</strong> Traitements "gratuits" à terme via cashback JRC intégral</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                              <span><strong>Acceptation accrue :</strong> Plus de patients acceptent les traitements onéreux</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                              <span><strong>Image sociale :</strong> Laboratoire "allié des patients"</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-success/5 to-primary/5 p-4 rounded-lg">
                          <h5 className="font-semibold mb-2">Impact Humanitaire</h5>
                          <p className="text-sm">
                            "Avec Phaedra et JerrCoin, votre santé vous rapporte aussi !" - 
                            Révolutionner l'accès aux traitements en mariant technologie, 
                            finance et santé pour le bien de tous.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-8">
                    {/* Barnes */}
                    <Card className="border-2 border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg">
                              <Building className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">Barnes</h3>
                              <p className="text-muted-foreground">Immobilier de Prestige & Art de Vivre • Leader International</p>
                            </div>
                          </div>
                          <Badge className="bg-gradient-to-r from-primary to-accent text-white">Luxury Real Estate</Badge>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg border">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Heart className="h-5 w-5 text-primary" />
                              OPA de Prestige
                            </h4>
                            <p className="text-sm leading-relaxed italic">
                              "L'immobilier de prestige a son étendard : Barnes. Depuis un quart de siècle, 
                              cette maison fondée par Heidi Barnes incarne l'excellence résidentielle et l'art de vivre 
                              à la française, avec plus de 120 bureaux à travers 19 pays. Désormais, la Nation Numérique 
                              CydJerr souhaite hisser cet étendard sur sa citadelle digitale, mariant tradition et innovation."
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <Target className="h-5 w-5 text-primary" />
                                  </div>
                                  <h5 className="font-semibold">Profil de l'Entreprise</h5>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <p><strong>Leader :</strong> Immobilier haut de gamme international</p>
                                  <p><strong>Réseau :</strong> 120+ bureaux dans 19 pays</p>
                                  <p><strong>CA 2022 :</strong> 51,5 M€ en forte croissance</p>
                                  <p><strong>Services :</strong> Prestige, yachting, aviation, art</p>
                                  <p><strong>Gouvernance :</strong> SAS française centralisée</p>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-success/10 rounded-lg">
                                    <Handshake className="h-5 w-5 text-success" />
                                  </div>
                                  <h5 className="font-semibold">Option 1 : Intégration Volontaire</h5>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <p><strong>Fusion :</strong> OPA amicale, participation majoritaire CydJerr</p>
                                  <p><strong>JerrCoin :</strong> Paiement crypto + escrow intelligent</p>
                                  <p><strong>Tokenisation :</strong> Vente fractionnée de biens d'exception</p>
                                  <p><strong>Rétention 80/20 :</strong> Trésorerie mixte fiat/crypto</p>
                                  <p><strong>Chapgear :</strong> Visites virtuelles live, publicité premium</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border">
                            <h4 className="font-semibold mb-3 text-primary">Révolution Immobilière</h4>
                            <p className="text-sm leading-relaxed">
                              Barnes se distingue par sa diversification dans l'art de vivre et son réseau intégré, 
                              facilitant l'adoption d'une nouvelle couche de services numériques. Contrôler Barnes 
                              signifie contrôler l'accès aux actifs immobiliers emblématiques recherchés par les 
                              membres de la Nation Numérique (hôtels particuliers, villas, domaines tokenisés).
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="p-4">
                              <h5 className="font-semibold text-success mb-2">Tokenisation Révolutionnaire</h5>
                              <p className="text-sm">Immeuble haussmannien divisé en 1000 tokens - Investissement dès quelques milliers d'euros</p>
                            </Card>
                            <Card className="p-4">
                              <h5 className="font-semibold text-primary mb-2">Smart Contracts</h5>
                              <p className="text-sm">Escrow automatisé, horodatage blockchain, revenus locatifs automatiques</p>
                            </Card>
                            <Card className="p-4">
                              <h5 className="font-semibold text-accent mb-2">Synergies Art de Vivre</h5>
                              <p className="text-sm">Art Advisory NFT, Aviation Privée JerrCoin, Événements tokenisés</p>
                            </Card>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h5 className="font-semibold text-success">Avantages Intégration Volontaire</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                                  <span><strong>Plateforme exclusive :</strong> Leader du crypto-immobilier</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                  <span><strong>Diversification :</strong> Nouveaux revenus tokenisation</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                                  <span><strong>Image modernisée :</strong> Première agence luxe 3.0</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <h5 className="font-semibold text-secondary">Option Coercitive</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                                  <span><strong>Offensive 51% clients :</strong> Détournement via CydHome</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                                  <span><strong>Concurrence 0% :</strong> Offres sans commission</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
                                  <span><strong>Marginalisation :</strong> Prestataire anonyme sous-traitant</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg border">
                            <h5 className="font-medium text-center mb-2">Message Diplomatique</h5>
                            <p className="text-sm italic text-center">
                              "Barnes demeure Barnes, avec son expertise humaine et son art de vivre unique, 
                              mais se voit doté d'une infrastructure numérique inédite – un mariage du meilleur 
                              de deux mondes, amplifier son rayonnement sans le dénaturer."
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* MD LEASE */}
                    <Card className="border-2 border-accent/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-accent to-secondary rounded-lg">
                              <Building className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">MD LEASE (Lyon)</h3>
                              <p className="text-muted-foreground">Concession Automobile de Luxe • Leasing Haut de Gamme</p>
                            </div>
                          </div>
                          <Badge className="bg-gradient-to-r from-accent to-secondary text-white">Mobilité Premium</Badge>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="bg-gradient-to-r from-accent/5 to-secondary/5 p-6 rounded-lg border">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Heart className="h-5 w-5 text-accent" />
                              OPA de Prestige
                            </h4>
                            <p className="text-sm leading-relaxed italic">
                              "Sur les terres de Lyon brille une étoile de l'automobile de prestige : MD LEASE. 
                              Depuis plus de 12 ans, cette maison indépendante de leasing a conquis une clientèle exigeante 
                              en proposant citadines économes et bolides d'exception, livrés clés en main. Aujourd'hui, 
                              la Nation CydJerr s'avance pour couronner MD LEASE comme fournisseur officiel de mobilité 
                              de luxe de son écosystème."
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-accent/10 rounded-lg">
                                    <Target className="h-5 w-5 text-accent" />
                                  </div>
                                  <h5 className="font-semibold">Profil de l'Entreprise</h5>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <p><strong>Fondée :</strong> 2012 (12+ années d'expertise)</p>
                                  <p><strong>Spécialité :</strong> LOA, vente luxe, financement personnalisé</p>
                                  <p><strong>Marques :</strong> Ferrari, Lamborghini, Porsche</p>
                                  <p><strong>Structure :</strong> Privée, indépendante, &lt;10 employés</p>
                                  <p><strong>Avantage :</strong> Solutions multi-marques sur mesure</p>
                                  <p><strong>Positionnement :</strong> Marché de niche, région lyonnaise</p>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-success/10 rounded-lg">
                                    <Handshake className="h-5 w-5 text-success" />
                                  </div>
                                  <h5 className="font-semibold">Option 1 : Travailler AVEC Nous</h5>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <p><strong>Intégration :</strong> Pôle "Auto de luxe" de CydJerr</p>
                                  <p><strong>JerrCoin :</strong> Paiement crypto + conversion 80% fiat</p>
                                  <p><strong>Tech :</strong> Smart contracts de leasing blockchain</p>
                                  <p><strong>Innovation :</strong> Tokenisation de flotte, co-financement</p>
                                  <p><strong>Visibilité :</strong> Accès national via Chapgear</p>
                                  <p><strong>Rétention :</strong> 20% JerrCoin, 80% convertible</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg border">
                            <h4 className="font-semibold mb-3 text-primary">Développement Stratégique</h4>
                            <p className="text-sm leading-relaxed mb-4">
                              L'analyse révèle une entreprise solide mais limitée géographiquement. Sa capitalisation modeste 
                              et son indépendance constituent une opportunité d'intégration harmonieuse. CydJerr voit en MD LEASE 
                              le partenaire idéal pour doter son économie numérique d'un pilier "mobilité de prestige", 
                              permettant à ses citoyens numériques de parcourir le monde réel au volant des plus belles mécaniques.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white/50 p-3 rounded border">
                                <h6 className="font-medium text-xs mb-2 text-success">INTÉGRATION VOLONTAIRE</h6>
                                <p className="text-xs">Conservation marque + équipe, pôle Auto CydJerr, smart contracts automatisés, tokenisation flotte participative</p>
                              </div>
                              <div className="bg-white/50 p-3 rounded border">
                                <h6 className="font-medium text-xs mb-2 text-secondary">INTÉGRATION FORCÉE</h6>
                                <p className="text-xs">Client souverain, offres spectaculaires 1M€ → supercar, pression concurrentielle, dépendance croissante</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="font-semibold text-accent">Plan d'Exécution</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Card className="p-4">
                                <h5 className="font-semibold text-primary mb-2">Due Diligence</h5>
                                <p className="text-xs">Évaluation SAS non cotée, offre gré à gré avec dirigeant, création filiale CydJerr Mobility</p>
                              </Card>
                              <Card className="p-4">
                                <h5 className="font-semibold text-success mb-2">Intégration Tech</h5>
                                <p className="text-xs">Migration smart contracts, tokenisation véhicules, module AutoJerr, formation équipes</p>
                              </Card>
                              <Card className="p-4">
                                <h5 className="font-semibold text-accent mb-2">Communication</h5>
                                <p className="text-xs">Lives Chapgear, campagne "100 véhicules pour 100 pionniers", médiatisation positive</p>
                              </Card>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h5 className="font-semibold text-success">Avantages de l'Intégration</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                                  <span><strong>Clientèle élargie :</strong> Accès à la base nationale CydJerr</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                                  <span><strong>Innovation tech :</strong> Contrats intelligents automatisés</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                  <span><strong>Financement :</strong> Co-investissement communautaire en tokens</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                                  <span><strong>Visibilité :</strong> Campagnes Chapgear géolocalisées</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <h5 className="font-semibold text-secondary">Option 2 : Travailler POUR Nous</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                                  <span><strong>Client souverain :</strong> CydJerr principal apporteur d'affaires</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                                  <span><strong>Pression concurrentielle :</strong> Partenariats alternatifs</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
                                  <span><strong>Dépendance :</strong> Simple exécutant sans autonomie</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                                  <span><strong>Exemple :</strong> "1 Supercar offerte pour 1M€ en JerrCoin"</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-accent/10 to-secondary/10 p-4 rounded-lg border">
                            <h5 className="font-medium text-center mb-2">Message Diplomatique</h5>
                            <p className="text-sm italic text-center">
                              "MD LEASE, en rejoignant l'aventure CydJerr, préserve ce qui fait son ADN – la passion 
                              de l'automobile de luxe et le service sur mesure – tout en gagnant une dimension nouvelle 
                              grâce à la technologie blockchain et à la communauté CydJerr. Travailler avec nous, 
                              c'est choisir la prospérité partagée."
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Jeux Olympiques */}
                  <Card className="border-2 border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-lg">
                            <Globe className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">OPA sur les Jeux Olympiques</h3>
                            <p className="text-muted-foreground">Réforme du Modèle Olympique • Institution Internationale</p>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white">Projet Emblématique</Badge>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border">
                          <h4 className="font-semibold mb-3">Constat Révoltant</h4>
                          <p className="text-sm leading-relaxed">
                            Les JO génèrent des revenus colossaux (4,2 milliards $ pour Tokyo), soit 370 000 $ par athlète présent, 
                            mais les sportifs ne reçoivent quasiment rien du CIO (0,6% des revenus seulement). 
                            Beaucoup d'athlètes de haut niveau vivent dans la précarité malgré l'or autour du cou.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Notre Proposition Révolutionnaire</h4>
                            <div className="space-y-3">
                              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                                <h5 className="font-medium text-success mb-2">Prime de Qualification Universelle</h5>
                                <p className="text-sm">
                                  <strong>150 000€</strong> pour chaque athlète qualifié<br/>
                                  <span className="text-muted-foreground">10 500 athlètes × 150k€ = 1,575 milliard€</span>
                                </p>
                              </div>
                              
                              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                                <h5 className="font-medium text-primary mb-2">Primes Médailles Modulées</h5>
                                <p className="text-sm">
                                  Coefficients selon popularité/audience :<br/>
                                  <span className="text-muted-foreground">100m (×2,5), Judo (×1,5), Tir à l'arc (×1,0)</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Impact Attendu</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                                <span><strong>Fin de la précarité :</strong> Aucun athlète ne rentre les mains vides</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <span><strong>Motivation renforcée :</strong> Plus d'athlètes s'entraînent dur pour se qualifier</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                                <span><strong>Récit modernisé :</strong> JO synonymes de justice et d'innovation</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                                <span><strong>Légitimité mondiale :</strong> Démonstration éclatante de nos principes humanisés</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-secondary/10 to-accent/10 p-4 rounded-lg border">
                          <p className="text-sm italic text-center">
                            "Réussir cette réforme serait une vitrine mondiale de notre savoir-faire et de notre engagement 
                            pour la justice économique - une démonstration que nos principes humanisés peuvent transformer 
                            même les institutions les plus conservatrices."
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-primary">Feuille de route pour y parvenir</h4>
                          <div className="space-y-3">
                            <div>
                              <strong>Rassembler une coalition :</strong> travailler avec des associations d'athlètes (comme World Players), des fédérations progressistes, des sponsors éclairés, et pourquoi pas des États hôtes, pour pousser l'idée auprès du CIO.
                            </div>
                            <div>
                              <strong>Présenter un plan chiffré réaliste :</strong> démontrer que même avec ces primes, le CIO et les organisateurs dégagent leurs budgets, peut-être en rationalisant certains coûts.
                            </div>
                            <div>
                              <strong>Proposer un projet pilote :</strong> convaincre un futur pays hôte de mettre en place un fonds national pour donner une prime fixe à ses athlètes qualifiés, afin de montrer l'exemple.
                            </div>
                            <div>
                              <strong>Mise en avant médiatique :</strong> créer un manifeste public de la part des athlètes et soutiens pour sensibiliser l'opinion publique.
                            </div>
                            <div>
                              <strong>Blockchain & transparence :</strong> proposer de mettre en place une plateforme blockchain de redistribution pourrait lever les craintes de détournement ou de mauvaise gestion. Nous pourrions, via notre savoir-faire, être prestataire technique pour cette plateforme.
                            </div>
                          </div>
                          
                          <div className="bg-secondary/20 p-4 rounded-lg">
                            <p className="text-sm">
                              Notre message : "Il est temps que le modèle olympique évolue vers plus d'équité. Regardez les ligues professionnelles (NBA, football, etc.) – elles partagent leurs revenus avec les joueurs. Les JO ne doivent pas être à la traîne du 21ᵉ siècle. Nous avons une solution concrète pour que chaque athlète, médaillé ou non, soit récompensé à la hauteur de son apport."
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conclusion">
            <Card>
              <CardHeader>
                <CardTitle>Vers une Économie Humanétique Globale</CardTitle>
                <CardDescription>
                  Synthèse de notre stratégie d'absorption humanisée
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p>
                    Au fil de ce dossier, nous avons décliné notre stratégie d'absorption humanisée depuis l'échelle d'une transaction individuelle jusqu'à celle des plus grands événements mondiaux. Le fil rouge est clair : <strong>redéfinir la création et le partage de la valeur dans une économie moderne</strong> grâce aux outils numériques (crypto, blockchain) et à une volonté éthique affirmée.
                  </p>

                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-primary mb-3">Synergies sans Précédent</h4>
                    <p>
                      En intégrant progressivement des entreprises phares de secteurs variés (technologie, sport, finance, santé, luxe, immobilier) selon une approche collaborative et valorisante, notre écosystème JerrCoin créera des synergies inédites où chacun y trouve son compte.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h5 className="font-semibold text-primary mb-2">Les Habitants</h5>
                      <p className="text-sm">Pouvoir d'achat et patrimoine boostés à chaque achat</p>
                    </Card>
                    <Card className="p-4">
                      <h5 className="font-semibold text-primary mb-2">Les Entreprises</h5>
                      <p className="text-sm">Explosion de leur activité et image positive renforcée</p>
                    </Card>
                    <Card className="p-4">
                      <h5 className="font-semibold text-primary mb-2">La Communauté</h5>
                      <p className="text-sm">Monnaie commune qui prend de la valeur avec la prospérité partagée</p>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-primary">Révolution en Marche</h4>
                    <p>
                      La révolution des crypto-récompenses est en marche, transformant déjà les programmes de fidélité classiques en systèmes plus engageants, plus flexibles, plus profitables pour tous. Des entreprises avant-gardistes comme Rakuten l'ont compris en lançant leurs propres initiatives blockchain.
                    </p>
                    <div className="bg-accent/20 p-4 rounded-lg border-l-4 border-primary">
                      <p className="font-medium">
                        Nous poussons cette logique à son aboutissement : faire de l'ensemble de l'économie un gigantesque programme de fidélité mutuelle, où chaque acte d'achat ou de soutien est récompensé et reinvesti dans le cercle vertueux.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-primary">Du Micro au Macro</h4>
                    <p>
                      Notre philosophie humanétique prend tout son sens lorsqu'on voit qu'elle peut s'appliquer du micro au macro. Offrir 100 JRC pour 1€ dépensé n'est que le début : demain, c'est aussi offrir 1€ sur 3 des JO aux athlètes qui les font vivre. C'est démontrer que <strong>la performance économique peut et doit aller de pair avec la justice sociale</strong>.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-primary">Défis et Solutions</h4>
                    <p>
                      Les défis ne manquent pas : volatilité des crypto-monnaies, encadrement réglementaire, confiance à bâtir. Mais nous abordons ces défis avec sérieux, accompagnés d'experts (comme Opportunities.biz pour la finance) pour garantir que nos promesses de valeur restent solides.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-primary mb-3">Invitation au Mouvement</h4>
                    <p className="mb-4">
                      Nous invitons toutes les parties prenantes – citoyens, entrepreneurs, sportifs, décideurs – à rejoindre ce mouvement. <strong>L'absorption humanisée n'est pas une conquête, c'est une fédération volontaire</strong> autour d'un idéal commun : celui d'une économie où la valeur de chacun est reconnue à sa juste mesure.
                    </p>
                    <blockquote className="border-l-4 border-primary pl-4 italic">
                      "Ensemble, faisons mentir l'idée reçue que l'économie est un jeu à somme nulle où l'avidité règne. Nous croyons au partage des gains, à la coopération éclairée par la technologie, bref à un néo-humanisme économique."
                    </blockquote>
                  </div>

                  <div className="text-center bg-secondary/10 p-6 rounded-lg">
                    <p className="text-lg font-medium text-primary">
                      Le rendez-vous est pris pour écrire, ensemble, la prochaine page de l'histoire entrepreneuriale et sportive, plus humaine, plus équitable, et résolument prospère pour tous.
                    </p>
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