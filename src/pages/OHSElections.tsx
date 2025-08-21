import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  Clock, 
  Users, 
  Vote, 
  Award, 
  Globe,
  Heart,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Target,
  TrendingUp
} from 'lucide-react';

interface OHSElection {
  id: string;
  title: string;
  description: string;
  position: string;
  region?: string;
  current_round: number;
  status: string;
  round_1_start_date: string;
  round_1_end_date: string;
  round_2_start_date?: string;
  round_2_end_date?: string;
  round_3_start_date?: string;
  round_3_end_date?: string;
  created_at: string;
}

const OHSElections = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [elections, setElections] = useState<OHSElection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const { data, error } = await supabase
        .from('ohs_elections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setElections(data || []);
    } catch (error) {
      console.error('Error fetching OHS elections:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les élections OHS",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPositionLabel = (position: string, region?: string) => {
    switch (position) {
      case 'directeur_general':
        return 'Directeur Général OHS';
      case 'conseil_mondial':
        return 'Conseil Mondial de la Santé';
      case 'directeur_regional':
        return `Directeur Régional - ${region}`;
      default:
        return position;
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'directeur_general':
        return Heart;
      case 'conseil_mondial':
        return Users;
      case 'directeur_regional':
        return Globe;
      default:
        return Target;
    }
  };

  const getRoundStatus = (election: OHSElection) => {
    const now = new Date();
    const round1End = new Date(election.round_1_end_date);
    const round2End = election.round_2_end_date ? new Date(election.round_2_end_date) : null;
    const round3End = election.round_3_end_date ? new Date(election.round_3_end_date) : null;

    if (election.status === 'completed') {
      return { text: 'Terminée', variant: 'secondary' as const, icon: CheckCircle };
    }

    if (now <= round1End) {
      return { text: 'Tour 1 - Nominations', variant: 'default' as const, icon: Vote };
    } else if (round2End && now <= round2End) {
      return { text: 'Tour 2 - Présélection', variant: 'secondary' as const, icon: Users };
    } else if (round3End && now <= round3End) {
      return { text: 'Tour 3 - Vote Final', variant: 'destructive' as const, icon: Award };
    } else {
      return { text: 'En attente', variant: 'outline' as const, icon: Clock };
    }
  };

  const getTimeRemaining = (election: OHSElection) => {
    const now = new Date();
    let targetDate: Date;

    if (election.current_round === 1) {
      targetDate = new Date(election.round_1_end_date);
    } else if (election.current_round === 2 && election.round_2_end_date) {
      targetDate = new Date(election.round_2_end_date);
    } else if (election.current_round === 3 && election.round_3_end_date) {
      targetDate = new Date(election.round_3_end_date);
    } else {
      return 'Date non définie';
    }

    const diff = targetDate.getTime() - now.getTime();
    if (diff <= 0) return 'Terminé';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} jour${days > 1 ? 's' : ''} restant${days > 1 ? 's' : ''}`;
    return `${hours} heure${hours > 1 ? 's' : ''} restante${hours > 1 ? 's' : ''}`;
  };

  const getElectionProgress = (election: OHSElection) => {
    if (election.status === 'completed') return 100;
    return ((election.current_round - 1) / 3) * 100 + (election.current_round <= 3 ? 33.33 : 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des élections OHS...</p>
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
              <Vote className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Élections OHS
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Démocratie mondiale de la santé : chaque citoyen a une voix dans l'élection des dirigeants de l'Organisation Humaine de la Santé.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <Badge variant="outline" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>8.1 milliards d'électeurs potentiels</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Vote sécurisé en ligne</span>
            </Badge>
          </div>
        </div>

        {/* Statistiques générales */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Vote className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{elections.filter(e => e.status === 'active').length}</p>
                  <p className="text-sm text-gray-600">Élections Actives</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{elections.filter(e => e.status === 'completed').length}</p>
                  <p className="text-sm text-gray-600">Élections Terminées</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {elections.filter(e => e.position === 'conseil_mondial').length}
                  </p>
                  <p className="text-sm text-gray-600">Sièges au Conseil</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-gray-600">Régions OHS</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des élections */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Élections en Cours et Programmées</h2>
            <Button className="gradient-primary">
              <Vote className="mr-2 h-4 w-4" />
              Consulter le Guide Electoral
            </Button>
          </div>

          {elections.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucune élection programmée
                </h3>
                <p className="text-gray-600">
                  Les prochaines élections OHS seront annoncées prochainement.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {elections.map((election) => {
                const roundStatus = getRoundStatus(election);
                const PositionIcon = getPositionIcon(election.position);
                const StatusIcon = roundStatus.icon;

                return (
                  <Card 
                    key={election.id} 
                    className="shadow-lg hover:shadow-xl transition-all cursor-pointer border-l-4 border-l-blue-600"
                    onClick={() => navigate(`/ohs/elections/${election.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <PositionIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-2">
                              {getPositionLabel(election.position, election.region)}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {election.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={roundStatus.variant} className="mb-2">
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {roundStatus.text}
                          </Badge>
                          <p className="text-sm text-gray-500">
                            <Clock className="inline mr-1 h-3 w-3" />
                            {getTimeRemaining(election)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progression de l'élection</span>
                            <span>{Math.round(getElectionProgress(election))}%</span>
                          </div>
                          <Progress value={getElectionProgress(election)} className="h-2" />
                        </div>

                        {/* Election Details */}
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>
                              <strong>Début :</strong> {new Date(election.round_1_start_date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-gray-400" />
                            <span>
                              <strong>Tour actuel :</strong> {election.current_round}/3
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-gray-400" />
                            <span>
                              <strong>Statut :</strong> {election.status === 'active' ? 'Active' : 'Terminée'}
                            </span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-2">
                          <Button 
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/ohs/elections/${election.id}`);
                            }}
                          >
                            {election.status === 'active' ? 'Participer à l\'Élection' : 'Voir les Résultats'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 shadow-lg bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Votre voix compte dans la santé mondiale
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Participez à la première démocratie mondiale de la santé. 
              Élisez les dirigeants qui défendront votre droit à la santé.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" size="lg">
                <Users className="mr-2 h-5 w-5" />
                S'inscrire pour Voter
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Vote className="mr-2 h-5 w-5" />
                Guide du Votant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OHSElections;