import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  ArrowLeft, 
  Plus, 
  Vote, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Zap, 
  Droplets, 
  TreePine,
  Globe,
  Clock,
  Euro,
  Calendar,
  ChevronRight,
  Thermometer,
  Factory,
  Recycle
} from "lucide-react";
import { OSPProposalForm } from "@/components/osp/OSPProposalForm";

interface OSPProposal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  votes_for: number;
  votes_against: number;
  votes_abstain: number;
  estimated_budget_eur: number;
  status: string;
  proposed_by: string;
  climate_impact_level: string;
  target_regions: string[];
  implementation_timeline: string;
  expected_climate_impact: string;
  supporting_evidence: string;
  created_at: string;
  voting_start_date: string;
  voting_end_date: string;
}

const OSPGovernance = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<OSPProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [showProposalForm, setShowProposalForm] = useState(false);

  // Mock data pour les propositions climatiques
  useEffect(() => {
    const mockProposals: OSPProposal[] = [
      {
        id: "1",
        title: "Réseau Mondial de Surveillance des Émissions en Temps Réel",
        description: "Déploiement d'un système de surveillance satellite et IoT pour traquer les émissions de CO2 en temps réel avec blockchain pour la transparence totale.",
        category: "surveillance_climatique",
        priority: "critical",
        votes_for: 234567,
        votes_against: 45123,
        votes_abstain: 12890,
        estimated_budget_eur: 2500000000,
        status: "active",
        proposed_by: "Dr. Elena Rodriguez",
        climate_impact_level: "critical",
        target_regions: ["Global"],
        implementation_timeline: "24 mois",
        expected_climate_impact: "Réduction de 15% des émissions mondiales grâce à la transparence",
        supporting_evidence: "Études du GIEC sur l'efficacité du monitoring",
        created_at: "2024-01-15T10:00:00Z",
        voting_start_date: "2024-01-20T00:00:00Z",
        voting_end_date: "2024-02-20T00:00:00Z"
      },
      {
        id: "2", 
        title: "Fonds d'Intervention Flash pour Catastrophes Climatiques",
        description: "Création d'un mécanisme de financement automatique via smart contracts pour réponse d'urgence climatique en moins de 24h.",
        category: "intervention_urgence",
        priority: "high",
        votes_for: 189456,
        votes_against: 67234,
        votes_abstain: 23109,
        estimated_budget_eur: 5000000000,
        status: "active",
        proposed_by: "Coalition Urgence Climat",
        climate_impact_level: "high",
        target_regions: ["Zones Vulnérables Globales"],
        implementation_timeline: "12 mois",
        expected_climate_impact: "Réduction de 70% du temps de réponse aux urgences",
        supporting_evidence: "Analyse des catastrophes climatiques 2020-2024",
        created_at: "2024-01-10T14:30:00Z",
        voting_start_date: "2024-01-15T00:00:00Z",
        voting_end_date: "2024-02-15T00:00:00Z"
      },
      {
        id: "3",
        title: "Programme Mondial de Déploiement d'Énergies Renouvelables",
        description: "Initiative décentralisée pour installer 500GW de capacité renouvelable dans les pays en développement avec transfert technologique gratuit.",
        category: "technologies_vertes", 
        priority: "high",
        votes_for: 345678,
        votes_against: 23456,
        votes_abstain: 45678,
        estimated_budget_eur: 8000000000,
        status: "pending",
        proposed_by: "Alliance Tech Verte",
        climate_impact_level: "critical",
        target_regions: ["Afrique", "Asie du Sud-Est", "Amérique Latine"],
        implementation_timeline: "60 mois", 
        expected_climate_impact: "Réduction de 25% des émissions énergétiques globales",
        supporting_evidence: "Rapports AIE sur le potentiel renouvelable",
        created_at: "2024-01-05T09:15:00Z",
        voting_start_date: "2024-02-01T00:00:00Z",
        voting_end_date: "2024-03-01T00:00:00Z"
      }
    ];

    setTimeout(() => {
      setProposals(mockProposals);
      setLoading(false);
    }, 1000);
  }, []);

  const getCategoryLabel = (category: string) => {
    const categories = {
      surveillance_climatique: "Surveillance Climatique",
      intervention_urgence: "Intervention d'Urgence",
      technologies_vertes: "Technologies Vertes", 
      adaptation_climat: "Adaptation Climatique",
      justice_climatique: "Justice Climatique",
      financement_carbone: "Financement Carbone"
    };
    return categories[category as keyof typeof categories] || category;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      surveillance_climatique: Thermometer,
      intervention_urgence: AlertTriangle,
      technologies_vertes: Zap,
      adaptation_climat: Shield,
      justice_climatique: Users,
      financement_carbone: TrendingUp
    };
    return icons[category as keyof typeof icons] || Leaf;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: "bg-red-500",
      high: "bg-orange-500",
      medium: "bg-yellow-500",
      low: "bg-green-500"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-500";
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      critical: "Critique",
      high: "Élevée", 
      medium: "Moyenne",
      low: "Faible"
    };
    return labels[priority as keyof typeof labels] || priority;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return Vote;
      case "pending": return Clock;
      case "completed": return Shield;
      default: return Clock;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: "Vote en cours",
      pending: "En attente", 
      completed: "Terminé",
      draft: "Brouillon"
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getTotalVotes = (proposal: OSPProposal) => {
    return proposal.votes_for + proposal.votes_against + proposal.votes_abstain;
  };

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const formatBudget = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}Md €`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M €`;
    } else {
      return `${amount.toLocaleString()} €`;
    }
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Terminé";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}j ${hours}h`;
    return `${hours}h`;
  };

  const filterProposals = (status: string) => {
    switch (status) {
      case "active":
        return proposals.filter(p => p.status === "active");
      case "pending": 
        return proposals.filter(p => p.status === "pending");
      case "completed":
        return proposals.filter(p => p.status === "completed");
      default:
        return proposals;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement des propositions climatiques...</p>
        </div>
      </div>
    );
  }

  if (showProposalForm) {
    return (
      <OSPProposalForm 
        onBack={() => setShowProposalForm(false)}
        onSubmit={(proposal) => {
          console.log("Nouvelle proposition:", proposal);
          setShowProposalForm(false);
        }}
      />
    );
  }

  const activeProposals = filterProposals("active");
  const pendingProposals = filterProposals("pending"); 
  const completedProposals = filterProposals("completed");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/osp')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour OSP
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gouvernance Climatique Mondiale</h1>
            <p className="text-muted-foreground">
              Humanocratie participative mondiale pour les politiques climatiques. 
              Chaque habitant peut proposer et voter sur les mesures qui affectent notre planète.
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{activeProposals.length}</div>
            <div className="text-sm text-muted-foreground">Votes Actifs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">2.8M</div>
            <div className="text-sm text-muted-foreground">Habitants Participants</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{completedProposals.length}</div>
            <div className="text-sm text-muted-foreground">Propositions Adoptées</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">15.2Md €</div>
            <div className="text-sm text-muted-foreground">Budget Climat Alloué</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
          <CardDescription>
            Participez à la gouvernance climatique décentralisée
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => setShowProposalForm(true)}
            >
              <Plus className="h-6 w-6" />
              <span className="font-semibold">Nouvelle Proposition Climat</span>
              <span className="text-xs opacity-80">Proposer une action climatique</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => navigate('/osp/vote-planetaire')}
            >
              <Vote className="h-6 w-6" />
              <span className="font-semibold">Vote Planétaire</span>
              <span className="text-xs opacity-80">Humanocratie directe</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => navigate('/osp/assemblee-mondiale')}
            >
              <Users className="h-6 w-6" />
              <span className="font-semibold">Assemblée Virtuelle Mondiale</span>
              <span className="text-xs opacity-80">Sessions live multi-acteurs</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Propositions */}
      <Card>
        <CardHeader>
          <CardTitle>Propositions Climatiques Mondiales</CardTitle>
          <CardDescription>
            Toutes les propositions sont votées par les habitants du monde et experts climat via blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active">
                Actives ({activeProposals.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                En Attente ({pendingProposals.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Terminées ({completedProposals.length})
              </TabsTrigger>
              <TabsTrigger value="all">
                Toutes ({proposals.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeProposals.map((proposal) => {
                const IconComponent = getCategoryIcon(proposal.category);
                const StatusIcon = getStatusIcon(proposal.status);
                const totalVotes = getTotalVotes(proposal);
                const forPercentage = getVotePercentage(proposal.votes_for, totalVotes);
                
                return (
                  <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 rounded-lg bg-muted">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg leading-tight mb-2">
                              {proposal.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {proposal.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {getCategoryLabel(proposal.category)}
                              </Badge>
                              <Badge 
                                variant="secondary"
                                className={`text-xs text-white ${getPriorityColor(proposal.priority)}`}
                              >
                                Priorité {getPriorityLabel(proposal.priority)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {getStatusLabel(proposal.status)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Globe className="h-3 w-3 mr-1" />
                                {proposal.target_regions.join(", ")}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground ml-4">
                          <div className="font-medium">{formatBudget(proposal.estimated_budget_eur)}</div>
                          <div className="text-xs">Budget estimé</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground mb-1">Impact Attendu</div>
                            <div className="font-medium">{proposal.expected_climate_impact}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">Délai</div>
                            <div className="font-medium">{proposal.implementation_timeline}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">Temps Restant</div>
                            <div className="font-medium">{getTimeRemaining(proposal.voting_end_date)}</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Résultats du vote</span>
                            <span className="font-medium">
                              {totalVotes.toLocaleString()} votes • {forPercentage}% Pour
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-12 text-xs text-muted-foreground">Pour</div>
                              <Progress value={forPercentage} className="flex-1 h-2" />
                              <div className="w-16 text-xs text-right font-medium">
                                {proposal.votes_for.toLocaleString()}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-12 text-xs text-muted-foreground">Contre</div>
                              <Progress 
                                value={getVotePercentage(proposal.votes_against, totalVotes)} 
                                className="flex-1 h-2"
                              />
                              <div className="w-16 text-xs text-right font-medium">
                                {proposal.votes_against.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="text-sm text-muted-foreground">
                            Proposé par <span className="font-medium">{proposal.proposed_by}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Voir Détails
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {pendingProposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <CardDescription>{proposal.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{getCategoryLabel(proposal.category)}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Vote démarre le {new Date(proposal.voting_start_date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedProposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <CardDescription>{proposal.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{getCategoryLabel(proposal.category)}</Badge>
                      <Badge variant="outline" className="text-green-600">
                        ✓ Adoptée
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <CardDescription>{proposal.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{getCategoryLabel(proposal.category)}</Badge>
                      <Badge variant="outline">{getStatusLabel(proposal.status)}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OSPGovernance;