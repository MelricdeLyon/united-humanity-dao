import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, CreditCard, ArrowLeft, AlertTriangle, Medal, Award, Crown } from "lucide-react";
import { usePERJRC } from "@/hooks/use-perjrc";
import type { PERJRQuote } from "@/types/perjrc";

interface QuoteConfirmationProps {
  quote: PERJRQuote;
  onPaymentSuccess: (data: any) => void;
  onBack: () => void;
}

const QuoteConfirmation = ({ quote, onPaymentSuccess, onBack }: QuoteConfirmationProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { commitQuote } = usePERJRC();

  // Calculer le temps restant
  useEffect(() => {
    if (!quote.quote_expires_at) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const expiry = new Date(quote.quote_expires_at!).getTime();
      const difference = expiry - now;
      
      if (difference > 0) {
        setTimeLeft(Math.floor(difference / 1000));
      } else {
        setTimeLeft(0);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [quote.quote_expires_at]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return <Medal className="h-5 w-5" />;
      case 'argent': return <Award className="h-5 w-5" />;
      case 'or': return <Crown className="h-5 w-5" />;
      default: return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'from-amber-600 to-amber-800';
      case 'argent': return 'from-slate-400 to-slate-600';
      case 'or': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const handlePayment = async () => {
    if (!quote.quote_id || timeLeft <= 0) return;

    setIsProcessing(true);
    try {
      // Dans une vraie application, vous intégreriez ici le système de paiement
      // Pour la démo, on simule un payment_intent_id
      const mockPaymentIntentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const result = await commitQuote({
        quote_id: quote.quote_id,
        payment_intent_id: mockPaymentIntentId
      });

      onPaymentSuccess({
        ...result,
        quote,
        payment_intent_id: mockPaymentIntentId
      });
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isExpired = timeLeft <= 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Timer */}
      <Card className={`border-2 ${isExpired ? 'border-red-500' : 'border-orange-500'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-3">
            <Clock className={`h-6 w-6 ${isExpired ? 'text-red-500' : 'text-orange-500'}`} />
            <div className="text-center">
              <p className="font-semibold">
                {isExpired ? 'Devis expiré' : 'Temps restant'}
              </p>
              <p className={`text-2xl font-bold ${isExpired ? 'text-red-500' : 'text-orange-500'}`}>
                {isExpired ? '00:00' : formatTime(timeLeft)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Devis expiré */}
      {isExpired && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Votre devis a expiré. Veuillez retourner au simulateur pour générer un nouveau devis.
          </AlertDescription>
        </Alert>
      )}

      {/* Récapitulatif du devis */}
      <Card>
        <CardHeader>
          <CardTitle>Confirmation de votre devis PER-JRC</CardTitle>
          <CardDescription>
            Vérifiez les détails avant de procéder au paiement
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Palier */}
          {quote.tier && (
            <div className={`bg-gradient-to-r ${getTierColor(quote.tier)} text-white p-4 rounded-lg`}>
              <div className="flex items-center gap-3">
                {getTierIcon(quote.tier)}
                <div>
                  <h3 className="text-xl font-bold capitalize">{quote.tier}</h3>
                  <p className="opacity-90">Palier sélectionné</p>
                </div>
              </div>
            </div>
          )}

          {/* Détails du change */}
          <div className="space-y-4">
            <h4 className="font-semibold">Détails du change</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant à déposer :</span>
                <span className="font-medium text-lg">{quote.amount_eur?.toLocaleString()} €</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taux préférentiel :</span>
                <span className="font-medium">{quote.rate_eur_per_jrc?.toFixed(6)} €/JRC</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Multiplicateur vs base :</span>
                <Badge variant="secondary">
                  ×{quote.multiplier_vs_base?.toFixed(2)}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-xl">
                <span className="font-semibold">JRC obtenus :</span>
                <span className="font-bold text-primary">
                  {quote.jrc_preview?.toLocaleString()} JRC
                </span>
              </div>
            </div>
          </div>

          {/* Informations importantes */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Informations importantes</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ce change est définitif et ne peut pas être annulé</li>
              <li>• Vous ne pourrez plus bénéficier de l'avantage PER-JRC après cette opération</li>
              <li>• Les JRC seront crédités immédiatement sur votre portefeuille</li>
              <li>• Un reçu PDF vous sera envoyé par email</li>
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              disabled={isProcessing}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au simulateur
            </Button>
            
            <Button
              onClick={handlePayment}
              disabled={isExpired || isProcessing || !quote.quote_id}
              size="lg"
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Traitement en cours...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payer & convertir ({quote.amount_eur?.toLocaleString()} €)
                </>
              )}
            </Button>
          </div>

          {/* Devis ID */}
          {quote.quote_id && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Devis ID: {quote.quote_id}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteConfirmation;