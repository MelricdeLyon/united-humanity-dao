import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Heart, 
  Leaf, 
  Scale, 
  Users, 
  Globe,
  ArrowRight,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const institutions = [
  {
    id: "humanite-unie",
    name: "Humanité Unie",
    acronym: "HU",
    description: "Instance suprême de gouvernance mondiale démocratique",
    icon: Globe,
    color: "text-primary",
    bgColor: "bg-primary/10",
    members: "2,847",
    status: "Actif",
    route: "/humanite-unie-home"
  },
  {
    id: "ohs",
    name: "Organisation Humaine de la Santé",
    acronym: "OHS",
    description: "Protection de la santé publique mondiale",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    members: "1,234",
    status: "Actif",
    route: "/ohs-home"
  },
  {
    id: "osp",
    name: "Organisation de la Symbiose Planétaire",
    acronym: "OSP",
    description: "Préservation de l'environnement et du climat",
    icon: Leaf,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    members: "987",
    status: "Actif",
    route: "/osp-home"
  },
  {
    id: "conseil",
    name: "Conseil Mondial",
    acronym: "CM",
    description: "Organe exécutif et législatif principal",
    icon: Building2,
    color: "text-accent",
    bgColor: "bg-accent/10",
    members: "47",
    status: "En session",
    route: "/conseil"
  }
];

const InstitutionsGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-1 bg-secondary text-secondary-foreground">
            INSTITUTIONS OFFICIELLES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Organes de Gouvernance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Les institutions démocratiques qui composent l'architecture de la Cydjerr Nation
          </p>
        </div>

        {/* Grille d'institutions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {institutions.map((institution) => {
            const Icon = institution.icon;
            return (
              <Card 
                key={institution.id}
                className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-16 w-16 rounded-xl ${institution.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-8 w-8 ${institution.color}`} />
                    </div>
                    <Badge variant={institution.status === "Actif" ? "default" : "secondary"}>
                      {institution.status}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">
                    {institution.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="font-mono">
                      {institution.acronym}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {institution.members} membres
                    </span>
                  </div>
                  <CardDescription className="text-base">
                    {institution.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => navigate(institution.route)}
                  >
                    Accéder à l'institution
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistiques globales */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm text-muted-foreground">Institutions Actives</div>
              </div>
              
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
                <div className="text-3xl font-bold">5,115</div>
                <div className="text-sm text-muted-foreground">Membres Totaux</div>
              </div>
              
              <div className="text-center">
                <Scale className="h-8 w-8 mx-auto mb-2 text-success" />
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">Transparence</div>
              </div>
              
              <div className="text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <div className="text-3xl font-bold">195</div>
                <div className="text-sm text-muted-foreground">Pays Représentés</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InstitutionsGrid;
