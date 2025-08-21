import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RandomSelectionInterface } from "@/components/RandomSelectionInterface";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shuffle, History, Clock, Award, Users, Globe, Shield, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SelectionHistory {
  id: string;
  organization_type: string;
  position_type: string;
  selected_person: {
    person_name: string;
    person_email: string;
    nomination_count: number;
    validation_score: number;
  };
  performed_at: string;
  blockchain_hash: string;
  is_active: boolean;
}

export default function RandomSelection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeOrg, setActiveOrg] = useState<'osp' | 'ohu' | 'ohs'>('osp');
  const [selectionHistory, setSelectionHistory] = useState<SelectionHistory[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const organizations = [
    {
      id: 'osp' as const,
      name: 'Organisation de la Symbiose Planétaire',
      shortName: 'OSP',
      icon: Globe,
      color: 'bg-green-500',
      description: 'Tirage au sort pour la gouvernance écologique'
    },
    {
      id: 'ohu' as const,
      name: 'Organisation de l\'Humanité Unie',
      shortName: 'OHU',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Tirage au sort pour les droits humains'
    },
    {
      id: 'ohs' as const,
      name: 'Organisation Humaine de la Santé',
      shortName: 'OHS',
      icon: Stethoscope,
      color: 'bg-red-500',
      description: 'Tirage au sort pour la santé publique'
    }
  ];

  const fetchSelectionHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("random_selections")
        .select(`
          *,
          selected_person:eligible_pool(
            person_name,
            person_email,
            nomination_count,
            validation_score
          )
        `)
        .order("performed_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setSelectionHistory(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement de l'historique:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique des tirages au sort",
        variant: "destructive",
      });
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchSelectionHistory();
  }, []);

  const handleSelectionComplete = () => {
    fetchSelectionHistory();
    toast({
      title: "Tirage au sort terminé !",
      description: "La sélection a été enregistrée dans l'historique",
    });
  };

  const getOrgConfig = (orgType: string) => {
    return organizations.find(org => org.id === orgType) || organizations[0];
  };

  const getPositionLabel = (positionType: string) => {
    const labels = {
      council: "Conseil",
      director: "Direction",
      specialist: "Spécialiste"
    };
    return labels[positionType as keyof typeof labels] || positionType;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-primary to-primary-foreground text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Shuffle className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tirage au Sort Démocratique
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Sélection transparente et équitable des Humanéticiens par tirage au sort
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Award className="h-3 w-3 mr-1" />
                Transparent
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Users className="h-3 w-3 mr-1" />
                Équitable
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Blockchain vérifiable
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Sélection d'organisation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {organizations.map((org) => {
            const IconComponent = org.icon;
            const isActive = activeOrg === org.id;
            
            return (
              <Card 
                key={org.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setActiveOrg(org.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${org.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{org.shortName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {isActive ? 'Sélectionné' : 'Cliquer pour sélectionner'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{org.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contenu principal */}
        <Tabs defaultValue="selection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="selection">Nouveau Tirage</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="selection" className="space-y-6">
            <RandomSelectionInterface 
              organizationType={activeOrg}
              onSelectionComplete={handleSelectionComplete}
            />

            <Card>
              <CardHeader>
                <CardTitle>Processus de tirage au sort</CardTitle>
                <CardDescription>
                  Comment fonctionne notre système de sélection transparent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full inline-block">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold">Pool d'éligibles</h3>
                    <p className="text-sm text-muted-foreground">
                      Seules les personnes avec suffisamment de nominations participent
                    </p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full inline-block">
                      <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold">Tirage pondéré</h3>
                    <p className="text-sm text-muted-foreground">
                      Les chances augmentent avec le nombre de nominations et le score
                    </p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full inline-block">
                      <Shuffle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold">Transparence</h3>
                    <p className="text-sm text-muted-foreground">
                      Chaque tirage est enregistré avec une hash blockchain
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button onClick={() => navigate('/nominate-residents')} variant="outline">
                    Nominer des habitants
                  </Button>
                  <Button onClick={() => navigate('/governance')} variant="outline">
                    Retour à la gouvernance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <History className="h-6 w-6" />
                  <div>
                    <CardTitle>Historique des tirages au sort</CardTitle>
                    <CardDescription>
                      Tous les tirages effectués avec traçabilité blockchain
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {loadingHistory ? (
                  <div className="text-center py-8">
                    <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Chargement de l'historique...</p>
                  </div>
                ) : selectionHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Shuffle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucun tirage au sort effectué pour le moment</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Effectuez votre premier tirage dans l'onglet "Nouveau Tirage"
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectionHistory.map((selection) => {
                      const orgConfig = getOrgConfig(selection.organization_type);
                      const IconComponent = orgConfig.icon;

                      return (
                        <Card key={selection.id} className="relative">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`p-2 rounded-lg ${orgConfig.color} text-white`}>
                                  <IconComponent className="h-5 w-5" />
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold">
                                      {selection.selected_person?.person_name}
                                    </h3>
                                    <Badge className={orgConfig.color}>
                                      {orgConfig.shortName}
                                    </Badge>
                                    <Badge variant="outline">
                                      {getPositionLabel(selection.position_type)}
                                    </Badge>
                                    {selection.is_active && (
                                      <Badge variant="default">Actif</Badge>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>
                                      <Award className="h-3 w-3 inline mr-1" />
                                      {selection.selected_person?.nomination_count} nominations • 
                                      Score: {Math.round((selection.selected_person?.validation_score || 0) * 100)}%
                                    </p>
                                    <p>
                                      <Clock className="h-3 w-3 inline mr-1" />
                                      Sélectionné le {new Date(selection.performed_at).toLocaleDateString('fr-FR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                    {selection.blockchain_hash && (
                                      <p className="font-mono text-xs">
                                        Hash: {selection.blockchain_hash.substring(0, 20)}...
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}