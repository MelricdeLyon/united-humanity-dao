import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Database, Lock, Zap, ExternalLink, Download } from "lucide-react";

const TechnicalOverview = () => {
  return (
    <section id="technical" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Architecture Technique</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Infrastructure blockchain sécurisée et transparente pour une gouvernance mondiale
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Smart Contracts */}
          <Card className="shadow-card">
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                  <Code className="h-6 w-6" />
                </div>
              </div>
              <CardTitle className="text-lg">Smart Contracts</CardTitle>
              <CardDescription>Rust / Anchor Framework</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gouvernance</span>
                <Badge variant="outline" className="text-success">Déployé</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>NFT Citoyenneté</span>
                <Badge variant="outline" className="text-success">Déployé</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Trésor Multi-sig</span>
                <Badge variant="outline" className="text-warning">Test</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain */}
          <Card className="shadow-card">
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-accent text-accent-foreground">
                  <Database className="h-6 w-6" />
                </div>
              </div>
              <CardTitle className="text-lg">Solana Blockchain</CardTitle>
              <CardDescription>Réseau haute performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>TPS Réseau</span>
                <span className="font-medium">65,000+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Frais Transaction</span>
                <span className="font-medium">~$0.00025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Finalité</span>
                <span className="font-medium">400ms</span>
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card className="shadow-card">
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-success text-success-foreground">
                  <Lock className="h-6 w-6" />
                </div>
              </div>
              <CardTitle className="text-lg">Sécurité</CardTitle>
              <CardDescription>Audits & Protection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Audit Sécurité</span>
                <Badge variant="outline" className="text-warning">Planifié</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bug Bounty</span>
                <Badge variant="outline" className="text-success">Actif</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Multi-sig 3/5</span>
                <Badge variant="outline" className="text-success">Configuré</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card className="shadow-card">
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-secondary text-secondary-foreground">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <CardTitle className="text-lg">Performance</CardTitle>
              <CardDescription>Métriques temps réel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uptime</span>
                <span className="font-medium text-success">99.9%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Latence API</span>
                <span className="font-medium">45ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Utilisateurs</span>
                <span className="font-medium">2,847</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentation & Ressources */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Documentation Développeurs */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Documentation Développeurs
              </CardTitle>
              <CardDescription>
                Ressources complètes pour intégrer et contribuer au projet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="font-medium">API REST Documentation</div>
                    <div className="text-sm text-muted-foreground">Endpoints gouvernance et votes</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
                
                <a href="#" className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="font-medium">Smart Contracts Source</div>
                    <div className="text-sm text-muted-foreground">Code Rust/Anchor sur GitHub</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
                
                <a href="#" className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="font-medium">SDK TypeScript</div>
                    <div className="text-sm text-muted-foreground">Bibliothèque client officielle</div>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </a>
              </div>
              
              <div className="pt-4">
                <Button className="w-full gradient-primary">
                  <Code className="mr-2 h-4 w-4" />
                  Accéder à la Documentation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Spécifications Techniques */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-accent" />
                Spécifications Techniques
              </CardTitle>
              <CardDescription>
                Détails de l'architecture et protocoles utilisés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">NFT Soulbound Citoyenneté</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Standard SPL Token avec extensions non-transférables</li>
                    <li>• Vérification identité via zk-SNARK</li>
                    <li>• Métadonnées stockées sur Arweave</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Système de Vote</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Quorum minimum 50% des citoyens actifs</li>
                    <li>• Majorité simple pour adoption</li>
                    <li>• Période de vote fixée à 7 jours</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Trésor Multi-signature</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Configuration 3/5 pour l'exécution</li>
                    <li>• Timelock de 48h pour grandes dépenses</li>
                    <li>• Audit trail complet on-chain</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechnicalOverview;