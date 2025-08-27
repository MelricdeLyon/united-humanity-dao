import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Vault } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTreasury } from "@/hooks/use-treasury";

const TreasuryButton = () => {
  const navigate = useNavigate();
  const { treasuryData } = useTreasury();

  const formatSupply = (supply?: bigint) => {
    if (!supply) return "500T";
    return `${(Number(supply) / 1e12).toLocaleString()}T`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="relative hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => navigate('/tresor-nation')}
          >
            <Vault className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Trésor de la Nation</span>
            <span className="sm:hidden">Trésor</span>
            <Badge 
              variant="secondary" 
              className="ml-2 px-1.5 py-0 text-xs font-medium"
            >
              {formatSupply(treasuryData?.totalSupply)} JERR
            </Badge>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Économie CydJerr : supply, répartitions, PET</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TreasuryButton;