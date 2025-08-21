import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Globe, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Mic,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  UserCheck,
  Shield,
  AlertTriangle,
  Zap,
  TreePine,
  Factory,
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Plus,
  Vote
} from "lucide-react";

interface AssemblySession {
  id: string;
  title: string;
  description: string;
  session_type: string;
  scheduled_date: string;
  duration_minutes: number;
  status: string;
  participants_count: number;
  max_participants: number;
  topics: string[];
  regions_involved: string[];
  stakeholders: string[];
  smart_contract_address?: string;
  video_url?: string;
  is_emergency: boolean;
  climate_urgency_level: string;
}

const OSPAssembleeMondiale = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<AssemblySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("live");

  // Mock data pour les assemblées
  useEffect(() => {
    const mockSessions: AssemblySession[] = [
      {
        id: "1",
        title: "Urgence Climatique: Feux de Forêt Australie - Intervention Immédiate",
        description: "Assemblée d'urgence pour coordonner la réponse internationale aux méga-feux en Australie. Activation des smart contracts de financement d'urgence.",
        session_type: "emergency_climate",
        scheduled_date: "2024-01-25T14:00:00Z",
        duration_minutes: 120,
        status: "live",
        participants_count: 15672,
        max_participants: 50000,
        topics: ["Intervention d'urgence", "Smart contracts", "Coordination internationale", "Sauvetage faune"],
        regions_involved: ["Australie", "Nouvelle-Zélande", "Pacifique"],
        stakeholders: ["Habitants locaux", "Experts climat", "ONG environnementales", "Gouvernements", "Peuples autochtones"],
        smart_contract_address: "0x1a2b3c4d5e6f7890abcdef1234567890",
        video_url: "https://stream.osp.org/emergency-australia-fires",
        is_emergency: true,
        climate_urgency_level: "critical"
      },
      {
        id: "2", 
        title: "Assemblée Mensuelle: Justice Climatique et Migration",
        description: "Discussion mondiale sur les droits des réfugiés climatiques et mécanismes de relocation assistée. Participation des représentants de toutes les régions.",
        session_type: "monthly_assembly",
        scheduled_date: "2024-01-28T16:00:00Z",
        duration_minutes: 180,
        status: "live",
        participants_count: 28934,
        max_participants: 100000,
        topics: ["Réfugiés climatiques", "Migration assistée", "Droits humains", "Financement adaptation"],
        regions_involved: ["Global"],
        stakeholders: ["Délégués habitants", "Experts juridiques", "ONG humanitaires", "Représentants étatiques"],
        smart_contract_address: "0x9876543210fedcba0987654321",
        video_url: "https://stream.osp.org/climate-justice-migration",
        is_emergency: false,
        climate_urgency_level: "high"
      },
      {
        id: "3",
        title: "Technologies Vertes: Partage Open Source Mondial",
        description: "Session collaborative pour partager les innovations technologiques vertes et organiser leur transfert gratuit vers les pays en développement.",
        session_type: "tech_collaboration",
        scheduled_date: "2024-02-01T10:00:00Z", 
        duration_minutes: 240,
        status: "scheduled",
        participants_count: 0,
        max_participants: 75000,
        topics: ["Technologies propres", "Open source", "Transfert technologique", "Innovation collaborative"],
        regions_involved: ["Global"],
        stakeholders: ["Ingénieurs", "Entrepreneurs verts", "Chercheurs", "Délégués habitants"],
        is_emergency: false,
        climate_urgency_level: "medium"
      },
      {
        id: "4",
        title: "Assemblée d'Urgence: Montée des Eaux Pacifique",
        description: "Coordination d'urgence pour les îles du Pacifique menacées par la montée des eaux. Plan d'évacuation et relocation d'urgence.",
        session_type: "emergency_climate",
        scheduled_date: "2024-01-15T08:00:00Z",
        duration_minutes: 150,
        status: "completed",
        participants_count: 23456,
        max_participants: 50000,
        topics: ["Montée des eaux", "Évacuation d'urgence", "Relocation", "Compensation"],
        regions_involved: ["Pacifique", "Tuvalu", "Marshall", "Kiribati"],
        stakeholders: ["Peuples insulaires", "Experts océaniques", "ONG", "Gouvernements régionaux"],
        smart_contract_address: "0xabcdef1234567890fedcba0987654321",
        video_url: "https://stream.osp.org/pacific-rising-waters",
        is_emergency: true,
        climate_urgency_level: "critical"
      },
      {
        id: "5",
        title: "Forum Jeunesse Climat: Perspectives Futures",
        description: "Assemblée spécialement dédiée aux jeunes du monde entier pour exprimer leurs préoccupations climatiques et proposer des solutions innovantes.",
        session_type: "youth_forum",
        scheduled_date: "2024-01-20T12:00:00Z", 
        duration_minutes: 180,
        status: "completed",
        participants_count: 45678,
        max_participants: 100000,
        topics: ["Perspectives jeunes", "Innovation", "Éducation climat", "Action citoyenne"],
        regions_involved: ["Global"],
        stakeholders: ["Jeunes 16-25 ans", "Étudiants", "Militants climat", "Éducateurs"],
        video_url: "https://stream.osp.org/youth-climate-forum",
        is_emergency: false,
        climate_urgency_level: "medium"
      },
      {
        id: "6",
        title: "Sommet Peuples Autochtones: Savoirs Traditionnels Climat",
        description: "Rassemblement des représentants des peuples autochtones pour partager leurs savoirs traditionnels sur la gestion climatique et environnementale.",
        session_type: "indigenous_summit",
        scheduled_date: "2024-01-12T14:00:00Z",
        duration_minutes: 300,
        status: "unavailable",
        participants_count: 12345,
        max_participants: 30000,
        topics: ["Savoirs traditionnels", "Gestion écosystèmes", "Biodiversité", "Droits autochtones"],
        regions_involved: ["Amazonie", "Arctique", "Pacifique", "Afrique"],
        stakeholders: ["Peuples autochtones", "Anthropologues", "Écologistes", "Délégués ONU"],
        is_emergency: false,
        climate_urgency_level: "high"
      }
    ];

    setTimeout(() => {
      setSessions(mockSessions);
      setLoading(false);
    }, 1000);
  }, []);

  const getSessionTypeLabel = (type: string) => {
    const types = {
      emergency_climate: "Urgence Climatique",
      monthly_assembly: "Assemblée Mensuelle",
      tech_collaboration: "Collaboration Tech",
      youth_forum: "Forum Jeunesse", 
      indigenous_summit: "Sommet Autochtone",
      expert_panel: "Panel Expert"
    };
    return types[type as keyof typeof types] || type;
  };

  const getSessionTypeIcon = (type: string) => {
    const icons = {
      emergency_climate: AlertTriangle,
      monthly_assembly: Users,
      tech_collaboration: Zap,
      youth_forum: Heart,
      indigenous_summit: TreePine,
      expert_panel: UserCheck
    };
    return icons[type as keyof typeof icons] || Users;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      live: "bg-red-500 text-white animate-pulse",
      scheduled: "bg-blue-500 text-white",
      completed: "bg-green-500 text-white", 
      unavailable: "bg-gray-500 text-white"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500 text-white";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      live: "🔴 EN DIRECT",
      scheduled: "📅 Programmée", 
      completed: "✅ Terminée",
      unavailable: "❌ Indisponible"
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getUrgencyColor = (level: string) => {
    const colors = {
      critical: "text-red-600 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20",
      high: "text-orange-600 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20",
      medium: "text-yellow-600 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20",
      low: "text-green-600 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
    };
    return colors[level as keyof typeof colors] || "";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeStatus = (dateString: string, status: string) => {
    if (status === 'live') return 'En cours maintenant';
    
    const sessionDate = new Date(dateString);
    const now = new Date();
    
    if (sessionDate > now) {
      const diff = sessionDate.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);
      
      if (days > 0) return `Dans ${days} jour(s)`;
      if (hours > 0) return `Dans ${hours}h`;
      return 'Bientôt';
    }
    
    return 'Terminée';
  };

  const filterSessions = (filter: string) => {
    switch (filter) {
      case "live":
        return sessions.filter(s => s.status === "live");
      case "scheduled": 
        return sessions.filter(s => s.status === "scheduled");
      case "completed":
        return sessions.filter(s => s.status === "completed");
      case "unavailable":
        return sessions.filter(s => s.status === "unavailable");
      default:
        return sessions;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement des assemblées mondiales...</p>
        </div>
      </div>
    );
  }

  const liveSessions = filterSessions("live");
  const scheduledSessions = filterSessions("scheduled");
  const completedSessions = filterSessions("completed"); 
  const unavailableSessions = filterSessions("unavailable");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/osp')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour OSP
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Assemblée Virtuelle Mondiale</h1>
            <p className="text-muted-foreground">
              Sessions multi-acteurs pour la gouvernance climatique participative. 
              Habitants, experts, États, ONG et peuples autochtones ensemble.
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">{liveSessions.length}</div>
            <div className="text-sm text-muted-foreground">Sessions Live</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {sessions.reduce((acc, s) => acc + s.participants_count, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Participants Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{scheduledSessions.length}</div>
            <div className="text-sm text-muted-foreground">Prochaines Sessions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{completedSessions.length}</div>
            <div className="text-sm text-muted-foreground">Sessions Terminées</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs des sessions */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="live">
            🔴 Live ({liveSessions.length})
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            📅 Programmées ({scheduledSessions.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            ✅ Terminées ({completedSessions.length})
          </TabsTrigger>
          <TabsTrigger value="unavailable">
            ❌ Indisponibles ({unavailableSessions.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            Toutes ({sessions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {liveSessions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune session en direct</h3>
                <p className="text-muted-foreground">
                  Aucune assemblée mondiale n'est actuellement en cours. 
                  Consultez les sessions programmées ou regardez les replays.
                </p>
              </CardContent>
            </Card>
          ) : (
            liveSessions.map((session) => {
              const IconComponent = getSessionTypeIcon(session.session_type);
              
              return (
                <Card key={session.id} className={`border-2 ${session.is_emergency ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20' : 'border-green-500 bg-green-50/50 dark:bg-green-950/20'}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {session.is_emergency && (
                          <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600">
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                        )}
                        <div className="p-2 rounded-lg bg-muted">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg leading-tight">
                              {session.title}
                            </h3>
                            <Badge className={getStatusColor(session.status)}>
                              {getStatusLabel(session.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {session.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {getSessionTypeLabel(session.session_type)}
                            </Badge>
                            <Badge variant="outline" className={`text-xs ${getUrgencyColor(session.climate_urgency_level)}`}>
                              Urgence {session.climate_urgency_level}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              {session.regions_involved.join(", ")}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-red-600">
                          {session.participants_count.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">participants</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Participants par type */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        {session.stakeholders.map((stakeholder, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                            <Users className="h-3 w-3" />
                            <span className="text-xs">{stakeholder}</span>
                          </div>
                        ))}
                      </div>

                      {/* Sujets de discussion */}
                      <div>
                        <div className="text-sm font-medium mb-2">Sujets à l'ordre du jour:</div>
                        <div className="flex flex-wrap gap-2">
                          {session.topics.map((topic, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{session.participants_count.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{session.duration_minutes}min</span>
                          </div>
                          {session.smart_contract_address && (
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              <span className="text-xs">Smart Contract</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm">
                            <Video className="h-4 w-4 mr-1" />
                            Rejoindre Live
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {scheduledSessions.map((session) => {
            const IconComponent = getSessionTypeIcon(session.session_type);
            
            return (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-muted">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg leading-tight mb-2">
                          {session.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {session.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {getSessionTypeLabel(session.session_type)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(session.scheduled_date)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-blue-600">
                        {getTimeStatus(session.scheduled_date, session.status)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {session.max_participants.toLocaleString()} places max
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Durée prévue: {session.duration_minutes} minutes
                    </div>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      S'inscrire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">{session.description}</p>
                  </div>
                  <Badge className={getStatusColor(session.status)}>
                    {getStatusLabel(session.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {session.participants_count.toLocaleString()} participants • 
                    {formatDate(session.scheduled_date)}
                  </div>
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Voir Replay
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="unavailable" className="space-y-4">
          <Card className="bg-gray-50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <AlertTriangle className="h-5 w-5" />
                Sessions Indisponibles
              </CardTitle>
              <CardDescription>
                Ces assemblées ont eu lieu mais l'enregistrement vidéo n'est pas disponible pour des raisons techniques ou de confidentialité.
              </CardDescription>
            </CardHeader>
          </Card>
          
          {unavailableSessions.map((session) => (
            <Card key={session.id} className="opacity-60">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">{session.description}</p>
                  </div>
                  <Badge className={getStatusColor(session.status)}>
                    {getStatusLabel(session.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {session.participants_count.toLocaleString()} participants • 
                    {formatDate(session.scheduled_date)}
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    <VolumeX className="h-4 w-4 mr-1" />
                    Vidéo Indisponible
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">{session.description}</p>
                  </div>
                  <Badge className={getStatusColor(session.status)}>
                    {getStatusLabel(session.status)}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Footer CTA */}
      <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">Participez à la Gouvernance Climatique Mondiale</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Rejoignez des millions d'habitants du monde entier dans les assemblées virtuelles pour façonner l'avenir climatique de notre planète.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={() => navigate('/osp/governance')}>
            Soumettre une Proposition
            <Plus className="h-4 w-4 ml-2" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/osp/vote-planetaire')}>
            Participer aux Votes
            <Vote className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OSPAssembleeMondiale;