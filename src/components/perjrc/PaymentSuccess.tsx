import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Download, Wallet, Home, Receipt, Medal, Award, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentSuccessProps {
  data: {
    change_id: string;
    status: string;
    jrc_credited: number;
    quote: any;
    payment_intent_id?: string;
  };
}

const PaymentSuccess = ({ data }: PaymentSuccessProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Afficher une notification de succès
    toast({
      title: "Change PER-JRC réussi !",
      description: `${data.jrc_credited.toLocaleString()} JRC ont été crédités sur votre portefeuille.`,
      duration: 5000,
    });
  }, [data.jrc_credited, toast]);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return <Medal className="h-6 w-6" />;
      case 'argent': return <Award className="h-6 w-6" />;
      case 'or': return <Crown className="h-6 w-6" />;
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

  const handleDownloadReceipt = () => {
    // Dans une vraie application, ceci génèrerait et téléchargerait un PDF
    // Pour la démo, on simule le téléchargement
    const receiptData = {
      change_id: data.change_id,
      date: new Date().toLocaleString('fr-FR'),
      amount_eur: data.quote.amount_eur,
      tier: data.quote.tier,
      rate: data.quote.rate_eur_per_jrc,
      jrc_credited: data.jrc_credited,
      multiplier: data.quote.multiplier_vs_base,
      payment_intent_id: data.payment_intent_id
    };

    // Simuler le téléchargement
    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PER-JRC-recu-${data.change_id.slice(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Reçu téléchargé",
      description: "Votre reçu PER-JRC a été téléchargé avec succès.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Confirmation de succès */}
      <Card className="border-green-500 bg-green-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 p-3 rounded-full">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-green-800">
            Change PER-JRC réussi !
          </CardTitle>
          <CardDescription className="text-green-700">
            Votre avantage PER-JRC a été utilisé avec succès
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Détails de la transaction */}
      <Card>
        <CardHeader>
          <CardTitle>Récapitulatif de votre change</CardTitle>
          <CardDescription>
            Transaction #{data.change_id.slice(0, 8)}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Palier obtenu */}
          {data.quote.tier && (
            <div className={`bg-gradient-to-r ${getTierColor(data.quote.tier)} text-white p-4 rounded-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTierIcon(data.quote.tier)}
                  <div>
                    <h3 className="text-xl font-bold capitalize">{data.quote.tier}</h3>
                    <p className="opacity-90">Palier obtenu</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    ×{data.quote.multiplier_vs_base?.toFixed(2)}
                  </p>
                  <p className="opacity-90 text-sm">vs taux de base</p>
                </div>
              </div>
            </div>
          )}

          {/* Détails de la transaction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Montant échangé</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Montant déposé :</span>
                  <span className="font-medium">{data.quote.amount_eur?.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taux appliqué :</span>
                  <span className="font-medium">{data.quote.rate_eur_per_jrc?.toFixed(6)} €/JRC</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">JRC obtenus</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">JRC crédités :</span>
                  <span className="font-medium text-lg text-primary">
                    {data.jrc_credited.toLocaleString()} JRC
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Statut :</span>
                  <Badge variant="default" className="bg-green-500">
                    {data.status === 'settled' ? 'Finalisé' : 'Confirmé'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informations techniques */}
          <div className="space-y-2">
            <h4 className="font-semibold">Informations de transaction</h4>
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">ID Transaction :</span>
                  <p className="font-mono">{data.change_id}</p>
                </div>
                {data.payment_intent_id && (
                  <div>
                    <span className="text-muted-foreground">ID Paiement :</span>
                    <p className="font-mono">{data.payment_intent_id}</p>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">Date :</span>
                  <p>{new Date().toLocaleString('fr-FR')}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type :</span>
                  <p>PER-JRC One-Shot</p>
                </div>
              </div>
            </div>
          </div>

          {/* Avantage utilisé */}
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Avantage PER-JRC utilisé</h4>
            <p className="text-sm text-orange-700">
              Vous avez utilisé votre avantage PER-JRC unique. Cet avantage ne peut être utilisé qu'une 
              seule fois par personne. Les JRC ont été crédités sur votre portefeuille.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleDownloadReceipt} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Télécharger le reçu
            </Button>
            
            <Button onClick={() => navigate('/wallet')} className="flex-1">
              <Wallet className="mr-2 h-4 w-4" />
              Voir mon portefeuille
            </Button>
          </div>

          <Button 
            onClick={() => navigate('/treasury')} 
            variant="outline" 
            className="w-full"
          >
            <Home className="mr-2 h-4 w-4" />
            Retour au Treasury
          </Button>
        </CardContent>
      </Card>

      {/* Prochaines étapes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Prochaines étapes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Vos JRC sont disponibles immédiatement dans votre portefeuille</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Un email de confirmation vous a été envoyé</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Vous pouvez télécharger votre reçu PDF à tout moment</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Votre avantage PER-JRC a été définitivement utilisé</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;