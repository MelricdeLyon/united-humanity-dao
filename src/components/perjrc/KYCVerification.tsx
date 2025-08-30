import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Camera, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  Download,
  ArrowLeft,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KYCVerificationProps {
  selectedTier: string;
  amount: number;
  onKYCCompleted: () => void;
  onBack: () => void;
}

type DocumentType = 'identity' | 'address' | 'selfie';

interface DocumentUpload {
  type: DocumentType;
  file: File | null;
  preview: string | null;
  verified: boolean;
}

const KYCVerification = ({ selectedTier, amount, onKYCCompleted, onBack }: KYCVerificationProps) => {
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { type: 'identity', file: null, preview: null, verified: false },
    { type: 'address', file: null, preview: null, verified: false },
    { type: 'selfie', file: null, preview: null, verified: false }
  ]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [kycProgress, setKYCProgress] = useState(0);
  const { toast } = useToast();
  
  const fileInputRefs = {
    identity: useRef<HTMLInputElement>(null),
    address: useRef<HTMLInputElement>(null),
    selfie: useRef<HTMLInputElement>(null)
  };

  const documentLabels = {
    identity: "Pièce d'identité",
    address: "Justificatif de domicile",
    selfie: "Photo avec pièce d'identité"
  };

  const documentDescriptions = {
    identity: "Carte d'identité, passeport ou permis de conduire (recto-verso)",
    address: "Facture récente (électricité, gaz, téléphone) datant de moins de 3 mois",
    selfie: "Photo de vous tenant votre pièce d'identité à côté de votre visage"
  };

  const getTierInfo = (tier: string) => {
    const tierConfig = {
      bronze: { name: 'Bronze', icon: '🥉', color: 'from-amber-600 to-amber-800' },
      argent: { name: 'Argent', icon: '🥈', color: 'from-slate-400 to-slate-600' },
      or: { name: 'Or', icon: '🥇', color: 'from-yellow-400 to-yellow-600' }
    };
    return tierConfig[tier as keyof typeof tierConfig] || tierConfig.bronze;
  };

  const handleFileUpload = (type: DocumentType, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Format non supporté",
        description: "Veuillez uploader un fichier JPG, PNG ou PDF",
        variant: "destructive"
      });
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille maximum autorisée est de 5MB",
        variant: "destructive"
      });
      return;
    }

    // Créer preview pour les images
    let preview = null;
    if (file.type.startsWith('image/')) {
      preview = URL.createObjectURL(file);
    }

    setDocuments(prev => prev.map(doc => 
      doc.type === type 
        ? { ...doc, file, preview, verified: false }
        : doc
    ));

    // Simuler une vérification automatique après 2 secondes
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.type === type 
          ? { ...doc, verified: true }
          : doc
      ));
      
      toast({
        title: "Document vérifié",
        description: `${documentLabels[type]} accepté avec succès`,
      });
      
      // Mettre à jour le progrès
      const completedDocs = documents.filter(d => d.verified).length + 1;
      setKYCProgress((completedDocs / 3) * 100);
    }, 2000);
  };

  const handleProcessKYC = async () => {
    const allDocumentsUploaded = documents.every(doc => doc.file && doc.verified);
    
    if (!allDocumentsUploaded) {
      toast({
        title: "Documents manquants",
        description: "Veuillez uploader et faire vérifier tous les documents requis",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simuler le processus de vérification KYC
    try {
      // Dans une vraie application, vous uploaderiez les fichiers vers Supabase Storage
      // et appelleriez un service de vérification KYC comme Onfido, Jumio, etc.
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "KYC validé !",
        description: "Votre identité a été vérifiée avec succès",
      });
      
      onKYCCompleted();
    } catch (error) {
      toast({
        title: "Erreur de vérification",
        description: "Une erreur est survenue lors de la vérification",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const allDocumentsVerified = documents.every(doc => doc.verified);
  const tierInfo = getTierInfo(selectedTier);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* En-tête du palier sélectionné */}
      <Card>
        <CardContent className="p-4">
          <div className={`bg-gradient-to-r ${tierInfo.color} text-white p-4 rounded-lg flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{tierInfo.icon}</span>
              <div>
                <h3 className="text-xl font-bold">Palier {tierInfo.name}</h3>
                <p className="opacity-90">Montant : {amount.toLocaleString()} €</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              KYC requis
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Progression KYC */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Vérification d'identité (KYC)
          </CardTitle>
          <CardDescription>
            Pour des raisons de sécurité et de conformité réglementaire, nous devons vérifier votre identité
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{Math.round(kycProgress)}%</span>
            </div>
            <Progress value={kycProgress} className="h-2" />
          </div>

          {/* Documents à uploader */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div key={doc.type} className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="space-y-4">
                    {/* Icône et titre */}
                    <div className="space-y-2">
                      {doc.type === 'identity' && <FileText className="h-8 w-8 mx-auto text-muted-foreground" />}
                      {doc.type === 'address' && <FileText className="h-8 w-8 mx-auto text-muted-foreground" />}
                      {doc.type === 'selfie' && <Camera className="h-8 w-8 mx-auto text-muted-foreground" />}
                      
                      <h4 className="font-semibold">{documentLabels[doc.type]}</h4>
                      <p className="text-xs text-muted-foreground">
                        {documentDescriptions[doc.type]}
                      </p>
                    </div>

                    {/* Preview ou upload */}
                    {doc.file ? (
                      <div className="space-y-2">
                        {doc.preview && (
                          <img 
                            src={doc.preview} 
                            alt="Preview" 
                            className="w-full h-32 object-cover rounded"
                          />
                        )}
                        
                        <div className="flex items-center justify-center gap-2 text-sm">
                          <span>{doc.file.name}</span>
                          {doc.verified ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRefs[doc.type]?.current?.click()}
                        >
                          Choisir un fichier
                        </Button>
                      </div>
                    )}

                    {/* Input caché */}
                    <input
                      ref={fileInputRefs[doc.type]}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(doc.type, e)}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Statut */}
                {doc.verified && (
                  <Alert className="border-green-500 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Document vérifié avec succès
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </div>

          {/* Informations importantes */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Informations importantes</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Tous les documents doivent être lisibles et en couleur</li>
              <li>• Les documents doivent être valides et non expirés</li>
              <li>• La vérification peut prendre quelques minutes</li>
              <li>• Vos données sont sécurisées et conformes RGPD</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline" 
              onClick={onBack}
              disabled={isProcessing}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            
            <Button
              onClick={handleProcessKYC}
              disabled={!allDocumentsVerified || isProcessing}
              size="lg"
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Vérification en cours...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Valider et continuer
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCVerification;