import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf, 
  Globe, 
  Users, 
  Thermometer, 
  Shield, 
  Zap, 
  Droplets, 
  TreePine, 
  ArrowRight, 
  Building, 
  ChevronRight,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

const OSPHome = () => {
  const navigate = useNavigate();

  const departments = [
    {
      name: "Surveillance Climatique",
      icon: Thermometer,
      description: "Monitoring en temps réel des données climatiques mondiales",
      members: 156,
      color: "text-red-600"
    },
    {
      name: "Interventions d'Urgence",
      icon: AlertTriangle,
      description: "Réponse rapide aux urgences climatiques via smart contracts",
      members: 89,
      color: "text-orange-600"
    },
    {
      name: "Technologies Vertes",
      icon: Zap,
      description: "Innovation et déploiement des solutions technologiques durables",
      members: 234,
      color: "text-green-600"
    },
    {
      name: "Adaptation Climatique",
      icon: Shield,
      description: "Stratégies d'adaptation pour les populations vulnérables",
      members: 178,
      color: "text-blue-600"
    },
    {
      name: "Justice Climatique",
      icon: Users,
      description: "Équité et inclusion dans les politiques climatiques mondiales",
      members: 145,
      color: "text-purple-600"
    },
    {
      name: "Financement Carbone",
      icon: TrendingUp,
      description: "Mécanismes financiers décentralisés pour l'action climatique",
      members: 198,
      color: "text-emerald-600"
    }
  ];

  const regions = [
    { name: "Amérique du Nord", members: 342, activeProjects: 23 },
    { name: "Europe", members: 456, activeProjects: 31 },
    { name: "Asie-Pacifique", members: 578, activeProjects: 28 },
    { name: "Afrique", members: 234, activeProjects: 19 },
    { name: "Amérique Latine", members: 189, activeProjects: 15 },
    { name: "Moyen-Orient", members: 123, activeProjects: 12 }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <Leaf className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Organisation de la Symbiose Planétaire
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          COP 2.0 - Gouvernance décentralisée climatique mondiale
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Gouvernance Planétaire</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Humanocratie Directe</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Smart Contracts</span>
          </div>
        </div>
      </div>

      {/* Direction Exécutive */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Direction Exécutive
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Directeur de la Symbiose Planétaire</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Élu au suffrage universel mondial par blockchain - Mandat de 4 ans
                </p>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="font-medium">Position en cours de nomination</p>
                  <p className="text-sm text-muted-foreground">
                    La première nomination mondiale se déroulera prochainement via vote planétaire sécurisé
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-3"
                    onClick={() => navigate('/osp/nominations')}
                  >
                    Voir les nominés
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Conseil Mondial du Climat</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  18 membres : 9 experts climat + 9 délégués habitants tirés au sort
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">9</p>
                    <p className="text-xs text-muted-foreground">Experts Climat</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">9</p>
                    <p className="text-xs text-muted-foreground">Délégués Habitants</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={() => navigate('/osp/conseil')}
                >
                  Voir le conseil
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bureaux Régionaux */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Bureaux Régionaux Climatiques
          </CardTitle>
          <CardDescription>
            Coordination régionale de l'action climatique décentralisée
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {regions.map((region, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <h4 className="font-semibold mb-2">{region.name}</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Humanéticiens:</span>
                    <span>{region.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projets actifs:</span>
                    <span>{region.activeProjects}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Départements Spécialisés */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Départements Spécialisés
          </CardTitle>
          <CardDescription>
            Expertise sectorielle pour l'action climatique mondiale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept, index) => {
              const IconComponent = dept.icon;
              return (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${dept.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {dept.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {dept.members} Humanéticiens
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions Rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Participer à la Gouvernance Climatique</CardTitle>
          <CardDescription>
            Humanocratie directe mondiale pour l'action climatique
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => navigate('/osp/governance')}
            >
              <Leaf className="h-6 w-6" />
              <span className="font-semibold">Propositions Climat</span>
              <span className="text-xs opacity-80">Soumettre une proposition</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => navigate('/osp/vote-planetaire')}
            >
              <Globe className="h-6 w-6" />
              <span className="font-semibold">Vote Planétaire</span>
              <span className="text-xs opacity-80">Humanocratie directe</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => navigate('/osp/assemblee-mondiale')}
            >
              <Users className="h-6 w-6" />
              <span className="font-semibold">Assemblée Mondiale</span>
              <span className="text-xs opacity-80">Sessions virtuelles live</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques globales */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">2,847</div>
            <div className="text-sm text-muted-foreground">Habitants Actifs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-muted-foreground">Propositions Climat</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-muted-foreground">Votes en Cours</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">23</div>
            <div className="text-sm text-muted-foreground">Urgences Actives</div>
          </CardContent>
        </Card>
      </div>

      {/* Footer CTA */}
      <div className="text-center p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">Rejoignez la Révolution Climatique</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Participez à la première gouvernance climatique décentralisée mondiale. 
          Votre voix compte pour façonner l'avenir de notre planète.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={() => navigate('/osp/governance')}>
            Participer Maintenant
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/osp/assemblee-mondiale')}>
            Assemblée Virtuelle
            <Users className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OSPHome;