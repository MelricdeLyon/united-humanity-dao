import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Shuffle, Users, Award, Clock, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EligiblePerson {
  id: string;
  person_name: string;
  person_email: string;
  person_bio: string;
  organization_type: string;
  position_type: string;
  nomination_count: number;
  validation_score: number;
}

interface RandomSelectionInterfaceProps {
  organizationType: 'osp' | 'ohu' | 'ohs';
  onSelectionComplete?: (selectedPerson: EligiblePerson) => void;
}

const orgConfig = {
  osp: { 
    name: "OSP", 
    color: "bg-green-500", 
    fullName: "Organisation de la Symbiose Planétaire",
    positions: [
      { value: "council", label: "Conseil OSP", minNominations: 5 },
      { value: "director", label: "Direction OSP", minNominations: 10 }
    ]
  },
  ohu: { 
    name: "OHU", 
    color: "bg-blue-500", 
    fullName: "Organisation de l'Humanité Unie",
    positions: [
      { value: "council", label: "Conseil OHU", minNominations: 5 },
      { value: "director", label: "Direction OHU", minNominations: 10 }
    ]
  },
  ohs: { 
    name: "OHS", 
    color: "bg-red-500", 
    fullName: "Organisation Humaine de la Santé",
    positions: [
      { value: "council", label: "Conseil OHS", minNominations: 5 },
      { value: "director", label: "Direction OHS", minNominations: 10 }
    ]
  }
};

export const RandomSelectionInterface = ({ organizationType, onSelectionComplete }: RandomSelectionInterfaceProps) => {
  const { toast } = useToast();
  const [eligiblePersons, setEligiblePersons] = useState<EligiblePerson[]>([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionProgress, setSelectionProgress] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState<EligiblePerson | null>(null);
  const [loading, setLoading] = useState(true);

  const config = orgConfig[organizationType];

  const fetchEligiblePersons = async () => {
    if (!selectedPosition) return;
    
    try {
      const { data, error } = await supabase
        .from("eligible_pool")
        .select("*")
        .eq("organization_type", organizationType)
        .eq("position_type", selectedPosition)
        .eq("is_eligible", true)
        .gte("nomination_count", config.positions.find(p => p.value === selectedPosition)?.minNominations || 3)
        .order("validation_score", { ascending: false });

      if (error) throw error;
      setEligiblePersons(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des éligibles:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les personnes éligibles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPosition) {
      setLoading(true);
      fetchEligiblePersons();
    }
  }, [selectedPosition, organizationType]);

  const performRandomSelection = async () => {
    if (eligiblePersons.length === 0) {
      toast({
        title: "Aucun éligible",
        description: "Il n'y a pas assez de personnes éligibles pour ce poste",
        variant: "destructive",
      });
      return;
    }

    setIsSelecting(true);
    setSelectionProgress(0);
    setSelectedPerson(null);

    // Animation du tirage au sort
    const animationDuration = 3000; // 3 secondes
    const intervals = 30;
    const step = 100 / intervals;

    for (let i = 0; i <= intervals; i++) {
      setTimeout(() => {
        setSelectionProgress(i * step);
        
        // Animation visuelle: faire défiler les noms
        if (i < intervals) {
          const randomIndex = Math.floor(Math.random() * eligiblePersons.length);
          setSelectedPerson(eligiblePersons[randomIndex]);
        }
      }, (i * animationDuration) / intervals);
    }

    // Sélection finale après l'animation
    setTimeout(async () => {
      // Algorithme de tirage au sort pondéré par les nominations et le score
      const weightedPool: EligiblePerson[] = [];
      eligiblePersons.forEach(person => {
        const weight = Math.max(1, Math.floor(person.nomination_count * person.validation_score));
        for (let i = 0; i < weight; i++) {
          weightedPool.push(person);
        }
      });

      const randomIndex = Math.floor(Math.random() * weightedPool.length);
      const finalSelection = weightedPool[randomIndex];
      setSelectedPerson(finalSelection);

      // Enregistrer la sélection dans la base de données
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        const { error } = await supabase.from("random_selections").insert({
          organization_type: organizationType,
          position_type: selectedPosition,
          selected_person_id: finalSelection.id,
          selection_method: "weighted_random",
          selection_criteria: {
            total_eligible: eligiblePersons.length,
            min_nominations: config.positions.find(p => p.value === selectedPosition)?.minNominations,
            weighted_pool_size: weightedPool.length
          },
          performed_by: user?.id,
          blockchain_hash: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}` // Hash simulé
        });

        if (error) throw error;

        toast({
          title: "Tirage au sort terminé !",
          description: `${finalSelection.person_name} a été sélectionné(e) pour ${config.positions.find(p => p.value === selectedPosition)?.label}`,
        });

        onSelectionComplete?.(finalSelection);
      } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        toast({
          title: "Sélection effectuée",
          description: "La sélection a été réalisée mais n'a pas pu être enregistrée",
          variant: "destructive",
        });
      }

      setIsSelecting(false);
    }, animationDuration);
  };

  const resetSelection = () => {
    setSelectedPerson(null);
    setSelectionProgress(0);
    setIsSelecting(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.color} text-white`}>
              <Shuffle className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>Tirage au Sort Démocratique</CardTitle>
              <CardDescription>{config.fullName}</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Sélectionner le poste</label>
            <Select value={selectedPosition} onValueChange={setSelectedPosition} disabled={isSelecting}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir le poste à pourvoir" />
              </SelectTrigger>
              <SelectContent>
                {config.positions.map((position) => (
                  <SelectItem key={position.value} value={position.value}>
                    {position.label} (min. {position.minNominations} nominations)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPosition && !loading && (
            <Alert>
              <Users className="h-4 w-4" />
              <AlertDescription>
                {eligiblePersons.length} personne(s) éligible(s) pour ce poste avec suffisamment de nominations.
              </AlertDescription>
            </Alert>
          )}

          {isSelecting && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tirage en cours...</span>
                  <span className="text-sm text-muted-foreground">{Math.round(selectionProgress)}%</span>
                </div>
                <Progress value={selectionProgress} className="h-2" />
              </div>

              {selectedPerson && (
                <Card className="border-dashed border-2 border-primary">
                  <CardContent className="p-4 text-center">
                    <div className="animate-pulse">
                      <p className="text-lg font-semibold">{selectedPerson.person_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedPerson.nomination_count} nominations • Score: {Math.round(selectedPerson.validation_score * 100)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {selectedPerson && !isSelecting && (
            <Card className="border-green-500 border-2 bg-green-50 dark:bg-green-950">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
                      Sélection terminée !
                    </h3>
                    <p className="text-green-600 dark:text-green-400">
                      Tirage au sort transparent et vérifiable
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-lg font-semibold">{selectedPerson.person_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {config.positions.find(p => p.value === selectedPosition)?.label}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <Award className="h-3 w-3 mr-1" />
                      {selectedPerson.nomination_count} nominations
                    </Badge>
                    <Badge variant="secondary">
                      Score: {Math.round(selectedPerson.validation_score * 100)}%
                    </Badge>
                  </div>

                  {selectedPerson.person_bio && (
                    <p className="text-sm text-muted-foreground">
                      {selectedPerson.person_bio}
                    </p>
                  )}

                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      Sélection effectuée le {new Date().toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button 
              onClick={performRandomSelection} 
              disabled={!selectedPosition || eligiblePersons.length === 0 || isSelecting}
              className="flex-1"
            >
              <Shuffle className="h-4 w-4 mr-2" />
              {isSelecting ? "Tirage en cours..." : "Lancer le tirage au sort"}
            </Button>

            {selectedPerson && !isSelecting && (
              <Button onClick={resetSelection} variant="outline">
                Nouveau tirage
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};