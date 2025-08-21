import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Globe, 
  Users, 
  Clock, 
  Shield, 
  Zap, 
  AlertTriangle,
  Vote,
  CheckCircle,
  XCircle,
  MinusCircle,
  Link,
  Timer,
  TrendingUp,
  UserCheck,
  Info
} from "lucide-react";
import { toast } from "sonner";

interface ClimateVote {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  votes_for: number;
  votes_against: number;
  votes_abstain: number;
  total_participants: number;
  status: string;
  voting_end_date: string;
  blockchain_address: string;
  requires_expert_validation: boolean;
  citizen_delegates_count: number;
  expert_consensus: number;
}

interface VoteResponse {
  vote_id: string;
  vote_choice: 'for' | 'against' | 'abstain';
  comment: string;
}

const OSPVotePlanetaire = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState<ClimateVote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVote, setSelectedVote] = useState<ClimateVote | null>(null);
  const [voteResponse, setVoteResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  // Mock data pour les votes climatiques
  useEffect(() => {
    const mockVotes: ClimateVote[] = [
      {
        id: "1",
        title: "Interdiction Mondiale des Nouveaux Projets de Charbon",
        description: "Vote planétaire pour interdire immédiatement tout nouveau projet de centrale à charbon et accélérer la fermeture des installations existantes d'ici 2030.",
        category: "energie_fossile",
        priority: "critical",
        votes_for: 1847263,
        votes_against: 234567,
        votes_abstain: 89012,
        total_participants: 2170842,
        status: "active",
        voting_end_date: "2024-02-15T23:59:59Z",
        blockchain_address: "0x1a2b3c4d5e6f7890abcdef1234567890",
        requires_expert_validation: true,
        citizen_delegates_count: 2847,
        expert_consensus: 92
      },
      {
        id: "2", 
        title: "Fonds d'Urgence Climatique de 10 Milliards d'Euros",
        description: "Création d'un mécanisme de financement automatique via smart contracts pour interventions d'urgence climatique, alimenté par une taxe carbone mondiale.",
        category: "financement",
        priority: "high",
        votes_for: 1456789,
        votes_against: 345612,
        votes_abstain: 123456,
        total_participants: 1925857,
        status: "active", 
        voting_end_date: "2024-02-20T23:59:59Z",
        blockchain_address: "0x9876543210fedcba0987654321",
        requires_expert_validation: false,
        citizen_delegates_count: 1925,
        expert_consensus: 87
      },
      {
        id: "3",
        title: "Statut de Refuge Climatique pour Migrants Environnementaux",
        description: "Reconnaissance juridique mondiale du statut de réfugié climatique et mécanisme de relocation assistée pour les populations déplacées par le changement climatique.",
        category: "justice_climatique",
        priority: "high",
        votes_for: 2134567,
        votes_against: 456789,
        votes_abstain: 234512,
        total_participants: 2825868,
        status: "active",
        voting_end_date: "2024-02-25T23:59:59Z", 
        blockchain_address: "0xabcdef1234567890fedcba0987654321",
        requires_expert_validation: true,
        citizen_delegates_count: 3456,
        expert_consensus: 78
      },
      {
        id: "4",
        title: "Arrêt Immédiat de la Déforestation Amazonienne",
        description: "Résolution d'urgence pour déployer une surveillance satellite 24/7 et des sanctions économiques automatiques contre la déforestation en Amazonie.",
        category: "protection_ecosystemes",
        priority: "critical",
        votes_for: 2789456,
        votes_against: 123789,
        votes_abstain: 67834,
        total_participants: 2981079,
        status: "completed",
        voting_end_date: "2024-01-30T23:59:59Z",
        blockchain_address: "0x567890abcdef1234567890abcdef12",
        requires_expert_validation: true,
        citizen_delegates_count: 4123,
        expert_consensus: 94
      }
    ];

    setTimeout(() => {
      setVotes(mockVotes);
      setLoading(false);
    }, 1000);
  }, []);

  const getCategoryLabel = (category: string) => {
    const categories = {
      energie_fossile: "Énergie Fossile",
      financement: "Financement Climat", 
      justice_climatique: "Justice Climatique",
      protection_ecosystemes: "Protection Écosystèmes",
      adaptation: "Adaptation",
      technologies_vertes: "Technologies Vertes"
    };
    return categories[category as keyof typeof categories] || category;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      energie_fossile: Zap,
      financement: TrendingUp,
      justice_climatique: Users,
      protection_ecosystemes: Shield,
      adaptation: AlertTriangle,
      technologies_vertes: Globe
    };
    return icons[category as keyof typeof icons] || Vote;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: "bg-red-500 text-white",
      high: "bg-orange-500 text-white", 
      medium: "bg-yellow-500 text-white",
      low: "bg-green-500 text-white"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-500 text-white";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "text-green-600",
      pending: "text-yellow-600",
      completed: "text-blue-600",
      rejected: "text-red-600"
    };
    return colors[status as keyof typeof colors] || "text-gray-600";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: "Vote en Cours",
      pending: "En Attente", 
      completed: "Adopté",
      rejected: "Rejeté"
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Terminé";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}j ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const handleVoteSubmit = (voteChoice: 'for' | 'against' | 'abstain') => {
    if (!selectedVote) return;

    setSubmitting(true);
    
    // Simulation d'envoi sur blockchain
    setTimeout(() => {
      const response: VoteResponse = {
        vote_id: selectedVote.id,
        vote_choice: voteChoice,
        comment: voteResponse
      };

      console.log('Vote soumis:', response);
      
      toast.success("Vote enregistré sur la blockchain", {
        description: `Votre vote "${voteChoice}" a été confirmé et est maintenant transparent sur la blockchain mondiale.`
      });

      setSelectedVote(null);
      setVoteResponse('');
      setSubmitting(false);
    }, 2000);
  };

  const filterVotes = (status: string) => {
    switch (status) {
      case "active":
        return votes.filter(v => v.status === "active");
      case "completed":
        return votes.filter(v => v.status === "completed");
      case "emergency":
        return votes.filter(v => v.priority === "critical" && v.status === "active");
      default:
        return votes;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement des votes planétaires...</p>
        </div>
      </div>
    );
  }

  const activeVotes = filterVotes("active");
  const completedVotes = filterVotes("completed"); 
  const emergencyVotes = filterVotes("emergency");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/osp/governance')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour Gouvernance
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <Vote className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Vote Planétaire Climatique</h1>
            <p className="text-muted-foreground">
              Humanocratie directe mondiale sur blockchain. Chaque habitant de la planète vote directement sur les politiques climatiques.
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{activeVotes.length}</div>
            <div className="text-sm text-muted-foreground">Votes Actifs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">5.2M</div>
            <div className="text-sm text-muted-foreground">Habitants Participants</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-muted-foreground">Résolutions Adoptées</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">99.8%</div>
            <div className="text-sm text-muted-foreground">Transparence Blockchain</div>
          </CardContent>
        </Card>
      </div>

      {/* Info Humanocratie */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Info className="h-5 w-5" />
            Humanocratie Planétaire Directe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-blue-600" />
              <span>Vote habitant + Expert</span>
            </div>
            <div className="flex items-center gap-2">
              <Blockchain className="h-4 w-4 text-purple-600" />
              <span>Blockchain transparente</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-orange-600" />
              <span>Urgence climatique 24h</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onglets des votes */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">
            En Cours ({activeVotes.length})
          </TabsTrigger>
          <TabsTrigger value="emergency">
            Urgence ({emergencyVotes.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Terminés ({completedVotes.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            Tous ({votes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeVotes.map((vote) => {
            const IconComponent = getCategoryIcon(vote.category);
            const forPercentage = getVotePercentage(vote.votes_for, vote.total_participants);
            const againstPercentage = getVotePercentage(vote.votes_against, vote.total_participants);
            
            return (
              <Card key={vote.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-muted">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg leading-tight mb-2">
                          {vote.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {vote.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {getCategoryLabel(vote.category)}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(vote.priority)}`}>
                            Priorité {vote.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Link className="h-3 w-3 mr-1" />
                            Blockchain: {vote.blockchain_address.slice(0, 10)}...
                          </Badge>
                          {vote.requires_expert_validation && (
                            <Badge variant="outline" className="text-xs text-purple-600">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Validation Expert: {vote.expert_consensus}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-orange-600">
                        {getTimeRemaining(vote.voting_end_date)}
                      </div>
                      <div className="text-xs text-muted-foreground">restant</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Résultats en temps réel */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Résultats en temps réel</span>
                        <span className="font-medium">
                          {vote.total_participants.toLocaleString()} habitants • {forPercentage}% Pour
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <div className="w-16 text-xs">Pour</div>
                          <Progress value={forPercentage} className="flex-1 h-3" />
                          <div className="w-20 text-xs text-right font-medium">
                            {vote.votes_for.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <div className="w-16 text-xs">Contre</div>
                          <Progress 
                            value={againstPercentage} 
                            className="flex-1 h-3"
                          />
                          <div className="w-20 text-xs text-right font-medium">
                            {vote.votes_against.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MinusCircle className="h-4 w-4 text-gray-600" />
                          <div className="w-16 text-xs">Abstention</div>
                          <Progress 
                            value={getVotePercentage(vote.votes_abstain, vote.total_participants)} 
                            className="flex-1 h-3"
                          />
                          <div className="w-20 text-xs text-right font-medium">
                            {vote.votes_abstain.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Délégués habitants */}
                    <div className="flex items-center justify-between py-2 border-t">
                      <div className="text-sm text-muted-foreground">
                        <Users className="h-4 w-4 inline mr-1" />
                        {vote.citizen_delegates_count} délégués habitants tirés au sort
                      </div>
                      <Button 
                        onClick={() => setSelectedVote(vote)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Participer au Vote
                        <Vote className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-semibold mb-2">
              <AlertTriangle className="h-5 w-5" />
              Votes d'Urgence Climatique
            </div>
            <p className="text-sm text-red-600 dark:text-red-400">
              Ces votes peuvent être déclenchés en 24h maximum en cas d'urgence climatique mondiale. 
              Mécanisme automatique via smart contracts.
            </p>
          </div>
          
          {emergencyVotes.map((vote) => (
            <Card key={vote.id} className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {vote.title}
                </CardTitle>
                <CardDescription>{vote.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="destructive">URGENCE CLIMATIQUE</Badge>
                  <Button 
                    variant="destructive"
                    onClick={() => setSelectedVote(vote)}
                  >
                    Vote d'Urgence
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedVotes.map((vote) => {
            const forPercentage = getVotePercentage(vote.votes_for, vote.total_participants);
            
            return (
              <Card key={vote.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{vote.title}</CardTitle>
                      <CardDescription>{vote.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Adopté ({forPercentage}%)
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {vote.total_participants.toLocaleString()} participants • 
                    Blockchain: {vote.blockchain_address}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {votes.map((vote) => (
            <Card key={vote.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{vote.title}</CardTitle>
                    <CardDescription>{vote.description}</CardDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(vote.status)}
                  >
                    {getStatusLabel(vote.status)}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Dialog de vote */}
      <Dialog open={selectedVote !== null} onOpenChange={() => setSelectedVote(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5" />
              Vote Planétaire sur Blockchain
            </DialogTitle>
            <DialogDescription>
              Votre vote sera enregistré de manière transparente et sécurisée sur la blockchain mondiale
            </DialogDescription>
          </DialogHeader>
          
          {selectedVote && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedVote.title}</h3>
                <p className="text-muted-foreground">{selectedVote.description}</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Votre position (optionnel)
                </label>
                <Textarea
                  placeholder="Expliquez votre position sur cette proposition climatique..."
                  value={voteResponse}
                  onChange={(e) => setVoteResponse(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleVoteSubmit('for')}
                  disabled={submitting}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Pour
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleVoteSubmit('against')}
                  disabled={submitting}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Contre
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleVoteSubmit('abstain')}
                  disabled={submitting}
                >
                  <MinusCircle className="h-4 w-4 mr-2" />
                  Abstention
                </Button>
              </div>

              {submitting && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Enregistrement sur la blockchain...
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OSPVotePlanetaire;