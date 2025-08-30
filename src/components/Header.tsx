import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Wallet, Vote, Users, Globe } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-1 sm:px-2 md:px-4 w-full max-w-none relative">
        {/* Logo - Section gauche */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 z-10">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary">
              <Globe className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
          </div>
          <Badge variant="outline" className="flex text-xs sm:text-sm">
            <Users className="mr-1 h-3 w-3" />
            <span className="hidden sm:inline">2,847 Citoyens</span>
            <span className="sm:hidden">2,847</span>
          </Badge>
        </div>

        {/* Bouton TRÉSOR DE LA NATION - Centré */}
        <div className="absolute left-1/2 transform -translate-x-1/2 max-w-[calc(100vw-120px)] sm:max-w-[calc(100vw-200px)] md:max-w-none">
          <button 
            onClick={() => navigate('/tresor-nation')}
            className="px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 py-1 sm:py-1.5 md:py-2 lg:py-3 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.1)] border border-blue-300/30 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.15)] transition-all duration-200 cursor-pointer"
          >
            <span className="text-[9px] sm:text-xs md:text-sm lg:text-lg xl:text-xl font-bold text-white drop-shadow-sm whitespace-nowrap block">
              TRÉSOR DE LA NATION
            </span>
          </button>
        </div>

        {/* Actions - Section droite */}
        <div className="flex items-center space-x-1 flex-shrink-0 z-10">
          <Button variant="outline" size="sm" className="hidden md:flex text-xs" onClick={() => navigate('/propositions')}>
            <Vote className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden lg:inline">Votes Actifs</span>
            <span className="lg:hidden">Votes</span>
          </Button>
          
          <Button className="gradient-primary text-[10px] sm:text-xs md:text-sm px-1.5 sm:px-2 md:px-4" onClick={() => navigate('/wallet')}>
            <Wallet className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Connecter Wallet</span>
            <span className="sm:hidden">Wallet</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;