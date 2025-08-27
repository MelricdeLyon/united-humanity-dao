import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Network, Calculator, UserPlus, BarChart3, Info } from "lucide-react";
import PoolCard from "./asusure/PoolCard";
import CostSimulator from "./asusure/CostSimulator";
import AsusureApplicationForm from "./asusure/AsusureApplicationForm";
import PersonalDashboard from "./asusure/PersonalDashboard";

const InsuranceTab = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Données des pools Asusure
  const pools = [
    {
      id: 'automobile',
      name: 'Pool Automobile',
      description: 'Assurance véhicules décentralisée',
      icon: 'Car',
      deposit: 150,
      participants: 2847,
      totalFunds: 427050,
      monthlyClaimsJRC: 15420,
      averageContribution: 5.4,
      color: 'blue'
    },
    {
      id: 'habitation',
      name: 'Pool Habitation',
      description: 'Assurance logement mutuelle',
      icon: 'Home',
      deposit: 300,
      participants: 1923,
      totalFunds: 576900,
      monthlyClaimsJRC: 38460,
      averageContribution: 20.0,
      color: 'green'
    },
    {
      id: 'sante',
      name: 'Pool Santé/Corporel',
      description: 'Assurance santé solidaire',
      icon: 'Heart',
      deposit: 150,
      participants: 3456,
      totalFunds: 518400,
      monthlyClaimsJRC: 25920,
      averageContribution: 7.5,
      color: 'red'
    }
  ];

  const totalParticipants = pools.reduce((sum, pool) => sum + pool.participants, 0);
  const totalFunds = pools.reduce((sum, pool) => sum + pool.totalFunds, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full">
          <Network className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Asusure - Assurance Décentralisée</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Mutualisation internationale des risques • Quote-part égale pour tous • Transparence blockchain • 
          Vous empruntez, on se cotise, vous êtes protégés
        </p>
      </div>

      {/* Vue d'ensemble globale */}
      <Card className="shadow-governance border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="mr-3 h-6 w-6 text-primary" />
              Écosystème Asusure Global
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {totalParticipants.toLocaleString()} Participants
            </Badge>
          </CardTitle>
          <CardDescription>
            Système d'entraide mutuelle où chaque sinistre est partagé équitablement entre tous les membres du pool
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{totalParticipants.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Membres actifs</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-secondary">{(totalFunds / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-muted-foreground">JRC mutualisés</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-accent">Égale</p>
              <p className="text-sm text-muted-foreground">Quote-part</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-success">100%</p>
              <p className="text-sm text-muted-foreground">Transparent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onglets principaux */}
      <Tabs defaultValue="pools" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pools" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Pools
          </TabsTrigger>
          <TabsTrigger value="simulator" className="flex items-center">
            <Calculator className="h-4 w-4 mr-2" />
            Simulateur
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="join" className="flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Rejoindre
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pools" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pools.map((pool) => (
              <PoolCard key={pool.id} pool={pool} />
            ))}
          </div>
          
          {/* Principe de fonctionnement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Network className="mr-3 h-5 w-5 text-success" />
                Principe de Mutualisation
              </CardTitle>
              <CardDescription>
                Comment fonctionne le partage équitable des risques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Votre Compte Épargne Assurance</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>Dépôt initial selon le pool (150-300 JRC)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>Argent reste votre propriété</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>Reconstitution mensuelle après sinistres</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>Exposition maximale = votre dépôt</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-secondary">Quote-part Équitable</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">•</span>
                      <span>Coût total ÷ Nombre participants = Quote-part</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">•</span>
                      <span>Même contribution pour tous les membres</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">•</span>
                      <span>Plus on est nombreux, moins on paie</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary">•</span>
                      <span>Pas de sinistre = aucun prélèvement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulator">
          <CostSimulator />
        </TabsContent>

        <TabsContent value="dashboard">
          <PersonalDashboard />
        </TabsContent>

        <TabsContent value="join" className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Phase de pré-lancement.</strong> Ouvrez votre compte épargne assurance dès maintenant pour contribuer 
              à atteindre la masse critique et bénéficier des meilleurs tarifs lors du lancement.
            </AlertDescription>
          </Alert>

          <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Rejoindre l'Assurance Décentralisée</h3>
                  <p className="text-sm text-muted-foreground">
                    Plus nous sommes nombreux, plus les contributions individuelles diminuent. 
                    Ouvrez votre compte épargne assurance pour les pools qui vous intéressent.
                  </p>
                </div>
                <Button 
                  className="gradient-primary" 
                  onClick={() => setIsFormOpen(true)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ouvrir mon Compte Épargne Asusure
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Formulaire d'inscription */}
      <AsusureApplicationForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
};

export default InsuranceTab;