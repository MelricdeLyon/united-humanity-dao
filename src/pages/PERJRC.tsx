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
import EligibilityCheck from "@/components/perjrc/EligibilityCheck";
import Simulator from "@/components/perjrc/Simulator";
import QuoteConfirmation from "@/components/perjrc/QuoteConfirmation";
import PaymentSuccess from "@/components/perjrc/PaymentSuccess";
import { useToast } from "@/hooks/use-toast";

type Step = 'eligibility' | 'simulation' | 'quote' | 'success';

const PERJRC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('eligibility');
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
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

  const handleEligibilityResult = (eligible: boolean) => {
    setIsEligible(eligible);
    if (eligible) {
      setCurrentStep('simulation');
    }
  };

  const handleQuoteGenerated = () => {
    setCurrentStep('quote');
  };

  const handlePaymentSuccess = (data: any) => {
    setSuccessData(data);
    setCurrentStep('success');
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'eligibility': return 25;
      case 'simulation': return 50;
      case 'quote': return 75;
      case 'success': return 100;
      default: return 0;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'eligibility': return 'Vérification d\'éligibilité';
      case 'simulation': return 'Simulation de votre change';
      case 'quote': return 'Confirmation de votre devis';
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
              {currentStep === 'eligibility' && (
                <EligibilityCheck
                  onEligibilityResult={handleEligibilityResult}
                />
              )}

              {currentStep === 'simulation' && (
                <Simulator
                  onQuoteGenerated={handleQuoteGenerated}
                />
              )}

              {currentStep === 'quote' && currentQuote && (
                <QuoteConfirmation
                  quote={currentQuote}
                  onPaymentSuccess={handlePaymentSuccess}
                  onBack={() => setCurrentStep('simulation')}
                />
              )}

              {currentStep === 'success' && successData && (
                <PaymentSuccess
                  data={successData}
                />
              )}
            </>
          )}

          {/* Informations sur les paliers */}
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
                  <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Bronze</h3>
                    <p className="text-sm opacity-90 mb-2">≥ {rules.bronze_min_eur.toLocaleString()} €</p>
                    <p className="text-xl font-bold">{Math.floor(1 / rules.bronze_rate_eur_per_jrc)} JRC/€</p>
                    <p className="text-xs opacity-75">×{(rules.base_rate_eur_per_jrc / rules.bronze_rate_eur_per_jrc).toFixed(2)} vs base</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-slate-400 to-slate-600 text-white p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Argent</h3>
                    <p className="text-sm opacity-90 mb-2">≥ {rules.silver_min_eur.toLocaleString()} €</p>
                    <p className="text-xl font-bold">{Math.floor(1 / rules.silver_rate_eur_per_jrc)} JRC/€</p>
                    <p className="text-xs opacity-75">×{(rules.base_rate_eur_per_jrc / rules.silver_rate_eur_per_jrc).toFixed(2)} vs base</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Or</h3>
                    <p className="text-sm opacity-90 mb-2">≥ {rules.gold_min_eur.toLocaleString()} €</p>
                    <p className="text-xl font-bold">{Math.floor(1 / rules.gold_rate_eur_per_jrc)} JRC/€</p>
                    <p className="text-xs opacity-75">×{(rules.base_rate_eur_per_jrc / rules.gold_rate_eur_per_jrc).toFixed(2)} vs base</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Taux de base :</strong> {Math.floor(1 / rules.base_rate_eur_per_jrc)} JRC/€ 
                    (hors PER-JRC)
                  </p>
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