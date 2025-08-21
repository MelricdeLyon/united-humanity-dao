import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Globe, 
  Users, 
  Thermometer, 
  Shield, 
  Zap, 
  AlertTriangle,
  TreePine,
  Droplets,
  TrendingUp,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Award,
  BookOpen
} from "lucide-react";
import Header from "@/components/Header";

interface CouncilMember {
  id: string;
  name: string;
  type: "expert" | "delegate";
  specialization?: string;
  region?: string;
  experience: string;
  bio: string;
  profileImage?: string;
  email: string;
  languages: string[];
  achievements: string[];
  joinDate: string;
  currentProjects: string[];
}

const OSPCouncil = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const councilMembers: CouncilMember[] = [
    {
      id: "1",
      name: "Dr. Elena Rodriguez",
      type: "expert",
      specialization: "Climatologie Océanique",
      experience: "15 ans de recherche en climatologie marine",
      bio: "Spécialiste mondiale des courants océaniques et de leur impact sur le climat global. Auteure de plus de 50 publications scientifiques.",
      email: "elena.rodriguez@osp.world",
      languages: ["Français", "Espagnol", "Anglais"],
      achievements: ["Prix Nobel Environnement 2023", "Médaille d'Or Climatologie UE"],
      joinDate: "2024-01-15",
      currentProjects: ["Cartographie Courants Atlantique", "Modèles Prédictifs Océan-Climat"]
    },
    {
      id: "2",
      name: "Prof. Zhang Wei",
      type: "expert", 
      specialization: "Technologies Vertes",
      experience: "12 ans en innovation énergétique",
      bio: "Pionnier des technologies de stockage d'énergie renouvelable et des smart grids décentralisés.",
      email: "zhang.wei@osp.world",
      languages: ["Mandarin", "Anglais", "Français"],
      achievements: ["Innovation Award Tech Verte 2022", "Brevet Stockage Hydrogène"],
      joinDate: "2024-01-20",
      currentProjects: ["Réseau Énergétique Mondial", "Stockage Carbone Innovant"]
    },
    {
      id: "3",
      name: "Maria Santos",
      type: "delegate",
      region: "Amérique du Sud",
      experience: "Activiste environnementale depuis 8 ans",
      bio: "Représentante des communautés indigènes d'Amazonie, défenseuse de la justice climatique.",
      email: "maria.santos@osp.world",
      languages: ["Portugais", "Espagnol", "Français"],
      achievements: ["Prix Défenseur Forêt Amazonienne", "Ambassadrice Climat ONU"],
      joinDate: "2024-02-01",
      currentProjects: ["Protection Forêts Primaires", "Droits Climatiques Indigènes"]
    },
    {
      id: "4",
      name: "Ahmed Ben Ali",
      type: "delegate",
      region: "Afrique du Nord",
      experience: "Ingénieur en adaptation climatique",
      bio: "Expert en technologies d'adaptation pour régions arides, représentant des zones désertiques.",
      email: "ahmed.benali@osp.world", 
      languages: ["Arabe", "Français", "Anglais"],
      achievements: ["Innovation Désalinisation Solaire", "Prix Adaptation PNUD"],
      joinDate: "2024-02-10",
      currentProjects: ["Oasis Artificielles", "Résilience Zones Arides"]
    },
    {
      id: "5",
      name: "Dr. Anya Petrov",
      type: "expert",
      specialization: "Modélisation Climatique",
      experience: "20 ans en modélisation et IA climatique",
      bio: "Développeuse des modèles prédictifs de nouvelle génération intégrant l'IA pour les projections climatiques.",
      email: "anya.petrov@osp.world",
      languages: ["Russe", "Anglais", "Français"],
      achievements: ["Prix Excellence Modélisation", "Algorithme Prédictif Météo IA"],
      joinDate: "2024-01-25",
      currentProjects: ["IA Prédictive Climat", "Modèles Extrêmes Météo"]
    },
    {
      id: "6",
      name: "Kenji Nakamura", 
      type: "delegate",
      region: "Asie-Pacifique",
      experience: "Survivant du tsunami, expert résilience",
      bio: "Représentant des îles du Pacifique menacées par la montée des eaux, expert en résilience communautaire.",
      email: "kenji.nakamura@osp.world",
      languages: ["Japonais", "Anglais", "Français"],
      achievements: ["Prix Résilience Communautaire", "Modèle Adaptation Insulaire"],
      joinDate: "2024-02-05",
      currentProjects: ["Adaptation Îles Pacifique", "Résilience Tsunamis"]
    }
  ];

  const expertMembers = councilMembers.filter(member => member.type === "expert");
  const delegateMembers = councilMembers.filter(member => member.type === "delegate");

  const getDisplayMembers = () => {
    switch(activeTab) {
      case "experts": return expertMembers;
      case "delegates": return delegateMembers;
      default: return councilMembers;
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
          <span>Conseil Mondial du Climat</span>
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
            <h1 className="text-3xl font-bold">Conseil Mondial du Climat</h1>
            <p className="text-muted-foreground">
              18 membres : 9 experts climat + 9 délégués habitants tirés au sort
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">9</div>
              <div className="text-sm text-muted-foreground">Experts Climat</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">9</div>
              <div className="text-sm text-muted-foreground">Délégués Habitants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">23</div>
              <div className="text-sm text-muted-foreground">Projets Actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">156</div>
              <div className="text-sm text-muted-foreground">Décisions Prises</div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tous les Membres</TabsTrigger>
            <TabsTrigger value="experts">Experts Climat</TabsTrigger>
            <TabsTrigger value="delegates">Délégués Habitants</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {/* Membres du Conseil */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getDisplayMembers().map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant={member.type === "expert" ? "default" : "secondary"}>
                            {member.type === "expert" ? "Expert Climat" : "Délégué Habitant"}
                          </Badge>
                          {member.specialization && (
                            <Badge variant="outline" className="text-xs">
                              {member.specialization}
                            </Badge>
                          )}
                          {member.region && (
                            <Badge variant="outline" className="text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              {member.region}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Biographie</h4>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium text-sm mb-2">Expérience</h4>
                      <p className="text-sm text-muted-foreground">{member.experience}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        Distinctions
                      </h4>
                      <div className="space-y-1">
                        {member.achievements.map((achievement, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        Projets Actuels
                      </h4>
                      <div className="space-y-1">
                        {member.currentProjects.map((project, idx) => (
                          <div key={idx} className="text-xs text-muted-foreground">
                            • {project}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Depuis {new Date(member.joinDate).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-3 w-3" />
                        <span>{member.languages.length} langues</span>
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
            <CardTitle>Participer à la Gouvernance</CardTitle>
            <CardDescription>
              Engagez-vous dans la gouvernance climatique mondiale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button onClick={() => navigate('/osp/governance')}>
                <Thermometer className="h-4 w-4 mr-2" />
                Voir les Propositions
              </Button>
              <Button variant="outline" onClick={() => navigate('/osp/vote-planetaire')}>
                <Globe className="h-4 w-4 mr-2" />
                Vote Planétaire
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

export default OSPCouncil;