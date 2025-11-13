import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ScrollText, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const declarations = [
  {
    id: "droits-vivant",
    title: "Déclaration des Droits du Vivant",
    description: "Charte fondamentale garantissant les droits inaliénables de tous les êtres vivants",
    date: "2024",
    type: "Constitution",
    icon: ScrollText,
    route: "/declaration-droits-vivant"
  },
  {
    id: "droits-numeriques",
    title: "Déclaration des Droits Numériques",
    description: "Protection des libertés et droits fondamentaux dans l'espace numérique",
    date: "2024",
    type: "Charte",
    icon: FileText,
    route: "/declaration-droits-numeriques"
  }
];

const OfficialDeclarations = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <Badge className="mb-4 px-4 py-1 bg-accent/20 text-accent-foreground border-2 border-accent/30">
            TEXTES FONDAMENTAUX
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Déclarations Officielles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Les documents constitutionnels et protocoles qui fondent notre organisation
          </p>
        </div>

        {/* Grille de déclarations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {declarations.map((declaration) => {
            const Icon = declaration.icon;
            return (
              <Card 
                key={declaration.id}
                className="border-2 hover:border-accent/50 transition-all hover:shadow-xl group cursor-pointer"
                onClick={() => navigate(declaration.route)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <Badge variant="secondary" className="font-semibold">
                      {declaration.type}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-accent transition-colors">
                    {declaration.title}
                  </CardTitle>
                  
                  <CardDescription className="text-base pt-2">
                    {declaration.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-muted-foreground">
                      Adopté en {declaration.date}
                    </span>
                    <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Section documentation */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    Documentation Complète
                  </h3>
                  <p className="text-muted-foreground">
                    Accédez à l'ensemble des textes officiels, protocoles et règlements
                  </p>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="gradient-primary whitespace-nowrap"
                onClick={() => navigate('/governance')}
              >
                Consulter les Archives
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OfficialDeclarations;
