import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Vote, Users, Clock, Trophy, CheckCircle, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NominationRound from '@/components/nominations/NominationRound';
import PreselectRound from '@/components/nominations/PreselectRound';
import FinalRound from '@/components/nominations/FinalRound';
import NominationTimeline from '@/components/nominations/NominationTimeline';

interface Election {
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
  min_nominations_for_round_2: number;
  max_candidates_round_2: number;
  max_finalists_round_3: number;
}

const ElectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [election, setElection] = useState<Election | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchElection(id);
    }
  }, [id]);

  const fetchElection = async (electionId: string) => {
    try {
      const { data, error } = await supabase
        .from('elections')
        .select('*')
        .eq('id', electionId)
        .single();

      if (error) throw error;
      setElection(data);
      
      // Auto-switch to current round tab if election is active
      if (data?.status === 'active') {
        setActiveTab(`round${data.current_round}`);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'élection:', error);
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

  const getPositionTitle = (position: string) => {
    switch (position) {
      case 'president':
        return 'Président de l\'Humanité Unie';
      case 'secretary_general':
        return 'Secrétaire Général';
      case 'conseil_member':
        return 'Membre du Conseil de Sécurité';
      default:
        return position;
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
              <p>Chargement de l'élection...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!election) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Élection introuvable</h1>
            <p className="text-muted-foreground mb-4">Cette élection n'existe pas ou a été supprimée.</p>
            <Button onClick={() => navigate('/elections')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux élections
            </Button>
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
        {/* Navigation */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/elections')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux élections
          </Button>
        </div>

        {/* En-tête de l'élection */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{election.title}</CardTitle>
                <CardDescription className="text-lg">{election.description}</CardDescription>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>{getPositionTitle(election.position)}</span>
                  </div>
                  {election.department && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Département: {election.department}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(election.status, election.current_round)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <NominationTimeline election={election} />
          </CardContent>
        </Card>

        {/* Onglets principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="round1" disabled={election.status === 'upcoming'}>
              Tour 1 - Nominations
              {election.current_round === 1 && election.status === 'active' && (
                <CheckCircle className="ml-1 h-3 w-3 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="round2" disabled={election.current_round < 2}>
              Tour 2 - Présélection
              {election.current_round === 2 && election.status === 'active' && (
                <CheckCircle className="ml-1 h-3 w-3 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="round3" disabled={election.current_round < 3}>
              Tour 3 - Vote Final
              {election.current_round === 3 && election.status === 'active' && (
                <CheckCircle className="ml-1 h-3 w-3 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="results" disabled={election.status !== 'completed'}>
              Résultats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>À propos de cette élection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{election.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Paramètres du processus</h4>
                      <ul className="space-y-1 text-sm">
                        <li>Minimum {election.min_nominations_for_round_2} nominations pour le tour 2</li>
                        <li>Maximum {election.max_candidates_round_2} candidats au tour 2</li>
                        <li>{election.max_finalists_round_3} finalistes au tour 3</li>
                        <li>Vote transparent sur blockchain</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Principes démocratiques</h4>
                      <ul className="space-y-1 text-sm">
                        <li>Un citoyen = Une voix à chaque tour</li>
                        <li>Candidatures libres et ouvertes</li>
                        <li>Transparence totale du processus</li>
                        <li>Légitimité par le peuple</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="round1">
            <NominationRound election={election} />
          </TabsContent>

          <TabsContent value="round2">
            <PreselectRound election={election} />
          </TabsContent>

          <TabsContent value="round3">
            <FinalRound election={election} />
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Résultats de l'élection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Les résultats seront affichés une fois l'élection terminée.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ElectionDetail;