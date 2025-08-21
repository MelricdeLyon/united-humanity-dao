import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface OHSElection {
  id: string;
  title: string;
  current_round: number;
  status: string;
  round_1_end_date: string;
}

interface OHSCandidate {
  id: string;
  person_name: string;
  person_email?: string;
  person_bio?: string;
  medical_credentials?: string;
  experience_summary?: string;
  vision_statement?: string;
  nomination_count: number;
  created_at: string;
}

interface OHSNominationRoundProps {
  election: OHSElection;
}

const OHSNominationRound: React.FC<OHSNominationRoundProps> = ({ election }) => {
  const [candidates, setCandidates] = useState<OHSCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasNominated, setHasNominated] = useState(false);
  const { toast } = useToast();

  // Formulaire de nomination
  const [formData, setFormData] = useState({
    person_name: '',
    person_email: '',
    person_bio: '',
    medical_credentials: '',
    experience_summary: '',
    vision_statement: ''
  });

  useEffect(() => {
    fetchCandidates();
    checkUserNomination();
  }, [election.id]);

  const fetchCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from('ohs_candidates')
        .select('*')
        .eq('election_id', election.id)
        .order('nomination_count', { ascending: false });

      if (error) throw error;
      setCandidates(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des candidats OHS:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserNomination = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check if user has already nominated for this election
      // This would need to be implemented based on your OHS nomination tracking
      setHasNominated(false);
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
    }
  };

  const handleSubmitNomination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.person_name || !formData.vision_statement) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir au moins le nom et la vision du candidat",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour nominer",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('ohs_candidates')
        .insert({
          election_id: election.id,
          ...formData,
          nomination_count: 1,
          round_qualified: 1
        });

      if (error) throw error;

      toast({
        title: "Nomination envoyée !",
        description: `Vous avez nominé ${formData.person_name} pour ce poste OHS`,
      });

      // Reset form et refresh
      setFormData({
        person_name: '',
        person_email: '',
        person_bio: '',
        medical_credentials: '',
        experience_summary: '',
        vision_statement: ''
      });
      
      setHasNominated(true);
      fetchCandidates();
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la nomination",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getTimeRemaining = () => {
    const now = new Date().getTime();
    const end = new Date(election.round_1_end_date).getTime();
    const diff = end - now;
    
    if (diff <= 0) return "Terminé";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}j ${hours}h restantes`;
    return `${hours}h restantes`;
  };

  const canNominate = election.status === 'active' && election.current_round === 1 && !hasNominated;
  const isRoundActive = election.status === 'active' && election.current_round === 1;

  return (
    <div className="space-y-6">
      {/* Statut du tour */}
      <Card className={`border-2 ${isRoundActive ? 'border-green-500 bg-green-50/50' : 'border-muted'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Tour 1 - Nominations Libres OHS
            {isRoundActive && <Badge className="bg-green-500">En cours</Badge>}
          </CardTitle>
          <CardDescription>
            Chaque citoyen peut nominer librement une personne compétente pour ce poste de santé publique.
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
              <span>{candidates.length} candidats nominés</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Nominations ouvertes</span>
            </div>
            <div className="flex items-center gap-2">
              {hasNominated ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">Vous avez nominé</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-orange-600">En attente de votre nomination</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Formulaire de nomination */}
        <Card>
          <CardHeader>
            <CardTitle>Nominer un expert en santé</CardTitle>
            <CardDescription>
              Proposez une personne compétente dans le domaine de la santé pour ce poste important.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {canNominate ? (
              <form onSubmit={handleSubmitNomination} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom et prénom *</Label>
                  <Input
                    id="name"
                    value={formData.person_name}
                    onChange={(e) => setFormData({...formData, person_name: e.target.value})}
                    placeholder="ex: Dr. Marie Dupont"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email (optionnel)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.person_email}
                    onChange={(e) => setFormData({...formData, person_email: e.target.value})}
                    placeholder="marie.dupont@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Biographie professionnelle (optionnel)</Label>
                  <Textarea
                    id="bio"
                    value={formData.person_bio}
                    onChange={(e) => setFormData({...formData, person_bio: e.target.value})}
                    placeholder="Parcours professionnel, formation..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="credentials">Diplômes et certifications médicales (optionnel)</Label>
                  <Textarea
                    id="credentials"
                    value={formData.medical_credentials}
                    onChange={(e) => setFormData({...formData, medical_credentials: e.target.value})}
                    placeholder="Diplômes, spécialisations, certifications..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Résumé d'expérience en santé publique (optionnel)</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience_summary}
                    onChange={(e) => setFormData({...formData, experience_summary: e.target.value})}
                    placeholder="Expériences pertinentes en santé publique, ONG, institutions..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="vision">Vision pour ce poste *</Label>
                  <Textarea
                    id="vision"
                    value={formData.vision_statement}
                    onChange={(e) => setFormData({...formData, vision_statement: e.target.value})}
                    placeholder="Quelle serait la vision de cette personne pour améliorer la santé mondiale ?"
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" disabled={submitting} className="w-full gradient-primary">
                  {submitting ? 'Envoi en cours...' : 'Envoyer ma nomination'}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                {hasNominated ? (
                  <div>
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-green-600 mb-2">Nomination envoyée</h3>
                    <p className="text-sm text-muted-foreground">
                      Vous avez déjà nominé une personne pour cette nomination OHS.
                    </p>
                  </div>
                ) : (
                  <div>
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Nominations fermées</h3>
                    <p className="text-sm text-muted-foreground">
                      La période de nomination pour ce tour est terminée.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Candidats nominés */}
        <Card>
          <CardHeader>
            <CardTitle>Candidats nominés</CardTitle>
            <CardDescription>
              Experts en santé proposés par la communauté
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Chargement...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {candidates.map((candidate, index) => (
                  <div key={candidate.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{candidate.person_name}</h4>
                      <Badge variant="secondary">
                        {candidate.nomination_count} nomination{candidate.nomination_count > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    
                    {candidate.person_bio && (
                      <p className="text-sm text-muted-foreground mb-2">{candidate.person_bio}</p>
                    )}
                    
                    {candidate.medical_credentials && (
                      <p className="text-xs text-blue-600 mb-2">
                        <strong>Diplômes:</strong> {candidate.medical_credentials}
                      </p>
                    )}
                    
                    {candidate.vision_statement && (
                      <p className="text-xs text-green-700">
                        <strong>Vision:</strong> {candidate.vision_statement}
                      </p>
                    )}
                  </div>
                ))}

                {candidates.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Aucun candidat nominé pour le moment</p>
                    <p className="text-xs mt-1">Soyez le premier à nominer quelqu'un !</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OHSNominationRound;