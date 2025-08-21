import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Heart, 
  Users, 
  Globe, 
  Shield, 
  Search, 
  FileText,
  Stethoscope,
  AlertTriangle,
  TrendingUp,
  Activity,
  Clock,
  Target,
  ArrowLeft
} from "lucide-react";

const OHSHome = () => {
  const navigate = useNavigate();

  const departments = [
    {
      name: "Surveillance Épidémiologique",
      icon: Search,
      director: "Dr. Maria Santos",
      status: "Actif",
      focus: "Détection précoce des épidémies et surveillance mondiale",
      members: 85,
      region: "Global"
    },
    {
      name: "Intervention d'Urgence",
      icon: AlertTriangle,
      director: "Dr. James Mitchell",
      status: "Alerte",
      focus: "Force d'intervention rapide 24/7",
      members: 120,
      region: "Global"
    },
    {
      name: "Recherche Médicale",
      icon: Activity,
      director: "Dr. Li Wei",
      status: "Actif",
      focus: "Développement de traitements et vaccins",
      members: 200,
      region: "Global"
    },
    {
      name: "Santé Préventive",
      icon: Shield,
      director: "Dr. Amira Hassan",
      status: "Actif",
      focus: "Promotion de la santé et prévention des maladies",
      members: 150,
      region: "Global"
    },
    {
      name: "One Health",
      icon: Globe,
      director: "Dr. Carlos Rodriguez",
      status: "Expansion",
      focus: "Santé humaine, animale et environnementale",
      members: 95,
      region: "Global"
    }
  ];

  const regionalDirectors = [
    {
      region: "Afrique",
      director: "Poste Vacant",
      status: "Nomination en cours",
      population: "1.4 milliard"
    },
    {
      region: "Amériques", 
      director: "Dr. Ana Gutierrez",
      status: "Mandat 2023-2028",
      population: "1 milliard"
    },
    {
      region: "Asie du Sud-Est",
      director: "Dr. Raj Patel",
      status: "Mandat 2022-2027", 
      population: "2 milliards"
    },
    {
      region: "Europe",
      director: "Dr. Elena Rossi",
      status: "Mandat 2024-2029",
      population: "750 millions"
    },
    {
      region: "Méditerranée Orientale",
      director: "Poste Vacant",
      status: "Nomination en attente",
      population: "750 millions"
    },
    {
      region: "Pacifique Occidental",
      director: "Dr. Hiroshi Tanaka",
      status: "Mandat 2023-2028",
      population: "1.9 milliard"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-green-600">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Organisation Humaine de la Santé
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Une gouvernance démocratique mondiale de la santé, par les citoyens et pour les citoyens. 
            Révolutionner la santé publique avec transparence, innovation et intervention rapide.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <Badge variant="outline" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>8.1 milliards de personnes couvertes</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>195 pays membres</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2">
              <Stethoscope className="h-4 w-4" />
              <span>50,000 professionnels de santé</span>
            </Badge>
          </div>
        </div>

        {/* Direction Exécutive */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6" />
              <span>Direction Exécutive OHS</span>
            </CardTitle>
            <CardDescription className="text-blue-50">
              Leadership démocratiquement élu par la communauté mondiale de la santé
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Directeur Général */}
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Directeur Général OHS</CardTitle>
                    <Badge variant="destructive">Poste Vacant</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2"><strong>Mandat :</strong> 5 ans (élu au suffrage universel mondial)</p>
                  <p className="text-gray-600 mb-2"><strong>Salaire :</strong> 350,000 USD/an</p>
                  <p className="text-gray-600 mb-4"><strong>Statut :</strong> Nomination mondiale programmée</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/ohs/nominations')}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Voir la Nomination en Cours
                  </Button>
                </CardContent>
              </Card>

              {/* Conseil Mondial de la Santé */}
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Conseil Mondial de la Santé</CardTitle>
                    <Badge variant="secondary">18 membres élus</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2"><strong>Composition :</strong> 18 experts en santé publique</p>
                  <p className="text-gray-600 mb-2"><strong>Sièges occupés :</strong> 12/18</p>
                  <p className="text-gray-600 mb-4"><strong>Prochaines nominations :</strong> 6 sièges disponibles</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/ohs/council')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Voir le Conseil
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Bureaux Régionaux */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6" />
              <span>Bureaux Régionaux OHS</span>
            </CardTitle>
            <CardDescription className="text-green-50">
              6 régions avec directeurs sélectionnés par le processus global OHS
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionalDirectors.map((region) => (
                <Card key={region.region} className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{region.region}</CardTitle>
                    <Badge 
                      variant={region.director === "Poste Vacant" ? "destructive" : "secondary"}
                      className="w-fit"
                    >
                      {region.director === "Poste Vacant" ? "Vacant" : "Occupé"}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Directeur :</strong> {region.director}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Statut :</strong> {region.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Population :</strong> {region.population}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Départements Spécialisés */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-6 w-6" />
              <span>Départements Spécialisés</span>
            </CardTitle>
            <CardDescription className="text-blue-50">
              Expertise mondiale coordonnée pour une réponse sanitaire optimale
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <Card key={dept.name} className="border hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <dept.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{dept.name}</CardTitle>
                        <Badge 
                          variant={dept.status === "Alerte" ? "destructive" : 
                                  dept.status === "Expansion" ? "secondary" : "default"}
                        >
                          {dept.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Directeur :</strong> {dept.director}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Membres :</strong> {dept.members}
                    </p>
                    <p className="text-xs text-gray-500">
                      {dept.focus}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions Rapides */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6" />
              <span>Actions Rapides OHS</span>
            </CardTitle>
            <CardDescription>
              Participez à la gouvernance démocratique mondiale de la santé
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                className="h-20 flex-col space-y-2"
                onClick={() => navigate('/ohs/nominations')}
              >
                <Users className="h-6 w-6" />
                <span>Nominations OHS</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => navigate('/ohs/governance')}
              >
                <FileText className="h-6 w-6" />
                <span>Propositions Santé</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => navigate('/ohs/council')}
              >
                <Shield className="h-6 w-6" />
                <span>Conseil Mondial</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => navigate('/ohs/force-intervention')}
              >
                <AlertTriangle className="h-6 w-6" />
                <span>Force d'Intervention</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default OHSHome;