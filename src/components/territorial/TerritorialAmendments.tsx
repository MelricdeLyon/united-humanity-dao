import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit2, FileText, Vote, Calendar, Plus, GitBranch, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import type { TerritorialLevel } from "@/types/territorial";

interface TerritorialAmendmentsProps {
  territorialEntityId: string;
  level: TerritorialLevel;
}

const mockAmendments = [
  {
    id: "1",
    proposalId: "1",
    proposalTitle: "Plan de Mobilité Douce 2024-2030",
    title: "Extension aux vélos électriques partagés",
    author: "Pierre Durand",
    type: "addition",
    status: "voting",
    votes: { for: 45, against: 8, abstain: 2 },
    deadline: "2024-03-20",
    description: "Ajout d'un service de vélos électriques en libre-service avec 50 stations supplémentaires.",
    originalText: "Développement d'un réseau cyclable intégré...",
    amendedText: "Développement d'un réseau cyclable intégré avec service de vélos électriques partagés...",
    budgetImpact: "+300000",
    justification: "Le service de vélos électriques augmentera l'adoption par les personnes âgées et les trajets longue distance."
  },
  {
    id: "2",
    proposalId: "1",
    proposalTitle: "Plan de Mobilité Douce 2024-2030",
    title: "Réduction du budget initial",
    author: "Marie Leclerc",
    type: "modification",
    status: "pending",
    votes: { for: 0, against: 0, abstain: 0 },
    deadline: "2024-03-25",
    description: "Réduction du budget de 500k€ en reportant certains aménagements à la phase 2.",
    originalText: "Budget total: 2,5M€",
    amendedText: "Budget phase 1: 2M€, Phase 2: 500k€ (2026)",
    budgetImpact: "-500000",
    justification: "Étalement sur 2 phases pour mieux maîtriser les coûts et tester l'efficacité."
  },
  {
    id: "3",
    proposalId: "2",
    proposalTitle: "Budget Participatif Numérique",
    title: "Ajout module de transparence avancée",
    author: "Tech Committee",
    type: "addition",
    status: "approved",
    votes: { for: 67, against: 3, abstain: 1 },
    deadline: "2024-03-15",
    description: "Intégration d'un module de traçabilité blockchain pour chaque euro dépensé.",
    originalText: "Plateforme blockchain pour la gestion transparente...",
    amendedText: "Plateforme blockchain avec traçabilité complète pour la gestion transparente...",
    budgetImpact: "+75000",
    justification: "La traçabilité renforcée augmentera la confiance des citoyens dans le processus."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "voting": return "bg-blue-100 text-blue-800";
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "approved": return "bg-green-100 text-green-800";
    case "rejected": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "voting": return "Vote en cours";
    case "pending": return "En attente";
    case "approved": return "Approuvé";
    case "rejected": return "Rejeté";
    default: return "Inconnu";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "addition": return "bg-green-100 text-green-800";
    case "modification": return "bg-blue-100 text-blue-800";
    case "suppression": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getTypeText = (type: string) => {
  switch (type) {
    case "addition": return "Ajout";
    case "modification": return "Modification";
    case "suppression": return "Suppression";
    default: return "Inconnu";
  }
};

const formatBudgetImpact = (impact: string) => {
  const amount = parseInt(impact);
  const formatted = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.abs(amount));
  
  return amount > 0 ? `+${formatted}` : `-${formatted}`;
};

export const TerritorialAmendments = ({ territorialEntityId, level }: TerritorialAmendmentsProps) => {
  const [selectedTab, setSelectedTab] = useState<"active" | "history" | "create">("active");
  const [formData, setFormData] = useState({
    proposalId: "",
    title: "",
    type: "",
    description: "",
    originalText: "",
    amendedText: "",
    budgetImpact: "",
    justification: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Amendment submitted:", formData);
  };

  const handleVote = (amendmentId: string, voteType: "for" | "against" | "abstain") => {
    console.log("Vote submitted:", { amendmentId, voteType });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit2 className="h-5 w-5" />
            Amendements et Modifications
          </CardTitle>
          <CardDescription>
            Système collaboratif d'amélioration des propositions législatives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-muted-foreground">En Vote</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-muted-foreground">Approuvés</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-muted-foreground">En Attente</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-muted-foreground">Votes Total</div>
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
          Amendements Actifs
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
          Nouvel Amendement
        </Button>
      </div>

      {/* Active Amendments */}
      {selectedTab === "active" && (
        <div className="space-y-4">
          {mockAmendments.filter(a => a.status === "voting" || a.status === "pending").map((amendment) => (
            <Card key={amendment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{amendment.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      Amendement à: <strong>{amendment.proposalTitle}</strong>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getTypeColor(amendment.type)}>
                        <GitBranch className="h-3 w-3 mr-1" />
                        {getTypeText(amendment.type)}
                      </Badge>
                      <Badge className={getStatusColor(amendment.status)}>
                        {getStatusText(amendment.status)}
                      </Badge>
                      {amendment.budgetImpact && (
                        <Badge variant={parseInt(amendment.budgetImpact) > 0 ? "destructive" : "default"}>
                          Impact: {formatBudgetImpact(amendment.budgetImpact)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Par: <strong>{amendment.author}</strong></div>
                    <div>Échéance: <strong>{amendment.deadline}</strong></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{amendment.description}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-red-600">Texte Original</Label>
                      <p className="text-sm mt-1 p-2 bg-red-50 rounded border-l-4 border-red-200">
                        {amendment.originalText}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-green-600">Texte Amendé</Label>
                      <p className="text-sm mt-1 p-2 bg-green-50 rounded border-l-4 border-green-200">
                        {amendment.amendedText}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Label className="text-sm font-medium text-blue-900">Justification</Label>
                    <p className="text-sm mt-1 text-blue-800">{amendment.justification}</p>
                  </div>

                  {amendment.status === "voting" && (
                    <>
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{amendment.votes.for}</div>
                          <div className="text-sm text-muted-foreground">Pour</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{amendment.votes.against}</div>
                          <div className="text-sm text-muted-foreground">Contre</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-600">{amendment.votes.abstain}</div>
                          <div className="text-sm text-muted-foreground">Abstention</div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleVote(amendment.id, "for")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Approuver
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleVote(amendment.id, "against")}
                        >
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          Rejeter
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleVote(amendment.id, "abstain")}
                        >
                          S'abstenir
                        </Button>
                        <Button size="sm" variant="outline" className="ml-auto">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Commentaires
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              Voir Détails
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>{amendment.title}</DialogTitle>
                              <DialogDescription>
                                Amendement par {amendment.author} • {getTypeText(amendment.type)}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                              <div>
                                <Label>Proposition concernée</Label>
                                <p className="text-sm mt-1">{amendment.proposalTitle}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-red-600">Texte Original</Label>
                                  <div className="text-sm mt-1 p-3 bg-red-50 rounded border">
                                    {amendment.originalText}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-green-600">Texte Amendé</Label>
                                  <div className="text-sm mt-1 p-3 bg-green-50 rounded border">
                                    {amendment.amendedText}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Label>Justification détaillée</Label>
                                <p className="text-sm mt-1">{amendment.justification}</p>
                              </div>
                              {amendment.budgetImpact && (
                                <div>
                                  <Label>Impact budgétaire</Label>
                                  <p className="text-sm mt-1 font-medium">
                                    {formatBudgetImpact(amendment.budgetImpact)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </>
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
          {mockAmendments.filter(a => a.status === "approved" || a.status === "rejected").map((amendment) => (
            <Card key={amendment.id} className="opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{amendment.title}</CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      {amendment.proposalTitle}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge className={getTypeColor(amendment.type)}>
                        {getTypeText(amendment.type)}
                      </Badge>
                      <Badge className={getStatusColor(amendment.status)}>
                        {getStatusText(amendment.status)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Par: {amendment.author}</div>
                    <div>
                      {amendment.votes.for + amendment.votes.against + amendment.votes.abstain} votes
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{amendment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Amendment Form */}
      {selectedTab === "create" && (
        <Card>
          <CardHeader>
            <CardTitle>Créer un Nouvel Amendement</CardTitle>
            <CardDescription>
              Proposez une modification, ajout ou suppression à une proposition existante
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="proposalId">Proposition à amender</Label>
                <Select value={formData.proposalId} onValueChange={(value) => setFormData({...formData, proposalId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une proposition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Plan de Mobilité Douce 2024-2030</SelectItem>
                    <SelectItem value="2">Budget Participatif Numérique</SelectItem>
                    <SelectItem value="3">Rénovation Énergétique des Bâtiments Publics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titre de l'amendement</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Titre descriptif de votre amendement"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type d'amendement</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type d'amendement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="addition">Ajout</SelectItem>
                      <SelectItem value="modification">Modification</SelectItem>
                      <SelectItem value="suppression">Suppression</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description de l'amendement</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Décrivez brièvement votre amendement..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="originalText">Texte original</Label>
                  <Textarea
                    id="originalText"
                    value={formData.originalText}
                    onChange={(e) => setFormData({...formData, originalText: e.target.value})}
                    placeholder="Copiez le texte original à modifier..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="amendedText">Texte amendé</Label>
                  <Textarea
                    id="amendedText"
                    value={formData.amendedText}
                    onChange={(e) => setFormData({...formData, amendedText: e.target.value})}
                    placeholder="Votre version modifiée du texte..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budgetImpact">Impact budgétaire (€)</Label>
                  <Input
                    id="budgetImpact"
                    type="number"
                    value={formData.budgetImpact}
                    onChange={(e) => setFormData({...formData, budgetImpact: e.target.value})}
                    placeholder="0 (positif = coût, négatif = économie)"
                  />
                </div>
                <div className="flex items-end">
                  <div className="text-sm text-muted-foreground">
                    Utilisez un nombre positif pour un coût supplémentaire,<br />
                    négatif pour une économie
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="justification">Justification</Label>
                <Textarea
                  id="justification"
                  value={formData.justification}
                  onChange={(e) => setFormData({...formData, justification: e.target.value})}
                  placeholder="Expliquez pourquoi cet amendement améliore la proposition..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Soumettre l'Amendement
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