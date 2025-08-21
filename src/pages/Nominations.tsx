import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Vote, Clock, Users, Trophy, AlertCircle, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Nomination {
  id: string;
  title: string;
  description: string;
  position: string;
  department?: string;
  current_round: number;
  status: string;
  round_1_start_date: string;
  round_1_end_date: string;
  round_2_start_date: string;
  round_2_end_date: string;
  round_3_start_date: string;
  round_3_end_date: string;
  created_at: string;
}

const Nominations = () => {
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNominations();
  }, []);

  const fetchNominations = async () => {
    try {
      const { data, error } = await supabase
        .from('elections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNominations(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des nominations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string, currentRound: number) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Tour {currentRound} - Actif</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">À venir</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Terminé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoundDescription = (currentRound: number) => {
    switch (currentRound) {
      case 1:
        return "Nominations libres par tous les citoyens";
      case 2:
        return "Présélection et campagne des candidats";
      case 3:
        return "Vote final entre les finalistes";
      default:
        return "Élection terminée";
    }
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const diff = end - now;
    
    if (diff <= 0) return "Terminé";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}j ${hours}h restantes`;
    return `${hours}h restantes`;
  };

  const getCurrentRoundEndDate = (nomination: Nomination) => {
    switch (nomination.current_round) {
      case 1:
        return nomination.round_1_end_date;
      case 2:
        return nomination.round_2_end_date;
      case 3:
        return nomination.round_3_end_date;
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Chargement des élections...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Nominations de l'Humanité Unie</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Système de nomination en entonnoir à 3 tours : chaque citoyen nomme, présélectionne et sélectionne 
            les dirigeants de l'Organisation de l'Humanité Unie
          </p>
        </div>

        {/* Explicateur du système */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5" />
              Comment fonctionne le système d'entonnoir ?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">1</div>
                <h4 className="font-semibold mb-2">Nominations Libres</h4>
                <p className="text-sm text-muted-foreground">Chaque citoyen peut nominer n'importe quelle personne compétente</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">2</div>
                <h4 className="font-semibold mb-2">Présélection & Campagne</h4>
                <p className="text-sm text-muted-foreground">Les plus nominés présentent leur vision, pétitions possibles</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">3</div>
                <h4 className="font-semibold mb-2">Vote Final</h4>
                <p className="text-sm text-muted-foreground">Vote démocratique entre les 3 finalistes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des élections */}
        <div className="grid gap-6">
          {nominations.map((nomination) => (
            <Card key={nomination.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/nominations/${nomination.id}`)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{nomination.title}</CardTitle>
                    <CardDescription>{nomination.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(nomination.status, nomination.current_round)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {nomination.position === 'president' && 'Président de l\'Humanité'}
                      {nomination.position === 'secretary_general' && 'Secrétaire Général'}
                      {nomination.position === 'conseil_member' && 'Membre du Conseil'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{getRoundDescription(nomination.current_round)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {nomination.status === 'active' 
                        ? getTimeRemaining(getCurrentRoundEndDate(nomination))
                        : 'Voir détails'
                      }
                    </span>
                  </div>
                </div>
                
                {nomination.status === 'active' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progression Tour {nomination.current_round}</span>
                      <span>{getTimeRemaining(getCurrentRoundEndDate(nomination))}</span>
                    </div>
                    <Progress value={33 * nomination.current_round} className="h-2" />
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <Badge variant="outline">Système Blockchain</Badge>
                    <Badge variant="outline">Transparence Totale</Badge>
                  </div>
                  <Button className="gradient-primary">
                    {nomination.status === 'active' && nomination.current_round === 1 && 'Nominer'}
                    {nomination.status === 'active' && nomination.current_round === 2 && 'Présélectionner'}
                    {nomination.status === 'active' && nomination.current_round === 3 && 'Voter'}
                    {nomination.status !== 'active' && 'Voir Détails'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {nominations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune élection en cours</h3>
              <p className="text-muted-foreground">
                Les prochaines élections de l'Organisation de l'Humanité Unie seront bientôt annoncées.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Nominations;