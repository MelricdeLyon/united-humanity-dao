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

interface Election {
  id: string;
  title: string;
  current_round: number;
  status: string;
  round_1_end_date: string;
  min_nominations_for_round_2: number;
}

interface Nomination {
  id: string;
  nominated_person_name: string;
  nominated_person_email?: string;
  nominated_person_bio?: string;
  justification: string;
  created_at: string;
  nominator_id: string;
}

interface NominationRoundProps {
  election: Election;
}

const NominationRound: React.FC<NominationRoundProps> = ({ election }) => {
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [nominationCounts, setNominationCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasNominated, setHasNominated] = useState(false);
  const { toast } = useToast();

  // Formulaire de nomination
  const [formData, setFormData] = useState({
    nominated_person_name: '',
    nominated_person_email: '',
    nominated_person_bio: '',
    justification: ''
  });

  useEffect(() => {
    fetchNominations();
    checkUserNomination();
  }, [election.id]);

  const fetchNominations = async () => {
    try {
      const { data, error } = await supabase
        .from('nominations')
        .select('*')
        .eq('election_id', election.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setNominations(data || []);
      
      // Calculer les comptes de nominations par personne
      const counts: Record<string, number> = {};
      data?.forEach(nomination => {
        const name = nomination.nominated_person_name.toLowerCase();
        counts[name] = (counts[name] || 0) + 1;
      });
      setNominationCounts(counts);
    } catch (error) {
      console.error('Erreur lors du chargement des nominations:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserNomination = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('nominations')
        .select('id')
        .eq('election_id', election.id)
        .eq('nominator_id', user.id)
        .eq('status', 'active');

      if (error) throw error;
      setHasNominated((data || []).length > 0);
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
    }
  };

  const handleSubmitNomination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nominated_person_name || !formData.justification) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
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
        .from('nominations')
        .insert({
          election_id: election.id,
          nominator_id: user.id,
          ...formData
        });

      if (error) throw error;

      toast({
        title: "Nomination envoyée !",
        description: `Vous avez nominé ${formData.nominated_person_name}`,
      });

      // Reset form et refresh
      setFormData({
        nominated_person_name: '',
        nominated_person_email: '',
        nominated_person_bio: '',
        justification: ''
      });
      
      setHasNominated(true);
      fetchNominations();
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

  const getMostNominatedPeople = () => {
    const peopleMap: Record<string, { count: number, nominations: Nomination[] }> = {};
    
    nominations.forEach(nomination => {
      const name = nomination.nominated_person_name.toLowerCase();
      if (!peopleMap[name]) {
        peopleMap[name] = { count: 0, nominations: [] };
      }
      peopleMap[name].count++;
      peopleMap[name].nominations.push(nomination);
    });

    return Object.entries(peopleMap)
      .sort(([,a], [,b]) => b.count - a.count)
      .slice(0, 10);
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
            Tour 1 - Nominations Libres
            {isRoundActive && <Badge className="bg-green-500">En cours</Badge>}
          </CardTitle>
          <CardDescription>
            Chaque citoyen peut nominer librement une personne compétente pour ce poste.
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
              <span>{nominations.length} nominations reçues</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Minimum {election.min_nominations_for_round_2} requis</span>
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
            <CardTitle>Nominer une personne</CardTitle>
            <CardDescription>
              Proposez une personne compétente pour ce poste en justifiant votre choix.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {canNominate ? (
              <form onSubmit={handleSubmitNomination} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom et prénom *</Label>
                  <Input
                    id="name"
                    value={formData.nominated_person_name}
                    onChange={(e) => setFormData({...formData, nominated_person_name: e.target.value})}
                    placeholder="ex: Marie Dupont"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email (optionnel)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.nominated_person_email}
                    onChange={(e) => setFormData({...formData, nominated_person_email: e.target.value})}
                    placeholder="marie.dupont@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Biographie courte (optionnel)</Label>
                  <Textarea
                    id="bio"
                    value={formData.nominated_person_bio}
                    onChange={(e) => setFormData({...formData, nominated_person_bio: e.target.value})}
                    placeholder="Expérience professionnelle, compétences..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="justification">Justification de votre nomination *</Label>
                  <Textarea
                    id="justification"
                    value={formData.justification}
                    onChange={(e) => setFormData({...formData, justification: e.target.value})}
                    placeholder="Pourquoi cette personne serait-elle idéale pour ce poste ?"
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
                      Vous avez déjà nominé une personne pour cette nomination.
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

        {/* Classement des nominations */}
        <Card>
          <CardHeader>
            <CardTitle>Top des nominations</CardTitle>
            <CardDescription>
              Personnes les plus nominées jusqu'à présent
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
                {getMostNominatedPeople().map(([name, data], index) => (
                  <div key={name} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{data.nominations[0].nominated_person_name}</p>
                        {data.nominations[0].nominated_person_bio && (
                          <p className="text-xs text-muted-foreground">{data.nominations[0].nominated_person_bio}</p>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {data.count} nomination{data.count > 1 ? 's' : ''}
                    </Badge>
                  </div>
                ))}

                {getMostNominatedPeople().length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Aucune nomination pour le moment</p>
                    <p className="text-xs mt-1">Soyez le premier à nominer quelqu'un !</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Progression vers le tour 2 */}
      {nominations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Progression vers le Tour 2</CardTitle>
            <CardDescription>
              Suivi des nominations reçues et critères pour passer au tour suivant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Nominations reçues</span>
                  <span>{nominations.length} / {election.min_nominations_for_round_2} minimum</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min((nominations.length / election.min_nominations_for_round_2) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              {nominations.length >= election.min_nominations_for_round_2 && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Critères atteints pour passer au Tour 2 !
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NominationRound;