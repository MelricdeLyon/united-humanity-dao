import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Vote, Clock, CheckCircle, XCircle, Users, TrendingUp } from "lucide-react";

const GovernanceDashboard = () => {
  return (
    <section id="governance" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tableau de Bord Gouvernance</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Participez aux décisions qui façonnent l'avenir de l'humanité
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Propositions Actives */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5 text-primary" />
                Propositions Actives
              </CardTitle>
              <CardDescription>Votes en cours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Initiative Climat 2025</span>
                  <Badge variant="outline" className="text-success">
                    <Clock className="w-3 h-3 mr-1" />
                    4j restants
                  </Badge>
                </div>
                <Progress value={67} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>67% Pour (1,908 votes)</span>
                  <span>33% Contre (941 votes)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Votre Statut */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Votre Statut
              </CardTitle>
              <CardDescription>Citoyen actif</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">NFT Citoyenneté</span>
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Vérifié
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Votes participés</span>
                  <span className="font-medium">47/52</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Réputation</span>
                  <span className="font-medium text-primary">Ambassadeur</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prochaines Échéances */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Prochaines Échéances
              </CardTitle>
              <CardDescription>Agenda gouvernance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Élection Vice-Président</span>
                  <Badge variant="secondary">15 Mars</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Budget 2025</span>
                  <Badge variant="outline">22 Mars</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Conseil Sécurité</span>
                  <Badge variant="outline">1 Avril</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Rapides */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6">Actions Rapides</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="gradient-primary">
              <Vote className="mr-2 h-4 w-4" />
              Soumettre une Proposition
            </Button>
            <Button variant="outline">
              Voir Toutes les Propositions
            </Button>
            <Button variant="outline">
              Rejoindre le Forum
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceDashboard;