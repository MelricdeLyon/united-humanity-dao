import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Car, Home, Heart, Wallet, Shield, AlertCircle } from "lucide-react";

const formSchema = z.object({
  // Données personnelles
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  
  // Résidence CydJerr
  cydjerrResidenceId: z.string().min(1, "ID de résidence requis"),
  residenceValidated: z.boolean(),
  
  // Sélection des pools
  poolAutomobile: z.boolean(),
  poolHabitation: z.boolean(),
  poolSante: z.boolean(),
  
  // Informations spécifiques
  vehicleDetails: z.string().optional(),
  homeDetails: z.string().optional(),
  healthDetails: z.string().optional(),
  
  // Acceptation
  termsAccepted: z.boolean().refine(val => val === true, "Vous devez accepter les conditions"),
  riskAccepted: z.boolean().refine(val => val === true, "Vous devez comprendre les risques")
});

type FormData = z.infer<typeof formSchema>;

interface AsusureApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AsusureApplicationForm = ({ isOpen, onClose }: AsusureApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cydjerrResidenceId: "",
      residenceValidated: false,
      poolAutomobile: false,
      poolHabitation: false,
      poolSante: false,
      vehicleDetails: "",
      homeDetails: "",
      healthDetails: "",
      termsAccepted: false,
      riskAccepted: false
    }
  });

  const watchedPools = form.watch(["poolAutomobile", "poolHabitation", "poolSante"]);
  const [automobile, habitation, sante] = watchedPools;

  // Calcul du dépôt total requis
  const calculateTotalDeposit = () => {
    let total = 0;
    if (automobile) total += 150;
    if (habitation) total += 300;
    if (sante) total += 150;
    return total;
  };

  const totalDeposit = calculateTotalDeposit();

  const onSubmit = async (data: FormData) => {
    if (!automobile && !habitation && !sante) {
      toast.error("Vous devez sélectionner au moins un pool d'assurance");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulation de l'ouverture du compte épargne assurance
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedPools = [];
      if (data.poolAutomobile) selectedPools.push("Automobile");
      if (data.poolHabitation) selectedPools.push("Habitation");
      if (data.poolSante) selectedPools.push("Santé/Corporel");
      
      toast.success(
        `Compte épargne assurance ouvert avec succès ! Pools : ${selectedPools.join(", ")}. Dépôt requis : ${totalDeposit} JRC`
      );
      onClose();
    } catch (error) {
      toast.error("Erreur lors de l'ouverture du compte");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Shield className="mr-3 h-6 w-6 text-primary" />
            Ouverture Compte Épargne Asusure
          </DialogTitle>
          <DialogDescription>
            Rejoignez la mutualisation décentralisée • Quote-part égale • Transparence blockchain
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations Personnelles</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre prénom" {...field} />
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
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="votre@email.com" {...field} />
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
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="+33 1 23 45 67 89" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Résidence CydJerr */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Résidence CydJerr</CardTitle>
                <CardDescription>Condition obligatoire pour accéder aux pools Asusure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="cydjerrResidenceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID de Résidence CydJerr</FormLabel>
                      <FormControl>
                        <Input placeholder="CYD-RES-123456789" {...field} />
                      </FormControl>
                      <FormDescription>
                        Votre identifiant de résident validé par la communauté CydJerr
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="residenceValidated"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel className="text-sm">
                        Ma résidence CydJerr est validée et active
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Sélection des Pools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sélection des Pools d'Assurance</CardTitle>
                <CardDescription>Choisissez les pools auxquels vous souhaitez participer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Pool Automobile */}
                  <div className={`p-4 rounded-lg border-2 transition-colors ${
                    automobile ? 'border-primary bg-primary/5' : 'border-muted'
                  }`}>
                    <FormField
                      control={form.control}
                      name="poolAutomobile"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox 
                                checked={field.value}
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                            <Car className="h-5 w-5 text-blue-600" />
                            <FormLabel className="font-medium">Pool Automobile</FormLabel>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>Dépôt requis: <strong>150 JRC</strong></p>
                            <p>2,847 participants actuels</p>
                          </div>
                          {automobile && (
                            <FormField
                              control={form.control}
                              name="vehicleDetails"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input 
                                      placeholder="Marque, modèle, année..." 
                                      {...field} 
                                      className="text-xs"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Pool Habitation */}
                  <div className={`p-4 rounded-lg border-2 transition-colors ${
                    habitation ? 'border-primary bg-primary/5' : 'border-muted'
                  }`}>
                    <FormField
                      control={form.control}
                      name="poolHabitation"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox 
                                checked={field.value}
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                            <Home className="h-5 w-5 text-green-600" />
                            <FormLabel className="font-medium">Pool Habitation</FormLabel>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>Dépôt requis: <strong>300 JRC</strong></p>
                            <p>1,923 participants actuels</p>
                          </div>
                          {habitation && (
                            <FormField
                              control={form.control}
                              name="homeDetails"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input 
                                      placeholder="Type, superficie, localisation..." 
                                      {...field} 
                                      className="text-xs"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Pool Santé */}
                  <div className={`p-4 rounded-lg border-2 transition-colors ${
                    sante ? 'border-primary bg-primary/5' : 'border-muted'
                  }`}>
                    <FormField
                      control={form.control}
                      name="poolSante"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox 
                                checked={field.value}
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                            <Heart className="h-5 w-5 text-red-600" />
                            <FormLabel className="font-medium">Pool Santé/Corporel</FormLabel>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>Dépôt requis: <strong>150 JRC</strong></p>
                            <p>3,456 participants actuels</p>
                          </div>
                          {sante && (
                            <FormField
                              control={form.control}
                              name="healthDetails"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input 
                                      placeholder="Informations médicales pertinentes..." 
                                      {...field} 
                                      className="text-xs"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Récapitulatif dépôt */}
                {totalDeposit > 0 && (
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Wallet className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">Dépôt total requis</span>
                      </div>
                      <Badge className="text-lg px-3 py-1">{totalDeposit} JRC</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Ce montant reste votre propriété et sera reconstitué après chaque prélèvement de quote-part
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Conditions et Risques */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-warning" />
                  Conditions et Risques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-sm">
                          J'accepte les conditions générales d'utilisation Asusure
                        </FormLabel>
                        <FormDescription className="text-xs">
                          Mutualisation des risques, quote-part égale, transparence blockchain, 
                          reconstitution mensuelle des comptes épargne assurance
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="riskAccepted"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-sm">
                          Je comprends les risques de la mutualisation décentralisée
                        </FormLabel>
                        <FormDescription className="text-xs">
                          Variabilité des contributions selon la sinistralité, importance de la taille du pool, 
                          exposition financière limitée au dépôt initial
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Separator />

            {/* Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="gradient-primary"
                disabled={isSubmitting || totalDeposit === 0}
              >
                {isSubmitting ? (
                  "Ouverture en cours..."
                ) : (
                  `Ouvrir mon Compte Épargne (${totalDeposit} JRC)`
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AsusureApplicationForm;