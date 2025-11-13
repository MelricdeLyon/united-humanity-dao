import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Scale, Globe2, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InstitutionalHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-16 overflow-hidden border-b-4 border-primary">
      {/* Fond dégradé institutionnel */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
      
      {/* Motif géométrique subtil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
        {/* Emblème institutionnel */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-background shadow-2xl">
              <Globe2 className="h-16 w-16 text-primary-foreground" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Titre officiel */}
        <div className="space-y-4">
          <Badge className="mb-4 px-6 py-2 text-sm font-semibold bg-secondary/80 text-secondary-foreground border-2 border-primary/20">
            ORGANISATION MONDIALE DÉCENTRALISÉE
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="block text-foreground mb-2">CYDJERR NATION</span>
            <span className="block text-2xl md:text-3xl font-normal text-muted-foreground mt-4">
              Organisation Décentralisée Autonome
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <div className="h-px w-12 bg-border" />
            <span className="uppercase tracking-wider">Fondée en 2024</span>
            <div className="h-px w-12 bg-border" />
          </div>
        </div>

        {/* Devise institutionnelle */}
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed border-l-4 border-primary pl-6 py-4 bg-muted/50">
            "Un Humain, Une Voix, Une Gouvernance Transparente pour l'Humanité Entière"
          </p>
        </div>

        {/* Piliers institutionnels */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
          <div className="bg-card border-2 border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <Shield className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="font-bold text-lg mb-2">Souveraineté</h3>
            <p className="text-sm text-muted-foreground">Gouvernance décentralisée et autonome</p>
          </div>
          
          <div className="bg-card border-2 border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <Scale className="h-10 w-10 mx-auto mb-3 text-accent" />
            <h3 className="font-bold text-lg mb-2">Justice</h3>
            <p className="text-sm text-muted-foreground">Équité et transparence absolues</p>
          </div>
          
          <div className="bg-card border-2 border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <Award className="h-10 w-10 mx-auto mb-3 text-success" />
            <h3 className="font-bold text-lg mb-2">Excellence</h3>
            <p className="text-sm text-muted-foreground">Innovation technologique au service du bien commun</p>
          </div>
        </div>

        {/* CTA principal */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            size="lg" 
            className="gradient-primary text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate('/governance')}
          >
            Accéder à la Gouvernance
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 border-2"
            onClick={() => navigate('/declaration-droits-vivant')}
          >
            Lire la Constitution
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalHero;
