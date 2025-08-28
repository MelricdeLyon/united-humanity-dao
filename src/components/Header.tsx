import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Wallet, Vote, Users, Settings, Globe } from "lucide-react";
import TreasuryButton from "@/components/treasury/TreasuryButton";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Globe className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">CYDJERR NATION</h1>
            <p className="text-xs text-muted-foreground">Organisation Décentralisée Autonome</p>
          </div>
        </div>

        {/* Simplified Navigation - Content moved to SubNavigation */}
        <div className="flex-1" />

        {/* Treasury & Actions */}
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="hidden sm:flex">
            <Users className="mr-1 h-3 w-3" />
            2,847 Citoyens
          </Badge>
          
          <TreasuryButton />
          
          <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => navigate('/propositions')}>
            <Vote className="mr-2 h-4 w-4" />
            Votes Actifs
          </Button>
          
          <Button className="gradient-primary" onClick={() => navigate('/wallet')}>
            <Wallet className="mr-2 h-4 w-4" />
            Connecter Wallet
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;