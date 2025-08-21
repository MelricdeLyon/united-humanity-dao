import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Users2, Shield, Leaf, Heart, Zap } from "lucide-react";

const OrganizationStructure = () => {
  return (
    <section id="council" className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Structure Organisationnelle</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspirée des Nations Unies, adaptée à la décentralisation blockchain
          </p>
        </div>

        {/* Direction Exécutive */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Direction Exécutive</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="shadow-card border-2 border-primary/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                    <Crown className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle>Président</CardTitle>
                <CardDescription>Mandat 5 ans • $418,000/an</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="mb-3 bg-success text-success-foreground">Position Vacante</Badge>
                <p className="text-sm text-muted-foreground">
                  Responsable de l'exécution des décisions, représentation diplomatique
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-2 border-accent/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-xl bg-accent text-accent-foreground">
                    <Users2 className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle>Vice-Président</CardTitle>
                <CardDescription>Mandat 5 ans • $230,000/an</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="mb-3 bg-warning text-warning-foreground">Élection en Mars</Badge>
                <p className="text-sm text-muted-foreground">
                  Support exécutif, coordination des départements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conseil Mondial */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Conseil Mondial</h3>
          <Card className="max-w-3xl mx-auto shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Users2 className="h-6 w-6 text-primary" />
                10 Membres Élus
              </CardTitle>
              <CardDescription>Mandat 2 ans • $170,000/an par membre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="font-semibold">7/10 Sièges Occupés</div>
                  <div className="text-sm text-muted-foreground">Représentation géographique équitable</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="font-semibold">Prochaines Élections</div>
                  <div className="text-sm text-muted-foreground">Novembre 2025</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Départements */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">Départements Spécialisés</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Paix & Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="mb-2 bg-success text-success-foreground">Directeur Nommé</Badge>
                <p className="text-xs text-muted-foreground">
                  Résolution de conflits, médiation internationale
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-2">
                  <Leaf className="h-8 w-8 text-success" />
                </div>
                <CardTitle className="text-lg">Développement Durable</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="mb-2 bg-success text-success-foreground">Directeur Nommé</Badge>
                <p className="text-xs text-muted-foreground">
                  Climat, environnement, énergie renouvelable
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-2">
                  <Heart className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle className="text-lg">Développement Humain</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="mb-2 bg-warning text-warning-foreground">Position Vacante</Badge>
                <p className="text-xs text-muted-foreground">
                  Éducation, santé, droits humains
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-2">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-lg">Technologies & Culture</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="mb-2 bg-warning text-warning-foreground">Position Vacante</Badge>
                <p className="text-xs text-muted-foreground">
                  Innovation, culture numérique, IA
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationStructure;