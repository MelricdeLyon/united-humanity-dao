import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { 
  ArrowLeft,
  Vote,
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Send,
  Globe,
  Target,
  Calendar
} from 'lucide-react';

interface Consultation {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'closed' | 'draft';
  start_date: string;
  end_date?: string;
  participant_count: number;
  region_focus?: string;
  created_at: string;
}

interface ConsultationResponse {
  id: string;
  consultation_id: string;
  user_id: string;
  response_text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  created_at: string;
}

const OHSConsultation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Données simulées pour la démonstration
  useEffect(() => {
    const mockConsultations: Consultation[] = [
      {
        id: '1',
        title: 'Vaccination universelle contre la grippe saisonnière',
        description: 'Consultation sur la mise en place d\'un programme mondial de vaccination gratuite contre la grippe saisonnière pour tous les habitants de la planète.',
        category: 'Santé Préventive',
        status: 'active',
        start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        participant_count: 1247,
        region_focus: 'Mondiale',
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        title: 'Amélioration de l\'accès à l\'eau potable en Afrique',
        description: 'Comment améliorer l\'accès à l\'eau potable et aux infrastructures sanitaires dans les régions rurales d\'Afrique ?',
        category: 'Infrastructure Sanitaire',
        status: 'active',
        start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        participant_count: 892,
        region_focus: 'Afrique',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        title: 'Réforme des systèmes de santé mentale',
        description: 'Consultation sur la nécessité de réformer les approches de santé mentale au niveau mondial, incluant la déstigmatisation et l\'accès aux soins.',
        category: 'Santé Mentale',
        status: 'closed',
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        participant_count: 2156,
        region_focus: 'Mondiale',
        created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ];

    setConsultations(mockConsultations);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'closed':
        return 'Fermée';
      case 'draft':
        return 'Brouillon';
      default:
        return status;
    }
  };

  const getTimeRemaining = (endDate?: string) => {
    if (!endDate) return '';
    
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Consultation fermée';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} jour${days > 1 ? 's' : ''} restant${days > 1 ? 's' : ''}`;
    return `${hours} heure${hours > 1 ? 's' : ''} restante${hours > 1 ? 's' : ''}`;
  };

  const handleSubmitResponse = async () => {
    if (!selectedConsultation || !responseText.trim()) return;

    setSubmitting(true);
    try {
      // Simulation de soumission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Réponse envoyée !",
        description: "Merci pour votre participation à cette consultation habitante.",
      });
      
      setResponseText('');
      setSelectedConsultation(null);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre réponse.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des consultations...</p>
        </div>
      </div>
    );
  }

  const activeConsultations = consultations.filter(c => c.status === 'active');
  const closedConsultations = consultations.filter(c => c.status === 'closed');

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
              <Vote className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Consultation Habitante
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Participez aux consultations publiques mondiales sur les politiques de santé.
            Votre voix compte dans les décisions qui affectent la santé de tous les habitants de la planète.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <Badge variant="outline" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Démocratie Participative</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Portée Mondiale</span>
            </Badge>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Vote className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{activeConsultations.length}</p>
                  <p className="text-sm text-gray-600">Consultations Actives</p>
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
                    {consultations.reduce((sum, c) => sum + c.participant_count, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Participants Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{closedConsultations.length}</p>
                  <p className="text-sm text-gray-600">Consultations Terminées</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consultations */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Consultations Publiques</CardTitle>
            <CardDescription>
              Participez aux consultations ouvertes et partagez vos opinions sur les enjeux de santé mondiale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active">
                  Consultations Actives ({activeConsultations.length})
                </TabsTrigger>
                <TabsTrigger value="closed">
                  Consultations Fermées ({closedConsultations.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-6 mt-6">
                {activeConsultations.length === 0 ? (
                  <div className="text-center py-12">
                    <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucune consultation active
                    </h3>
                    <p className="text-gray-600">
                      Revenez bientôt pour participer aux prochaines consultations.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeConsultations.map((consultation) => (
                      <Card key={consultation.id} className="border-l-4 border-l-green-600 hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <CardTitle className="text-xl">{consultation.title}</CardTitle>
                                <Badge className={getStatusColor(consultation.status)}>
                                  {getStatusLabel(consultation.status)}
                                </Badge>
                              </div>
                              <CardDescription className="text-base mb-3">
                                {consultation.description}
                              </CardDescription>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{consultation.participant_count} participants</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Globe className="h-4 w-4" />
                                  <span>{consultation.region_focus}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Target className="h-4 w-4" />
                                  <span>{consultation.category}</span>
                                </span>
                                {consultation.end_date && (
                                  <span className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{getTimeRemaining(consultation.end_date)}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              <p>Votre opinion compte pour façonner les politiques de santé mondiale</p>
                            </div>
                            <Button 
                              onClick={() => setSelectedConsultation(consultation)}
                              className="ml-4"
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Participer
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="closed" className="space-y-6 mt-6">
                {closedConsultations.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucune consultation fermée
                    </h3>
                    <p className="text-gray-600">
                      Les consultations terminées apparaîtront ici.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {closedConsultations.map((consultation) => (
                      <Card key={consultation.id} className="border-l-4 border-l-gray-400 opacity-75">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <CardTitle className="text-xl">{consultation.title}</CardTitle>
                                <Badge className={getStatusColor(consultation.status)}>
                                  {getStatusLabel(consultation.status)}
                                </Badge>
                              </div>
                              <CardDescription className="text-base mb-3">
                                {consultation.description}
                              </CardDescription>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{consultation.participant_count} participants</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Globe className="h-4 w-4" />
                                  <span>{consultation.region_focus}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Target className="h-4 w-4" />
                                  <span>{consultation.category}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              <p>Consultation fermée - Merci à tous les participants</p>
                            </div>
                            <Button variant="outline" disabled>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Fermée
                            </Button>
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

        {/* Modal de participation */}
        {selectedConsultation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {selectedConsultation.title}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedConsultation(null)}
                  >
                    ×
                  </Button>
                </CardTitle>
                <CardDescription>
                  {selectedConsultation.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Instructions</h4>
                  <p className="text-sm text-blue-800">
                    Partagez votre opinion sur cette question de santé publique. Soyez constructif 
                    et respectueux dans vos commentaires. Votre contribution aidera à façonner les 
                    politiques de santé mondiale.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Votre réponse *
                  </label>
                  <Textarea
                    placeholder="Exprimez votre opinion sur cette consultation... Quels sont selon vous les enjeux principaux ? Quelles solutions proposez-vous ?"
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="min-h-32"
                    maxLength={1000}
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {responseText.length}/1000 caractères
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedConsultation(null)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    onClick={handleSubmitResponse}
                    disabled={!responseText.trim() || submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Envoi...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer ma réponse
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OHSConsultation;