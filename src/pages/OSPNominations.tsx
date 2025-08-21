import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Globe, 
  Users, 
  Crown, 
  Award, 
  Clock, 
  TrendingUp,
  Calendar,
  MapPin,
  BookOpen,
  Shield,
  Zap,
  TreePine,
  Thermometer,
  Eye,
  Vote,
  User,
  CheckCircle
} from "lucide-react";
import Header from "@/components/Header";

interface Nominee {
  id: string;
  name: string;
  position: string;
  nominationCount: number;
  experience: string;
  bio: string;
  specializations: string[];
  region: string;
  profileImage?: string;
  supporterCount: number;
  achievements: string[];
  visionStatement: string;
  nominationDate: string;
  status: "pending" | "qualified" | "finalist";
  currentRound: number;
}

const OSPNominations = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("director");

  const nominees: Nominee[] = [
    {
      id: "1",
      name: "Dr. Amara Okafor",
      position: "Directeur de la Symbiose Planétaire",
      nominationCount: 1247,
      experience: "18 ans en gouvernance environnementale internationale",
      bio: "Ancienne Directrice Adjointe du PNUE, pionnière de la gouvernance climatique participative et des technologies blockchain pour l'environnement.",
      specializations: ["Gouvernance Climatique", "Technologie Blockchain", "Humanétique Environnementale"],
      region: "Afrique de l'Ouest",
      supporterCount: 15420,
      achievements: ["Prix Leadership Climat 2022", "Innovation Governance Verte", "Médaille Humanétique Globale"],
      visionStatement: "Une gouvernance climatique où chaque habitant de la planète a une voix égale dans les décisions qui façonnent notre avenir commun.",
      nominationDate: "2024-01-10",
      status: "finalist",
      currentRound: 3
    },
    {
      id: "2", 
      name: "Prof. Elena Vasquez",
      position: "Directeur de la Symbiose Planétaire",
      nominationCount: 1156,
      experience: "15 ans en recherche climatique et innovation technologique",
      bio: "Chercheuse en géo-ingénierie et adaptation climatique, experte en solutions technologiques pour la résilience planétaire.",
      specializations: ["Géo-ingénierie", "Adaptation Climatique", "Innovation Technologique"],
      region: "Amérique Latine",
      supporterCount: 13890,
      achievements: ["Prix Innovation Climatique", "Brevet Technologies Vertes", "Reconnaissance UNESCO"],
      visionStatement: "Utiliser la science et la technologie au service d'une humanité unie face au défi climatique.",
      nominationDate: "2024-01-12",
      status: "finalist",
      currentRound: 3
    },
    {
      id: "3",
      name: "Dr. Raj Patel",
      position: "Directeur de la Symbiose Planétaire", 
      nominationCount: 987,
      experience: "12 ans en économie verte et finance climatique",
      bio: "Expert en mécanismes de financement climatique et économie circulaire, architecte de nouveaux modèles économiques durables.",
      specializations: ["Économie Verte", "Finance Climatique", "Économie Circulaire"],
      region: "Asie du Sud",
      supporterCount: 11560,
      achievements: ["Prix Économie Durable", "Modèle Financement Vert", "Innovation Finance Climat"],
      visionStatement: "Créer une économie mondiale qui régénère la planète tout en assurant la prospérité de tous.",
      nominationDate: "2024-01-15",
      status: "qualified",
      currentRound: 2
    },
    {
      id: "4",
      name: "Maria Gonzalez",
      position: "Conseil Mondial du Climat",
      nominationCount: 756,
      experience: "10 ans en activisme climatique et justice environnementale",
      bio: "Défenseuse des droits climatiques des peuples indigènes, experte en justice climatique et participation communautaire.",
      specializations: ["Justice Climatique", "Droits Indigènes", "Participation Communautaire"],
      region: "Amérique Centrale",
      supporterCount: 8430,
      achievements: ["Prix Justice Climatique", "Défenseur Droits Indigènes", "Médaille Activisme Vert"],
      visionStatement: "Assurer que les voix des plus vulnérables soient entendues dans chaque décision climatique.",
      nominationDate: "2024-01-20",
      status: "qualified",
      currentRound: 2
    },
    {
      id: "5",
      name: "Dr. James Thompson",
      position: "Conseil Mondial du Climat",
      nominationCount: 643,
      experience: "14 ans en modélisation climatique et IA",
      bio: "Spécialiste des modèles prédictifs climatiques utilisant l'intelligence artificielle pour anticiper les changements.",
      specializations: ["Modélisation Climatique", "Intelligence Artificielle", "Prédiction Météorologique"],
      region: "Amérique du Nord",
      supporterCount: 7210,
      achievements: ["Prix Excellence IA Climat", "Algorithme Prédiction Météo", "Innovation Modélisation"],
      visionStatement: "Utiliser l'IA pour donner à l'humanité les outils de prédiction nécessaires à la survie climatique.",
      nominationDate: "2024-01-25",
      status: "pending",
      currentRound: 1
    }
  ];

  const directorNominees = nominees.filter(n => n.position === "Directeur de la Symbiose Planétaire");
  const councilNominees = nominees.filter(n => n.position === "Conseil Mondial du Climat");

  const getDisplayNominees = () => {
    switch(activeTab) {
      case "director": return directorNominees;
      case "council": return councilNominees;
      default: return nominees;
    }
  };

  const getStatusBadge = (status: string, round: number) => {
    switch(status) {
      case "finalist":
        return <Badge className="bg-green-600">Tour Final (Round {round})</Badge>;
      case "qualified":
        return <Badge variant="secondary">Qualifié (Round {round})</Badge>;
      case "pending":
        return <Badge variant="outline">En Attente (Round {round})</Badge>;
      default:
        return <Badge variant="outline">Statut Inconnu</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/osp')}
            className="p-0 h-auto font-normal"
          >
            OSP
          </Button>
          <span>/</span>
          <span>Nominations OSP</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/osp')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'OSP
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Nominations OSP</h1>
            <p className="text-muted-foreground">
              Nominés pour la gouvernance de l'Organisation de la Symbiose Planétaire
            </p>
          </div>
        </div>

        {/* Processus de Nomination */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Processus de Nomination Mondiale
            </CardTitle>
            <CardDescription>
              Première nomination mondiale via Humanocratie directe planétaire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold">Round 1: Nomination</h4>
                  <p className="text-sm text-muted-foreground">
                    Les habitants nomment leurs candidats préférés
                  </p>
                  <Progress value={100} className="mt-2" />
                </div>
                
                <div className="p-4 border rounded-lg text-center bg-muted/50">
                  <div className="flex items-center justify-center mb-2">
                    <Vote className="h-8 w-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold">Round 2: Présélection</h4>
                  <p className="text-sm text-muted-foreground">
                    Vote de présélection par la communauté
                  </p>
                  <Progress value={75} className="mt-2" />
                </div>
                
                <div className="p-4 border rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Crown className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold">Round 3: Final</h4>
                  <p className="text-sm text-muted-foreground">
                    Vote final mondial sur blockchain
                  </p>
                  <Progress value={30} className="mt-2" />
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm">
                  <strong>Actuellement :</strong> Round 2 de présélection en cours - 
                  <span className="text-blue-600 font-medium"> 4 jours restants</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{nominees.length}</div>
              <div className="text-sm text-muted-foreground">Nominés Totaux</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {nominees.reduce((sum, n) => sum + n.supporterCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Soutiens Totaux</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {nominees.filter(n => n.status === "finalist").length}
              </div>
              <div className="text-sm text-muted-foreground">Finalistes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">4</div>
              <div className="text-sm text-muted-foreground">Jours Restants</div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tous les Nominés</TabsTrigger>
            <TabsTrigger value="director">
              Directeur de la Symbiose ({directorNominees.length})
            </TabsTrigger>
            <TabsTrigger value="council">
              Conseil Mondial ({councilNominees.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {/* Liste des Nominés */}
            <div className="space-y-6">
              {getDisplayNominees().map((nominee) => (
                <Card key={nominee.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div>
                            <CardTitle className="text-xl">{nominee.name}</CardTitle>
                            <CardDescription className="text-base font-medium">
                              {nominee.position}
                            </CardDescription>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          {getStatusBadge(nominee.status, nominee.currentRound)}
                          <Badge variant="outline">
                            <MapPin className="h-3 w-3 mr-1" />
                            {nominee.region}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {nominee.nominationCount}
                        </div>
                        <div className="text-sm text-muted-foreground">Nominations</div>
                        <div className="text-sm text-blue-600 font-medium">
                          {nominee.supporterCount.toLocaleString()} soutiens
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Vision</h4>
                      <p className="text-sm text-muted-foreground italic">
                        "{nominee.visionStatement}"
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Biographie</h4>
                      <p className="text-sm text-muted-foreground">{nominee.bio}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Expérience</h4>
                        <p className="text-sm text-muted-foreground">{nominee.experience}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          Spécialisations
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {nominee.specializations.map((spec, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        Distinctions
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {nominee.achievements.map((achievement, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Nominé le {new Date(nominee.nominationDate).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir le Profil
                        </Button>
                        <Button size="sm" disabled={nominee.status === "pending"}>
                          <Vote className="h-4 w-4 mr-2" />
                          {nominee.status === "pending" ? "Vote Fermé" : "Voter"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Participer aux Nominations</CardTitle>
            <CardDescription>
              Engagez-vous dans le processus de nomination mondial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button onClick={() => navigate('/osp/vote-planetaire')}>
                <Vote className="h-4 w-4 mr-2" />
                Participer aux Votes
              </Button>
              <Button variant="outline" onClick={() => navigate('/osp/governance')}>
                <Globe className="h-4 w-4 mr-2" />
                Voir les Propositions
              </Button>
              <Button variant="outline" onClick={() => navigate('/osp/assemblee-mondiale')}>
                <Users className="h-4 w-4 mr-2" />
                Assemblée Mondiale
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Import manquant
import { Trophy } from "lucide-react";

export default OSPNominations;