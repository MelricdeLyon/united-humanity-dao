import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  FileText, 
  Heart, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Shield,
  Activity,
  Globe,
  Coins,
  Calendar,
  Target,
  Vote,
  ArrowLeft
} from 'lucide-react';

interface OHSProposal {
  id: string;
  title: string;
  description: string;
  category: string;
  health_priority_level: string;
  proposed_by: string;
  target_regions?: string[];
  estimated_budget_eur?: number;
  implementation_timeline?: string;
  expected_health_impact?: string;
  supporting_evidence?: string;
  votes_for: number;
  votes_against: number;
  votes_abstain: number;
  status: string;
  voting_start_date?: string;
  voting_end_date?: string;
  created_at: string;
}

const OHSGovernance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [proposals, setProposals] = useState<OHSProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const { data, error } = await supabase
        .from('ohs_proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProposals(data || []);
    } catch (error) {
      console.error('Error fetching OHS proposals:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les propositions OHS",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'surveillance_epidemiologique':
        return 'Surveillance Épidémiologique';
      case 'intervention_urgence':
        return 'Intervention d\'Urgence';
      case 'recherche_medicale':
        return 'Recherche Médicale';
      case 'sante_preventive':
        return 'Santé Préventive';
      case 'financement_sante':
        return 'Financement Santé';
      case 'partenariats':
        return 'Partenariats';
      default:
        return category;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'surveillance_epidemiologique':
        return Search;
      case 'intervention_urgence':
        return AlertCircle;
      case 'recherche_medicale':
        return Activity;
      case 'sante_preventive':
        return Shield;
      case 'financement_sante':
        return Coins;
      case 'partenariats':
        return Globe;
      default:
        return FileText;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'secondary';
      case 'medium':
        return 'outline';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'Critique';
      case 'high':
        return 'Élevée';
      case 'medium':
        return 'Moyenne';
      case 'low':
        return 'Faible';
      default:
        return priority;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'voting':
        return Vote;
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      case 'implemented':
        return Target;
      default:
        return Clock;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Brouillon';
      case 'voting':
        return 'En vote';
      case 'approved':
        return 'Approuvée';
      case 'rejected':
        return 'Rejetée';
      case 'implemented':
        return 'Implémentée';
      default:
        return status;
    }
  };

  const getTotalVotes = (proposal: OHSProposal) => {
    return proposal.votes_for + proposal.votes_against + proposal.votes_abstain;
  };

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const formatBudget = (budget?: number) => {
    if (!budget) return 'Non défini';
    const jerrcoins = budget * 100; // 1 euro = 100 jerrcoins
    return `${jerrcoins.toLocaleString()} JERR (${budget.toLocaleString()} €)`;
  };

  const getTimeRemaining = (endDate?: string) => {
    if (!endDate) return '';
    
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Vote terminé';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} jour${days > 1 ? 's' : ''} restant${days > 1 ? 's' : ''}`;
    return `${hours} heure${hours > 1 ? 's' : ''} restante${hours > 1 ? 's' : ''}`;
  };

  const filterProposals = (status: string) => {
    switch (status) {
      case 'active':
        return proposals.filter(p => p.status === 'voting');
      case 'pending':
        return proposals.filter(p => p.status === 'draft');
      case 'completed':
        return proposals.filter(p => ['approved', 'rejected', 'implemented'].includes(p.status));
      default:
        return proposals;
    }
  };

  // Statistiques
  const stats = {
    total: proposals.length,
    active: proposals.filter(p => p.status === 'voting').length,
    approved: proposals.filter(p => p.status === 'approved').length,
    implemented: proposals.filter(p => p.status === 'implemented').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la gouvernance OHS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/ohs')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil OHS
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-green-600">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gouvernance OHS
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Démocratie participative mondiale pour les politiques de santé. 
            Chaque citoyen peut proposer et voter sur les mesures qui affectent la santé globale.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <Badge variant="outline" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Assemblée Mondiale de la Santé</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2">
              <Vote className="h-4 w-4" />
              <span>Vote citoyen + Expert</span>
            </Badge>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Propositions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Vote className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-sm text-gray-600">En vote</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.approved}</p>
                  <p className="text-sm text-gray-600">Approuvées</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.implemented}</p>
                  <p className="text-sm text-gray-600">Implémentées</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>
              Participez à la gouvernance démocratique de la santé mondiale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="h-16 flex-col space-y-2">
                <FileText className="h-6 w-6" />
                <span>Nouvelle Proposition</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Vote className="h-6 w-6" />
                <span>Consultation Citoyenne</span>
              </Button>
              
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Assemblée Virtuelle</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Propositions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Propositions de Politiques de Santé</CardTitle>
            <CardDescription>
              Propositions soumises par la communauté mondiale pour améliorer la santé publique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="active">
                  En Vote ({stats.active})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  En Attente ({proposals.filter(p => p.status === 'draft').length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Terminées ({proposals.filter(p => ['approved', 'rejected', 'implemented'].includes(p.status)).length})
                </TabsTrigger>
                <TabsTrigger value="all">
                  Toutes ({stats.total})
                </TabsTrigger>
              </TabsList>

              {['active', 'pending', 'completed', 'all'].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-6 mt-6">
                  {filterProposals(tab).length === 0 ? (
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Aucune proposition dans cette catégorie
                      </h3>
                      <p className="text-gray-600">
                        {tab === 'active' ? 
                          'Aucun vote en cours actuellement.' :
                          'Aucune proposition disponible.'
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filterProposals(tab).map((proposal) => {
                        const CategoryIcon = getCategoryIcon(proposal.category);
                        const StatusIcon = getStatusIcon(proposal.status);
                        const totalVotes = getTotalVotes(proposal);
                        
                        return (
                          <Card key={proposal.id} className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                  <div className="p-3 bg-blue-100 rounded-lg">
                                    <CategoryIcon className="h-6 w-6 text-blue-600" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <CardTitle className="text-xl">{proposal.title}</CardTitle>
                                      <Badge variant={getPriorityColor(proposal.health_priority_level)}>
                                        {getPriorityLabel(proposal.health_priority_level)}
                                      </Badge>
                                    </div>
                                    <CardDescription className="text-base mb-3">
                                      {proposal.description}
                                    </CardDescription>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                      <span className="flex items-center space-x-1">
                                        <StatusIcon className="h-4 w-4" />
                                        <span>{getStatusLabel(proposal.status)}</span>
                                      </span>
                                      <span className="flex items-center space-x-1">
                                        <Activity className="h-4 w-4" />
                                        <span>{getCategoryLabel(proposal.category)}</span>
                                      </span>
                                       <span className="flex items-center space-x-1">
                                         <Coins className="h-4 w-4" />
                                         <span>{formatBudget(proposal.estimated_budget_eur)}</span>
                                       </span>
                                      {proposal.voting_end_date && (
                                        <span className="flex items-center space-x-1">
                                          <Clock className="h-4 w-4" />
                                          <span>{getTimeRemaining(proposal.voting_end_date)}</span>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>

                            <CardContent>
                              {proposal.status === 'voting' && totalVotes > 0 && (
                                <div className="space-y-3 mb-6">
                                  <h4 className="font-medium text-gray-900">Résultats du vote ({totalVotes} votes)</h4>
                                  
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-green-600">Pour ({proposal.votes_for})</span>
                                      <span>{getVotePercentage(proposal.votes_for, totalVotes)}%</span>
                                    </div>
                                    <Progress value={getVotePercentage(proposal.votes_for, totalVotes)} className="h-2" />
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-red-600">Contre ({proposal.votes_against})</span>
                                      <span>{getVotePercentage(proposal.votes_against, totalVotes)}%</span>
                                    </div>
                                    <Progress value={getVotePercentage(proposal.votes_against, totalVotes)} className="h-2" />
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Abstention ({proposal.votes_abstain})</span>
                                      <span>{getVotePercentage(proposal.votes_abstain, totalVotes)}%</span>
                                    </div>
                                    <Progress value={getVotePercentage(proposal.votes_abstain, totalVotes)} className="h-2" />
                                  </div>
                                </div>
                              )}

                              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                                {proposal.target_regions && proposal.target_regions.length > 0 && (
                                  <div>
                                    <strong>Régions cibles :</strong>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {proposal.target_regions.map((region, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {region}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {proposal.implementation_timeline && (
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4" />
                                    <span><strong>Timeline :</strong> {proposal.implementation_timeline}</span>
                                  </div>
                                )}
                              </div>

                              {proposal.expected_health_impact && (
                                <div className="mb-4">
                                  <p className="text-sm"><strong>Impact attendu :</strong> {proposal.expected_health_impact}</p>
                                </div>
                              )}

                              <div className="flex justify-end space-x-3">
                                {proposal.status === 'voting' && (
                                  <>
                                    <Button variant="outline" size="sm" className="text-green-600 border-green-300">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Pour
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Contre
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <AlertCircle className="mr-2 h-4 w-4" />
                                      Abstention
                                    </Button>
                                  </>
                                )}
                                <Button variant="outline" size="sm">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Détails
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="mt-12 shadow-lg bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Façonnez l'avenir de la santé mondiale
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Votre voix compte dans les décisions qui affectent la santé de l'humanité. 
              Proposez, débattez et votez pour un monde en meilleure santé.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Soumettre une Proposition
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Users className="mr-2 h-5 w-5" />
                Rejoindre l'Assemblée
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default OHSGovernance;