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
  Zap
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

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="active">OPA Actives</TabsTrigger>
            <TabsTrigger value="create">Créer OPA</TabsTrigger>
            <TabsTrigger value="governance">Gouvernance</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="framework">Cadre Légal</TabsTrigger>
          </TabsList>

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