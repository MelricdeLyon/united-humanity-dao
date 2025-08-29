import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SubNavigation from "@/components/SubNavigation";
import Footer from "@/components/Footer";
import { TerritorialSelector } from "@/components/territorial/TerritorialSelector";
import { OrganizationalDashboard } from "@/components/territorial/OrganizationalDashboard";
import { TerritorialPositionsOverview } from "@/components/territorial/TerritorialPositionsOverview";
import { TerritorialNominations } from "@/components/territorial/TerritorialNominations";
import { TerritorialProposals } from "@/components/territorial/TerritorialProposals";
import { TerritorialAmendments } from "@/components/territorial/TerritorialAmendments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Globe, Building, MapPin, Users, Vote, TrendingUp, UserPlus, FileText, Edit2, Crown } from "lucide-react";
import type { OrganType, TerritorialLevel } from "@/types/territorial";

const TerritorialGovernance = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<TerritorialLevel>('commune');
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');
  const [selectedOrganId, setSelectedOrganId] = useState<string>('');
  const [selectedOrganType, setSelectedOrganType] = useState<OrganType | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "positions" | "nominations" | "proposals" | "amendments">("overview");

  console.log("TerritorialGovernance render - selectedEntityId:", selectedEntityId, "activeSubTab:", activeSubTab);

  const handleOrganSelect = (organId: string, organType: OrganType) => {
    setSelectedOrganId(organId);
    setSelectedOrganType(organType);
    console.log("Organ selected:", organId, organType);
  };

  const handleEntitySelect = (entityId: string) => {
    console.log("Entity selected:", entityId);
    setSelectedEntityId(entityId);
  };

  // Auto-select first entity when changing levels if none selected
  const handleLevelChange = (newLevel: TerritorialLevel) => {
    setSelectedLevel(newLevel);
    // Keep existing selection if it matches the new level, otherwise clear
    // This will be handled by TerritorialSelector component
  };

  const levelStats = {
    commune: { count: 35000, population: "67M", budget: "180Md€" },
    interco: { count: 1254, population: "65M", budget: "45Md€" },
    region: { count: 13, population: "67M", budget: "35Md€" }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-4xl font-bold mb-2">Gouvernance Territoriale</h1>
            <p className="text-muted-foreground text-lg">
              Structure organisationnelle décentralisée multi-niveaux avec blockchain et IA
            </p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Communes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nombre</span>
                  <span className="font-bold text-blue-600">{levelStats.commune.count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Population</span>
                  <span className="font-semibold">{levelStats.commune.population}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Budget total</span>
                  <span className="font-semibold">{levelStats.commune.budget}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Intercommunalités</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nombre</span>
                  <span className="font-bold text-green-600">{levelStats.interco.count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Population</span>
                  <span className="font-semibold">{levelStats.interco.population}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Budget total</span>
                  <span className="font-semibold">{levelStats.interco.budget}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">Régions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nombre</span>
                  <span className="font-bold text-purple-600">{levelStats.region.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Population</span>
                  <span className="font-semibold">{levelStats.region.population}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Budget total</span>
                  <span className="font-semibold">{levelStats.region.budget}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedLevel} onValueChange={handleLevelChange}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="commune" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Communes
            </TabsTrigger>
            <TabsTrigger value="interco" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Intercommunalités
            </TabsTrigger>
            <TabsTrigger value="region" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Régions
            </TabsTrigger>
          </TabsList>

{/* Tab Content */}
        {["commune", "interco", "region"].map((level) => (
          <TabsContent key={level} value={level} className="space-y-8">
            <TerritorialSelector
              selectedEntityId={selectedEntityId}
              onEntitySelect={handleEntitySelect}
              level={level as TerritorialLevel}
            />
            
            <div className="mb-6">
              {!selectedEntityId ? (
                <div className="p-6 border-2 border-dashed border-muted-foreground/50 rounded-lg text-center bg-muted/20">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-muted-foreground">
                      Sélectionnez un territoire ci-dessus
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pour accéder aux fonctionnalités avancées :<br />
                      📋 <strong>Postes de Direction</strong> • 🗳️ <strong>Nominations</strong> • 📜 <strong>Propositions de Loi</strong> • ✏️ <strong>Amendements</strong>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Sub Navigation */}
                  <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
                    <Button 
                      variant={activeSubTab === "overview" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveSubTab("overview")}
                    >
                      <Building className="h-4 w-4 mr-2" />
                      Vue d'ensemble
                    </Button>
                    <Button 
                      variant={activeSubTab === "positions" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveSubTab("positions")}
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Postes de Direction
                    </Button>
                    <Button 
                      variant={activeSubTab === "nominations" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveSubTab("nominations")}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Nominations
                    </Button>
                    <Button 
                      variant={activeSubTab === "proposals" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveSubTab("proposals")}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Propositions de Loi
                    </Button>
                    <Button 
                      variant={activeSubTab === "amendments" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveSubTab("amendments")}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Amendements
                    </Button>
                  </div>

                  {/* Sub Tab Content */}
                  {activeSubTab === "overview" && (
                    <OrganizationalDashboard
                      territorialEntityId={selectedEntityId}
                      onOrganSelect={handleOrganSelect}
                    />
                  )}
                  
                  {activeSubTab === "positions" && (
                    <TerritorialPositionsOverview
                      territorialEntityId={selectedEntityId}
                      level={level as TerritorialLevel}
                    />
                  )}
                  
                  {activeSubTab === "nominations" && (
                    <TerritorialNominations
                      territorialEntityId={selectedEntityId}
                      level={level as TerritorialLevel}
                    />
                  )}
                  
                  {activeSubTab === "proposals" && (
                    <TerritorialProposals
                      territorialEntityId={selectedEntityId}
                      level={level as TerritorialLevel}
                    />
                  )}
                  
                  {activeSubTab === "amendments" && (
                    <TerritorialAmendments
                      territorialEntityId={selectedEntityId}
                      level={level as TerritorialLevel}
                    />
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
        </Tabs>

        {/* Key Features Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Fonctionnalités Clés
            </CardTitle>
            <CardDescription>
              Technologies et processus innovants pour une gouvernance moderne
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Vote className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Vote On-Chain</h4>
                <p className="text-sm text-muted-foreground">Décisions transparentes et auditables</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Participation Citoyenne</h4>
                <p className="text-sm text-muted-foreground">Budgets participatifs tokenisés</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Building className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Multi-Sig Treasury</h4>
                <p className="text-sm text-muted-foreground">Gestion financière sécurisée</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Globe className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Interopérabilité</h4>
                <p className="text-sm text-muted-foreground">Coordination entre niveaux</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default TerritorialGovernance;