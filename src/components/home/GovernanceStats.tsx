import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Vote, 
  Shield, 
  Coins,
  FileText,
  Activity,
  CheckCircle2
} from "lucide-react";

const stats = [
  {
    label: "Citoyens Enregistrés",
    value: "2,847",
    change: "+12% ce mois",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    label: "Propositions Actives",
    value: "47",
    change: "23 en délibération",
    icon: FileText,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    label: "Votes Enregistrés",
    value: "15,234",
    change: "+8% cette semaine",
    icon: Vote,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    label: "Taux de Participation",
    value: "87.3%",
    change: "Record historique",
    icon: TrendingUp,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    label: "Trésor National",
    value: "2.4M SOL",
    change: "Réserves sécurisées",
    icon: Coins,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    label: "Transparence",
    value: "100%",
    change: "Audits publics",
    icon: Shield,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    label: "Décisions Adoptées",
    value: "156",
    change: "Depuis la fondation",
    icon: CheckCircle2,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    label: "Uptime Réseau",
    value: "98.5%",
    change: "Disponibilité constante",
    icon: Activity,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  }
];

const GovernanceStats = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-1 bg-primary/20 text-primary-foreground border-2 border-primary/30">
            STATISTIQUES OFFICIELLES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            État de la Nation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Indicateurs en temps réel de l'activité démocratique et de la participation citoyenne
          </p>
        </div>

        {/* Grille de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label}
                className="border-2 hover:border-primary/30 transition-all hover:shadow-lg group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Note de transparence */}
        <Card className="mt-12 border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Engagement de Transparence Totale
                </h3>
                <p className="text-sm text-muted-foreground">
                  Toutes les données présentées sont vérifiables sur la blockchain Solana. 
                  Chaque vote, transaction et décision est enregistrée de manière immuable et publique.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GovernanceStats;
