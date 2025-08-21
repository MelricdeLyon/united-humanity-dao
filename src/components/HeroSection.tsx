import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Vote, Shield, Coins } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      <div className="relative z-10 container mx-auto text-center">
        {/* Badge */}
        <Badge className="mb-6 bg-secondary text-secondary-foreground">
          Version Alpha • Solana Devnet
        </Badge>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Humanité Unie
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          La première Organisation Décentralisée Autonome mondiale. 
          Un humain, une voix. Une gouvernance transparente pour l'humanité entière.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="gradient-primary shadow-governance">
            Devenir Citoyen
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline">
            Explorer la Gouvernance
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card className="p-6 text-center shadow-card">
            <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
            <div className="text-2xl font-bold">2,847</div>
            <div className="text-sm text-muted-foreground">Citoyens Actifs</div>
          </Card>
          
          <Card className="p-6 text-center shadow-card">
            <Vote className="h-8 w-8 mx-auto mb-3 text-accent" />
            <div className="text-2xl font-bold">47</div>
            <div className="text-sm text-muted-foreground">Propositions</div>
          </Card>
          
          <Card className="p-6 text-center shadow-card">
            <Shield className="h-8 w-8 mx-auto mb-3 text-success" />
            <div className="text-2xl font-bold">98.5%</div>
            <div className="text-sm text-muted-foreground">Uptime Réseau</div>
          </Card>
          
          <Card className="p-6 text-center shadow-card">
            <Coins className="h-8 w-8 mx-auto mb-3 text-secondary" />
            <div className="text-2xl font-bold">2.4M</div>
            <div className="text-sm text-muted-foreground">SOL en Trésor</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;