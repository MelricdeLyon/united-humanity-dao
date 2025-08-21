import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock, Rocket } from "lucide-react";

const Roadmap = () => {
  const phases = [
    {
      phase: "Phase Alpha",
      date: "Janvier 2025",
      status: "completed",
      tasks: [
        { name: "NFT Citoyenneté Soulbound", completed: true },
        { name: "Smart Contracts Gouvernance", completed: true },
        { name: "Interface Web Basique", completed: true },
        { name: "Tests Devnet Solana", completed: true }
      ]
    },
    {
      phase: "Phase Bêta",
      date: "Mars 2025", 
      status: "in-progress",
      tasks: [
        { name: "Système de Réputation", completed: true },
        { name: "Forum Décentralisé", completed: false },
        { name: "Intégration Wallets", completed: false },
        { name: "Tests Utilisateurs", completed: false }
      ]
    },
    {
      phase: "Lancement Mainnet",
      date: "Août 2025",
      status: "upcoming",
      tasks: [
        { name: "Audit Sécurité Complet", completed: false },
        { name: "Déploiement Mainnet", completed: false },
        { name: "Première Élection", completed: false },
        { name: "Onboarding 10k Citoyens", completed: false }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-warning" />;
      case "upcoming":
        return <Circle className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">Terminé</Badge>;
      case "in-progress":
        return <Badge className="bg-warning text-warning-foreground">En Cours</Badge>;
      case "upcoming":
        return <Badge variant="outline">À Venir</Badge>;
      default:
        return <Badge variant="outline">Planifié</Badge>;
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Feuille de Route</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre progression vers la première DAO mondiale fonctionnelle
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-border h-full hidden md:block" />
          
          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div key={phase.phase} className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background border-4 border-primary">
                    {getStatusIcon(phase.status)}
                  </div>
                </div>

                {/* Phase Card */}
                <Card className={`w-full md:w-5/12 shadow-card ${
                  phase.status === 'in-progress' ? 'border-2 border-primary/30 shadow-elevated' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div className="md:hidden">{getStatusIcon(phase.status)}</div>
                        {phase.phase}
                      </CardTitle>
                      {getStatusBadge(phase.status)}
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {phase.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {phase.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center gap-3">
                          {task.completed ? (
                            <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={`text-sm ${
                            task.completed ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {task.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto shadow-governance bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Rocket className="h-6 w-6 text-primary" />
                Objectif 28 Août 2025
              </CardTitle>
              <CardDescription>
                Lancement officiel de la première DAO gouvernementale mondiale
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Rejoignez-nous dans cette aventure historique pour créer une gouvernance 
                mondiale transparente, démocratique et décentralisée.
              </p>
              <Badge className="bg-secondary text-secondary-foreground text-lg px-4 py-2">
                267 jours restants
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Import Calendar icon that was missing
import { Calendar } from "lucide-react";

export default Roadmap;