import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useGoldCalculator } from "@/hooks/use-gold-calculator";
import { Link } from "react-router-dom";
import coinFace1 from "@/assets/coin-face-1.png";
import coinFace2 from "@/assets/coin-face-2.png";
import { 
  Coins, 
  TrendingUp, 
  Target, 
  Users, 
  ArrowUpRight, 
  Shield,
  Zap,
  DollarSign,
  Vote,
  Crown,
  Award,
  Calculator,
  Truck,
  Heart,
  Gem,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ArrowLeft
} from "lucide-react";

const OperationPiecesOr = () => {
  const { goldPrice, calculation, isLoading, refreshPrice } = useGoldCalculator();
  
  // Mock data pour les ventes - à remplacer par des données réelles
  const soldCoins = 12;
  const totalCoins = 72;
  const salesProgress = (soldCoins / totalCoins) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          {/* Back Button */}
          <div className="mb-4">
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-hero bg-clip-text text-transparent">
                Opération Pièces d'Or
              </h1>
              <p className="text-muted-foreground">
                Pièces commémoratives en édition ultra-limitée - 72 exemplaires numérotés
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <Award className="inline h-4 w-4 mr-1" />
              <strong>Édition Limitée:</strong> Chaque pièce est unique, numérotée et signée. 
              Une fois les 72 exemplaires vendus, aucune nouvelle pièce ne sera jamais créée.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Édition Limitée</p>
                  <p className="text-2xl font-bold">72 pièces</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">Maximum absolu</p>
                </div>
                <Crown className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prix Dynamique</p>
                  <p className="text-2xl font-bold">€{calculation.finalPrice.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                    <p className="text-xs text-muted-foreground">Or: €{goldPrice.pricePerGram}/g</p>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pièces Vendues</p>
                  <p className="text-2xl font-bold">{soldCoins}/72</p>
                  <Progress value={salesProgress} className="h-1 mt-1" />
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valeur Or Pur</p>
                  <p className="text-2xl font-bold">{calculation.mass}g</p>
                  <p className="text-xs text-muted-foreground">€{calculation.goldValue.toLocaleString()}</p>
                </div>
                <Gem className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coin Showcase Section */}
        <div className="mb-8">
          <Card className="overflow-hidden bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/50 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/50">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                  <Coins className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                  Pièces Commémoratives
                </CardTitle>
              </div>
              <CardDescription className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez les deux faces de nos pièces d'or commémoratives en édition ultra-limitée. 
                Chaque pièce raconte l'histoire de notre communauté et porte les symboles de notre vision.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Face 1 */}
                <div className="group">
                  <div className="relative aspect-square max-w-sm mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/50 dark:to-yellow-900/50 rounded-full p-4 border-4 border-amber-300/50 dark:border-amber-600/50 shadow-2xl group-hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-105">
                      <img 
                        src={coinFace1} 
                        alt="Face principale de la pièce JERRCOIN - Motif floral central avec inscriptions HUMANOCRATIE et HUMANETIQUE" 
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="font-semibold text-lg text-amber-800 dark:text-amber-200 mb-2">
                      Face HUMANOCRATIE
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Motif floral central symbolisant l'unité et la croissance communautaire
                    </p>
                  </div>
                </div>

                {/* Face 2 */}
                <div className="group">
                  <div className="relative aspect-square max-w-sm mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/50 dark:to-yellow-900/50 rounded-full p-4 border-4 border-amber-300/50 dark:border-amber-600/50 shadow-2xl group-hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-105">
                      <img 
                        src={coinFace2} 
                        alt="Face secondaire de la pièce JERRCOIN - Logo R 2024 avec citation inspirante et CYOJERR" 
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="font-semibold text-lg text-amber-800 dark:text-amber-200 mb-2">
                      Face R 2024
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Logo emblématique avec citation motivante "Il ne savait pas que c'était impossible alors ils l'ont fait"
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8 p-6 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-300/30 dark:border-amber-600/30">
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-4">
                  <Crown className="inline h-4 w-4 mr-2" />
                  <strong>Pièces authentiques</strong> - Chaque exemplaire est unique, numéroté de 1 à 72
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white border-0 shadow-lg shadow-amber-500/25"
                >
                  <Gem className="mr-2 h-4 w-4" />
                  Réserver ma pièce
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="presentation" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="presentation">Présentation</TabsTrigger>
            <TabsTrigger value="caracteristiques">Caractéristiques</TabsTrigger>
            <TabsTrigger value="calcul">Calcul du Prix</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="valeur">Valeur & Symbolique</TabsTrigger>
          </TabsList>

          <TabsContent value="presentation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Contexte du Projet
                  </CardTitle>
                  <CardDescription>
                    Une économie communautaire révolutionnaire
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    Notre projet vise à bâtir une nouvelle économie basée sur une cryptomonnaie propre 
                    et les infrastructures associées (services, réseau, etc.).
                  </p>
                  <p className="text-sm leading-relaxed">
                    <strong>Objectif de financement:</strong> Les fonds levés par la prévente des pièces 
                    commémoratives seront intégralement réinvestis dans le développement des infrastructures 
                    actuelles et futures du projet.
                  </p>
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Stratégie unique:</strong> Cette approche associe concret et symbolique. 
                      La pièce commémorative sert à la fois de support financier et de symbole fort 
                      de l'engagement de la communauté.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Édition Ultra-Limitée
                  </CardTitle>
                  <CardDescription>
                    72 exemplaires seulement - Jamais plus
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-amber-500 mb-2">72</div>
                    <p className="text-sm text-muted-foreground">Exemplaires maximum</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Pièces vendues</span>
                      <span className="text-sm font-medium">{soldCoins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Disponibles</span>
                      <span className="text-sm font-medium text-amber-600">{totalCoins - soldCoins}</span>
                    </div>
                    <Progress value={salesProgress} className="h-2" />
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    Chaque acquéreur devient membre fondateur d'une communauté exclusive 
                    de 72 personnes maximum.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Rôle de Membre Fondateur</CardTitle>
                <CardDescription>
                  En acquérant une pièce, vous ne financez pas seulement le projet - vous en devenez co-créateur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg">
                    <Shield className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                    <h4 className="font-semibold">Légitimité</h4>
                    <p className="text-sm text-muted-foreground">Votre engagement personnel légitime le projet</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg">
                    <Users className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                    <h4 className="font-semibold">Ambassadeur</h4>
                    <p className="text-sm text-muted-foreground">Vous encouragez d'autres investisseurs à rejoindre</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg">
                    <Crown className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                    <h4 className="font-semibold">Privilèges</h4>
                    <p className="text-sm text-muted-foreground">Accès privilégié aux futurs services</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="caracteristiques" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gem className="h-5 w-5" />
                    Spécifications Techniques
                  </CardTitle>
                  <CardDescription>
                    Pièce en or pur avec finitions haut de gamme
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Dimensions</p>
                      <p className="text-xs text-muted-foreground">6,5 × 5,5 × 1,5 cm</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Volume</p>
                      <p className="text-xs text-muted-foreground">{calculation.volume} cm³</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Masse en or</p>
                      <p className="text-xs text-muted-foreground">{calculation.mass} grammes</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pureté</p>
                      <p className="text-xs text-muted-foreground">Or fin 24 carats</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Design & Gravures</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Face avant</span>
                        <span className="text-sm text-muted-foreground">Logo & symboles du projet</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Face arrière</span>
                        <span className="text-sm text-muted-foreground">Signature personnalisée</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Numérotation</span>
                        <span className="text-sm text-muted-foreground">1/72 à 72/72</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Socle de Présentation
                  </CardTitle>
                  <CardDescription>
                    Écrin digne de cette pièce d'exception
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bois précieux</span>
                      <Badge variant="secondary">Chêne massif</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Éléments métalliques</span>
                      <Badge variant="secondary">Bronze doré</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Protection</span>
                      <Badge variant="secondary">Verre saphir</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Gravures décoratives</span>
                      <Badge variant="secondary">Motifs symboliques</Badge>
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="font-semibold mb-1">Éléments artistiques</h4>
                    <p className="text-sm text-muted-foreground">
                      Animaux et végétaux gravés, représentant la symbiose entre 
                      nature et innovation technologique du projet.
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                      Coût du socle: €{calculation.standCost}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Authenticité & Certification</CardTitle>
                <CardDescription>
                  Garanties de qualité et d'authenticité pour chaque pièce
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-semibold text-sm">Certificat numérique</p>
                      <p className="text-xs text-muted-foreground">Blockchain immutable</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-semibold text-sm">Test de pureté</p>
                      <p className="text-xs text-muted-foreground">Or 24 carats certifié</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-semibold text-sm">Numéro unique</p>
                      <p className="text-xs text-muted-foreground">Non reproductible</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calcul" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calcul Transparent du Prix
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={refreshPrice}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                    Actualiser
                  </Button>
                </CardTitle>
                <CardDescription>
                  Prix calculé en temps réel selon le cours de l'or au gramme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Cours de l'Or</h4>
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                        <div className="flex justify-between items-center mb-2">
                          <span>Prix par gramme</span>
                          <span className="font-bold text-amber-600">€{goldPrice.pricePerGram}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Mis à jour: {goldPrice.lastUpdated.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Masse de la Pièce</h4>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span>Volume calculé</span>
                          <span className="font-bold">{calculation.volume} cm³</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Masse en or (19,32 g/cm³)</span>
                          <span className="font-bold">{calculation.mass}g</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-4">Décomposition du Prix Final</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded">
                        <span>Valeur de l'or ({calculation.mass}g × €{goldPrice.pricePerGram})</span>
                        <span className="font-bold">€{calculation.goldValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span>Main d'œuvre (forge, finitions, gravures)</span>
                        <span className="font-bold">€{calculation.laborCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span>Socle de présentation (bois, métal, verre)</span>
                        <span className="font-bold">€{calculation.standCost}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between items-center p-3 bg-secondary rounded">
                          <span className="font-medium">Sous-total</span>
                          <span className="font-bold">€{calculation.subtotal.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span>Marge logistique (15% - expédition, assurance, emballage)</span>
                        <span className="font-bold">€{calculation.logisticsMargin.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-lg border-2 border-amber-300 dark:border-amber-700">
                          <span className="font-bold text-lg">Prix Final</span>
                          <span className="font-bold text-2xl text-amber-600">€{calculation.finalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200">Prix Dynamique</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Le prix final varie en fonction du cours de l'or au moment de l'achat. 
                          Le calcul est automatiquement mis à jour toutes les 5 minutes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Comparaison Valeur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Valeur or seul</span>
                      <span className="text-sm font-medium">€{calculation.goldValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Plus-value artisanale</span>
                      <span className="text-sm font-medium text-amber-600">
                        +€{(calculation.finalPrice - calculation.goldValue).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Ratio valeur/or</span>
                      <span className="text-sm font-medium">
                        ×{(calculation.finalPrice / calculation.goldValue).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculer Prix Actuel
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Crown className="mr-2 h-4 w-4" />
                    Pré-commander ma Pièce
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Processus de Distribution
                </CardTitle>
                <CardDescription>
                  Fabrication conditionnelle et remise personnalisée
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200">Fabrication Conditionnelle</h4>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          Les pièces ne seront frappées qu'après la vente des 72 exemplaires. 
                          Cette condition garantit que le projet dispose des ressources pour ses infrastructures.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary-foreground font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-sm">Commande</h4>
                      <p className="text-xs text-muted-foreground">Pré-commande avec paiement</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary-foreground font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-sm">Validation</h4>
                      <p className="text-xs text-muted-foreground">Vente des 72 pièces</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary-foreground font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-sm">Fabrication</h4>
                      <p className="text-xs text-muted-foreground">8-12 semaines</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary-foreground font-bold">4</span>
                      </div>
                      <h4 className="font-semibold text-sm">Remise</h4>
                      <p className="text-xs text-muted-foreground">Cérémonie personnalisée</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Timeline de Production
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <div>
                        <p className="font-semibold text-sm">Semaines 1-2</p>
                        <p className="text-xs text-muted-foreground">Acquisition de l'or et préparation</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <div>
                        <p className="font-semibold text-sm">Semaines 3-6</p>
                        <p className="text-xs text-muted-foreground">Fonte et façonnage des pièces</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <div>
                        <p className="font-semibold text-sm">Semaines 7-10</p>
                        <p className="text-xs text-muted-foreground">Gravures personnalisées et finitions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <div>
                        <p className="font-semibold text-sm">Semaines 11-12</p>
                        <p className="text-xs text-muted-foreground">Fabrication socles et assemblage final</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Garanties & Assurances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <div>
                        <p className="font-semibold text-sm">Transport assuré</p>
                        <p className="text-xs text-muted-foreground">Valeur totale couverte</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <div>
                        <p className="font-semibold text-sm">Emballage sécurisé</p>
                        <p className="text-xs text-muted-foreground">Coffret de transport blindé</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <div>
                        <p className="font-semibold text-sm">Remise en main propre</p>
                        <p className="text-xs text-muted-foreground">Ou coffre-fort sécurisé</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <div>
                        <p className="font-semibold text-sm">Garantie à vie</p>
                        <p className="text-xs text-muted-foreground">Authenticité et pureté</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Remise Cérémonielle</CardTitle>
                <CardDescription>
                  Un moment privilégié pour chaque membre fondateur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                    <strong>Fierté de participation:</strong> Recevoir la pièce devient un moment fort. 
                    L'investisseur tient entre ses mains un objet valorisant qui matérialise son rôle dans le projet.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-amber-900 dark:text-amber-100">Options de remise:</h4>
                      <ul className="list-disc list-inside text-amber-800 dark:text-amber-200 space-y-1">
                        <li>Cérémonie collective des fondateurs</li>
                        <li>Remise individuelle personnalisée</li>
                        <li>Livraison sécurisée en coffre-fort</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 dark:text-amber-100">Éléments inclus:</h4>
                      <ul className="list-disc list-inside text-amber-800 dark:text-amber-200 space-y-1">
                        <li>Certificat d'authenticité physique</li>
                        <li>Documentation du processus</li>
                        <li>Accès aux privilèges fondateurs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="valeur" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gem className="h-5 w-5" />
                    Rareté Programmée
                  </CardTitle>
                  <CardDescription>
                    La force économique de la limitation absolue
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="text-4xl font-bold text-amber-600 mb-2">72</div>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Exemplaires maximum</strong><br/>
                      Aucune pièce supplémentaire ne sera jamais créée
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed">
                      <strong>Principe de rareté:</strong> "Cette rareté programmée crée une valeur intrinsèque. 
                      Le simple fait que seulement 72 pièces existent augmente mécaniquement leur attrait."
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Effet Bitcoin:</strong> Comme avec Bitcoin (offre limitée à 21 millions), 
                        la notion d'offre restreinte suscite confiance et spéculation positive.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Valeur Émotionnelle
                  </CardTitle>
                  <CardDescription>
                    Plus qu'un investissement - une histoire personnelle
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    <strong>Ancrage historique:</strong> "Les pièces commémoratives sont souvent plus qu'un simple investissement ; 
                    elles racontent une histoire et capturent un moment dans le temps."
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                      <Crown className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Signature personnalisée gravée</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Statut de membre fondateur</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                      <Users className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Communauté exclusive de 72 personnes</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                      <Shield className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Héritage familial potential</span>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Attachement personnel:</strong> Chaque investisseur est personnellement investi 
                      dans la réussite du projet - un lien émotionnel fort qui crée un engagement durable.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Impact sur l'Écosystème du Projet</CardTitle>
                <CardDescription>
                  Comment les 72 pièces lancent et soutiennent toute l'économie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Target className="h-8 w-8 text-blue-500 mb-2" />
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">Validation Économique</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Le succès de la prévente atteste d'une demande réelle et conforte la confiance des marchés.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <Users className="h-8 w-8 text-green-500 mb-2" />
                    <h4 className="font-semibold text-green-900 dark:text-green-100">Ambassadeurs Naturels</h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Chacun des 72 acquéreurs devient un point de relais pour la cryptomonnaie.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-b from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <Zap className="h-8 w-8 text-purple-500 mb-2" />
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100">Effet de Levier</h4>
                    <p className="text-sm text-purple-800 dark:text-purple-200">
                      Les fonds injectent une impulsion décisive pour bâtir les infrastructures.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/20 dark:via-yellow-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Cercle Vertueux</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    En combinant valeur intrinsèque (rareté) et valeur émotionnelle (historique), cette pièce 
                    crée un cercle vertueux : plus elle est convoitée, plus la confiance dans le projet grandit, 
                    renforçant ainsi la valeur perçue de notre cryptomonnaie associée.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privilèges des Membres Fondateurs</CardTitle>
                <CardDescription>
                  Avantages exclusifs pour les détenteurs des 72 pièces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Privilèges Actuels</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">Statut de fondateur officiel</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">Accès prioritaire aux services</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">Communication directe équipe</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Privilèges Futurs</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">Droits de vote privilégiés</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">Bonus crypto potentiels</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">Accès anticipé nouveautés</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Potentiel de Valorisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed">
                      Facteurs de valorisation naturelle de votre pièce :
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <ArrowUpRight className="h-3 w-3 text-success mt-1" />
                        <span>Hausse potentielle du cours de l'or</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowUpRight className="h-3 w-3 text-success mt-1" />
                        <span>Succès du projet et notoriété</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowUpRight className="h-3 w-3 text-success mt-1" />
                        <span>Rareté absolue (72 max)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowUpRight className="h-3 w-3 text-success mt-1" />
                        <span>Valeur historique croissante</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions Disponibles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Crown className="mr-2 h-4 w-4" />
                    Rejoindre les 72 Fondateurs
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Simuler l'Investissement
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Award className="mr-2 h-4 w-4" />
                    Voir Certificat d'Authenticité
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OperationPiecesOr;