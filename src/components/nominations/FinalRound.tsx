import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Vote, Trophy, Clock, CheckCircle, Users, BarChart3 } from 'lucide-react';

interface Election {
  id: string;
  current_round: number;
  status: string;
  round_3_end_date: string;
}

interface Candidate {
  id: string;
  person_name: string;
  person_email?: string;
  person_bio?: string;
  acceptance_status: string;
  presentation_text?: string;
  vision_statement?: string;
  experience_summary?: string;
  profile_image_url?: string;
}

interface VoteResult {
  candidate_id: string;
  vote_count: number;
  percentage: number;
}

interface FinalRoundProps {
  election: Election;
}

const FinalRound: React.FC<FinalRoundProps> = ({ election }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [voteResults, setVoteResults] = useState<VoteResult[]>([]);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFinalists();
    fetchVoteResults();
    fetchUserVote();
  }, [election.id]);

  const fetchFinalists = async () => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('election_id', election.id)
        .eq('round_qualified', 3)
        .order('person_name', { ascending: true });

      if (error) throw error;
      setCandidates(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des finalistes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVoteResults = async () => {
    try {
      const { data, error } = await supabase
        .from('citizen_votes')
        .select('candidate_id')
        .eq('election_id', election.id)
        .eq('round_number', 3);

      if (error) throw error;

      // Compter les votes par candidat
      const voteCounts: Record<string, number> = {};
      data?.forEach(vote => {
        voteCounts[vote.candidate_id] = (voteCounts[vote.candidate_id] || 0) + 1;
      });

      const totalVotes = data?.length || 0;
      const results: VoteResult[] = Object.entries(voteCounts).map(([candidateId, count]) => ({
        candidate_id: candidateId,
        vote_count: count,
        percentage: totalVotes > 0 ? (count / totalVotes) * 100 : 0
      }));

      // Ajouter les candidats sans votes
      candidates.forEach(candidate => {
        if (!voteCounts[candidate.id]) {
          results.push({
            candidate_id: candidate.id,
            vote_count: 0,
            percentage: 0
          });
        }
      });

      results.sort((a, b) => b.vote_count - a.vote_count);
      setVoteResults(results);
    } catch (error) {
      console.error('Erreur lors du chargement des résultats:', error);
    }
  };

  const fetchUserVote = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('citizen_votes')
        .select('candidate_id')
        .eq('election_id', election.id)
        .eq('voter_id', user.id)
        .eq('round_number', 3)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // Ignore "no rows returned" error
      setUserVote(data?.candidate_id || null);
    } catch (error) {
      console.error('Erreur lors du chargement du vote utilisateur:', error);
    }
  };

  const handleVote = async (candidateId: string) => {
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

      // Supprimer le vote précédent s'il existe
      if (userVote) {
        await supabase
          .from('citizen_votes')
          .delete()
          .eq('election_id', election.id)
          .eq('voter_id', user.id)
          .eq('round_number', 3);
      }

      // Enregistrer le nouveau vote
      const { error } = await supabase
        .from('citizen_votes')
        .insert({
          election_id: election.id,
          voter_id: user.id,
          candidate_id: candidateId,
          round_number: 3
        });

      if (error) throw error;

      setUserVote(candidateId);
      
      const candidate = candidates.find(c => c.id === candidateId);
      toast({
        title: "Vote enregistré !",
        description: `Vous avez voté pour ${candidate?.person_name}`,
      });

      // Rafraîchir les résultats
      fetchVoteResults();
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

  const getTimeRemaining = () => {
    const now = new Date().getTime();
    const end = new Date(election.round_3_end_date).getTime();
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

  const getTotalVotes = () => {
    return voteResults.reduce((sum, result) => sum + result.vote_count, 0);
  };

  const getWinner = () => {
    if (voteResults.length === 0) return null;
    const maxVotes = Math.max(...voteResults.map(r => r.vote_count));
    return voteResults.find(r => r.vote_count === maxVotes);
  };

  const isRoundActive = election.status === 'active' && election.current_round === 3;
  const canVote = isRoundActive;
  const showResults = election.status === 'completed' || voteResults.some(r => r.vote_count > 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement des finalistes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statut du tour */}
      <Card className={`border-2 ${isRoundActive ? 'border-blue-500 bg-blue-50/50' : 'border-muted'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Tour 3 - Vote Final
            {isRoundActive && <Badge className="bg-blue-500">En cours</Badge>}
            {election.status === 'completed' && <Badge className="bg-green-500">Terminé</Badge>}
          </CardTitle>
          <CardDescription>
            Vote démocratique final pour élire le candidat parmi les 3 finalistes.
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
              <span>{candidates.length} finalistes</span>
            </div>
            <div className="flex items-center gap-2">
              <Vote className="h-4 w-4" />
              <span>{getTotalVotes()} votes exprimés</span>
            </div>
            <div className="flex items-center gap-2">
              {userVote ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">Vous avez voté</span>
                </>
              ) : (
                <>
                  <Vote className="h-4 w-4 text-orange-500" />
                  <span className="text-orange-600">En attente de votre vote</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats en temps réel */}
      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Résultats {election.status === 'completed' ? 'Finaux' : 'en Temps Réel'}
            </CardTitle>
            <CardDescription>
              {election.status === 'completed' 
                ? 'Résultats définitifs de la nomination' 
                : 'Décompte actualisé des votes (peut changer jusqu\'à la fin)'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {voteResults.map((result, index) => {
                const candidate = candidates.find(c => c.id === result.candidate_id);
                const isWinner = election.status === 'completed' && getWinner()?.candidate_id === result.candidate_id;
                
                return candidate ? (
                  <div key={result.candidate_id} className={`flex items-center gap-4 p-4 rounded-lg border ${isWinner ? 'border-yellow-400 bg-yellow-50' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.profile_image_url} />
                      <AvatarFallback>{getInitials(candidate.person_name)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{candidate.person_name}</h4>
                        {isWinner && <Trophy className="h-4 w-4 text-yellow-500" />}
                        {userVote === candidate.id && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                      
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm text-muted-foreground">
                          {result.vote_count} vote{result.vote_count > 1 ? 's' : ''}
                        </span>
                        <Badge variant={result.percentage > 0 ? 'default' : 'secondary'}>
                          {result.percentage.toFixed(1)}%
                        </Badge>
                      </div>
                      
                      <Progress value={result.percentage} className="h-2" />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold">{result.vote_count}</div>
                      <div className="text-xs text-muted-foreground">votes</div>
                    </div>
                  </div>
                ) : null;
              })}
              
              {election.status === 'completed' && getWinner() && (
                <div className="text-center py-6 border-t">
                  <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">Candidat nominé</h3>
                  <p className="text-lg">
                    {candidates.find(c => c.id === getWinner()?.candidate_id)?.person_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    avec {getWinner()?.vote_count} votes ({getWinner()?.percentage.toFixed(1)}%)
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vote des finalistes */}
      {candidates.length > 0 && (
        <div className="grid gap-6">
          <h3 className="text-xl font-semibold">Les 3 Finalistes</h3>
          
          {candidates.map((candidate) => (
            <Card key={candidate.id} className={`transition-all ${userVote === candidate.id ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={candidate.profile_image_url} />
                      <AvatarFallback className="text-xl">
                        {getInitials(candidate.person_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{candidate.person_name}</CardTitle>
                      {candidate.person_email && (
                        <CardDescription className="text-base">{candidate.person_email}</CardDescription>
                      )}
                      <div className="flex items-center gap-2 mt-3">
                        <Badge className="bg-blue-500">Finaliste</Badge>
                        {userVote === candidate.id && <Badge className="bg-green-500">Votre choix</Badge>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {canVote ? (
                      <Button 
                        size="lg"
                        onClick={() => handleVote(candidate.id)}
                        disabled={voting}
                        variant={userVote === candidate.id ? 'default' : 'outline'}
                        className={userVote === candidate.id ? 'gradient-primary' : ''}
                      >
                        <Vote className="mr-2 h-5 w-5" />
                        {userVote === candidate.id ? 'Voté' : 'Voter'}
                      </Button>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {voteResults.find(r => r.candidate_id === candidate.id)?.vote_count || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">votes</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Présentation</h4>
                    <p className="text-sm text-muted-foreground">
                      {candidate.person_bio || candidate.presentation_text || 'Aucune présentation disponible'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Vision</h4>
                    <p className="text-sm text-muted-foreground">
                      {candidate.vision_statement || 'Vision non renseignée'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {candidates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Finalistes non encore sélectionnés</h3>
            <p className="text-muted-foreground">
              Les 3 finalistes seront déterminés à la fin du Tour 2.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinalRound;