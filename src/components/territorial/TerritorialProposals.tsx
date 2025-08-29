import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Vote, Calendar, Euro, TrendingUp, Eye, MessageSquare, Edit3, Plus } from "lucide-react";
import type { TerritorialLevel } from "@/types/territorial";

interface TerritorialProposalsProps {
  territorialEntityId: string;
  level: TerritorialLevel;
}

const mockProposals = [
  {
    id: "1",
    title: "Plan de Mobilité Douce 2024-2030",
    category: "Transport & Mobilité",
    author: "Commission Environnement",
    status: "voting",
    priority: "high",
    budget: 2500000,
    votes: { for: 89, against: 12, abstain: 3 },
    deadline: "2024-03-25",
    description: "Développement d'un réseau cyclable intégré avec zones piétonnes étendues et points de recharge électrique.",
    impact: "Réduction de 30% des émissions CO2 du transport urbain",
    views: 234,
    comments: 18
  },
  {
    id: "2",
    title: "Budget Participatif Numérique",
    category: "Numérique & Innovation",
    author: "Marie Dubois",
    status: "draft",
    priority: "medium",
    budget: 500000,
    votes: { for: 0, against: 0, abstain: 0 },
    deadline: "2024-04-10",
    description: "Plateforme blockchain pour la gestion transparente du budget participatif avec vote tokenisé des citoyens.",
    impact: "Amélioration de la transparence et participation citoyenne",
    views: 156,
    comments: 7
  },
  {
    id: "3",
    title: "Rénovation Énergétique des Bâtiments Publics",
    category: "Environnement",
    author: "Service Technique",
    status: "approved",
    priority: "high",
    budget: 1800000,
    votes: { for: 142, against: 8, abstain: 5 },
    deadline: "2024-02-15",
    description: "Programme de rénovation énergétique complète avec installation de panneaux solaires et pompes à chaleur.",
    impact: "Économie de 40% sur la facture énergétique municipale",
    views: 389,
    comments: 25
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "voting": return "bg-blue-100 text-blue-800";
    case "draft": return "bg-yellow-100 text-yellow-800";
    case "approved": return "bg-green-100 text-green-800";
    case "rejected": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "voting": return "Vote en cours";
    case "draft": return "Brouillon";
    case "approved": return "Approuvée";
    case "rejected": return "Rejetée";
    default: return "Inconnu";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getCategoryColor = (category: string) => {
  const colors = {
    "Transport & Mobilité": "bg-blue-100 text-blue-800",
    "Numérique & Innovation": "bg-purple-100 text-purple-800",
    "Environnement": "bg-green-100 text-green-800",
    "Social & Solidarité": "bg-orange-100 text-orange-800",
    "Culture & Sport": "bg-pink-100 text-pink-800",
    "Économie": "bg-yellow-100 text-yellow-800"
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const TerritorialProposals = ({ territorialEntityId, level }: TerritorialProposalsProps) => {
  const [selectedTab, setSelectedTab] = useState<"active" | "history" | "create">("active");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    budget: "",
    description: "",
    impact: "",
    implementation: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Proposal submitted:", formData);
  };

  const handleVote = (proposalId: string, voteType: "for" | "against" | "abstain") => {
    console.log("Vote submitted:", { proposalId, voteType });
  };

  const formatBudget = (amount: number) => {
    const jrcAmount = amount * 100; // 1 euro = 100 JRC
    return {
      jrc: `${new Intl.NumberFormat('fr-FR').format(jrcAmount)} JRC`,
      eur: new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    };
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Propositions de Loi et Réglementations
          </CardTitle>
          <CardDescription>
            Processus législatif participatif et démocratique
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-muted-foreground">En Vote</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-muted-foreground">Approuvées</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <div className="text-sm text-muted-foreground">En Préparation</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-lg font-bold text-purple-600">480M JRC</div>
              <div className="text-xs text-muted-foreground">4.8M€</div>
              <div className="text-sm text-muted-foreground">Budget Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-2 border-b">
        <Button 
          variant={selectedTab === "active" ? "default" : "ghost"}
          onClick={() => setSelectedTab("active")}
        >
          <Vote className="h-4 w-4 mr-2" />
          Propositions Actives
        </Button>
        <Button 
          variant={selectedTab === "history" ? "default" : "ghost"}
          onClick={() => setSelectedTab("history")}
        >
          <FileText className="h-4 w-4 mr-2" />
          Historique
        </Button>
        <Button 
          variant={selectedTab === "create" ? "default" : "ghost"}
          onClick={() => setSelectedTab("create")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Proposition
        </Button>
      </div>

      {/* Active Proposals */}
      {selectedTab === "active" && (
        <div className="space-y-4">
          {mockProposals.filter(p => p.status === "voting" || p.status === "draft").map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{proposal.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getCategoryColor(proposal.category)}>
                        {proposal.category}
                      </Badge>
                      <Badge className={getStatusColor(proposal.status)}>
                        {getStatusText(proposal.status)}
                      </Badge>
                      <Badge className={getPriorityColor(proposal.priority)}>
                        Priorité {proposal.priority === 'high' ? 'Haute' : proposal.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{formatBudget(proposal.budget).jrc}</div>
                    <div className="text-xs text-muted-foreground">{formatBudget(proposal.budget).eur}</div>
                    <div className="text-sm text-muted-foreground">Budget estimé</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{proposal.description}</p>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900 mb-1">Impact Prévu</div>
                    <p className="text-blue-800 text-sm">{proposal.impact}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Échéance: <strong>{proposal.deadline}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>Vues: <strong>{proposal.views}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>Commentaires: <strong>{proposal.comments}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span>Par: <strong>{proposal.author}</strong></span>
                    </div>
                  </div>

                  {proposal.status === "voting" && (
                    <>
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{proposal.votes.for}</div>
                          <div className="text-sm text-muted-foreground">Pour</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{proposal.votes.against}</div>
                          <div className="text-sm text-muted-foreground">Contre</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-600">{proposal.votes.abstain}</div>
                          <div className="text-sm text-muted-foreground">Abstention</div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleVote(proposal.id, "for")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Voter Pour
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleVote(proposal.id, "against")}
                        >
                          Voter Contre
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleVote(proposal.id, "abstain")}
                        >
                          S'abstenir
                        </Button>
                        <Button size="sm" variant="outline" className="ml-auto">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Commenter
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              Détails
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{proposal.title}</DialogTitle>
                              <DialogDescription>
                                Proposition de {proposal.author} • {proposal.category}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                              <div>
                                <Label>Description complète</Label>
                                <p className="text-sm mt-1">{proposal.description}</p>
                              </div>
                              <div>
                                <Label>Impact attendu</Label>
                                <p className="text-sm mt-1">{proposal.impact}</p>
                              </div>
                              <div>
                                <Label>Budget détaillé</Label>
                                <p className="text-sm mt-1">Budget total: {formatBudget(proposal.budget).jrc} ({formatBudget(proposal.budget).eur})</p>
                              </div>
                              <div>
                                <Label>Calendrier de mise en œuvre</Label>
                                <p className="text-sm mt-1">Début prévu: Mars 2024 | Durée: 24 mois</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </>
                  )}

                  {proposal.status === "draft" && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline">
                        <Edit3 className="h-3 w-3 mr-1" />
                        Modifier
                      </Button>
                      <Button size="sm">
                        Soumettre au Vote
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* History Tab */}
      {selectedTab === "history" && (
        <div className="space-y-4">
          {mockProposals.filter(p => p.status === "approved" || p.status === "rejected").map((proposal) => (
            <Card key={proposal.id} className="opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge className={getCategoryColor(proposal.category)}>
                        {proposal.category}
                      </Badge>
                      <Badge className={getStatusColor(proposal.status)}>
                        {getStatusText(proposal.status)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-600">
                      <div>{formatBudget(proposal.budget).jrc}</div>
                      <div className="text-xs font-normal text-muted-foreground">{formatBudget(proposal.budget).eur}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {proposal.votes.for + proposal.votes.against + proposal.votes.abstain} votes
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{proposal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Proposal Form */}
      {selectedTab === "create" && (
        <Card>
          <CardHeader>
            <CardTitle>Créer une Nouvelle Proposition</CardTitle>
            <CardDescription>
              Soumettez une proposition de loi ou réglementation pour examen et vote
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Titre de la proposition</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Titre descriptif de votre proposition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transport">Transport & Mobilité</SelectItem>
                      <SelectItem value="numerique">Numérique & Innovation</SelectItem>
                      <SelectItem value="environnement">Environnement</SelectItem>
                      <SelectItem value="social">Social & Solidarité</SelectItem>
                      <SelectItem value="culture">Culture & Sport</SelectItem>
                      <SelectItem value="economie">Économie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget">Budget estimé (JRC)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="250000 (équivalent 2500€)"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Décrivez votre proposition en détail..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="impact">Impact attendu</Label>
                <Textarea
                  id="impact"
                  value={formData.impact}
                  onChange={(e) => setFormData({...formData, impact: e.target.value})}
                  placeholder="Décrivez l'impact positif attendu sur la collectivité..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="implementation">Plan de mise en œuvre</Label>
                <Textarea
                  id="implementation"
                  value={formData.implementation}
                  onChange={(e) => setFormData({...formData, implementation: e.target.value})}
                  placeholder="Décrivez les étapes et le calendrier de mise en œuvre..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer la Proposition
                </Button>
                <Button type="button" variant="outline">
                  Sauvegarder comme Brouillon
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};