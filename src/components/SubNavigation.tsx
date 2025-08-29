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
      <div className="container mx-auto px-4">
        <Tabs value={getActiveTab()} className="w-full">
          <TabsList className="h-12 w-full justify-start bg-transparent p-0">
            
            {/* Organisations */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TabsTrigger 
                  value="organisations" 
                  className="flex items-center gap-2 px-6 data-[state=active]:bg-muted/50"
                >
                  <Building2 className="h-4 w-4" />
                  Organisations
                  <ChevronDown className="h-3 w-3" />
                </TabsTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {organisationItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Déclaration des droits de l'être humain et du vivant */}
            <TabsTrigger 
              value="declaration-droits-vivant" 
              className="flex items-center gap-2 px-6 data-[state=active]:bg-muted/50"
              onClick={() => navigate('/declaration-droits-vivant')}
            >
              <Scale className="h-4 w-4" />
              Déclaration des droits de l'être humain et du vivant
            </TabsTrigger>

            {/* Déclaration des droits numériques */}
            <TabsTrigger 
              value="declaration-droits-numeriques" 
              className="flex items-center gap-2 px-6 data-[state=active]:bg-muted/50"
              onClick={() => navigate('/declaration-droits-numeriques')}
            >
              <Shield className="h-4 w-4" />
              Déclaration des droits numériques de l'être humain
            </TabsTrigger>

            {/* Opération Pièces d'Or */}
            <TabsTrigger 
              value="pieces-or" 
              className="flex items-center gap-2 px-6 data-[state=active]:bg-muted/50"
              onClick={() => navigate('/operation-pieces-or')}
            >
              <Coins className="h-4 w-4" />
              Opération Pièces d'Or
            </TabsTrigger>

            {/* Friendly OPA */}
            <TabsTrigger 
              value="friendly-opa" 
              className="flex items-center gap-2 px-6 data-[state=active]:bg-muted/50"
              onClick={() => navigate('/friendly-opa')}
            >
              <Handshake className="h-4 w-4" />
              Friendly OPA
            </TabsTrigger>

            {/* Gouvernance */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TabsTrigger 
                  value="gouvernance" 
                  className="flex items-center gap-2 px-6 data-[state=active]:bg-muted/50"
                >
                  <Vote className="h-4 w-4" />
                  Gouvernance
                  <ChevronDown className="h-3 w-3" />
                </TabsTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {gouvernanceItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="cursor-pointer"
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
                  className="flex items-center gap-2 px-6 data-[state=active]:bg-muted/50"
                >
                  <Users className="h-4 w-4" />
                  Citoyenneté
                  <ChevronDown className="h-3 w-3" />
                </TabsTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {citoyenneteItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default SubNavigation;