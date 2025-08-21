import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  Leaf, 
  AlertTriangle, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp,
  Globe,
  FileText,
  Euro,
  Calendar,
  CheckCircle,
  Thermometer
} from "lucide-react";
import { toast } from "sonner";

interface OSPProposalData {
  title: string;
  description: string;
  category: string;
  priority: string;
  estimated_budget_eur: number;
  climate_impact_level: string;
  target_regions: string[];
  implementation_timeline: string;
  expected_climate_impact: string;
  supporting_evidence: string;
  requires_emergency_vote: boolean;
  smart_contract_features: string[];
}

interface OSPProposalFormProps {
  onBack: () => void;
  onSubmit: (proposal: OSPProposalData) => void;
}

const regions = [
  "Global",
  "Europe", 
  "Amérique du Nord",
  "Amérique Latine",
  "Afrique",
  "Asie-Pacifique", 
  "Moyen-Orient",
  "Arctique",
  "Antarctique",
  "Océans"
];

const smartContractFeatures = [
  "Financement automatique d'urgence",
  "Surveillance en temps réel", 
  "Sanctions automatiques",
  "Distribution automatique de fonds",
  "Vote d'urgence 24h",
  "Traçabilité blockchain",
  "Compensation carbone automatique",
  "Alerte climatique automatique"
];

export const OSPProposalForm: React.FC<OSPProposalFormProps> = ({ onBack, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OSPProposalData>({
    title: "",
    description: "",
    category: "",
    priority: "",
    estimated_budget_eur: 0,
    climate_impact_level: "",
    target_regions: [],
    implementation_timeline: "",
    expected_climate_impact: "",
    supporting_evidence: "",
    requires_emergency_vote: false,
    smart_contract_features: []
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const categories = [
    { value: "surveillance_climatique", label: "Surveillance Climatique", icon: Thermometer },
    { value: "intervention_urgence", label: "Intervention d'Urgence", icon: AlertTriangle },
    { value: "technologies_vertes", label: "Technologies Vertes", icon: Zap },
    { value: "adaptation_climat", label: "Adaptation Climatique", icon: Shield },
    { value: "justice_climatique", label: "Justice Climatique", icon: Users },
    { value: "financement_carbone", label: "Financement Carbone", icon: TrendingUp }
  ];

  const priorities = [
    { value: "critical", label: "Critique", color: "bg-red-500" },
    { value: "high", label: "Élevée", color: "bg-orange-500" },
    { value: "medium", label: "Moyenne", color: "bg-yellow-500" },
    { value: "low", label: "Faible", color: "bg-green-500" }
  ];

  const climateImpactLevels = [
    { value: "critical", label: "Impact Critique - Urgence planétaire" },
    { value: "high", label: "Impact Élevé - Régions multiples" },
    { value: "medium", label: "Impact Modéré - Région spécifique" },
    { value: "low", label: "Impact Local - Communauté limitée" }
  ];

  const handleInputChange = (field: keyof OSPProposalData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegionToggle = (region: string) => {
    setFormData(prev => ({
      ...prev,
      target_regions: prev.target_regions.includes(region)
        ? prev.target_regions.filter(r => r !== region)
        : [...prev.target_regions, region]
    }));
  };

  const handleSmartContractToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      smart_contract_features: prev.smart_contract_features.includes(feature)
        ? prev.smart_contract_features.filter(f => f !== feature)
        : [...prev.smart_contract_features, feature]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Validation basique
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    onSubmit(formData);
    toast.success("Proposition climatique soumise!", {
      description: "Votre proposition sera examinée par la communauté mondiale et soumise au vote planétaire."
    });
  };

  const getStepTitle = (step: number) => {
    const titles = {
      1: "Informations Générales",
      2: "Impact et Portée", 
      3: "Implémentation",
      4: "Smart Contracts & Validation"
    };
    return titles[step as keyof typeof titles];
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return formData.priority && formData.climate_impact_level && formData.target_regions.length > 0;
      case 3:
        return formData.implementation_timeline && formData.expected_climate_impact;
      case 4:
        return true; // Optionnel
      default:
        return false;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Nouvelle Proposition Climatique</h1>
            <p className="text-muted-foreground">
              Soumettez votre proposition à la communauté mondiale pour vote planétaire
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Étape {currentStep} sur {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complété</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="mt-2 text-sm font-medium">{getStepTitle(currentStep)}</div>
        </CardContent>
      </Card>

      {/* Étape 1: Informations Générales */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informations Générales
            </CardTitle>
            <CardDescription>
              Décrivez votre proposition climatique de manière claire et concise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Titre de la proposition *</Label>
              <Input
                id="title"
                placeholder="Ex: Interdiction mondiale des nouveaux projets de charbon"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description">Description détaillée *</Label>
              <Textarea
                id="description"
                placeholder="Décrivez en détail votre proposition, ses objectifs et sa justification..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Catégorie climatique *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <div
                      key={cat.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.category === cat.value 
                          ? 'border-primary bg-primary/10' 
                          : 'border-muted hover:border-muted-foreground'
                      }`}
                      onClick={() => handleInputChange('category', cat.value)}
                    >
                      <IconComponent className="h-5 w-5 mb-2" />
                      <div className="font-medium text-sm">{cat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Étape 2: Impact et Portée */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Impact et Portée Climatique
            </CardTitle>
            <CardDescription>
              Définissez l'urgence, l'impact et la portée géographique de votre proposition
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Niveau de priorité *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {priorities.map((priority) => (
                  <div
                    key={priority.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.priority === priority.value 
                        ? 'border-primary bg-primary/10' 
                        : 'border-muted hover:border-muted-foreground'
                    }`}
                    onClick={() => handleInputChange('priority', priority.value)}
                  >
                    <div className={`w-4 h-4 rounded-full ${priority.color} mb-2`}></div>
                    <div className="font-medium text-sm">{priority.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Niveau d'impact climatique *</Label>
              <Select value={formData.climate_impact_level} onValueChange={(value) => handleInputChange('climate_impact_level', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Sélectionnez le niveau d'impact" />
                </SelectTrigger>
                <SelectContent>
                  {climateImpactLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Régions concernées * (sélectionnez une ou plusieurs)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {regions.map((region) => (
                  <div
                    key={region}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors text-sm ${
                      formData.target_regions.includes(region)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-muted hover:border-muted-foreground'
                    }`}
                    onClick={() => handleRegionToggle(region)}
                  >
                    {region}
                  </div>
                ))}
              </div>
              {formData.target_regions.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.target_regions.map((region) => (
                    <Badge key={region} variant="secondary" className="text-xs">
                      {region}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="budget">Budget estimé (en euros)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Ex: 1000000000"
                value={formData.estimated_budget_eur}
                onChange={(e) => handleInputChange('estimated_budget_eur', parseInt(e.target.value) || 0)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Laissez vide si non applicable ou si le financement sera déterminé plus tard
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Étape 3: Implémentation */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Plan d'Implémentation
            </CardTitle>
            <CardDescription>
              Détaillez comment votre proposition sera mise en œuvre
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="timeline">Délai d'implémentation *</Label>
              <Input
                id="timeline"
                placeholder="Ex: 24 mois, 5 ans, Immédiat"
                value={formData.implementation_timeline}
                onChange={(e) => handleInputChange('implementation_timeline', e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="expected_impact">Impact climatique attendu *</Label>
              <Textarea
                id="expected_impact"
                placeholder="Décrivez les résultats climatiques attendus: réduction d'émissions, adaptation, protection..."
                value={formData.expected_climate_impact}
                onChange={(e) => handleInputChange('expected_climate_impact', e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="evidence">Preuves et références à l'appui</Label>
              <Textarea
                id="evidence"
                placeholder="Citez les études scientifiques, rapports du GIEC, données de recherche qui soutiennent votre proposition..."
                value={formData.supporting_evidence}
                onChange={(e) => handleInputChange('supporting_evidence', e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
              <Checkbox
                id="emergency"
                checked={formData.requires_emergency_vote}
                onCheckedChange={(checked) => handleInputChange('requires_emergency_vote', checked)}
              />
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <Label htmlFor="emergency" className="text-sm">
                  Cette proposition nécessite un vote d'urgence (24h maximum)
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Étape 4: Smart Contracts */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Smart Contracts & Automatisation
            </CardTitle>
            <CardDescription>
              Sélectionnez les fonctionnalités automatiques pour votre proposition (optionnel)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Fonctionnalités Smart Contract (optionnel)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {smartContractFeatures.map((feature) => (
                  <div
                    key={feature}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.smart_contract_features.includes(feature)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-muted hover:border-muted-foreground'
                    }`}
                    onClick={() => handleSmartContractToggle(feature)}
                  >
                    <div className="text-sm">{feature}</div>
                  </div>
                ))}
              </div>
              {formData.smart_contract_features.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.smart_contract_features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                Résumé de votre proposition
              </h4>
              <div className="space-y-2 text-sm">
                <div><strong>Titre:</strong> {formData.title}</div>
                <div><strong>Catégorie:</strong> {categories.find(c => c.value === formData.category)?.label}</div>
                <div><strong>Priorité:</strong> {priorities.find(p => p.value === formData.priority)?.label}</div>
                <div><strong>Régions:</strong> {formData.target_regions.join(", ")}</div>
                <div><strong>Délai:</strong> {formData.implementation_timeline}</div>
                {formData.estimated_budget_eur > 0 && (
                  <div><strong>Budget:</strong> {formData.estimated_budget_eur.toLocaleString()} €</div>
                )}
                {formData.requires_emergency_vote && (
                  <div className="text-orange-600"><strong>⚡ Vote d'urgence requis</strong></div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Précédent
        </Button>

        <div className="text-sm text-muted-foreground">
          Étape {currentStep} sur {totalSteps}
        </div>

        {currentStep < totalSteps ? (
          <Button
            onClick={nextStep}
            disabled={!isStepValid(currentStep)}
          >
            Suivant
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!isStepValid(currentStep)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            Soumettre la Proposition
            <CheckCircle className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};