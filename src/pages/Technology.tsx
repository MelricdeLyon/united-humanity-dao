import Header from "@/components/Header";
import SubNavigation from "@/components/SubNavigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Server } from "lucide-react";

const Technology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">Notre Technologie</h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Découvrez les technologies innovantes qui alimentent l'écosystème Humanité Unie
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* DAGJERR Card */}
          <Card className="h-fit">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Network className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">DAGJERR</CardTitle>
              <CardDescription className="text-base">
                Découvrez la technologie innovante derrière notre graphe à cyclique dirigé hybride
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Contenu détaillé à venir sur la technologie DAGJERR...
                </p>
                <Button className="w-full" variant="outline">
                  En savoir plus
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* JERROS Card */}
          <Card className="h-fit">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <Server className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">JERROS</CardTitle>
              <CardDescription className="text-base">
                Découvrez notre OS décentralisé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Contenu détaillé à venir sur JERROS...
                </p>
                <Button className="w-full" variant="outline">
                  En savoir plus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Technology;