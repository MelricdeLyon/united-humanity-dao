import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, Home, Car, Briefcase, Info, CheckCircle, Users } from "lucide-react";

const InsuranceTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full">
          <Shield className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-xl font-bold">Assurance CydJerr</h2>
        <p className="text-muted-foreground">
          Protection complète des biens et personnes au sein de la Nation numérique
        </p>
      </div>

      {/* Vue d'ensemble */}
      <Card className="shadow-governance border-red-200 bg-gradient-to-br from-background to-red-50/30 dark:to-red-950/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="mr-3 h-5 w-5 text-red-600" />
              Fonds d'Assurance
            </div>
            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
              120 billions JERR
            </Badge>
          </CardTitle>
          <CardDescription>
            Système d'assurance mutuelle décentralisé pour tous les citoyens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">120T</p>
              <p className="text-sm text-muted-foreground">JERR alloués</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">0%</p>
              <p className="text-sm text-muted-foreground">Cotisation</p>
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

      {/* Principe de l'assurance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="mr-3 h-5 w-5 text-success" />
            Principe Révolutionnaire
          </CardTitle>
          <CardDescription>
            Assurance gratuite financée par la Nation pour tous les citoyens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <Heart className="mr-2 h-4 w-4 text-red-500" />
                Avantages Citoyens
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-red-600">•</span>
                  <span>Aucune cotisation à payer</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-600">•</span>
                  <span>Couverture immédiate dès résidence</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-600">•</span>
                  <span>Indemnisations en JERR</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-600">•</span>
                  <span>Gestion transparente et décentralisée</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <Shield className="mr-2 h-4 w-4 text-primary" />
                Financement
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Fonds constitué par la Nation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Réserves en JERR sécurisées</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Système de réassurance intelligent</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">•</span>
                  <span>Gouvernance par les assurés</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Types de couvertures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Assurance Biens */}
        <Card className="hover:shadow-governance transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Home className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Assurance Biens</CardTitle>
                  <CardDescription>Protection patrimoine matériel</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center">
                  <Home className="mr-2 h-4 w-4 text-blue-600" />
                  <span className="text-sm">Résidence principale</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-300">100%</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center">
                  <Car className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm">Véhicules</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-300">100%</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4 text-orange-600" />
                  <span className="text-sm">Biens professionnels</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-300">80%</Badge>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Vol, incendie, dégâts des eaux</p>
              <p>• Catastrophes naturelles</p>
              <p>• Responsabilité civile</p>
            </div>
          </CardContent>
        </Card>

        {/* Assurance Personnes */}
        <Card className="hover:shadow-governance transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Assurance Personnes</CardTitle>
                  <CardDescription>Protection santé et famille</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center">
                  <Heart className="mr-2 h-4 w-4 text-red-600" />
                  <span className="text-sm">Santé complémentaire</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-300">100%</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="mr-2 h-4 w-4 text-blue-600" />
                  <span className="text-sm">Incapacité temporaire</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-300">75%</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm">Décès/Invalidité</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-300">Capital</Badge>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Frais médicaux non remboursés</p>
              <p>• Perte de revenus</p>
              <p>• Protection familiale</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conditions d'accès */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="mr-3 h-5 w-5 text-success" />
            Conditions d'Accès
          </CardTitle>
          <CardDescription>
            Critères simples pour bénéficier de l'assurance CydJerr
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <h4 className="font-medium mb-1">Résidence Active</h4>
              <p className="text-sm text-muted-foreground">Statut citoyen CydJerr validé</p>
            </div>
            
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Participation</h4>
              <p className="text-sm text-muted-foreground">Activité communautaire régulière</p>
            </div>
            
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <Heart className="h-8 w-8 text-accent mx-auto mb-2" />
              <h4 className="font-medium mb-1">Bonne Foi</h4>
              <p className="text-sm text-muted-foreground">Déclarations sincères</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations importantes */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Système en développement.</strong> L'assurance CydJerr sera disponible lors du déploiement complet de la Nation. 
          Les conditions et couvertures pourront évoluer selon les besoins de la communauté.
        </AlertDescription>
      </Alert>

      {/* Action */}
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Protection bientôt disponible</h3>
              <p className="text-sm text-muted-foreground">
                Soyez informé du lancement de l'assurance gratuite CydJerr
              </p>
            </div>
            <Button className="gradient-primary" disabled>
              <Shield className="mr-2 h-4 w-4" />
              S'inscrire aux notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceTab;