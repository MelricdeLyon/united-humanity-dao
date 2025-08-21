import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Award, Search, Filter, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface EligiblePerson {
  id: string;
  person_name: string;
  person_email: string;
  person_bio: string;
  organization_type: string;
  position_type: string;
  nomination_count: number;
  validation_score: number;
  skills: any;
  reputation_score: number;
  created_at: string;
}

interface EligiblePoolViewerProps {
  organizationType?: 'osp' | 'ohu' | 'ohs' | 'all';
  positionType?: string;
  showActions?: boolean;
}

const orgConfig = {
  osp: { name: "OSP", color: "bg-green-500", fullName: "Organisation de la Symbiose Planétaire" },
  ohu: { name: "OHU", color: "bg-blue-500", fullName: "Organisation de l'Humanité Unie" },
  ohs: { name: "OHS", color: "bg-red-500", fullName: "Organisation Humaine de la Santé" }
};

export const EligiblePoolViewer = ({ 
  organizationType = 'all', 
  positionType = '',
  showActions = true 
}: EligiblePoolViewerProps) => {
  const { toast } = useToast();
  const [eligiblePersons, setEligiblePersons] = useState<EligiblePerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOrg, setFilterOrg] = useState<string>(organizationType === 'all' ? 'all' : organizationType);
  const [filterPosition, setFilterPosition] = useState<string>(positionType);

  const fetchEligiblePool = async () => {
    try {
      let query = supabase
        .from("eligible_pool")
        .select("*")
        .eq("is_eligible", true)
        .order("nomination_count", { ascending: false });

      if (organizationType !== 'all') {
        query = query.eq("organization_type", organizationType);
      }

      if (positionType) {
        query = query.eq("position_type", positionType);
      }

      const { data, error } = await query;

      if (error) throw error;
      const processedData = (data || []).map(person => ({
        ...person,
        skills: Array.isArray(person.skills) ? person.skills : []
      }));
      setEligiblePersons(processedData);
    } catch (error) {
      console.error("Erreur lors de la récupération du pool:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le pool d'éligibles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEligiblePool();
  }, [organizationType, positionType]);

  const filteredPersons = eligiblePersons.filter(person => {
    const matchesSearch = person.person_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.person_bio?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrg = filterOrg === 'all' || person.organization_type === filterOrg;
    const matchesPosition = !filterPosition || person.position_type === filterPosition;
    
    return matchesSearch && matchesOrg && matchesPosition;
  });

  const getQualificationLevel = (score: number, nominations: number) => {
    if (nominations >= 10 && score >= 0.8) return { level: "Excellent", color: "bg-green-500", variant: "default" as const };
    if (nominations >= 5 && score >= 0.6) return { level: "Qualifié", color: "bg-blue-500", variant: "secondary" as const };
    if (nominations >= 3) return { level: "Éligible", color: "bg-yellow-500", variant: "outline" as const };
    return { level: "En cours", color: "bg-gray-500", variant: "outline" as const };
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>Pool d'Éligibles</CardTitle>
              <CardDescription>
                Habitants nominés pour le tirage au sort démocratique
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nom ou compétences..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {organizationType === 'all' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Organisation</label>
                <Select value={filterOrg} onValueChange={setFilterOrg}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les organisations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les organisations</SelectItem>
                    <SelectItem value="osp">OSP - Symbiose Planétaire</SelectItem>
                    <SelectItem value="ohu">OHU - Humanité Unie</SelectItem>
                    <SelectItem value="ohs">OHS - Santé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Poste</label>
              <Select value={filterPosition} onValueChange={setFilterPosition}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les postes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les postes</SelectItem>
                  <SelectItem value="council">Conseil</SelectItem>
                  <SelectItem value="director">Direction</SelectItem>
                  <SelectItem value="specialist">Spécialiste</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{filteredPersons.length}</p>
                <p className="text-sm text-muted-foreground">Habitants éligibles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">
                  {filteredPersons.filter(p => getQualificationLevel(p.validation_score, p.nomination_count).level === "Excellent").length}
                </p>
                <p className="text-sm text-muted-foreground">Excellents candidats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(filteredPersons.reduce((acc, p) => acc + p.nomination_count, 0) / filteredPersons.length || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Nominations moyennes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des éligibles */}
      <div className="space-y-4">
        {filteredPersons.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun habitant éligible trouvé</p>
              <p className="text-sm text-muted-foreground mt-2">
                Affinez vos critères de recherche ou participez aux nominations
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredPersons.map((person) => {
            const qualification = getQualificationLevel(person.validation_score, person.nomination_count);
            const config = orgConfig[person.organization_type as keyof typeof orgConfig];

            return (
              <Card key={person.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold">{person.person_name}</h3>
                        <Badge className={config.color}>{config.name}</Badge>
                        <Badge variant={qualification.variant}>{qualification.level}</Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <p className="text-sm">
                          <span className="font-medium">Poste:</span> {person.position_type === 'council' ? 'Conseil' : person.position_type === 'director' ? 'Direction' : 'Spécialiste'}
                        </p>
                        {person.person_email && (
                          <p className="text-sm">
                            <span className="font-medium">Email:</span> {person.person_email}
                          </p>
                        )}
                      </div>

                      {person.person_bio && (
                        <p className="text-sm text-muted-foreground mb-4">
                          {person.person_bio}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 mb-3">
                        {person.skills?.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-primary">{person.nomination_count}</span>
                        <span className="text-xs text-muted-foreground">Nominations</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-lg font-semibold">{Math.round(person.validation_score * 100)}%</span>
                        <span className="text-xs text-muted-foreground">Score</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};