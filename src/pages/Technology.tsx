import Header from "@/components/Header";
import SubNavigation from "@/components/SubNavigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Network, Server, ChevronDown, ChevronUp, SmartphoneIcon, Watch } from "lucide-react";
import { useState } from "react";
import dagtelFront from "@/assets/dagtel-front.jpg";
import dagtelBack from "@/assets/dagtel-back.jpg";
import dagtelProfile from "@/assets/dagtel-profile.jpg";
import dagtvFront from "@/assets/dagtv-front.jpg";
import dagtvBack from "@/assets/dagtv-back.jpg";
import dagtvProfile from "@/assets/dagtv-profile.jpg";
import dagwatchFront from "@/assets/dagwatch-front.jpg";
import dagwatchBack from "@/assets/dagwatch-back.jpg";
import dagwatchProfile from "@/assets/dagwatch-profile.jpg";

const Technology = () => {
  const [showDagjerrDetails, setShowDagjerrDetails] = useState(false);
  const [showJerrosDetails, setShowJerrosDetails] = useState(false);
  const [showDagwatchDetails, setShowDagwatchDetails] = useState(false);
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

        <div className="grid md:grid-cols-3 gap-8 max-w-8xl mx-auto">
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
                  <h4 className="font-semibold text-lg mb-2">Vision & Objectifs</h4>
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
                  <h4 className="font-semibold text-lg mb-2">Architecture Hybride</h4>
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
                  <h4 className="font-semibold text-lg mb-2">Performance</h4>
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
                  <h4 className="font-semibold text-lg mb-2">Gouvernance Native</h4>
                  <p className="text-sm text-muted-foreground">
                    Votes on-chain gratuits, traçables et auditables. Participation maximisée grâce aux transactions sans frais.
                  </p>
                </div>

                {/* Migration Solana */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Migration Solana</h4>
                  <p className="text-sm text-muted-foreground">
                    Bridge unidirectionnel temporaire pour migrer utilisateurs, actifs et dApps avec continuité totale.
                  </p>
                </div>

                {/* DAGTV Section */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-2 text-primary">DAGTV - Terminal IoT</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Terminal révolutionnaire qui fait office de nœud DAGJERR et relais IoT
                    </p>
                    
                    {/* Images de la DAGTV */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                            <img src={dagtvFront} alt="DAGTV Vue de face" className="w-full h-full object-cover" />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                          <img src={dagtvFront} alt="DAGTV Vue de face" className="w-full h-full object-contain rounded-lg" />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                            <img src={dagtvBack} alt="DAGTV Vue de dos" className="w-full h-full object-cover" />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                          <img src={dagtvBack} alt="DAGTV Vue de dos" className="w-full h-full object-contain rounded-lg" />
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                            <img src={dagtvProfile} alt="DAGTV Profil" className="w-full h-full object-cover" />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                          <img src={dagtvProfile} alt="DAGTV Profil" className="w-full h-full object-contain rounded-lg" />
                        </DialogContent>
                      </Dialog>
                    </div>
                    
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
                        <span className="text-sm font-medium">GPU</span>
                        <span className="text-sm text-primary">RTX 4090 Ti / RX 7900 XTX</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">CPU</span>
                        <span className="text-sm text-primary">Intel i9-14900K / AMD 7950X3D</span>
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
                      <div className="text-2xl font-bold">2990 € en JRC</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Effectuez un change de 2990 € en JRC pour réserver votre DAGTV
                      </p>
                      <Button className="mt-2 w-full">
                        Réserver maintenant
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bouton dynamique pour plus de détails techniques */}
                <div className="text-center">
                  <Button 
                    onClick={() => setShowDagjerrDetails(!showDagjerrDetails)}
                    variant="outline" 
                    className="w-full"
                  >
                    {showDagjerrDetails ? (
                      <>
                        Masquer les détails techniques
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Voir les détails techniques
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Contenu technique détaillé */}
                {showDagjerrDetails && (
                  <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-semibold text-primary">Spécifications Techniques</h5>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">Stack Technologique</h6>
                        <p className="text-xs text-muted-foreground">Core Rust • P2P QUIC/UDP • Crypto Ed25519 • WASM Runtime</p>
                      </div>
                      
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">Architecture Nœuds</h6>
                        <p className="text-xs text-muted-foreground">Validateurs (8+ cœurs, 16+ Go) • Nœuds complets (4-8 Go) • Clients légers (IoT)</p>
                      </div>
                      
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">Sécurité aBFT</h6>
                        <p className="text-xs text-muted-foreground">Consensus probabiliste • Anti-Sybil • Multisig • Enclaves matérielles</p>
                      </div>
                      
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">Intégration JERROS</h6>
                        <p className="text-xs text-muted-foreground">Service TangoDAG • IPC/API natives • VM distribuée • SDK ArkTS</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* DAGWATCH Card */}
          <Card className="h-fit">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Watch className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">DAGWATCH PRO</CardTitle>
              <CardDescription className="text-base">
                La montre connectée haut de gamme qui respecte vos données
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Vue d'ensemble */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Vision & Innovation</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    DAGWATCH PRO réunit le meilleur de la technologie wearable :
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• <strong>Matériaux premium</strong> : Titane Grade 5, verre saphir, céramique médicale</li>
                    <li>• <strong>Santé avancée</strong> : Glycémie, ECG, SpO₂, pression artérielle</li>
                    <li>• <strong>Autonomie</strong> : Plusieurs jours avec batterie segmentée</li>
                    <li>• <strong>OS décentralisé</strong> : Jerros OS avec chiffrement local</li>
                  </ul>
                </div>

                {/* Images de la DAGWATCH */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg text-primary">Design Premium</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <img src={dagwatchFront} alt="DAGWATCH Vue de face" className="w-full h-full object-cover" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                        <img src={dagwatchFront} alt="DAGWATCH Vue de face" className="w-full h-full object-contain rounded-lg" />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <img src={dagwatchBack} alt="DAGWATCH Vue de dos" className="w-full h-full object-cover" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                        <img src={dagwatchBack} alt="DAGWATCH Vue de dos" className="w-full h-full object-contain rounded-lg" />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <img src={dagwatchProfile} alt="DAGWATCH Profil" className="w-full h-full object-cover" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                        <img src={dagwatchProfile} alt="DAGWATCH Profil" className="w-full h-full object-contain rounded-lg" />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Spécifications principales */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Spécifications</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium">Écran</span>
                      <span className="text-sm text-primary">AMOLED LTPO 2.1" 1-120Hz</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium">Matériaux</span>
                      <span className="text-sm text-primary">Titane G5 + Verre saphir</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium">Batterie</span>
                      <span className="text-sm text-primary">1200-1500 mAh segmentée</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium">Étanchéité</span>
                      <span className="text-sm text-primary">IP68 / 10 ATM</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium">Connectivité</span>
                      <span className="text-sm text-primary">eSIM 5G, WiFi 6E, BT 5.3</span>
                    </div>
                  </div>
                </div>

                {/* Capteurs santé */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Capteurs Santé</h4>
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• <strong>Glycémie</strong> : Compatible capteurs CGM + SMBG</li>
                      <li>• <strong>Cardiaque</strong> : ECG 1 dérivation, PPG multibande</li>
                      <li>• <strong>Respiratoire</strong> : SpO₂, fréquence respiratoire</li>
                      <li>• <strong>Pression artérielle</strong> : Modèle calibré</li>
                      <li>• <strong>Température</strong> : Cutanée + interne</li>
                      <li>• <strong>Activité</strong> : IMU 6-axes, détection chute</li>
                    </ul>
                  </div>
                </div>

                {/* Jerros OS */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Jerros OS Intégré</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium">Sécurité & Confidentialité</h5>
                      <p className="text-xs text-muted-foreground">Chiffrement local, données de santé protégées</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium">Décentralisation</h5>
                      <p className="text-xs text-muted-foreground">Synchronisation P2P, dApps santé compatibles</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium">Support Long Terme</h5>
                      <p className="text-xs text-muted-foreground">8 ans de mises à jour garanties</p>
                    </div>
                  </div>
                </div>

                {/* Prix */}
                <div className="text-center p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                  <div className="text-lg font-bold text-primary">Précommande DAGWATCH PRO</div>
                  <div className="text-2xl font-bold">699 JRC</div>
                  <div className="text-sm text-muted-foreground">≈ 699 € TTC</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Réservez votre montre connectée premium
                  </p>
                  <Button className="mt-2 w-full">
                    Précommander maintenant
                  </Button>
                </div>

                {/* Bouton détails techniques */}
                <div className="text-center">
                  <Button 
                    onClick={() => setShowDagwatchDetails(!showDagwatchDetails)}
                    variant="outline" 
                    className="w-full"
                  >
                    {showDagwatchDetails ? (
                      <>
                        Masquer les détails techniques
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Voir les détails techniques
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Détails techniques */}
                {showDagwatchDetails && (
                  <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-semibold text-primary">Spécifications Techniques Complètes</h5>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">Processeur</h6>
                        <p className="text-xs text-muted-foreground">SoC wearable ≤ 5nm + co-processeur ultra-basse consommation • 2 Go RAM • 32 Go stockage</p>
                      </div>
                      
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">Architecture Batterie</h6>
                        <p className="text-xs text-muted-foreground">Batterie segmentée boîtier + bracelet (Li-Po) • BMS intelligent • Charge filaire/sans fil/solaire</p>
                      </div>
                      
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">Capteurs Avancés</h6>
                        <p className="text-xs text-muted-foreground">NIR/Ultrason/EM expérimental • HRV/Stress • Analyse sommeil • Baromètre • Boussole • GNSS L1/L5</p>
                      </div>
                      
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">Durabilité</h6>
                        <p className="text-xs text-muted-foreground">Modules remplaçables • Pièces disponibles • Garantie 2 ans UE • 30 jours satisfait ou remboursé</p>
                      </div>

                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">Note Médicale</h6>
                        <p className="text-xs text-muted-foreground">Fonctions glycémie avec capteurs CGM/SMBG certifiés • Modes non-invasifs expérimentaux</p>
                      </div>
                    </div>
                  </div>
                )}
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
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Système d'Exploitation Décentralisé</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    JERROS révolutionne l'informatique avec un OS micro-noyau distribué, 
                    intégrant nativement la blockchain DAGJERR.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium">Architecture Micro-noyau</h5>
                      <p className="text-xs text-muted-foreground">Modularité maximale, sécurité renforcée</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium">Blockchain Native</h5>
                      <p className="text-xs text-muted-foreground">DAGJERR intégré au niveau système</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium">Multi-plateforme</h5>
                      <p className="text-xs text-muted-foreground">PC, mobile, IoT - écosystème unifié</p>
                    </div>
                  </div>
                </div>

                {/* DAGTEL Section */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-2 text-primary">
                    DAGTEL - Smartphone Révolutionnaire
                  </h4>
                  
                  {/* Images du DAGTEL */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <img src={dagtelFront} alt="DAGTEL Vue de face" className="w-full h-full object-cover" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                        <img src={dagtelFront} alt="DAGTEL Vue de face" className="w-full h-full object-contain rounded-lg" />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <img src={dagtelBack} alt="DAGTEL Vue de dos" className="w-full h-full object-cover" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                        <img src={dagtelBack} alt="DAGTEL Vue de dos" className="w-full h-full object-contain rounded-lg" />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <img src={dagtelProfile} alt="DAGTEL Profil" className="w-full h-full object-cover" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                        <img src={dagtelProfile} alt="DAGTEL Profil" className="w-full h-full object-contain rounded-lg" />
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Le premier smartphone intégrant nativement JERROS avec design modulaire premium
                    </p>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">Écran</span>
                        <span className="text-sm text-primary">AMOLED LTPO 6,85" 3200×1440</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">Matériaux</span>
                        <span className="text-sm text-primary">Titane + Polycarbonate blindé</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">Batterie</span>
                        <span className="text-sm text-primary">8000 mAh double cellule</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-sm font-medium">Capteurs</span>
                        <span className="text-sm text-primary">6 caméras + IR + Thermique</span>
                      </div>
                    </div>

                    <div className="p-3 bg-primary/5 rounded-lg">
                      <h5 className="font-medium text-primary">Caractéristiques Premium</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Châssis titane grade aéronautique</li>
                        <li>• Dos transparent polycarbonate blindé</li>
                        <li>• Caméra sous écran invisible</li>
                        <li>• Design modulaire avec connecteur dorsal</li>
                        <li>• Stylet intégré 4096 niveaux</li>
                        <li>• Certification IP68/IP69</li>
                      </ul>
                    </div>

                    <div className="text-center p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                      <div className="text-lg font-bold text-primary">Prévente DAGTEL</div>
                      <div className="text-2xl font-bold">1200 € en JRC</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Effectuez un change de 1200 € en JRC pour réserver votre DAGTEL
                      </p>
                      <Button className="mt-2 w-full">
                        Réserver votre DAGTEL
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowJerrosDetails(!showJerrosDetails)}
                  className="w-full" 
                  variant="outline"
                >
                  {showJerrosDetails ? (
                    <>
                      Masquer les détails
                      <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      En savoir plus
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Contenu détaillé JERROS */}
                {showJerrosDetails && (
                  <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-semibold text-primary">Fonctionnalités Avancées</h5>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">Wallet Intégré</h6>
                        <p className="text-xs text-muted-foreground">Clés en enclave TEE • Signatures automatiques • Paiements M2M</p>
                      </div>
                      
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">VM Distribuée</h6>
                        <p className="text-xs text-muted-foreground">Orchestration multi-device • Calcul distribué • Micropaiements</p>
                      </div>
                      
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">SDK ArkTS/DevEco</h6>
                        <p className="text-xs text-muted-foreground">APIs blockchain natives • Développement simplifié • Apps décentralisées</p>
                      </div>
                      
                      <div className="p-3 bg-background rounded border">
                        <h6 className="font-medium">IoT Ready</h6>
                        <p className="text-xs text-muted-foreground">Mode économie d'énergie • Sync offline-first • Réseau mesh</p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <h6 className="font-medium text-primary">Disponibilité</h6>
                      <p className="text-xs text-muted-foreground">
                        JERROS et DAGTEL actuellement en développement. 
                        Sortie prévue avec l'écosystème DAGTV/DAGTEL.
                      </p>
                    </div>

                    {/* Spécifications techniques détaillées DAGTEL */}
                    <div className="mt-4 p-3 bg-background rounded border">
                      <h6 className="font-medium text-primary">Spécifications DAGTEL Détaillées</h6>
                      <div className="grid grid-cols-1 gap-2 mt-2 text-xs">
                        <div><strong>Dimensions:</strong> 164,3×77,1×8,6mm (bosses 12mm) - 250g</div>
                        <div><strong>Capteurs photo:</strong> Principal 50MP f/1.5-2.8 • Ultra-wide 50MP • Téléobjectif 64MP 3.5x • Périscope 50MP 5x • IR 20MP • Thermique FLIR</div>
                        <div><strong>Charge:</strong> 120W filaire • 50W sans fil • 10W inversé</div>
                        <div><strong>Connectique:</strong> USB-C 4.0/Thunderbolt • DisplayPort 8K • IR blaster • NFC • UWB • GPS dual-freq</div>
                        <div><strong>Sécurité:</strong> Empreinte ultrasonique écran • Face ID 3D IR sous écran</div>
                      </div>
                    </div>
                  </div>
                )}
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