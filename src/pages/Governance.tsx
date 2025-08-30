import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Vote, Users, Clock, CheckCircle, AlertCircle, TrendingUp, ArrowLeft, UserPlus, Coins, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: string;
  votes_for: number;
  votes_against: number;
  voting_ends_at: string;
  created_at: string;
  creator_id: string;
}

interface GovernanceStats {
  totalProposals: number;
  activeProposals: number;
  totalVotes: number;
  citizensCount: number;
}

const Governance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [stats, setStats] = useState<GovernanceStats>({
    totalProposals: 0,
    activeProposals: 0,
    totalVotes: 0,
    citizensCount: 2847
  });
  const [loading, setLoading] = useState(true);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isCandidateDialogOpen, setIsCandidateDialogOpen] = useState(false);
  const [joinForm, setJoinForm] = useState({ department: "", motivation: "", experience: "" });

  useEffect(() => {
    fetchGovernanceData();
  }, []);

  const fetchGovernanceData = async () => {
    try {
      // Fetch proposals
      const { data: proposalsData } = await supabase
        .from("dao_proposals")
        .select("*")
        .order("created_at", { ascending: false });

      // Fetch vote counts
      const { data: votesData } = await supabase
        .from("dao_votes")
        .select("id");

      setProposals(proposalsData || []);
      setStats(prev => ({
        ...prev,
        totalProposals: proposalsData?.length || 0,
        activeProposals: proposalsData?.filter(p => p.status === 'active').length || 0,
        totalVotes: votesData?.length || 0
      }));
    } catch (error) {
      console.error("Error fetching governance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Clock className="mr-1 h-3 w-3" />En cours</Badge>;
      case 'passed':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="mr-1 h-3 w-3" />Adoptée</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Rejetée</Badge>;
      case 'executed':
        return <Badge className="bg-purple-500 hover:bg-purple-600"><CheckCircle className="mr-1 h-3 w-3" />Exécutée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Terminé";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}j ${hours}h`;
    return `${hours}h`;
  };

  const calculateParticipation = (votesFor: number, votesAgainst: number) => {
    const totalVotes = votesFor + votesAgainst;
    return ((totalVotes / stats.citizensCount) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Vote className="h-16 w-16 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Chargement de la gouvernance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 backdrop-blur"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-6 mb-6 rounded-full bg-white/10 backdrop-blur">
              <Vote className="h-16 w-16" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
              Gouvernance DAO
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Système de gouvernance décentralisée de l'Humanité Unie
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
              <Badge variant="secondary" className="text-lg px-6 py-2">
                1 Humain = 1 Voix
              </Badge>
              <Badge variant="secondary" className="text-lg px-6 py-2">
                Quorum 50%
              </Badge>
              <Badge variant="secondary" className="text-lg px-6 py-2">
                Vote 7 jours
              </Badge>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => navigate('/territorial-governance')}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Gouvernance Territoriale
              </Button>
              <Button 
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => navigate('/propositions')}
              >
                <Vote className="mr-2 h-4 w-4" />
                Voir Toutes les Propositions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            <Card className="shadow-governance">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <Vote className="mr-2 h-4 w-4" />
                  Propositions Totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{stats.totalProposals}</p>
              </CardContent>
            </Card>

            <Card className="shadow-governance">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Votes Actifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-secondary">{stats.activeProposals}</p>
              </CardContent>
            </Card>

            <Card className="shadow-governance">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4" />
                  Citoyens Actifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-accent">{stats.citizensCount.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="shadow-governance">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Votes Exprimés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-success">{stats.totalVotes}</p>
              </CardContent>
            </Card>
          </div>

          {/* Governance Tabs */}
          <Tabs defaultValue="proposals" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto sm:max-w-md mx-auto">
              <TabsTrigger value="proposals" className="text-xs sm:text-sm">Propositions</TabsTrigger>
              <TabsTrigger value="council" className="text-xs sm:text-sm">Conseil</TabsTrigger>
              <TabsTrigger value="structure" className="text-xs sm:text-sm">Structure</TabsTrigger>
            </TabsList>

            <TabsContent value="proposals" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold">Propositions de Gouvernance</h2>
                <Button className="gradient-primary w-full sm:w-auto">
                  <Vote className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Nouvelle Proposition</span>
                  <span className="sm:hidden">Nouvelle</span>
                </Button>
              </div>

              <div className="grid gap-6">
                {proposals.map((proposal) => (
                  <Card key={proposal.id} className="shadow-governance hover:shadow-elevated transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{proposal.title}</CardTitle>
                          <CardDescription className="text-base">{proposal.description}</CardDescription>
                        </div>
                        <div className="ml-4 text-right">
                          {getStatusBadge(proposal.status)}
                          {proposal.status === 'active' && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {formatTimeRemaining(proposal.voting_ends_at)} restant
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                            {proposal.votes_for}
                          </p>
                          <p className="text-sm text-muted-foreground">Votes Pour</p>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                            {proposal.votes_against}
                          </p>
                          <p className="text-sm text-muted-foreground">Votes Contre</p>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg col-span-1 sm:col-span-2 md:col-span-1">
                          <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {calculateParticipation(proposal.votes_for, proposal.votes_against)}%
                          </p>
                          <p className="text-sm text-muted-foreground">Participation</p>
                        </div>
                      </div>
                      {proposal.status === 'active' && (
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                          <Button className="flex-1 bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Voter Pour
                          </Button>
                          <Button variant="destructive" className="flex-1">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Voter Contre
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="council" className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold">Conseil Mondial</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* President */}
                <Card className="shadow-governance">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl mb-4">
                      👑
                    </div>
                    <CardTitle>Président</CardTitle>
                     <CardDescription>
                       Mandat 5 ans • 
                       <span className="font-bold text-primary">41,800,000 JRC</span>
                       <span className="text-xs block">418,000 €/an</span>
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Poste vacant</p>
                    <Dialog open={isCandidateDialogOpen} onOpenChange={setIsCandidateDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-3">Candidater</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Candidature au Poste de Président</DialogTitle>
                          <DialogDescription>
                            Soumettez votre candidature pour devenir Président de l'Humanité Unie.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="motivation">Lettre de Motivation</Label>
                            <Textarea
                              id="motivation"
                              placeholder="Expliquez pourquoi vous souhaitez occuper ce poste..."
                              value={joinForm.motivation}
                              onChange={(e) => setJoinForm(prev => ({ ...prev, motivation: e.target.value }))}
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience">Expérience Pertinente</Label>
                            <Textarea
                              id="experience"
                              placeholder="Décrivez votre expérience en leadership et gouvernance..."
                              value={joinForm.experience}
                              onChange={(e) => setJoinForm(prev => ({ ...prev, experience: e.target.value }))}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsCandidateDialogOpen(false)}>
                            Annuler
                          </Button>
                          <Button onClick={() => {
                            toast({ title: "Candidature envoyée", description: "Votre candidature sera examinée par le conseil." });
                            setIsCandidateDialogOpen(false);
                          }}>
                            Soumettre ma Candidature
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                {/* Vice President */}
                <Card className="shadow-governance">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center text-2xl mb-4">
                      🤝
                    </div>
                    <CardTitle>Vice-Président</CardTitle>
                     <CardDescription>
                       Mandat 5 ans • 
                       <span className="font-bold text-primary">23,000,000 JRC</span>
                       <span className="text-xs block">230,000 €/an</span>
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Poste vacant</p>
                    <Button variant="outline" size="sm" className="mt-3">Candidater</Button>
                  </CardContent>
                </Card>

                {/* Council Members */}
                <Card className="shadow-governance">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-2xl mb-4">
                      👥
                    </div>
                    <CardTitle>Conseil Mondial</CardTitle>
                     <CardDescription>
                       10 membres • 2 ans • 
                       <span className="font-bold text-primary">17,000,000 JRC</span>
                       <span className="text-xs block">170,000 €/an</span>
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">0/10 postes pourvus</p>
                    <Button variant="outline" size="sm" className="mt-3">Candidater</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="structure" className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold">Structure Organisationnelle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Departments */}
                {[
                  { name: "Paix & Sécurité", icon: "🛡️", color: "from-red-500 to-red-600" },
                  { name: "Développement Durable", icon: "🌱", color: "from-green-500 to-green-600" },
                  { name: "Développement Humain", icon: "🎓", color: "from-blue-500 to-blue-600" },
                  { name: "Technologies & Culture", icon: "🚀", color: "from-purple-500 to-purple-600" }
                ].map((dept) => (
                  <Card key={dept.name} className="shadow-governance">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-2xl mb-4`}>
                        {dept.icon}
                      </div>
                      <CardTitle>{dept.name}</CardTitle>
                      <CardDescription>Département ministériel</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Directeur</span>
                          <span>Poste vacant</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Équipe</span>
                          <span>0 membres</span>
                        </div>
                        <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                              <UserPlus className="mr-2 h-4 w-4" />
                              Rejoindre le Département
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Rejoindre un Département</DialogTitle>
                              <DialogDescription>
                                Postulez pour rejoindre l'un des départements de l'Humanité Unie.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="department">Département Souhaité</Label>
                                <Input
                                  id="department"
                                  value={dept.name}
                                  disabled
                                  className="bg-muted"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="motivation">Motivation</Label>
                                <Textarea
                                  id="motivation"
                                  placeholder="Pourquoi souhaitez-vous rejoindre ce département ?"
                                  value={joinForm.motivation}
                                  onChange={(e) => setJoinForm(prev => ({ ...prev, motivation: e.target.value }))}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="experience">Expérience</Label>
                                <Textarea
                                  id="experience"
                                  placeholder="Décrivez votre expérience dans ce domaine..."
                                  value={joinForm.experience}
                                  onChange={(e) => setJoinForm(prev => ({ ...prev, experience: e.target.value }))}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsJoinDialogOpen(false)}>
                                Annuler
                              </Button>
                              <Button onClick={() => {
                                toast({ title: "Candidature envoyée", description: `Votre candidature pour ${dept.name} a été envoyée.` });
                                setIsJoinDialogOpen(false);
                                setJoinForm({ department: "", motivation: "", experience: "" });
                              }}>
                                Envoyer ma Candidature
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Governance;