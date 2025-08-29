import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Wallet, Vote, Users, Settings, Globe } from "lucide-react";
import TreasuryButton from "@/components/treasury/TreasuryButton";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-2 sm:px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary">
            <Globe className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-xl font-bold text-foreground">CYDJERR NATION</h1>
            <p className="text-xs text-muted-foreground">Organisation Décentralisée Autonome</p>
          </div>
        </div>

        {/* Simplified Navigation - Content moved to SubNavigation */}
        <div className="flex-1 flex justify-center px-2">
          {/* Trésor de la Nation - Centré */}
          <button 
            onClick={() => navigate('/tresor-nation')}
            className="px-3 py-2 sm:px-6 md:px-8 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.1)] border border-blue-300/30 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.15)] transition-all duration-200 cursor-pointer"
          >
            <h2 className="text-sm sm:text-lg md:text-xl font-bold text-white drop-shadow-sm">
              <span className="hidden sm:inline">TRÉSOR DE LA NATION</span>
              <span className="sm:hidden">TRÉSOR</span>
            </h2>
          </button>
        </div>

        {/* Actions & Citizens */}
        <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
          <Badge variant="outline" className="hidden lg:flex">
            <Users className="mr-1 h-3 w-3" />
            2,847 Citoyens
          </Badge>
          
          <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => navigate('/propositions')}>
            <Vote className="mr-2 h-4 w-4" />
            Votes Actifs
          </Button>
          
          <Button className="gradient-primary text-xs sm:text-sm" onClick={() => navigate('/wallet')}>
            <Wallet className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Connecter Wallet</span>
            <span className="sm:hidden">Wallet</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;