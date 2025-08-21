import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, 
  Heart, 
  Shield, 
  Globe, 
  Calendar,
  Award,
  Stethoscope,
  Search,
  AlertTriangle,
  Activity,
  TrendingUp,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

interface OHSCouncilMember {
  id: string;
  name: string;
  position: string;
  department?: string;
  region?: string;
  term_start: string;
  term_end?: string;
  salary_usd_annual?: number;
  expertise_areas?: string[];
  qualifications?: string;
  is_active: boolean;
  election_id?: string;
  created_at: string;
}

const OHSCouncil = () => {
  const { toast } = useToast();
  const [councilMembers, setCouncilMembers] = useState<OHSCouncilMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCouncilMembers();
  }, []);

  const fetchCouncilMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('ohs_council_members')
        .select('*')
        .order('position', { ascending: true });

      if (error) throw error;
      setCouncilMembers(data || []);
    } catch (error) {
      console.error('Error fetching OHS council members:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les membres du conseil OHS",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPositionLabel = (position: string, department?: string, region?: string) => {
    switch (position) {
      case 'directeur_general':
        return 'Directeur Général OHS';
      case 'membre_conseil':
        return 'Membre du Conseil Mondial';
      case 'directeur_regional':
        return `Directeur Régional ${region}`;
      default:
        return position;
    }
  };

  const getDepartmentLabel = (department?: string) => {
    switch (department) {
      case 'surveillance_epidemiologique':
        return 'Surveillance Épidémiologique';
      case 'intervention_urgence':
        return 'Intervention d\'Urgence';
      case 'recherche_medicale':
        return 'Recherche Médicale';
      case 'sante_preventive':
        return 'Santé Préventive';
      case 'one_health':
        return 'One Health';
      default:
        return department;
    }
  };

  const getDepartmentIcon = (department?: string) => {
    switch (department) {
      case 'surveillance_epidemiologique':
        return Search;
      case 'intervention_urgence':
        return AlertTriangle;
      case 'recherche_medicale':
        return Activity;
      case 'sante_preventive':
        return Shield;
      case 'one_health':
        return Globe;
      default:
        return Stethoscope;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatSalary = (salary?: number) => {
    if (!salary) return 'Non défini';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
    }).format(salary);
  };

  const getTermRemaining = (termEnd?: string) => {
    if (!termEnd) return 'Mandat permanent';
    
    const now = new Date();
    const end = new Date(termEnd);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Mandat expiré';
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    
    if (years > 0) return `${years} an${years > 1 ? 's' : ''} restant${years > 1 ? 's' : ''}`;
    if (months > 0) return `${months} mois restant${months > 1 ? 's' : ''}`;
    return 'Fin de mandat imminente';
  };

  // Regrouper par type de poste
  const directeurGeneral = councilMembers.filter(m => m.position === 'directeur_general' && m.is_active);
  const membresConseil = councilMembers.filter(m => m.position === 'membre_conseil' && m.is_active);
  const directeursRegionaux = councilMembers.filter(m => m.position === 'directeur_regional' && m.is_active);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du conseil OHS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-green-600">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conseil Mondial de la Santé
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Leadership démocratiquement élu pour une gouvernance transparente de la santé mondiale. 
            Experts indépendants élus par la communauté globale.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <Badge variant="outline" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{membresConseil.length}/18 membres élus</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>6 régions représentées</span>
            </Badge>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{directeurGeneral.length}/1</p>
                  <p className="text-sm text-gray-600">Directeur Général</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{membresConseil.length}/18</p>
                  <p className="text-sm text-gray-600">Membres Conseil</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{directeursRegionaux.length}/6</p>
                  <p className="text-sm text-gray-600">Directeurs Régionaux</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{councilMembers.filter(m => m.is_active).length}</p>
                  <p className="text-sm text-gray-600">Total Actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Directeur Général */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6" />
              <span>Direction Exécutive OHS</span>
            </CardTitle>
            <CardDescription className="text-red-50">
              Leadership suprême élu au suffrage universel mondial
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {directeurGeneral.length === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Poste de Directeur Général Vacant
                </h3>
                <p className="text-gray-600 mb-4">
                  Une élection mondiale est nécessaire pour élire le nouveau Directeur Général OHS.
                </p>
                <Button className="gradient-primary">
                  <Calendar className="mr-2 h-4 w-4" />
                  Programmer une Élection
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {directeurGeneral.map((member) => {
                  const DeptIcon = getDepartmentIcon(member.department);
                  return (
                    <Card key={member.id} className="border-2 border-red-200">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-red-100 text-red-600 text-lg">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                              <Badge variant="default" className="bg-red-600">
                                {getPositionLabel(member.position, member.department, member.region)}
                              </Badge>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div className="space-y-2">
                                {member.department && (
                                  <div className="flex items-center space-x-2">
                                    <DeptIcon className="h-4 w-4" />
                                    <span><strong>Département :</strong> {getDepartmentLabel(member.department)}</span>
                                  </div>
                                )}
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4" />
                                  <span><strong>Mandat :</strong> {new Date(member.term_start).toLocaleDateString('fr-FR')} - {getTermRemaining(member.term_end)}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Award className="h-4 w-4" />
                                  <span><strong>Salaire :</strong> {formatSalary(member.salary_usd_annual)} / an</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span><strong>Temps restant :</strong> {getTermRemaining(member.term_end)}</span>
                                </div>
                              </div>
                            </div>

                            {member.expertise_areas && member.expertise_areas.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700 mb-2">Domaines d'expertise :</p>
                                <div className="flex flex-wrap gap-2">
                                  {member.expertise_areas.map((area, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {area}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {member.qualifications && (
                              <div className="mt-3">
                                <p className="text-sm text-gray-600">
                                  <strong>Qualifications :</strong> {member.qualifications}
                                </p>
                              </div>
                            )}
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

        {/* Membres du Conseil */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6" />
              <span>Membres du Conseil Mondial de la Santé</span>
            </CardTitle>
            <CardDescription className="text-blue-50">
              18 experts élus pour représenter l'humanité dans les décisions de santé mondiale
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {membresConseil.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucun membre élu au conseil
                </h3>
                <p className="text-gray-600 mb-4">
                  Des élections sont nécessaires pour constituer le Conseil Mondial de la Santé.
                </p>
                <Button className="gradient-primary">
                  <Calendar className="mr-2 h-4 w-4" />
                  Organiser les Élections
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {membresConseil.map((member) => {
                  const DeptIcon = getDepartmentIcon(member.department);
                  return (
                    <Card key={member.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <Avatar className="h-20 w-20 mx-auto mb-3">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                          <Badge variant="secondary" className="mt-1">
                            Membre du Conseil
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          {member.department && (
                            <div className="flex items-center space-x-2">
                              <DeptIcon className="h-4 w-4" />
                              <span>{getDepartmentLabel(member.department)}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{getTermRemaining(member.term_end)}</span>
                          </div>

                          {member.expertise_areas && member.expertise_areas.length > 0 && (
                            <div className="mt-3">
                              <p className="font-medium mb-2">Expertise :</p>
                              <div className="flex flex-wrap gap-1">
                                {member.expertise_areas.slice(0, 2).map((area, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {area}
                                  </Badge>
                                ))}
                                {member.expertise_areas.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{member.expertise_areas.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {membresConseil.length < 18 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">
                      {18 - membresConseil.length} sièges disponibles
                    </h4>
                    <p className="text-sm text-blue-700">
                      Le conseil peut accueillir jusqu'à 18 membres élus mondialement.
                    </p>
                  </div>
                  <Button variant="outline" className="border-blue-300 text-blue-700">
                    <Users className="mr-2 h-4 w-4" />
                    Candidater
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Directeurs Régionaux */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6" />
              <span>Directeurs Régionaux OHS</span>
            </CardTitle>
            <CardDescription className="text-green-50">
              Leadership régional sélectionné par le processus global OHS
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Afrique', 'Amériques', 'Asie du Sud-Est', 'Europe', 'Méditerranée Orientale', 'Pacifique Occidental'].map((region) => {
                const director = directeursRegionaux.find(d => d.region === region);
                
                return (
                  <Card key={region} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{region}</CardTitle>
                        <Badge variant={director ? "default" : "destructive"}>
                          {director ? "Occupé" : "Vacant"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {director ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-green-100 text-green-600">
                                {getInitials(director.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{director.name}</p>
                              <p className="text-sm text-gray-600">
                                {getTermRemaining(director.term_end)}
                              </p>
                            </div>
                          </div>
                          
                          {director.qualifications && (
                            <p className="text-xs text-gray-500">
                              {director.qualifications.substring(0, 100)}...
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-3">
                            Poste de directeur régional vacant
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            <Calendar className="mr-2 h-3 w-3" />
                            Programmer Élection
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="shadow-lg bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Participez à la gouvernance mondiale de la santé
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Le Conseil Mondial de la Santé recherche des experts dévoués pour servir l'humanité. 
              Votre expertise peut faire la différence.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Candidater au Conseil
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Users className="mr-2 h-5 w-5" />
                Élire les Membres
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OHSCouncil;