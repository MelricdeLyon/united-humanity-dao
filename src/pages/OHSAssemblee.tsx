import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useToast } from '../hooks/use-toast';
import { 
  ArrowLeft,
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  Hand,
  Globe,
  Calendar,
  Clock,
  UserCheck,
  Settings,
  Share2,
  Volume2,
  VolumeX,
  Monitor,
  Phone,
  PhoneOff,
  Camera,
  Send,
  Heart,
  ThumbsUp
} from 'lucide-react';

interface AssemblySession {
  id: string;
  title: string;
  description: string;
  status: 'live' | 'scheduled' | 'ended';
  start_time: string;
  end_time?: string;
  participant_count: number;
  max_participants: number;
  language: string;
  moderator: {
    name: string;
    avatar?: string;
    role: string;
  };
  agenda_items: string[];
  recording_available: boolean;
}

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  country: string;
  role: string;
  is_speaking: boolean;
  has_hand_raised: boolean;
  is_muted: boolean;
  is_video_on: boolean;
}

const OHSAssemblee = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<AssemblySession[]>([]);
  const [selectedSession, setSelectedSession] = useState<AssemblySession | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [hasHandRaised, setHasHandRaised] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Données simulées pour la démonstration
  useEffect(() => {
    const mockSessions: AssemblySession[] = [
      {
        id: '1',
        title: 'Assemblée Mondiale - Crise Sanitaire et Préparation Future',
        description: 'Session extraordinaire pour discuter des mesures de préparation aux futures pandémies et des réformes nécessaires des systèmes de santé mondiaux.',
        status: 'live',
        start_time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        participant_count: 247,
        max_participants: 500,
        language: 'Français (traduction simultanée)',
        moderator: {
          name: 'Dr. Marie Dubois',
          avatar: '/avatars/moderator1.jpg',
          role: 'Directrice OHS Europe'
        },
        agenda_items: [
          'Évaluation des systèmes de surveillance épidémiologique',
          'Mécanismes de financement d\'urgence',
          'Coordination internationale des réponses sanitaires',
          'Formation du personnel médical mondial'
        ],
        recording_available: true
      },
      {
        id: '2',
        title: 'Assemblée Régionale - Santé Mentale Post-Pandémie',
        description: 'Discussion sur les impacts psychologiques des crises sanitaires et les stratégies de prise en charge de la santé mentale.',
        status: 'scheduled',
        start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        participant_count: 0,
        max_participants: 300,
        language: 'Multilingue (traduction simultanée)',
        moderator: {
          name: 'Dr. James Wilson',
          role: 'Psychiatre en chef OHS'
        },
        agenda_items: [
          'Évaluation des besoins en santé mentale',
          'Programmes de soutien psychologique',
          'Formation des professionnels',
          'Intégration dans les soins primaires'
        ],
        recording_available: true
      },
      {
        id: '3',
        title: 'Séance Plénière - Budget Annuel OHS 2024',
        description: 'Présentation et vote sur l\'allocation du budget annuel de l\'Organisation Humanité Santé.',
        status: 'ended',
        start_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
        participant_count: 189,
        max_participants: 500,
        language: 'Français (traduction simultanée)',
        moderator: {
          name: 'Président Michel Laurent',
          role: 'Président OHS'
        },
        agenda_items: [
          'Présentation du budget 2024',
          'Répartition par régions',
          'Programmes prioritaires',
          'Vote des délégués'
        ],
        recording_available: true
      },
      // Assemblées passées sans enregistrement disponible
      {
        id: '4',
        title: 'Assemblée d\'Urgence - Épidémie Ebola Afrique Centrale',
        description: 'Session d\'urgence pour coordonner la réponse internationale à l\'épidémie d\'Ebola en Afrique Centrale.',
        status: 'ended',
        start_time: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
        participant_count: 156,
        max_participants: 300,
        language: 'Français/Anglais (traduction simultanée)',
        moderator: {
          name: 'Dr. Amadou Diallo',
          role: 'Directeur OHS Afrique'
        },
        agenda_items: [
          'Évaluation de la situation épidémiologique',
          'Mobilisation des ressources d\'urgence',
          'Coordination avec les gouvernements locaux',
          'Déploiement des équipes médicales'
        ],
        recording_available: false
      },
      {
        id: '5',
        title: 'Conseil Exécutif - Réforme Structurelle OHS',
        description: 'Session fermée du conseil exécutif pour discuter des réformes structurelles de l\'organisation.',
        status: 'ended',
        start_time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
        participant_count: 23,
        max_participants: 50,
        language: 'Multilingue (traduction simultanée)',
        moderator: {
          name: 'Président Michel Laurent',
          role: 'Président OHS'
        },
        agenda_items: [
          'Révision des statuts organisationnels',
          'Nouvelle gouvernance régionale',
          'Budget et financement',
          'Calendrier de mise en œuvre'
        ],
        recording_available: false
      },
      {
        id: '6',
        title: 'Forum Technique - Innovations Médicales Post-COVID',
        description: 'Forum technique sur les innovations médicales développées suite à la pandémie de COVID-19.',
        status: 'ended',
        start_time: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
        participant_count: 312,
        max_participants: 400,
        language: 'Anglais (traduction simultanée)',
        moderator: {
          name: 'Prof. Lisa Chen',
          role: 'Directrice Innovation OHS'
        },
        agenda_items: [
          'Nouvelles technologies de diagnostic',
          'Thérapies innovantes',
          'Télémédecine et santé digitale',
          'Vaccins de nouvelle génération'
        ],
        recording_available: false
      }
    ];

    const mockParticipants: Participant[] = [
      {
        id: '1',
        name: 'Dr. Sarah Chen',
        avatar: '/avatars/participant1.jpg',
        country: 'Chine',
        role: 'Délégué Régional Asie',
        is_speaking: true,
        has_hand_raised: false,
        is_muted: false,
        is_video_on: true
      },
      {
        id: '2',
        name: 'Dr. Ahmed Hassan',
        avatar: '/avatars/participant2.jpg',
        country: 'Égypte',
        role: 'Expert Épidémiologie',
        is_speaking: false,
        has_hand_raised: true,
        is_muted: true,
        is_video_on: true
      },
      {
        id: '3',
        name: 'Prof. Elena Rodriguez',
        country: 'Espagne',
        role: 'Délégué Europe',
        is_speaking: false,
        has_hand_raised: false,
        is_muted: true,
        is_video_on: false
      },
      {
        id: '4',
        name: 'Dr. John Smith',
        country: 'États-Unis',
        role: 'Observateur ONU',
        is_speaking: false,
        has_hand_raised: true,
        is_muted: true,
        is_video_on: true
      }
    ];

    setSessions(mockSessions);
    setParticipants(mockParticipants);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ended':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'live':
        return 'En Direct';
      case 'scheduled':
        return 'Programmée';
      case 'ended':
        return 'Terminée';
      default:
        return status;
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const joinSession = (session: AssemblySession) => {
    setSelectedSession(session);
    setIsConnected(true);
    toast({
      title: "Connexion réussie",
      description: `Vous avez rejoint "${session.title}"`,
    });
  };

  const leaveSession = () => {
    setSelectedSession(null);
    setIsConnected(false);
    setIsMuted(true);
    setIsVideoOn(false);
    setHasHandRaised(false);
    toast({
      title: "Déconnexion",
      description: "Vous avez quitté l'assemblée",
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleHandRaise = () => {
    setHasHandRaised(!hasHandRaised);
    toast({
      title: hasHandRaised ? "Main baissée" : "Main levée",
      description: hasHandRaised ? "Vous ne demandez plus la parole" : "Vous demandez la parole",
    });
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé dans le chat",
    });
    setChatMessage('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des assemblées...</p>
        </div>
      </div>
    );
  }

  const liveSessions = sessions.filter(s => s.status === 'live');
  const scheduledSessions = sessions.filter(s => s.status === 'scheduled');
  const endedSessions = sessions.filter(s => s.status === 'ended' && s.recording_available);
  const unavailableSessions = sessions.filter(s => s.status === 'ended' && !s.recording_available);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/ohs/governance')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la gouvernance
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-green-600">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Assemblée Virtuelle OHS
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Participez aux assemblées mondiales de santé publique. 
            Connectez-vous avec des experts, délégués et citoyens du monde entier pour façonner l'avenir de la santé globale.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <Badge variant="outline" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Portée Mondiale</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2">
              <Video className="h-4 w-4" />
              <span>Haute Qualité</span>
            </Badge>
          </div>
        </div>

        {/* Mode Assemblée - Si connecté */}
        {isConnected && selectedSession ? (
          <div className="space-y-6">
            {/* Barre de session active */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-red-800">EN DIRECT</span>
                    </div>
                    <span className="text-gray-900 font-medium">{selectedSession.title}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {selectedSession.participant_count} participants
                    </span>
                    <Button variant="outline" size="sm" onClick={leaveSession}>
                      <PhoneOff className="h-4 w-4 mr-2" />
                      Quitter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Zone vidéo principale */}
              <div className="lg:col-span-2 space-y-4">
                {/* Orateur principal */}
                <Card>
                  <CardContent className="p-0">
                    <div className="relative bg-gray-900 rounded-t-lg aspect-video flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Dr. Sarah Chen - En cours de présentation</p>
                        <p className="text-sm opacity-75">Délégué Régional Asie</p>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-red-600">
                          <Mic className="h-3 w-3 mr-1" />
                          En cours de parole
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Grille des participants */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Participants ({participants.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {participants.map((participant) => (
                        <div key={participant.id} className="relative">
                          <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center text-white text-sm">
                            {participant.is_video_on ? (
                              <div className="text-center">
                                <Avatar className="h-12 w-12 mx-auto mb-2">
                                  <AvatarImage src={participant.avatar} />
                                  <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <p className="font-medium">{participant.name.split(' ')[0]}</p>
                              </div>
                            ) : (
                              <div className="text-center opacity-75">
                                <VideoOff className="h-8 w-8 mx-auto mb-2" />
                                <p className="text-xs">{participant.name.split(' ')[0]}</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Indicateurs */}
                          <div className="absolute top-2 right-2 flex space-x-1">
                            {participant.is_muted && (
                              <div className="bg-red-500 rounded-full p-1">
                                <MicOff className="h-3 w-3 text-white" />
                              </div>
                            )}
                            {participant.has_hand_raised && (
                              <div className="bg-yellow-500 rounded-full p-1">
                                <Hand className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="outline" className="text-xs">
                              {participant.country}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contrôles utilisateur */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant={isMuted ? "destructive" : "default"}
                        size="lg"
                        onClick={toggleMute}
                      >
                        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>
                      
                      <Button
                        variant={isVideoOn ? "default" : "secondary"}
                        size="lg"
                        onClick={toggleVideo}
                      >
                        {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                      </Button>
                      
                      <Button
                        variant={hasHandRaised ? "destructive" : "outline"}
                        size="lg"
                        onClick={toggleHandRaise}
                      >
                        <Hand className="h-5 w-5" />
                      </Button>
                      
                      <Button variant="outline" size="lg">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Panel latéral */}
              <div className="space-y-4">
                {/* Chat */}
                <Card className="h-96">
                  <CardHeader>
                    <CardTitle className="text-lg">Chat en direct</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex-1 bg-gray-50 rounded-lg p-3 text-sm space-y-2 max-h-48 overflow-y-auto">
                      <div className="flex items-start space-x-2">
                        <span className="font-medium text-blue-600">Modérateur:</span>
                        <span>Bienvenue dans cette assemblée extraordinaire</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="font-medium text-green-600">Dr. Hassan:</span>
                        <span>Excellente présentation sur la surveillance</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="font-medium text-purple-600">Prof. Rodriguez:</span>
                        <span>Question sur le financement des programmes</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Tapez votre message..."
                        className="flex-1 px-3 py-2 border rounded-lg text-sm"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      />
                      <Button size="sm" onClick={sendChatMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Ordre du jour */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ordre du jour</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {selectedSession.agenda_items.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                            {index + 1}
                          </div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Liste des assemblées */
          <div className="space-y-8">
            {/* Statistiques */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-2xl font-bold">{liveSessions.length}</p>
                      <p className="text-sm text-gray-600">Sessions en Direct</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{scheduledSessions.length}</p>
                      <p className="text-sm text-gray-600">Sessions Programmées</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {sessions.reduce((sum, s) => sum + s.participant_count, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Participants Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Liste des sessions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Sessions d'Assemblée</CardTitle>
                <CardDescription>
                  Rejoignez les assemblées mondiales de santé publique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="live" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="live">
                      En Direct ({liveSessions.length})
                    </TabsTrigger>
                    <TabsTrigger value="scheduled">
                      Programmées ({scheduledSessions.length})
                    </TabsTrigger>
                    <TabsTrigger value="ended">
                      Terminées ({endedSessions.length})
                    </TabsTrigger>
                    <TabsTrigger value="unavailable">
                      Indisponibles ({unavailableSessions.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="live" className="space-y-6 mt-6">
                    {liveSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Aucune session en direct
                        </h3>
                        <p className="text-gray-600">
                          Aucune assemblée n'est actuellement en cours.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {liveSessions.map((session) => (
                          <Card key={session.id} className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <CardTitle className="text-xl">{session.title}</CardTitle>
                                    <Badge className={getStatusColor(session.status)}>
                                      <div className="flex items-center space-x-1">
                                        <div className="h-2 w-2 bg-current rounded-full animate-pulse"></div>
                                        <span>{getStatusLabel(session.status)}</span>
                                      </div>
                                    </Badge>
                                  </div>
                                  <CardDescription className="text-base mb-4">
                                    {session.description}
                                  </CardDescription>
                                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <Users className="h-4 w-4" />
                                      <span>{session.participant_count}/{session.max_participants} participants</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Globe className="h-4 w-4" />
                                      <span>{session.language}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <UserCheck className="h-4 w-4" />
                                      <span>{session.moderator.name} - {session.moderator.role}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Clock className="h-4 w-4" />
                                      <span>Commencée à {formatTime(session.start_time)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                  <p className="font-medium mb-2">Ordre du jour :</p>
                                  <ul className="list-disc list-inside space-y-1">
                                    {session.agenda_items.slice(0, 2).map((item, index) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                    {session.agenda_items.length > 2 && (
                                      <li>... et {session.agenda_items.length - 2} autres points</li>
                                    )}
                                  </ul>
                                </div>
                                <Button 
                                  onClick={() => joinSession(session)}
                                  className="ml-4 bg-red-600 hover:bg-red-700"
                                >
                                  <Video className="h-4 w-4 mr-2" />
                                  Rejoindre
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="scheduled" className="space-y-6 mt-6">
                    {scheduledSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Aucune session programmée
                        </h3>
                        <p className="text-gray-600">
                          Les prochaines assemblées seront bientôt annoncées.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {scheduledSessions.map((session) => (
                          <Card key={session.id} className="border-l-4 border-l-blue-600">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <CardTitle className="text-xl">{session.title}</CardTitle>
                                    <Badge className={getStatusColor(session.status)}>
                                      {getStatusLabel(session.status)}
                                    </Badge>
                                  </div>
                                  <CardDescription className="text-base mb-4">
                                    {session.description}
                                  </CardDescription>
                                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>Début prévu : {formatTime(session.start_time)}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Users className="h-4 w-4" />
                                      <span>Capacité : {session.max_participants} participants</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Globe className="h-4 w-4" />
                                      <span>{session.language}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <UserCheck className="h-4 w-4" />
                                      <span>{session.moderator.name}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                  <p className="font-medium mb-2">Ordre du jour :</p>
                                  <ul className="list-disc list-inside space-y-1">
                                    {session.agenda_items.slice(0, 2).map((item, index) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                                <Button variant="outline" disabled>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Programmée
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="ended" className="space-y-6 mt-6">
                    <div className="space-y-6">
                      {endedSessions.map((session) => (
                        <Card key={session.id} className="border-l-4 border-l-gray-400 opacity-75">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <CardTitle className="text-xl">{session.title}</CardTitle>
                                  <Badge className={getStatusColor(session.status)}>
                                    {getStatusLabel(session.status)}
                                  </Badge>
                                </div>
                                <CardDescription className="text-base mb-4">
                                  {session.description}
                                </CardDescription>
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatTime(session.start_time)}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{session.participant_count} participants</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-600">
                                <p>Session terminée - Enregistrement disponible</p>
                              </div>
                              <Button variant="outline">
                                <Monitor className="h-4 w-4 mr-2" />
                                Voir l'enregistrement
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="unavailable" className="space-y-6 mt-6">
                    {unavailableSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <VideoOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Aucune assemblée indisponible
                        </h3>
                        <p className="text-gray-600">
                          Toutes les assemblées passées ont des enregistrements disponibles.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {unavailableSessions.map((session) => (
                          <Card key={session.id} className="border-l-4 border-l-orange-400 opacity-80">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <CardTitle className="text-xl">{session.title}</CardTitle>
                                    <div className="flex space-x-2">
                                      <Badge className={getStatusColor(session.status)}>
                                        {getStatusLabel(session.status)}
                                      </Badge>
                                      <Badge variant="outline" className="border-orange-400 text-orange-700">
                                        <VideoOff className="h-3 w-3 mr-1" />
                                        Sans vidéo
                                      </Badge>
                                    </div>
                                  </div>
                                  <CardDescription className="text-base mb-4">
                                    {session.description}
                                  </CardDescription>
                                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>{formatTime(session.start_time)}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Users className="h-4 w-4" />
                                      <span>{session.participant_count} participants</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Clock className="h-4 w-4" />
                                      <span>Durée: {session.end_time && Math.round((new Date(session.end_time).getTime() - new Date(session.start_time).getTime()) / (1000 * 60 * 60))}h</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <UserCheck className="h-4 w-4" />
                                      <span>{session.moderator.name}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-start">
                                <div className="text-sm text-gray-600 flex-1">
                                  <p className="font-medium mb-2">Ordre du jour :</p>
                                  <ul className="list-disc list-inside space-y-1 mb-4">
                                    {session.agenda_items.map((item, index) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                  </ul>
                                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                    <div className="flex items-center space-x-2">
                                      <VideoOff className="h-4 w-4 text-orange-600" />
                                      <span className="text-orange-800 font-medium">Vidéo indisponible</span>
                                    </div>
                                    <p className="text-orange-700 text-sm mt-1">
                                      Cette assemblée s'est tenue mais aucun enregistrement vidéo n'est disponible.
                                    </p>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <Button variant="outline" disabled className="opacity-50">
                                    <VideoOff className="h-4 w-4 mr-2" />
                                    Indisponible
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OHSAssemblee;