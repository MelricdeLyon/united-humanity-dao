import Header from "@/components/Header";
import SubNavigation from "@/components/SubNavigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Server } from "lucide-react";

const Technology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">Notre Technologie</h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Découvrez les technologies innovantes qui alimentent l'écosystème Humanité Unie
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* DAGJERR Card */}
          <Card className="h-fit">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Network className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">DAGJERR</CardTitle>
              <CardDescription className="text-base">
                Découvrez la technologie innovante derrière notre graphe à cyclique dirigé hybride
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Vue d'ensemble */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">🎯 Vision & Objectifs</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    DAGJERR est un registre distribué révolutionnaire qui hybride les meilleures technologies :
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• <strong>IOTA</strong> : Transactions gratuites et légèreté</li>
                    <li>• <strong>Avalanche</strong> : Consensus rapide et probabiliste</li>
                    <li>• <strong>Fantom</strong> : DAG asynchrone haute performance</li>
                  </ul>
                </div>

                {/* Architecture technique */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">🏗️ Architecture Hybride</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium">Sans frais & Anti-spam</h5>
                      <p className="text-xs text-muted-foreground">Micro-PoW par transaction, pas de coordinateur</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium">Consensus Avalanche</h5>
                      <p className="text-xs text-muted-foreground">Finalité quasi-immédiate, aBFT probabiliste</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium">Runtime Fantom</h5>
                      <p className="text-xs text-muted-foreground">Smart contracts WASM, traitement asynchrone</p>
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">⚡ Performance</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center p-2 bg-primary/5 rounded">
                      <div className="font-bold text-primary">1000+ TPS</div>
                      <div className="text-xs text-muted-foreground">Débit</div>
                    </div>
                    <div className="text-center p-2 bg-primary/5 rounded">
                      <div className="font-bold text-primary">&lt; 2 sec</div>
                      <div className="text-xs text-muted-foreground">Finalité</div>
                    </div>
                  </div>
                </div>

                {/* Gouvernance */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">🗳️ Gouvernance Native</h4>
                  <p className="text-sm text-muted-foreground">
                    Votes on-chain gratuits, traçables et auditables. Participation maximisée grâce aux transactions sans frais.
                  </p>
                </div>

                {/* Migration Solana */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">🔄 Migration Solana</h4>
                  <p className="text-sm text-muted-foreground">
                    Bridge unidirectionnel temporaire pour migrer utilisateurs, actifs et dApps avec continuité totale.
                  </p>
                </div>

                {/* DAGTV Section */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-2 text-primary">📺 DAGTV - Terminal IoT</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Terminal révolutionnaire qui fait office de nœud DAGJERR et relais IoT
                    </p>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">Écran OLED</span>
                        <span className="text-sm text-primary">100 cm diagonale</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">Stockage</span>
                        <span className="text-sm text-primary">20 To</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">Connectivité</span>
                        <span className="text-sm text-primary">WiFi 6, Bluetooth, 5G</span>
                      </div>
                    </div>

                    <div className="p-3 bg-primary/5 rounded-lg">
                      <h5 className="font-medium text-primary">Fonctionnalités Nœud</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Partage d'espace de stockage</li>
                        <li>• Allocation de puissance de calcul GPU</li>
                        <li>• Interconnexion Cloud native</li>
                        <li>• Support carte SIM intégrée</li>
                      </ul>
                    </div>

                    <div className="text-center p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                      <div className="text-lg font-bold text-primary">Prévente</div>
                      <div className="text-2xl font-bold">2900 € en JRC</div>
                      <Button className="mt-2 w-full">
                        Réserver maintenant
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* JERROS Card */}
          <Card className="h-fit">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Server className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">JERROS</CardTitle>
              <CardDescription className="text-base">
                Découvrez notre OS décentralisé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Contenu détaillé à venir sur JERROS...
                </p>
                <Button className="w-full" variant="outline">
                  En savoir plus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Technology;