import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SubNavigation from "@/components/SubNavigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiggyBank, AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { usePERJRC } from "@/hooks/use-perjrc";
import Simulator from "@/components/perjrc/Simulator";
import QuoteConfirmation from "@/components/perjrc/QuoteConfirmation";
import KYCVerification from "@/components/perjrc/KYCVerification";
import PaymentSuccess from "@/components/perjrc/PaymentSuccess";
import { useToast } from "@/hooks/use-toast";

type Step = 'simulation' | 'quote' | 'kyc' | 'payment' | 'success';

const PERJRC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('simulation');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(1500);
  const [successData, setSuccessData] = useState<any>(null);
  
  const { 
    rules, 
    userStatus, 
    currentQuote, 
    isLoading, 
    error, 
    loadRules, 
    getUserStatus,
    clearError 
  } = usePERJRC();
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadRules();
    getUserStatus();
  }, [loadRules, getUserStatus]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Erreur",
        description: error,
        variant: "destructive",
      });
      clearError();
    }
  }, [error, toast, clearError]);

  const handleQuoteGenerated = () => {
    setCurrentStep('quote');
  };

  const handlePaymentSuccess = (data: any) => {
    setSuccessData(data);
    setCurrentStep('success');
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'simulation': return 20;
      case 'quote': return 40;
      case 'kyc': return 60;
      case 'payment': return 80;
      case 'success': return 100;
      default: return 0;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'simulation': return 'Simulation de votre change';
      case 'quote': return 'Confirmation de votre devis';
      case 'kyc': return 'Vérification d\'identité (KYC)';
      case 'payment': return 'Paiement sécurisé';
      case 'success': return 'Change effectué avec succès';
      default: return '';
    }
  };

  // Si l'utilisateur a déjà utilisé son avantage PER-JRC
  if (userStatus?.used) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SubNavigation />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <PiggyBank className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                PER-JRC (Plan d'Épargne Retraite JerrCoin)
              </h1>
              <p className="text-muted-foreground">
                Change préférentiel EUR → JRC réservé aux 40 ans et plus
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-600">
                  Avantage PER-JRC déjà utilisé
                </CardTitle>
                <CardDescription>
                  Vous avez déjà réalisé votre change préférentiel unique PER-JRC
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {userStatus.last_change && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Détails de votre change :</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Montant :</span>
                        <p className="font-medium">{userStatus.last_change.amount_eur.toLocaleString()} €</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Palier :</span>
                        <p className="font-medium capitalize">{userStatus.last_change.tier}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">JRC reçus :</span>
                        <p className="font-medium">{userStatus.last_change.jrc_credited.toLocaleString()} JRC</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date :</span>
                        <p className="font-medium">
                          {new Date(userStatus.last_change.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => navigate('/wallet')} className="flex-1">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Voir mon portefeuille
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/treasury')} className="flex-1">
                    Retour au Treasury
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <PiggyBank className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              PER-JRC (Plan d'Épargne Retraite JerrCoin)
            </h1>
            <p className="text-muted-foreground mb-4">
              Change préférentiel EUR → JRC réservé aux 40 ans et plus
            </p>
            <Badge variant="secondary" className="mb-6">
              Avantage unique - Une seule fois par personne
            </Badge>
          </div>

          {/* Barre de progression */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                {getStepTitle()}
              </span>
              <span className="text-sm text-muted-foreground">
                {getStepProgress()}%
              </span>
            </div>
            <Progress value={getStepProgress()} className="h-2" />
          </div>

          {/* Alerte d'erreur si applicable */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Chargement */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span>Chargement...</span>
              </div>
            </div>
          )}

          {/* Contenu des étapes */}
          {!isLoading && (
            <>
              {currentStep === 'simulation' && (
                <Simulator
                  onQuoteGenerated={handleQuoteGenerated}
                />
              )}

              {currentStep === 'kyc' && selectedTier && (
                <div id="kyc-section">
                  <KYCVerification
                    selectedTier={selectedTier}
                    amount={amount}
                    onKYCCompleted={() => setCurrentStep('payment')}
                    onBack={() => setCurrentStep('simulation')}
                  />
                </div>
              )}

              {currentStep === 'payment' && selectedTier && (
                <div className="max-w-2xl mx-auto">
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle>Paiement sécurisé</CardTitle>
                      <CardDescription>
                        Finalisation de votre change PER-JRC
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Le système de paiement Stripe sera intégré ici une fois que vous aurez fourni votre clé secrète Stripe.
                        </AlertDescription>
                      </Alert>
                      <Button 
                        onClick={() => setCurrentStep('simulation')}
                        variant="outline"
                        className="w-full"
                      >
                        Retour à la simulation
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentStep === 'success' && successData && (
                <PaymentSuccess
                  data={successData}
                />
              )}
            </>
          )}

          {/* Explications pédagogiques */}
          {currentStep !== 'success' && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PiggyBank className="h-5 w-5" />
                  Qu'est-ce que le PER-JRC ?
                </CardTitle>
                <CardDescription>
                  Comprendre le Plan d'Épargne Retraite JerrCoin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Principe du PER-JRC</h4>
                  <p className="text-sm text-blue-700">
                    Le PER-JRC est un dispositif unique permettant aux personnes de 40 ans et plus d'effectuer 
                    <strong> un seul change EUR → JRC</strong> à des taux préférentiels exceptionnels. 
                    Plus vous investissez, meilleur est votre taux de change.
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Financement et disponibilité</h4>
                  <p className="text-sm text-green-700">
                    Cette offre est financée par <strong>10 billions de JRC</strong> prélevés sur le coffre 
                    principal de 150 billions de JRC de CydJerr. Une fois cette réserve épuisée, 
                    l'avantage PER-JRC ne sera plus disponible.
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Pourquoi cette limitation d'âge ?</h4>
                  <p className="text-sm text-orange-700">
                    Le PER-JRC s'adresse aux personnes approchant ou en phase de retraite (40 ans et plus) 
                    pour leur permettre de diversifier leur épargne retraite avec des JerrCoins à des conditions 
                    avantageuses, dans une logique de sécurisation patrimoniale.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Paliers dynamiques */}
          {rules && currentStep !== 'success' && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Paliers PER-JRC</CardTitle>
                <CardDescription>
                  Taux préférentiels selon votre montant de dépôt
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: 'Bronze',
                        minAmount: rules.bronze_min_eur,
                        rate: rules.bronze_rate_eur_per_jrc,
                        gradient: 'from-amber-600 to-amber-800',
                        icon: '🥉',
                        tier: 'bronze'
                      },
                      {
                        name: 'Argent',
                        minAmount: rules.silver_min_eur,
                        rate: rules.silver_rate_eur_per_jrc,
                        gradient: 'from-slate-400 to-slate-600',
                        icon: '🥈',
                        tier: 'argent'
                      },
                      {
                        name: 'Or',
                        minAmount: rules.gold_min_eur,
                        rate: rules.gold_rate_eur_per_jrc,
                        gradient: 'from-yellow-400 to-yellow-600',
                        icon: '🥇',
                        tier: 'or'
                      }
                    ].map((tier) => {
                      const jrcPerEur = (1 / tier.rate).toFixed(2);
                      const multiplier = (rules.base_rate_eur_per_jrc / tier.rate).toFixed(2);
                      const bonusPercent = ((parseFloat(multiplier) - 1) * 100).toFixed(0);
                      
                      return (
                        <div 
                          key={tier.name} 
                          className={`bg-gradient-to-r ${tier.gradient} text-white p-4 rounded-lg relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 group`}
                          onClick={() => {
                            setCurrentStep('kyc');
                            setSelectedTier(tier.tier);
                            setAmount(tier.minAmount);
                            // Scroll automatique vers la section KYC
                            setTimeout(() => {
                              const kycSection = document.getElementById('kyc-section');
                              if (kycSection) {
                                kycSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }, 100);
                          }}
                        >
                          <div className="absolute top-2 right-2 text-2xl opacity-80 group-hover:scale-110 transition-transform">
                            {tier.icon}
                          </div>
                          <h3 className="font-semibold mb-2 text-lg">{tier.name}</h3>
                          <div className="space-y-2">
                            <div className="text-center">
                              <p className="text-2xl font-bold">{tier.minAmount.toLocaleString()} €</p>
                              <p className="text-xs opacity-75">minimum requis</p>
                            </div>
                             <div className="text-center border-t border-white/20 pt-2">
                               <p className="text-lg font-bold">{jrcPerEur} JRC</p>
                               <p className="text-xs opacity-75">par euro investi</p>
                             </div>
                             <div className="bg-white/20 px-2 py-1 rounded text-xs font-medium text-center">
                               ×{multiplier} vs base (+{bonusPercent}%)
                             </div>
                             <div className="text-xs opacity-90 text-center mt-2 border-t border-white/10 pt-2">
                               <strong>Éligibilité :</strong> 40 ans et plus uniquement
                             </div>
                          </div>
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <span className="text-sm font-medium">Cliquez pour commencer</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Taux de base :</strong> {Math.floor(1 / rules.base_rate_eur_per_jrc)} JRC/€ 
                      (hors PER-JRC)
                    </p>
                  </div>
                  
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">
                      <strong>Disponibilité limitée :</strong> Cette offre est financée par une réserve de 
                      <strong> 10 billions de JRC</strong> sur les 150 billions du coffre principal. 
                      Une fois épuisée, l'avantage PER-JRC ne sera plus disponible.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PERJRC;