import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Vote, Clock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  votes_for: number;
  votes_against: number;
  voting_ends_at: string;
  created_at: string;
}

const Proposals = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    category: "general"
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const { data } = await supabase
        .from("dao_proposals")
        .select("*")
        .order("created_at", { ascending: false });

      setProposals(data || []);
    } catch (error) {
      console.error("Error fetching proposals:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les propositions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProposal = async () => {
    try {
      // Note: In a real implementation, you'd check if user is authenticated
      // For demo purposes, we'll use a placeholder user_id
      const { data, error } = await supabase
        .from("dao_proposals")
        .insert([{
          ...newProposal,
          creator_id: "00000000-0000-0000-0000-000000000000" // Placeholder
        }])
        .select()
        .single();

      if (error) throw error;

      setProposals(prev => [data, ...prev]);
      setNewProposal({ title: "", description: "", category: "general" });
      setIsCreateDialogOpen(false);

      toast({
        title: "Proposition créée",
        description: "Votre proposition a été soumise avec succès",
      });
    } catch (error) {
      console.error("Error creating proposal:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la proposition",
        variant: "destructive"
      });
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || proposal.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Vote className="h-16 w-16 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Chargement des propositions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Propositions DAO
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Soumettez et votez pour les propositions de gouvernance
            </p>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Plus className="mr-2 h-5 w-5" />
                  Nouvelle Proposition
                </Button>
              </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Créer une Nouvelle Proposition</DialogTitle>
                <DialogDescription>
                  Soumettez une proposition pour améliorer la DAO. Elle sera soumise au vote des citoyens.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de la Proposition</Label>
                  <Input
                    id="title"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Augmenter le budget du département Paix & Sécurité"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select 
                    value={newProposal.category} 
                    onValueChange={(value) => setNewProposal(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Général</SelectItem>
                      <SelectItem value="treasury">Trésor</SelectItem>
                      <SelectItem value="governance">Gouvernance</SelectItem>
                      <SelectItem value="development">Développement</SelectItem>
                      <SelectItem value="security">Sécurité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description Détaillée</Label>
                  <Textarea
                    id="description"
                    value={newProposal.description}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Décrivez votre proposition en détail, incluez les raisons, impacts attendus et modalités d'exécution..."
                    className="min-h-[120px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button 
                  onClick={handleCreateProposal}
                  disabled={!newProposal.title || !newProposal.description}
                  className="gradient-primary"
                >
                  Soumettre la Proposition
                </Button>
              </DialogFooter>
            </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une proposition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">En cours</SelectItem>
                  <SelectItem value="passed">Adoptées</SelectItem>
                  <SelectItem value="rejected">Rejetées</SelectItem>
                  <SelectItem value="executed">Exécutées</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Proposals List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6">
            {filteredProposals.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Vote className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Aucune proposition trouvée</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || filterStatus !== "all" 
                      ? "Aucune proposition ne correspond à vos critères de recherche."
                      : "Soyez le premier à soumettre une proposition !"}
                  </p>
                  <Button 
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="gradient-primary"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une Proposition
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredProposals.map((proposal) => (
                <Card key={proposal.id} className="shadow-governance hover:shadow-elevated transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{proposal.title}</CardTitle>
                          <Badge variant="outline">{proposal.category}</Badge>
                        </div>
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
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {proposal.votes_for}
                        </p>
                        <p className="text-sm text-muted-foreground">Votes Pour</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {proposal.votes_against}
                        </p>
                        <p className="text-sm text-muted-foreground">Votes Contre</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {((proposal.votes_for + proposal.votes_against) / 2847 * 100).toFixed(1)}%
                        </p>
                        <p className="text-sm text-muted-foreground">Participation</p>
                      </div>
                    </div>

                    {proposal.status === 'active' && (
                      <div className="flex gap-3">
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

                    <div className="flex justify-between items-center mt-4 pt-4 border-t text-sm text-muted-foreground">
                      <span>Créée le {new Date(proposal.created_at).toLocaleDateString('fr-FR')}</span>
                      <Button variant="ghost" size="sm">
                        Voir les Détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Proposals;