import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Home, 
  Wallet, 
  Building, 
  FileText, 
  Shield, 
  CheckCircle, 
  TrendingDown,
  Info,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  // Informations personnelles
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  dateOfBirth: z.string().min(1, "Date de naissance requise"),
  nationality: z.string().min(1, "Nationalité requise"),
  
  // Adresse CydJerr
  cydjerrAddress: z.string().min(10, "Adresse CydJerr complète requise"),
  cydjerrCity: z.string().min(1, "Ville CydJerr requise"),
  cydjerrRegion: z.string().min(1, "Région CydJerr requise"),
  residencyProof: z.boolean().refine(val => val === true, "Preuve de résidence CydJerr requise"),
  activityScore: z.string().min(1, "Score d'activité requis"),
  
  // Informations financières
  monthlyIncomeEUR: z.string().min(1, "Revenus mensuels requis"),
  monthlyExpensesEUR: z.string().min(1, "Charges mensuelles requises"),
  currentJERRBalance: z.string().min(1, "Solde JERR actuel requis"),
  otherAssets: z.string().optional(),
  existingDebts: z.string().optional(),
  
  // Détails du projet
  loanType: z.enum(["immobilier", "entrepreneuriat", "formation"], {
    required_error: "Type de prêt requis"
  }),
  requestedAmount: z.string().min(1, "Montant demandé requis"),
  loanDuration: z.string().min(1, "Durée du prêt requise"),
  projectDescription: z.string().min(50, "Description du projet trop courte (minimum 50 caractères)"),
  
  // Informations professionnelles
  employmentStatus: z.string().min(1, "Statut professionnel requis"),
  companyName: z.string().optional(),
  position: z.string().optional(),
  employmentDuration: z.string().optional(),
  
  // Garanties
  collateralType: z.string().min(1, "Type de garantie requis"),
  collateralValue: z.string().min(1, "Valeur de la garantie requise"),
  collateralDescription: z.string().min(10, "Description de la garantie requise"),
  
  // Acceptations
  termsAccepted: z.boolean().refine(val => val === true, "Acceptation des conditions requise"),
  dataProcessingAccepted: z.boolean().refine(val => val === true, "Acceptation du traitement des données requise"),
  creditCheckAccepted: z.boolean().refine(val => val === true, "Acceptation de la vérification de crédit requise"),
});

type FormData = z.infer<typeof formSchema>;

interface NegativeLoanApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const NegativeLoanApplicationForm = ({ isOpen, onClose }: NegativeLoanApplicationFormProps) => {
  const [currentTab, setCurrentTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      nationality: "France",
      cydjerrAddress: "",
      cydjerrCity: "",
      cydjerrRegion: "",
      residencyProof: false,
      activityScore: "",
      monthlyIncomeEUR: "",
      monthlyExpensesEUR: "",
      currentJERRBalance: "",
      otherAssets: "",
      existingDebts: "",
      loanType: undefined,
      requestedAmount: "",
      loanDuration: "",
      projectDescription: "",
      employmentStatus: "",
      companyName: "",
      position: "",
      employmentDuration: "",
      collateralType: "",
      collateralValue: "",
      collateralDescription: "",
      termsAccepted: false,
      dataProcessingAccepted: false,
      creditCheckAccepted: false,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simuler l'envoi de la demande
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Demande de prêt négatif:", data);
      
      toast.success("Demande de prêt négatif soumise avec succès!", {
        description: "Vous recevrez une réponse sous 48h par email."
      });
      
      onClose();
      form.reset();
    } catch (error) {
      toast.error("Erreur lors de la soumission de la demande");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLoanTypeInfo = (type: string) => {
    const types = {
      immobilier: { 
        rate: "-0.3%", 
        maxAmount: "500K JERR", 
        duration: "20 ans",
        icon: Building,
        color: "text-blue-600",
        bg: "bg-blue-500/10"
      },
      entrepreneuriat: { 
        rate: "-0.7%", 
        maxAmount: "100K JERR", 
        duration: "10 ans",
        icon: Briefcase,
        color: "text-purple-600",
        bg: "bg-purple-500/10"
      },
      formation: { 
        rate: "-1.0%", 
        maxAmount: "25K JERR", 
        duration: "5 ans",
        icon: GraduationCap,
        color: "text-orange-600",
        bg: "bg-orange-500/10"
      }
    };
    return types[type as keyof typeof types];
  };

  const watchedLoanType = form.watch("loanType");
  const loanTypeInfo = watchedLoanType ? getLoanTypeInfo(watchedLoanType) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <TrendingDown className="mr-3 h-6 w-6 text-green-600" />
            Demande de Prêt Négatif CydJerr
          </DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire pour rejoindre la liste d'attente des prêts à taux négatif
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal" className="text-xs">
                  <User className="h-4 w-4 mr-1" />
                  Personnel
                </TabsTrigger>
                <TabsTrigger value="residence" className="text-xs">
                  <Home className="h-4 w-4 mr-1" />
                  Résidence
                </TabsTrigger>
                <TabsTrigger value="financial" className="text-xs">
                  <Wallet className="h-4 w-4 mr-1" />
                  Financier
                </TabsTrigger>
                <TabsTrigger value="project" className="text-xs">
                  <FileText className="h-4 w-4 mr-1" />
                  Projet
                </TabsTrigger>
                <TabsTrigger value="guarantees" className="text-xs">
                  <Shield className="h-4 w-4 mr-1" />
                  Garanties
                </TabsTrigger>
              </TabsList>

              {/* Onglet Informations Personnelles */}
              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Informations Personnelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom *</FormLabel>
                            <FormControl>
                              <Input placeholder="Dupont" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Mail className="mr-1 h-4 w-4" />
                              Email *
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jean.dupont@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Phone className="mr-1 h-4 w-4" />
                              Téléphone *
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="+33 6 12 34 56 78" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de naissance *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="nationality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nationalité *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="France">France</SelectItem>
                                <SelectItem value="Belgique">Belgique</SelectItem>
                                <SelectItem value="Suisse">Suisse</SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                                <SelectItem value="Autre">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Onglet Résidence CydJerr */}
              <TabsContent value="residence" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Home className="mr-2 h-5 w-5" />
                      Résidence CydJerr
                    </CardTitle>
                    <CardDescription>
                      Informations sur votre résidence dans l'écosystème CydJerr
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cydjerrAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            Adresse CydJerr *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="123 Rue de la République, CydJerr" {...field} />
                          </FormControl>
                          <FormDescription>
                            Adresse complète de votre résidence dans CydJerr
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cydjerrCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville CydJerr *</FormLabel>
                            <FormControl>
                              <Input placeholder="Nouvelle CydJerr" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cydjerrRegion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Région *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="centre">Centre CydJerr</SelectItem>
                                <SelectItem value="nord">Nord CydJerr</SelectItem>
                                <SelectItem value="sud">Sud CydJerr</SelectItem>
                                <SelectItem value="est">Est CydJerr</SelectItem>
                                <SelectItem value="ouest">Ouest CydJerr</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="activityScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Score d'activité CydJerr *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="750" 
                              {...field}
                              min="0"
                              max="1000"
                            />
                          </FormControl>
                          <FormDescription>
                            Votre score d'activité actuel dans l'écosystème CydJerr (0-1000)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="residencyProof"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Je certifie posséder une preuve de résidence CydJerr valide *
                            </FormLabel>
                            <FormDescription>
                              Document officiel attestant de votre résidence dans CydJerr
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Onglet Situation Financière */}
              <TabsContent value="financial" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wallet className="mr-2 h-5 w-5" />
                      Situation Financière
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="monthlyIncomeEUR"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Revenus mensuels nets (EUR) *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="3500" 
                                {...field}
                                min="0"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="monthlyExpensesEUR"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Charges mensuelles (EUR) *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="1800" 
                                {...field}
                                min="0"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="currentJERRBalance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <CreditCard className="mr-1 h-4 w-4" />
                            Solde JERR actuel *
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="50000" 
                              {...field}
                              min="0"
                            />
                          </FormControl>
                          <FormDescription>
                            Montant total de JERR actuellement en votre possession
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employmentStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Statut professionnel *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="salarie">Salarié</SelectItem>
                              <SelectItem value="independant">Indépendant</SelectItem>
                              <SelectItem value="fonctionnaire">Fonctionnaire</SelectItem>
                              <SelectItem value="retraite">Retraité</SelectItem>
                              <SelectItem value="etudiant">Étudiant</SelectItem>
                              <SelectItem value="chomage">En recherche d'emploi</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Entreprise</FormLabel>
                            <FormControl>
                              <Input placeholder="Nom de l'entreprise" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poste occupé</FormLabel>
                            <FormControl>
                              <Input placeholder="Développeur, Manager..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="otherAssets"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Autres actifs (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Immobilier, placements, cryptomonnaies..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="existingDebts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dettes existantes (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Crédits en cours, mensualités..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Onglet Projet */}
              <TabsContent value="project" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Détails du Projet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="loanType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de prêt négatif *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez le type de prêt" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="immobilier">
                                <div className="flex items-center">
                                  <Building className="mr-2 h-4 w-4 text-blue-600" />
                                  Immobilier (-0.3%)
                                </div>
                              </SelectItem>
                              <SelectItem value="entrepreneuriat">
                                <div className="flex items-center">
                                  <Briefcase className="mr-2 h-4 w-4 text-purple-600" />
                                  Entrepreneuriat (-0.7%)
                                </div>
                              </SelectItem>
                              <SelectItem value="formation">
                                <div className="flex items-center">
                                  <GraduationCap className="mr-2 h-4 w-4 text-orange-600" />
                                  Formation (-1.0%)
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {loanTypeInfo && (
                      <Alert>
                        <div className={`p-2 ${loanTypeInfo.bg} rounded-lg w-fit`}>
                          <loanTypeInfo.icon className={`h-4 w-4 ${loanTypeInfo.color}`} />
                        </div>
                        <AlertDescription>
                          <div className="space-y-1">
                            <p><strong>Taux:</strong> <Badge variant="outline" className="text-green-600 border-green-300">{loanTypeInfo.rate}</Badge></p>
                            <p><strong>Montant maximum:</strong> {loanTypeInfo.maxAmount}</p>
                            <p><strong>Durée maximum:</strong> {loanTypeInfo.duration}</p>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="requestedAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Montant demandé (JERR) *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="50000" 
                                {...field}
                                min="1000"
                                max={loanTypeInfo ? parseInt(loanTypeInfo.maxAmount.replace(/[^0-9]/g, '')) * 1000 : undefined}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="loanDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Durée souhaitée (années) *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="10" 
                                {...field}
                                min="1"
                                max={loanTypeInfo ? parseInt(loanTypeInfo.duration.split(' ')[0]) : undefined}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="projectDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description détaillée du projet *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez votre projet en détail : objectifs, utilisation des fonds, planning, retombées attendues..."
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Minimum 50 caractères. Plus votre description est détaillée, mieux nous pourrons évaluer votre dossier.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Onglet Garanties */}
              <TabsContent value="guarantees" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Garanties et Acceptations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="collateralType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de garantie *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="jerr">Dépôt JERR</SelectItem>
                              <SelectItem value="immobilier">Bien immobilier</SelectItem>
                              <SelectItem value="vehicule">Véhicule</SelectItem>
                              <SelectItem value="entreprise">Parts d'entreprise</SelectItem>
                              <SelectItem value="autre">Autre actif</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="collateralValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valeur de la garantie *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Valeur estimée (JERR ou EUR)" 
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            La valeur de la garantie doit représenter au minimum 120% du montant emprunté
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="collateralDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description de la garantie *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Détaillez la garantie proposée..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                      <h4 className="font-medium">Acceptations requises</h4>
                      
                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                J'accepte les conditions générales des prêts négatifs CydJerr *
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dataProcessingAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                J'accepte le traitement de mes données personnelles *
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="creditCheckAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                J'autorise la vérification de ma solvabilité et de mon score CydJerr *
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Cette demande vous place sur la liste d'attente. Un conseiller CydJerr vous contactera 
                        dès l'ouverture du système de prêts négatifs pour finaliser votre dossier.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation et soumission */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const tabs = ["personal", "residence", "financial", "project", "guarantees"];
                  const currentIndex = tabs.indexOf(currentTab);
                  if (currentIndex > 0) {
                    setCurrentTab(tabs[currentIndex - 1]);
                  }
                }}
                disabled={currentTab === "personal"}
              >
                Précédent
              </Button>

              {currentTab === "guarantees" ? (
                <Button 
                  type="submit" 
                  className="gradient-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Soumettre la demande
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    const tabs = ["personal", "residence", "financial", "project", "guarantees"];
                    const currentIndex = tabs.indexOf(currentTab);
                    if (currentIndex < tabs.length - 1) {
                      setCurrentTab(tabs[currentIndex + 1]);
                    }
                  }}
                >
                  Suivant
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NegativeLoanApplicationForm;