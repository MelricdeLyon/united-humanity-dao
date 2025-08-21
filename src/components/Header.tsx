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
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Organisation Humanité Unie
            </button>
            <div className="absolute top-8 left-0 hidden group-hover:block bg-background border rounded-lg shadow-lg p-2 min-w-48 z-50">
              <button 
                onClick={() => navigate('/accueil')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                Accueil
              </button>
              <button 
                onClick={() => navigate('/elections')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                Élections
              </button>
              <button 
                onClick={() => navigate('/governance')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                Gouvernance
              </button>
              <button 
                onClick={() => navigate('/propositions')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                Propositions
              </button>
              <button 
                onClick={() => navigate('/tresor')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                Trésor
              </button>
              <button 
                onClick={() => navigate('/conseil')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                Conseil
              </button>
            </div>
          </div>

          {/* Organisation Humaine de la Santé */}
          <div className="relative group">
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Organisation Humaine de la Santé
            </button>
            <div className="absolute top-8 left-0 hidden group-hover:block bg-background border rounded-lg shadow-lg p-2 min-w-48 z-50">
              <button 
                onClick={() => navigate('/ohs')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                Accueil OHS
              </button>
              <button 
                onClick={() => navigate('/ohs/elections')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                Élections OHS
              </button>
              <button 
                onClick={() => navigate('/ohs/council')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                Conseil Mondial
              </button>
              <button 
                onClick={() => navigate('/ohs/governance')} 
                className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
              >
                Gouvernance Santé
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