import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Wallet, Vote, Users, Settings, Globe } from "lucide-react";

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
            <h1 className="text-xl font-bold text-foreground">Humanité Unie</h1>
            <p className="text-xs text-muted-foreground">Organisation Décentralisée Autonome</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Organisation Humanité Unie */}
          <div className="relative group">
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
              Organisation Humanité Unie
            </button>
            <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background/95 backdrop-blur-sm border rounded-lg shadow-xl p-2 min-w-48 z-[100]">
              <button 
                onClick={() => navigate('/accueil')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Accueil
              </button>
              <button 
                onClick={() => navigate('/nominations')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Nominations
              </button>
              <button 
                onClick={() => navigate('/governance')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Gouvernance
              </button>
              <button 
                onClick={() => navigate('/propositions')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Propositions
              </button>
              <button 
                onClick={() => navigate('/tresor')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Trésor
              </button>
              <button 
                onClick={() => navigate('/conseil')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Conseil
              </button>
            </div>
          </div>

          {/* Organisation Humaine de la Santé */}
          <div className="relative group">
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
              Organisation Humaine de la Santé
            </button>
            <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background/95 backdrop-blur-sm border rounded-lg shadow-xl p-2 min-w-48 z-[100]">
              <button 
                onClick={() => navigate('/ohs')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Accueil OHS
              </button>
              <button 
                onClick={() => navigate('/ohs/nominations')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Nominations OHS
              </button>
              <button 
                onClick={() => navigate('/ohs/council')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Conseil Mondial
              </button>
              <button 
                onClick={() => navigate('/ohs/governance')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Gouvernance Santé
              </button>
            </div>
          </div>

          {/* Organisation de la Symbiose Planétaire */}
          <div className="relative group">
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
              Organisation de la Symbiose Planétaire
            </button>
            <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background/95 backdrop-blur-sm border rounded-lg shadow-xl p-2 min-w-48 z-[100]">
              <button 
                onClick={() => navigate('/osp')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Accueil OSP
              </button>
              <button 
                onClick={() => navigate('/osp/nominations')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Nominations OSP
              </button>
              <button 
                onClick={() => navigate('/osp/governance')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Gouvernance Climat
              </button>
              <button 
                onClick={() => navigate('/osp/vote-planetaire')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Vote Planétaire
              </button>
              <button 
                onClick={() => navigate('/osp/assemblee-mondiale')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
              >
                Assemblée Mondiale
              </button>
            </div>
          </div>
        </nav>

        {/* Wallet & Actions */}
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="hidden sm:flex">
            <Users className="mr-1 h-3 w-3" />
            2,847 Citoyens
          </Badge>
          
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