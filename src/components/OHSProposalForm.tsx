import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Info, 
  FileText, 
  Target, 
  Globe, 
  Coins,
  ArrowLeft,
  ArrowRight,
  Save,
  Eye,
  HelpCircle
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const proposalSchema = z.object({
  title: z.string().min(10, "Le titre doit contenir au moins 10 caractères").max(100, "Maximum 100 caractères"),
  category: z.enum([
    "surveillance_epidemiologique",
    "intervention_urgence", 
    "recherche_medicale",
    "sante_preventive",
    "financement_sante",
    "partenariats"
  ]),
  description: z.string().min(50, "La description doit contenir au moins 50 caractères"),
  health_priority_level: z.enum(["critical", "high", "medium", "low"]),
  target_regions: z.array(z.string()).optional(),
  expected_health_impact: z.string().optional(),
  implementation_timeline: z.string().optional(),
  estimated_budget_eur: z.number().positive().optional(),
  supporting_evidence: z.string().optional(),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

const categories = {
  surveillance_epidemiologique: {
    label: "Surveillance Épidémiologique",
    description: "Systèmes de surveillance des maladies et épidémies"
  },
  intervention_urgence: {
    label: "Intervention d'Urgence",
    description: "Réponse rapide aux crises sanitaires"
  },
  recherche_medicale: {
    label: "Recherche Médicale", 
    description: "Développement de nouveaux traitements et vaccins"
  },
  sante_preventive: {
    label: "Santé Préventive",
    description: "Programmes de prévention et promotion de la santé"
  },
  financement_sante: {
    label: "Financement Santé",
    description: "Mécanismes de financement des systèmes de santé"
  },
  partenariats: {
    label: "Partenariats",
    description: "Collaborations internationales en santé"
  }
};

const priorities = {
  critical: {
    label: "Critique",
    description: "Urgence sanitaire mondiale - Action immédiate requise",
    color: "bg-red-100 text-red-800 border-red-200"
  },
  high: {
    label: "Élevée", 
    description: "Impact majeur sur la santé publique",
    color: "bg-orange-100 text-orange-800 border-orange-200"
  },
  medium: {
    label: "Moyenne",
    description: "Amélioration significative des systèmes de santé", 
    color: "bg-yellow-100 text-yellow-800 border-yellow-200"
  },
  low: {
    label: "Faible",
    description: "Amélioration progressive et à long terme",
    color: "bg-green-100 text-green-800 border-green-200"
  }
};

const regions = [
  "Afrique", "Amérique du Nord", "Amérique du Sud", "Asie", "Europe", "Océanie", "Mondial"
];

const timelines = [
  { value: "1-3 mois", label: "1-3 mois - Mise en œuvre rapide" },
  { value: "3-6 mois", label: "3-6 mois - Déploiement progressif" },
  { value: "6-12 mois", label: "6-12 mois - Projet moyen terme" },
  { value: "1-2 ans", label: "1-2 ans - Transformation structurelle" },
  { value: "2+ ans", label: "2+ ans - Vision long terme" }
];

interface OHSProposalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function OHSProposalForm({ open, onOpenChange, onSuccess }: OHSProposalFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: "",
      description: "",
      health_priority_level: "medium",
      target_regions: [],
      expected_health_impact: "",
      implementation_timeline: "",
      supporting_evidence: "",
    },
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const onSubmit = async (values: ProposalFormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non connecté");

      const { error } = await supabase
        .from('ohs_proposals')
        .insert({
          title: values.title,
          description: values.description,
          category: values.category,
          health_priority_level: values.health_priority_level,
          target_regions: values.target_regions,
          expected_health_impact: values.expected_health_impact,
          implementation_timeline: values.implementation_timeline,
          estimated_budget_eur: values.estimated_budget_eur,
          supporting_evidence: values.supporting_evidence,
          proposed_by: user.id,
          status: 'draft'
        });

      if (error) throw error;

      toast({
        title: "Proposition soumise !",
        description: "Votre proposition a été enregistrée et sera examinée par l'équipe OHS.",
      });

      form.reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    const values = form.getValues();
    switch (currentStep) {
      case 1:
        return values.title && values.category && values.title.length >= 10;
      case 2:
        return values.description && values.description.length >= 50;
      case 3:
        return true; // Étape optionnelle
      case 4:
        return true; // Étape optionnelle
      default:
        return false;
    }
  };

  if (showPreview) {
    const values = form.getValues();
    const budgetJerr = values.estimated_budget_eur ? values.estimated_budget_eur * 100 : 0;
    
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Aperçu de votre proposition</span>
            </DialogTitle>
            <DialogDescription>
              Vérifiez les informations avant soumission
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {values.title}
                  <Badge className={priorities[values.health_priority_level].color}>
                    {priorities[values.health_priority_level].label}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {categories[values.category].label}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {values.description}
                  </p>
                </div>
                
                {values.target_regions && values.target_regions.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Régions cibles</h4>
                    <div className="flex flex-wrap gap-2">
                      {values.target_regions.map((region) => (
                        <Badge key={region} variant="outline">{region}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {values.implementation_timeline && (
                  <div>
                    <h4 className="font-medium mb-2">Timeline d'implémentation</h4>
                    <p className="text-sm text-muted-foreground">{values.implementation_timeline}</p>
                  </div>
                )}

                {values.estimated_budget_eur && (
                  <div>
                    <h4 className="font-medium mb-2">Budget estimé</h4>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-primary">
                        {budgetJerr.toLocaleString()} JERR
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {values.estimated_budget_eur.toLocaleString()} €
                      </p>
                    </div>
                  </div>
                )}

                {values.expected_health_impact && (
                  <div>
                    <h4 className="font-medium mb-2">Impact attendu</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {values.expected_health_impact}
                    </p>
                  </div>
                )}

                {values.supporting_evidence && (
                  <div>
                    <h4 className="font-medium mb-2">Preuves à l'appui</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {values.supporting_evidence}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'édition
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
              {isSubmitting ? "Soumission..." : "Soumettre la proposition"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Nouvelle Proposition OHS</span>
            </DialogTitle>
            <DialogDescription>
              Soumettez une proposition pour améliorer la santé publique mondiale
            </DialogDescription>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Étape {currentStep} sur {totalSteps}</span>
              <span>{Math.round(progress)}% complété</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Étape 1: Informations de base */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Info className="h-5 w-5" />
                      <span>Informations de base</span>
                    </CardTitle>
                    <CardDescription>
                      Commençons par les informations essentielles de votre proposition
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <span>Titre de la proposition *</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Un titre clair et descriptif (10-100 caractères)</p>
                              </TooltipContent>
                            </Tooltip>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Programme de vaccination universelle contre la grippe" 
                              {...field} 
                              maxLength={100}
                            />
                          </FormControl>
                          <FormDescription>
                            {field.value.length}/100 caractères
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <span>Catégorie *</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Choisissez la catégorie qui correspond le mieux à votre proposition</p>
                              </TooltipContent>
                            </Tooltip>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une catégorie" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(categories).map(([key, category]) => (
                                <SelectItem key={key} value={key}>
                                  <div>
                                    <div className="font-medium">{category.label}</div>
                                    <div className="text-xs text-muted-foreground">{category.description}</div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Étape 2: Description et priorité */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Description et priorité</span>
                    </CardTitle>
                    <CardDescription>
                      Décrivez votre proposition et évaluez son niveau de priorité
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <span>Description détaillée *</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Expliquez clairement le problème, la solution proposée et les bénéfices attendus</p>
                              </TooltipContent>
                            </Tooltip>
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez votre proposition de manière détaillée. Incluez:&#10;- Le problème de santé publique identifié&#10;- La solution proposée&#10;- Les bénéficiaires&#10;- Les résultats attendus"
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            {field.value.length} caractères (minimum 50)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="health_priority_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <span>Niveau de priorité *</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Évaluez l'urgence et l'impact potentiel de votre proposition</p>
                              </TooltipContent>
                            </Tooltip>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="space-y-3"
                            >
                              {Object.entries(priorities).map(([key, priority]) => (
                                <div key={key} className={`flex items-start space-x-3 p-3 rounded-lg border ${priority.color}`}>
                                  <RadioGroupItem value={key} id={key} className="mt-1" />
                                  <div className="flex-1">
                                    <Label htmlFor={key} className="font-medium cursor-pointer">
                                      {priority.label}
                                    </Label>
                                    <p className="text-sm opacity-80 mt-1">
                                      {priority.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Étape 3: Impact et mise en œuvre */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Impact et mise en œuvre</span>
                    </CardTitle>
                    <CardDescription>
                      Précisez la portée géographique et les modalités d'implémentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="target_regions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <Globe className="h-4 w-4" />
                            <span>Régions cibles (optionnel)</span>
                          </FormLabel>
                          <FormDescription className="text-sm text-muted-foreground mb-3">
                            Sélectionnez les régions où votre proposition devrait être mise en œuvre
                          </FormDescription>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {regions.map((region) => (
                              <Label
                                key={region}
                                className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                                  field.value?.includes(region) 
                                    ? 'bg-primary/10 border-primary text-primary' 
                                    : 'hover:bg-muted'
                                }`}
                                onClick={() => {
                                  const current = field.value || [];
                                  if (current.includes(region)) {
                                    field.onChange(current.filter(r => r !== region));
                                  } else {
                                    field.onChange([...current, region]);
                                  }
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={field.value?.includes(region) || false}
                                  className="sr-only"
                                  readOnly
                                />
                                <span className="text-sm">{region}</span>
                              </Label>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="implementation_timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeline d'implémentation (optionnel)</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une durée" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timelines.map((timeline) => (
                                <SelectItem key={timeline.value} value={timeline.value}>
                                  {timeline.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="estimated_budget_eur"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <Coins className="h-4 w-4" />
                            <span>Budget estimé (optionnel)</span>
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Input 
                                type="number"
                                placeholder="Ex: 1000000"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                value={field.value || ''}
                              />
                              {field.value && (
                                <div className="text-sm text-muted-foreground">
                                  <div className="font-medium text-primary">
                                    {(field.value * 100).toLocaleString()} JERR
                                  </div>
                                  <div>{field.value.toLocaleString()} € équivalent</div>
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Estimation du budget nécessaire en euros
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expected_health_impact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Impact attendu sur la santé (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Ex: Réduction de 30% des infections respiratoires, amélioration de la couverture vaccinale à 95%..."
                              className="min-h-24"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Décrivez les bénéfices concrets attendus pour la santé publique
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Étape 4: Justification */}
              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Justification scientifique</span>
                    </CardTitle>
                    <CardDescription>
                      Renforcez votre proposition avec des preuves scientifiques
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="supporting_evidence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preuves à l'appui (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Citez des études scientifiques, statistiques, rapports d'experts ou exemples de mise en œuvre réussie qui soutiennent votre proposition..."
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Références scientifiques, données statistiques, études de cas, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t">
                <div className="flex space-x-2">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Précédent
                    </Button>
                  )}
                </div>

                <div className="flex space-x-2">
                  {currentStep === totalSteps ? (
                    <>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowPreview(true)}
                        disabled={!canProceed()}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Aperçu
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || !canProceed()}
                      >
                        {isSubmitting ? "Soumission..." : "Soumettre"}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      disabled={!canProceed()}
                    >
                      Suivant
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}