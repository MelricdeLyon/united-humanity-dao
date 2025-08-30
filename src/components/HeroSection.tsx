import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users, Vote, Shield, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-2 sm:px-4 py-8 sm:py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      <div className="relative z-10 container mx-auto text-center w-full max-w-full">
        {/* Badge */}
        <Badge className="mb-4 sm:mb-6 bg-secondary text-secondary-foreground">
          Version Alpha • Solana Devnet
        </Badge>

        {/* Main heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-2">
          CYDJERR NATION
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-full sm:max-w-3xl mx-auto px-2 sm:px-4">
          La première Organisation Décentralisée Autonome mondiale. 
          Un humain, une voix. Une gouvernance transparente pour l'humanité entière.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="hover:scale-105 transition-transform duration-200 hover:shadow-lg mb-4 sm:mb-6"
            onClick={() => navigate('/governance')}
          >
            Explorer la Gouvernance
          </Button>
          
          {/* Maxime */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground underline decoration-primary decoration-2 underline-offset-4 uppercase px-2 sm:px-4 leading-tight">
            VOUS ÊTES LA DÉCISION DONC CHAQUE ADHÉSION EST DÉCISIVE.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 max-w-full sm:max-w-4xl mx-auto px-2 sm:px-4">
          <Card className="p-3 sm:p-4 lg:p-6 text-center shadow-card">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-primary" />
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">2,847</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Citoyens Actifs</div>
          </Card>
          
          <Card className="p-3 sm:p-4 lg:p-6 text-center shadow-card">
            <Vote className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-accent" />
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">47</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Propositions</div>
          </Card>
          
          <Card className="p-3 sm:p-4 lg:p-6 text-center shadow-card">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-success" />
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">98.5%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Uptime Réseau</div>
          </Card>
          
          <Card className="p-3 sm:p-4 lg:p-6 text-center shadow-card">
            <Coins className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-secondary" />
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">2.4M</div>
            <div className="text-xs sm:text-sm text-muted-foreground">SOL en Trésor</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;