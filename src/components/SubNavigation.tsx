import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Coins, 
  Handshake, 
  Vote, 
  Users, 
  ChevronDown,
  Scale,
  Shield
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const SubNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/ohs') || path.includes('/osp') || path === '/accueil') return 'organisations';
    if (path.includes('/declaration-droits-vivant')) return 'declaration-droits-vivant';
    if (path.includes('/declaration-droits-numeriques')) return 'declaration-droits-numeriques';
    if (path.includes('/operation-pieces-or')) return 'pieces-or';
    if (path.includes('/friendly-opa')) return 'friendly-opa';
    if (path.includes('/governance') || path.includes('/propositions')) return 'gouvernance';
    if (path.includes('/nominations') || path.includes('/conseil')) return 'citoyennete';
    return 'organisations';
  };

  const organisationItems = [
    { label: "Humanité Unie", path: "/accueil" },
    { label: "Organisation Humaine de la Santé", path: "/ohs" },
    { label: "Organisation de la Symbiose Planétaire", path: "/osp" },
  ];

  const gouvernanceItems = [
    { label: "Gouvernance", path: "/governance" },
    { label: "Propositions", path: "/propositions" },
  ];

  const citoyenneteItems = [
    { label: "Nominations", path: "/nominations" },
    { label: "Conseil", path: "/conseil" },
  ];

  return (
    <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-2 sm:px-4">
        <Tabs value={getActiveTab()} className="w-full">
          <TabsList className="h-10 sm:h-12 w-full justify-start bg-transparent p-0 overflow-x-auto">
            <div className="flex min-w-max gap-0.5 sm:gap-1">
            
            {/* Organisations */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TabsTrigger 
                  value="organisations" 
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm data-[state=active]:bg-muted/50"
                >
                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Organisations</span>
                  <span className="sm:hidden">Orgs</span>
                  <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3" />
                </TabsTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 sm:w-64 z-50 bg-background">
                {organisationItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="cursor-pointer text-xs sm:text-sm"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Déclaration des droits de l'être humain et du vivant */}
            <TabsTrigger 
              value="declaration-droits-vivant" 
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs data-[state=active]:bg-muted/50"
              onClick={() => navigate('/declaration-droits-vivant')}
            >
              <Scale className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xl:inline">Déclaration des droits de l'être humain et du vivant</span>
              <span className="hidden sm:inline xl:hidden">Droits du Vivant</span>
              <span className="sm:hidden">Droits</span>
            </TabsTrigger>

            {/* Déclaration des droits numériques */}
            <TabsTrigger 
              value="declaration-droits-numeriques" 
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs data-[state=active]:bg-muted/50"
              onClick={() => navigate('/declaration-droits-numeriques')}
            >
              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xl:inline">Déclaration des droits numériques de l'être humain</span>
              <span className="hidden sm:inline xl:hidden">Droits Numériques</span>
              <span className="sm:hidden">Num</span>
            </TabsTrigger>

            {/* Opération Pièces d'Or */}
            <TabsTrigger 
              value="pieces-or" 
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm data-[state=active]:bg-muted/50"
              onClick={() => navigate('/operation-pieces-or')}
            >
              <Coins className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Opération Pièces d'Or</span>
              <span className="sm:hidden">Pièces</span>
            </TabsTrigger>

            {/* Friendly OPA */}
            <TabsTrigger 
              value="friendly-opa" 
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm data-[state=active]:bg-muted/50"
              onClick={() => navigate('/friendly-opa')}
            >
              <Handshake className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Friendly OPA</span>
              <span className="sm:hidden">OPA</span>
            </TabsTrigger>

            {/* Gouvernance */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TabsTrigger 
                  value="gouvernance" 
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm data-[state=active]:bg-muted/50"
                >
                  <Vote className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Gouvernance</span>
                  <span className="sm:hidden">Gov</span>
                  <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3" />
                </TabsTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40 sm:w-48 z-50 bg-background">
                {gouvernanceItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="cursor-pointer text-xs sm:text-sm"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Citoyenneté */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TabsTrigger 
                  value="citoyennete" 
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm data-[state=active]:bg-muted/50"
                >
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Citoyenneté</span>
                  <span className="sm:hidden">Cit</span>
                  <ChevronDown className="h-2 w-2 sm:h-3 sm:w-3" />
                </TabsTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40 sm:w-48 z-50 bg-background">
                {citoyenneteItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="cursor-pointer text-xs sm:text-sm"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            </div>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default SubNavigation;