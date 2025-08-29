import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Crown, 
  Users, 
  Globe, 
  Shield, 
  Vote,
  FileText,
  Heart,
  Leaf,
  ArrowLeft,
  ArrowRight,
  Coins,
  TrendingUp,
  Activity,
  Clock,
  Target,
  Wallet
} from "lucide-react";

const HumaniteUnieHome = () => {
  const navigate = useNavigate();

  const specializedOrganizations = [
    {
      name: "Organisation Humaine de la Santé",
      acronym: "OHS",
      icon: Heart,
      color: "from-blue-600 to-green-600",
      director: "Poste Vacant",
      status: "Nomination en cours",
      description: "Gouvernance démocratique mondiale de la santé",
      members: "50,000 professionnels",
      coverage: "8.1 milliards de personnes",
      route: "/ohs"
    },
    {
      name: "Organisation de la Symbiose Planétaire", 
      acronym: "OSP",
      icon: Leaf,
      color: "from-green-600 to-teal-600",
      director: "Poste Vacant",
      status: "Nomination en cours", 
      description: "Action climatique et gouvernance environnementale",
      members: "75,000 experts",
      coverage: "Action globale",
      route: "/osp"
    }
  ];

  const daoStats = [
    {
      label: "Citoyens Actifs",
      value: "2.4M",
      icon: Users,
      description: "NFT Soulbound détenteurs"
    },
    {
      label: "Propositions Actives",
      value: "47",
      icon: FileText,
      description: "En cours de vote"
    },
    {
      label: "Taux de Participation",
      value: "73%",
      icon: Vote,
      description: "Dernier vote mondial"
    },
    {
      label: "Trésor DAO",
      value: "156.8M",
      icon: Coins,
      description: "SOL & tokens"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil principal
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600">
              <Crown className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Organisation de l'Humanité Unie
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            La première DAO mondiale démocratique sur blockchain Solana. 
            Une gouvernance transparente, décentralisée et équitable pour l'humanité entière.
          </p>
          <div className="flex items-center justify-center space-x-6 flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Un humain, une voix</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Blockchain Solana</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2">
              <Wallet className="h-4 w-4" />
              <span>NFT Soulbound</span>
            </Badge>
          </div>
        </div>

        {/* Direction Exécutive */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6" />
              <span>Direction Exécutive de l'Humanité Unie</span>
            </CardTitle>
            <CardDescription className="text-indigo-50">
              Gouvernance démocratique mondiale élue par les citoyens NFT
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Président DAO */}
              <Card className="border-2 border-indigo-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Président DAO</CardTitle>
                    <Badge variant="destructive">Poste Vacant</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2"><strong>Mandat :</strong> 4 ans (élu au suffrage universel NFT)</p>
                  <p className="text-gray-600 mb-2">
                    <strong>Salaire :</strong> 
                    <span className="font-bold text-primary ml-2">50,000,000 JRC</span>
                    <span className="text-xs text-gray-500 ml-2">(5M JRC/an - 500,000 €/an)</span>
                  </p>
                  <p className="text-gray-600 mb-4"><strong>Statut :</strong> Élection mondiale programmée</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/nominations')}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Voir les Nominations
                  </Button>
                </CardContent>
              </Card>

              {/* Conseil Mondial */}
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Conseil Mondial</CardTitle>
                    <Badge variant="secondary">21 membres élus</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2"><strong>Composition :</strong> 21 représentants mondiaux</p>
                  <p className="text-gray-600 mb-2"><strong>Sièges occupés :</strong> 15/21</p>
                  <p className="text-gray-600 mb-4"><strong>Prochaines élections :</strong> 6 sièges disponibles</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/conseil')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Voir le Conseil
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Organisations Spécialisées */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-6 w-6" />
              <span>Organisations Spécialisées</span>
            </CardTitle>
            <CardDescription className="text-purple-50">
              Organismes autonomes sous l'égide de l'Humanité Unie
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {specializedOrganizations.map((org) => (
                <Card key={org.acronym} className="border hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 bg-gradient-to-r ${org.color} rounded-lg`}>
                        <org.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{org.name}</CardTitle>
                        <Badge 
                          variant={org.director === "Poste Vacant" ? "destructive" : "secondary"}
                        >
                          {org.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Directeur :</strong> {org.director}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Équipe :</strong> {org.members}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Couverture :</strong> {org.coverage}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {org.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(org.route)}
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Accéder à {org.acronym}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistiques DAO */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6" />
              <span>Gouvernance DAO en Temps Réel</span>
            </CardTitle>
            <CardDescription>
              Statistiques blockchain de la participation démocratique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {daoStats.map((stat) => (
                <Card key={stat.label} className="text-center p-4">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <stat.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-gray-700 mb-1">{stat.label}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions Rapides */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6" />
              <span>Actions Citoyennes</span>
            </CardTitle>
            <CardDescription>
              Participez à la gouvernance démocratique mondiale décentralisée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                className="h-20 flex-col space-y-2"
                onClick={() => navigate('/wallet')}
              >
                <Wallet className="h-6 w-6" />
                <span>Obtenir NFT Citoyen</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => navigate('/governance')}
              >
                <Vote className="h-6 w-6" />
                <span>Voter Propositions</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => navigate('/propositions')}
              >
                <FileText className="h-6 w-6" />
                <span>Créer Proposition</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex-col space-y-2"
                onClick={() => navigate('/tresor')}
              >
                <Coins className="h-6 w-6" />
                <span>Trésor DAO</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default HumaniteUnieHome;