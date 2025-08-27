import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vault, ArrowLeft } from "lucide-react";
import { useTreasury } from "@/hooks/use-treasury";

// Import des composants d'onglets
import TreasuryOverview from "@/components/treasury/tabs/TreasuryOverview";
import TreasuryDistribution from "@/components/treasury/tabs/TreasuryDistribution";
import NegativeLoansTab from "@/components/treasury/tabs/NegativeLoansTab";
import InsuranceTab from "@/components/treasury/tabs/InsuranceTab";
import ActivityBonusTab from "@/components/treasury/tabs/ActivityBonusTab";
import TransactionBonusTab from "@/components/treasury/tabs/TransactionBonusTab";
import TeamTab from "@/components/treasury/tabs/TeamTab";
import PETTab from "@/components/treasury/tabs/PETTab";

const TreasuryNation = () => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, loadTreasuryData, loadPETConfig } = useTreasury();

  // Charger les données au montage du composant
  React.useEffect(() => {
    loadTreasuryData();
    loadPETConfig();
  }, [loadTreasuryData, loadPETConfig]);

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', component: TreasuryOverview },
    { id: 'distribution', label: 'Répartition', component: TreasuryDistribution },
    { id: 'negative-loans', label: 'Prêts négatifs', component: NegativeLoansTab },
    { id: 'insurance', label: 'Assurance', component: InsuranceTab },
    { id: 'activity-bonus', label: 'Bonus activité', component: ActivityBonusTab },
    { id: 'transaction-bonus', label: 'Bonus transactions', component: TransactionBonusTab },
    { id: 'team', label: 'Équipe', component: TeamTab },
    { id: 'pet', label: 'PET', component: PETTab },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 backdrop-blur"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-6 mb-6 rounded-full bg-white/10 backdrop-blur">
              <Vault className="h-16 w-16" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Trésor de la Nation
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              CydJerr émet 500 billions de JERR pour soutenir l'activité, la protection et la croissance de sa Nation numérique. 
              Découvrez la répartition transparente et comment participer.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Navigation Tabs */}
            <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b pb-4 mb-8">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
                {tabs.map(tab => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="text-xs px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors"
                  >
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">
                      {tab.label.split(' ')[0]}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="min-h-[600px]">
              {tabs.map(tab => {
                const Component = tab.component;
                return (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">
                    <div className="max-w-5xl mx-auto">
                      <Component />
                    </div>
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default TreasuryNation;