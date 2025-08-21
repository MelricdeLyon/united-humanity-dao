import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Vote, Users, Trophy, CheckCircle, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OHSNominationRound from '@/components/ohs/OHSNominationRound';
import OHSPreselectRound from '@/components/ohs/OHSPreselectRound';
import OHSFinalRound from '@/components/ohs/OHSFinalRound';
import OHSElectionTimeline from '@/components/ohs/OHSElectionTimeline';

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
  round_2_start_date: string;
  round_2_end_date: string;
  round_3_start_date: string;
  round_3_end_date: string;
}

const OHSElectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [election, setElection] = useState<OHSElection | null>(null);
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
        .from('ohs_elections')
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
      console.error('Erreur lors du chargement de la nomination OHS:', error);
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

  const getPositionTitle = (position: string, region?: string) => {
    switch (position) {
      case 'directeur_general':
        return 'Directeur Général OHS';
      case 'conseil_mondial':
        return 'Membre du Conseil Mondial de la Santé';
      case 'directeur_regional':
        return `Directeur Régional OHS - ${region}`;
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
              <p>Chargement de la nomination...</p>
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
            <h1 className="text-2xl font-bold mb-2">Nomination introuvable</h1>
            <p className="text-muted-foreground mb-4">Cette nomination n'existe pas ou a été supprimée.</p>
            <Button onClick={() => navigate('/ohs/nominations')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux nominations
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
          <Button variant="ghost" onClick={() => navigate('/ohs/nominations')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux nominations
          </Button>
        </div>

        {/* En-tête de la nomination */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{election.title}</CardTitle>
                <CardDescription className="text-lg">{election.description}</CardDescription>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>{getPositionTitle(election.position, election.region)}</span>
                  </div>
                  {election.region && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Région: {election.region}</span>
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
            <OHSElectionTimeline election={election} />
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
                  <CardTitle>À propos de cette nomination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{election.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Paramètres du processus</h4>
                      <ul className="space-y-1 text-sm">
                        <li>Nomination libre au Tour 1</li>
                        <li>Présélection des meilleurs candidats au Tour 2</li>
                        <li>3 finalistes maximum au Tour 3</li>
                        <li>Vote transparent sur blockchain</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Principes démocratiques</h4>
                      <ul className="space-y-1 text-sm">
                        <li>Un citoyen = Une voix à chaque tour</li>
                        <li>Nominations libres et ouvertes</li>
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
            <OHSNominationRound election={election} />
          </TabsContent>

          <TabsContent value="round2">
            <OHSPreselectRound election={election} />
          </TabsContent>

          <TabsContent value="round3">
            <OHSFinalRound election={election} />
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Résultats de la nomination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Les résultats seront affichés une fois la nomination terminée.
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

export default OHSElectionDetail;