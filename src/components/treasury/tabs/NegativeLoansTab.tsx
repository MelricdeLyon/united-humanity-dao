import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building, TrendingDown, Users, Calculator, Info, CheckCircle } from "lucide-react";
import NegativeLoanApplicationForm from "../forms/NegativeLoanApplicationForm";

const NegativeLoansTab = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full">
          <Building className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-xl font-bold">Prêts Négatifs</h2>
        <p className="text-muted-foreground">
          Système de crédit révolutionnaire à taux négatif pour stimuler l'économie
        </p>
      </div>

      {/* Vue d'ensemble */}
      <Card className="shadow-governance border-green-200 bg-gradient-to-br from-background to-green-50/30 dark:to-green-950/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingDown className="mr-3 h-5 w-5 text-green-600" />
              Allocation Coffre
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
              120 billions JERR
            </Badge>
          </CardTitle>
          <CardDescription>
            Le plus grand coffre de CydJerr dédié aux prêts à taux négatif
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">120T</p>
              <p className="text-sm text-muted-foreground">JERR alloués</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">-0.5%</p>
              <p className="text-sm text-muted-foreground">Taux moyen</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-accent">24%</p>
              <p className="text-sm text-muted-foreground">Part du trésor</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-secondary">Bientôt</p>
              <p className="text-sm text-muted-foreground">Disponible</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Principe des prêts négatifs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-3 h-5 w-5 text-primary" />
            Comment ça fonctionne ?
          </CardTitle>
          <CardDescription>
            Les prêts négatifs : vous empruntez et on vous paie pour ça !
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-success" />
                Mécanisme
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Vous empruntez 10 000 JERR</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Taux négatif de -0.5% par an</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>Vous ne remboursez que 9 950 JERR</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>La Nation finance la différence</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <Users className="mr-2 h-4 w-4 text-primary" />
                Conditions
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Résidence CydJerr validée</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Score d'activité minimum</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Projet d'investissement validé</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Garanties proportionnelles</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Types de prêts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-governance transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg w-fit">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-base">Immobilier</CardTitle>
            <CardDescription>Acquisition résidence principale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taux</span>
                <Badge variant="outline" className="text-green-600 border-green-300">-0.3%</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Montant max</span>
                <span className="font-medium">500K JERR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Durée</span>
                <span className="font-medium">20 ans</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-governance transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="p-2 bg-purple-500/10 rounded-lg w-fit">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="text-base">Entrepreneuriat</CardTitle>
            <CardDescription>Création entreprise CydJerr</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taux</span>
                <Badge variant="outline" className="text-green-600 border-green-300">-0.7%</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Montant max</span>
                <span className="font-medium">100K JERR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Durée</span>
                <span className="font-medium">10 ans</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-governance transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="p-2 bg-orange-500/10 rounded-lg w-fit">
              <Calculator className="h-5 w-5 text-orange-600" />
            </div>
            <CardTitle className="text-base">Formation</CardTitle>
            <CardDescription>Développement compétences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taux</span>
                <Badge variant="outline" className="text-green-600 border-green-300">-1.0%</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Montant max</span>
                <span className="font-medium">25K JERR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Durée</span>
                <span className="font-medium">5 ans</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations importantes */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Système en préparation.</strong> Les prêts négatifs seront disponibles lors de la phase 2 de CydJerr. 
          L'activation nécessite validation par le Conseil et mise en place des garanties.
        </AlertDescription>
      </Alert>

      {/* Action */}
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Prêt négatif bientôt disponible</h3>
              <p className="text-sm text-muted-foreground">
                Soyez notifié de l'ouverture du système de prêts négatifs
              </p>
            </div>
            <Button 
              className="gradient-primary" 
              onClick={() => setIsFormOpen(true)}
            >
              <Building className="mr-2 h-4 w-4" />
              Rejoindre la liste d'attente
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire de demande */}
      <NegativeLoanApplicationForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
};

export default NegativeLoansTab;