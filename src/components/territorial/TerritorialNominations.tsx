import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Vote, Calendar, User, Clock, CheckCircle, AlertCircle, Trophy } from "lucide-react";
import type { TerritorialLevel } from "@/types/territorial";

interface TerritorialNominationsProps {
  territorialEntityId: string;
  level: TerritorialLevel;
}

const mockNominations = [
  {
    id: "1",
    position: "Maire",
    candidate: "Marie Dubois",
    nominator: "Jean Martin",
    status: "active",
    votes: 156,
    deadline: "2024-03-15",
    description: "Candidature pour le poste de Maire avec 15 ans d'expérience en administration publique.",
    endorsements: 23
  },
  {
    id: "2", 
    position: "Adjoint au Maire - Urbanisme",
    candidate: "Pierre Leclerc",
    nominator: "Sophie Bernard",
    status: "pending",
    votes: 89,
    deadline: "2024-03-20",
    description: "Architecte urbaniste avec une vision moderne pour le développement durable.",
    endorsements: 15
  },
  {
    id: "3",
    position: "Conseiller Municipal",
    candidate: "Claire Moreau",
    nominator: "Autocandidate",
    status: "completed",
    votes: 234,
    deadline: "2024-02-28",
    description: "Engagement pour une démocratie participative et la transition énergétique.",
    endorsements: 31
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-blue-100 text-blue-800";
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "completed": return "bg-green-100 text-green-800";
    case "rejected": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active": return "Vote en cours";
    case "pending": return "En attente";
    case "completed": return "Acceptée";
    case "rejected": return "Rejetée";
    default: return "Inconnu";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active": return <Vote className="h-4 w-4" />;
    case "pending": return <Clock className="h-4 w-4" />;
    case "completed": return <CheckCircle className="h-4 w-4" />;
    case "rejected": return <AlertCircle className="h-4 w-4" />;
    default: return <User className="h-4 w-4" />;
  }
};

export const TerritorialNominations = ({ territorialEntityId, level }: TerritorialNominationsProps) => {
  const [selectedTab, setSelectedTab] = useState<"current" | "history" | "nominate">("current");
  const [formData, setFormData] = useState({
    position: "",
    candidateName: "",
    candidateEmail: "",
    description: "",
    qualifications: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit nomination
    console.log("Nomination submitted:", formData);
  };

  const handleVote = (nominationId: string, voteType: "for" | "against" | "abstain") => {
    // TODO: Submit vote
    console.log("Vote submitted:", { nominationId, voteType });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Système de Nomination
          </CardTitle>
          <CardDescription>
            Processus démocratique de nomination et validation des candidatures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-muted-foreground">Nominations Actives</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-muted-foreground">Validées ce mois</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">5</div>
              <div className="text-sm text-muted-foreground">En attente</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">479</div>
              <div className="text-sm text-muted-foreground">Votes Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b">
        <Button 
          variant={selectedTab === "current" ? "default" : "ghost"}
          onClick={() => setSelectedTab("current")}
        >
          Nominations Actives
        </Button>
        <Button 
          variant={selectedTab === "history" ? "default" : "ghost"}
          onClick={() => setSelectedTab("history")}
        >
          Historique
        </Button>
        <Button 
          variant={selectedTab === "nominate" ? "default" : "ghost"}
          onClick={() => setSelectedTab("nominate")}
        >
          Proposer une Nomination
        </Button>
      </div>

      {/* Current Nominations */}
      {selectedTab === "current" && (
        <div className="space-y-4">
          {mockNominations.filter(n => n.status === "active" || n.status === "pending").map((nomination) => (
            <Card key={nomination.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{nomination.candidate}</CardTitle>
                  <Badge className={getStatusColor(nomination.status)}>
                    {getStatusIcon(nomination.status)}
                    <span className="ml-1">{getStatusText(nomination.status)}</span>
                  </Badge>
                </div>
                <CardDescription>{nomination.position}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">{nomination.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Vote className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Votes: <strong>{nomination.votes}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Soutiens: <strong>{nomination.endorsements}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Échéance: <strong>{nomination.deadline}</strong></span>
                    </div>
                  </div>

                  {nomination.status === "active" && (
                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm" onClick={() => handleVote(nomination.id, "for")} className="bg-green-600 hover:bg-green-700">
                        Pour
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleVote(nomination.id, "against")}>
                        Contre
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleVote(nomination.id, "abstain")}>
                        Abstention
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="ml-auto">
                            Voir Détails
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Détails de la Nomination</DialogTitle>
                            <DialogDescription>
                              {nomination.candidate} - {nomination.position}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Description complète</Label>
                              <p className="text-sm mt-1">{nomination.description}</p>
                            </div>
                            <div>
                              <Label>Nominé par</Label>
                              <p className="text-sm mt-1">{nomination.nominator}</p>
                            </div>
                            <div>
                              <Label>Statistiques de vote</Label>
                              <div className="grid grid-cols-3 gap-2 mt-2">
                                <div className="text-center p-2 bg-green-50 rounded">
                                  <div className="font-bold text-green-600">156</div>
                                  <div className="text-xs">Pour</div>
                                </div>
                                <div className="text-center p-2 bg-red-50 rounded">
                                  <div className="font-bold text-red-600">23</div>
                                  <div className="text-xs">Contre</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded">
                                  <div className="font-bold text-gray-600">12</div>
                                  <div className="text-xs">Abstention</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* History */}
      {selectedTab === "history" && (
        <div className="space-y-4">
          {mockNominations.filter(n => n.status === "completed" || n.status === "rejected").map((nomination) => (
            <Card key={nomination.id} className="opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{nomination.candidate}</CardTitle>
                  <Badge className={getStatusColor(nomination.status)}>
                    {getStatusIcon(nomination.status)}
                    <span className="ml-1">{getStatusText(nomination.status)}</span>
                  </Badge>
                </div>
                <CardDescription>{nomination.position}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{nomination.description}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Votes finaux: {nomination.votes} | Nominé par: {nomination.nominator}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Nominate Form */}
      {selectedTab === "nominate" && (
        <Card>
          <CardHeader>
            <CardTitle>Proposer une Nouvelle Nomination</CardTitle>
            <CardDescription>
              Soumettez une candidature pour un poste vacant ou créez une nouvelle proposition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="position">Poste concerné</Label>
                <Select value={formData.position} onValueChange={(value) => setFormData({...formData, position: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un poste" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maire">Maire</SelectItem>
                    <SelectItem value="adjoint">Adjoint au Maire</SelectItem>
                    <SelectItem value="conseiller">Conseiller Municipal</SelectItem>
                    <SelectItem value="directeur">Directeur Général des Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="candidateName">Nom du candidat</Label>
                  <Input
                    id="candidateName"
                    value={formData.candidateName}
                    onChange={(e) => setFormData({...formData, candidateName: e.target.value})}
                    placeholder="Nom complet"
                  />
                </div>
                <div>
                  <Label htmlFor="candidateEmail">Email du candidat</Label>
                  <Input
                    id="candidateEmail"
                    type="email"
                    value={formData.candidateEmail}
                    onChange={(e) => setFormData({...formData, candidateEmail: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Motivation et programme</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Décrivez les motivations et le programme du candidat..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="qualifications">Qualifications et expérience</Label>
                <Textarea
                  id="qualifications"
                  value={formData.qualifications}
                  onChange={(e) => setFormData({...formData, qualifications: e.target.value})}
                  placeholder="Listez les qualifications, expériences et compétences relevantes..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Soumettre la Nomination
                </Button>
                <Button type="button" variant="outline" onClick={() => setFormData({position: "", candidateName: "", candidateEmail: "", description: "", qualifications: ""})}>
                  Réinitialiser
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};