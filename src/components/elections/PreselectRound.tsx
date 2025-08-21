import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Vote, Users, Clock, CheckCircle, FileText, Plus, Heart } from 'lucide-react';

interface Election {
  id: string;
  current_round: number;
  status: string;
  round_2_end_date: string;
  max_candidates_round_2: number;
  max_finalists_round_3: number;
}

interface Candidate {
  id: string;
  person_name: string;
  person_email?: string;
  person_bio?: string;
  nomination_count: number;
  acceptance_status: string;
  presentation_text?: string;
  vision_statement?: string;
  experience_summary?: string;
  profile_image_url?: string;
}

interface PreselectRoundProps {
  election: Election;
}

const PreselectRound: React.FC<PreselectRoundProps> = ({ election }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [userVotes, setUserVotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCandidates();
    fetchUserVotes();
  }, [election.id]);

  const fetchCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('election_id', election.id)
        .eq('round_qualified', 2)
        .order('nomination_count', { ascending: false });

      if (error) throw error;
      setCandidates(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des candidats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserVotes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('citizen_votes')
        .select('candidate_id')
        .eq('election_id', election.id)
        .eq('voter_id', user.id)
        .eq('round_number', 2);

      if (error) throw error;
      setUserVotes(data?.map(vote => vote.candidate_id) || []);
    } catch (error) {
      console.error('Erreur lors du chargement des votes:', error);
    }
  };

  const handleVote = async (candidateId: string) => {
    if (userVotes.length >= election.max_finalists_round_3) {
      toast({
        title: "Limite atteinte",
        description: `Vous ne pouvez sélectionner que ${election.max_finalists_round_3} candidats maximum`,
        variant: "destructive",
      });
      return;
    }

    setVoting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour voter",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('citizen_votes')
        .insert({
          election_id: election.id,
          voter_id: user.id,
          candidate_id: candidateId,
          round_number: 2
        });

      if (error) throw error;

      setUserVotes([...userVotes, candidateId]);
      
      const candidate = candidates.find(c => c.id === candidateId);
      toast({
        title: "Vote enregistré !",
        description: `Vous avez voté pour ${candidate?.person_name}`,
      });
    } catch (error) {
      console.error('Erreur lors du vote:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer votre vote",
        variant: "destructive",
      });
    } finally {
      setVoting(false);
    }
  };

  const handleRemoveVote = async (candidateId: string) => {
    setVoting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('citizen_votes')
        .delete()
        .eq('election_id', election.id)
        .eq('voter_id', user.id)
        .eq('candidate_id', candidateId)
        .eq('round_number', 2);

      if (error) throw error;

      setUserVotes(userVotes.filter(id => id !== candidateId));
      
      const candidate = candidates.find(c => c.id === candidateId);
      toast({
        title: "Vote retiré",
        description: `Vote retiré pour ${candidate?.person_name}`,
      });
    } catch (error) {
      console.error('Erreur lors du retrait du vote:', error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer votre vote",
        variant: "destructive",
      });
    } finally {
      setVoting(false);
    }
  };

  const getTimeRemaining = () => {
    const now = new Date().getTime();
    const end = new Date(election.round_2_end_date).getTime();
    const diff = end - now;
    
    if (diff <= 0) return "Terminé";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}j ${hours}h restantes`;
    return `${hours}h restantes`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isRoundActive = election.status === 'active' && election.current_round === 2;
  const canVote = isRoundActive && userVotes.length < election.max_finalists_round_3;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement des candidats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statut du tour */}
      <Card className={`border-2 ${isRoundActive ? 'border-orange-500 bg-orange-50/50' : 'border-muted'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            Tour 2 - Présélection & Campagne
            {isRoundActive && <Badge className="bg-orange-500">En cours</Badge>}
          </CardTitle>
          <CardDescription>
            Sélectionnez jusqu'à {election.max_finalists_round_3} candidats pour passer au tour final.
            {isRoundActive && (
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{getTimeRemaining()}</span>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{candidates.length} candidats qualifiés</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>{election.max_finalists_round_3} finalistes à sélectionner</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>{userVotes.length} / {election.max_finalists_round_3} votes utilisés</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {candidates.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun candidat qualifié</h3>
            <p className="text-muted-foreground">
              Les candidats seront affichés une fois les nominations du Tour 1 terminées.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className={`transition-all ${userVotes.includes(candidate.id) ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={candidate.profile_image_url} />
                      <AvatarFallback className="text-lg">
                        {getInitials(candidate.person_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{candidate.person_name}</CardTitle>
                      {candidate.person_email && (
                        <CardDescription>{candidate.person_email}</CardDescription>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">
                          {candidate.nomination_count} nomination{candidate.nomination_count > 1 ? 's' : ''}
                        </Badge>
                        <Badge variant={candidate.acceptance_status === 'accepted' ? 'default' : 'outline'}>
                          {candidate.acceptance_status === 'accepted' ? 'Candidature acceptée' : 'En attente'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {userVotes.includes(candidate.id) ? (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRemoveVote(candidate.id)}
                        disabled={voting || !isRoundActive}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Retirer le vote
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleVote(candidate.id)}
                        disabled={voting || !canVote}
                        className="gradient-primary"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Sélectionner
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="bio" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="bio">Biographie</TabsTrigger>
                    <TabsTrigger value="vision">Vision</TabsTrigger>
                    <TabsTrigger value="experience">Expérience</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="bio" className="mt-4">
                    <div className="space-y-3">
                      {candidate.person_bio && (
                        <div>
                          <h4 className="font-semibold mb-2">Présentation</h4>
                          <p className="text-sm text-muted-foreground">{candidate.person_bio}</p>
                        </div>
                      )}
                      
                      {candidate.presentation_text && (
                        <div>
                          <h4 className="font-semibold mb-2">Déclaration de candidature</h4>
                          <p className="text-sm">{candidate.presentation_text}</p>
                        </div>
                      )}
                      
                      {!candidate.person_bio && !candidate.presentation_text && (
                        <div className="text-center py-6 text-muted-foreground">
                          <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Aucune présentation disponible</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="vision" className="mt-4">
                    {candidate.vision_statement ? (
                      <div>
                        <h4 className="font-semibold mb-2">Vision pour le poste</h4>
                        <p className="text-sm">{candidate.vision_statement}</p>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Vision non renseignée</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="experience" className="mt-4">
                    {candidate.experience_summary ? (
                      <div>
                        <h4 className="font-semibold mb-2">Expérience pertinente</h4>
                        <p className="text-sm">{candidate.experience_summary}</p>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Expérience non renseignée</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Progression des votes */}
      {userVotes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Vos sélections</CardTitle>
            <CardDescription>
              Candidats que vous avez sélectionnés pour passer au Tour 3
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userVotes.map(voteId => {
                const candidate = candidates.find(c => c.id === voteId);
                return candidate ? (
                  <div key={voteId} className="flex items-center justify-between p-3 rounded-lg border bg-primary/5">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="font-medium">{candidate.person_name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveVote(voteId)}
                      disabled={voting}
                    >
                      Retirer
                    </Button>
                  </div>
                ) : null;
              })}
              
              <div className="text-xs text-muted-foreground pt-2">
                {userVotes.length} / {election.max_finalists_round_3} sélections utilisées
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PreselectRound;