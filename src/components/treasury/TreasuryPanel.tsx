import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTreasury } from "@/hooks/use-treasury";
import { Vault, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import des composants d'onglets
import TreasuryOverview from "./tabs/TreasuryOverview";
import TreasuryDistribution from "./tabs/TreasuryDistribution";
import NegativeLoansTab from "./tabs/NegativeLoansTab";
import InsuranceTab from "./tabs/InsuranceTab";
import ActivityBonusTab from "./tabs/ActivityBonusTab";
import TransactionBonusTab from "./tabs/TransactionBonusTab";
import TeamTab from "./tabs/TeamTab";
import PETTab from "./tabs/PETTab";

const TreasuryPanel = () => {
  const { isOpen, setOpen, activeTab, setActiveTab } = useTreasury();

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
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[600px] lg:w-[800px] max-w-[90vw] overflow-y-auto"
      >
        <SheetHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Vault className="h-6 w-6 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-xl">Trésor de la Nation</SheetTitle>
                <p className="text-sm text-muted-foreground">Économie JerrCoin</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
              {tabs.map(tab => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="text-xs px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map(tab => {
              const Component = tab.component;
              return (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <Component />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TreasuryPanel;