import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users, Vote, Shield, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-1 sm:px-2 lg:px-4 py-4 sm:py-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      <div className="relative z-10 w-full max-w-none text-center">
        {/* Badge */}
        <Badge className="mb-3 sm:mb-4 bg-secondary text-secondary-foreground">
          Version Alpha • Solana Devnet
        </Badge>

        {/* Main heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent px-1">
          CYDJERR NATION
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6 px-1 sm:px-2 lg:max-w-3xl lg:mx-auto">
          La première Organisation Décentralisée Autonome mondiale. 
          Un humain, une voix. Une gouvernance transparente pour l'humanité entière.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <Button 
            size="lg" 
            variant="outline" 
            className="hover:scale-105 transition-transform duration-200 hover:shadow-lg mb-3 sm:mb-4"
            onClick={() => navigate('/governance')}
          >
            Explorer la Gouvernance
          </Button>
          
          {/* Maxime */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground underline decoration-primary decoration-2 underline-offset-4 uppercase px-1 sm:px-2 leading-tight">
            VOUS ÊTES LA DÉCISION DONC CHAQUE ADHÉSION EST DÉCISIVE.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 lg:gap-4 px-1 sm:px-2 lg:max-w-4xl lg:mx-auto">
          <Card className="p-2 sm:p-3 lg:p-6 text-center shadow-card">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto mb-1 sm:mb-2 lg:mb-3 text-primary" />
            <div className="text-base sm:text-lg lg:text-2xl font-bold">2,847</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Citoyens Actifs</div>
          </Card>
          
          <Card className="p-2 sm:p-3 lg:p-6 text-center shadow-card">
            <Vote className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto mb-1 sm:mb-2 lg:mb-3 text-accent" />
            <div className="text-base sm:text-lg lg:text-2xl font-bold">47</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Propositions</div>
          </Card>
          
          <Card className="p-2 sm:p-3 lg:p-6 text-center shadow-card">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto mb-1 sm:mb-2 lg:mb-3 text-success" />
            <div className="text-base sm:text-lg lg:text-2xl font-bold">98.5%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Uptime Réseau</div>
          </Card>
          
          <Card className="p-2 sm:p-3 lg:p-6 text-center shadow-card">
            <Coins className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto mb-1 sm:mb-2 lg:mb-3 text-secondary" />
            <div className="text-base sm:text-lg lg:text-2xl font-bold">2.4M</div>
            <div className="text-xs sm:text-sm text-muted-foreground">SOL en Trésor</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;