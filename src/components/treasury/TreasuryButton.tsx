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
    if (!supply) return { jerr: "500T JRC", eur: "" };
    const jerrAmount = Number(supply) / 1e12;
    return {
      jerr: `${jerrAmount.toLocaleString()}T JRC`,
      eur: `${(jerrAmount / 100).toLocaleString()}T €`
    };
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
              <div className="text-center">
                <div className="text-sm font-bold">
                  {formatSupply(treasuryData?.totalSupply).jerr}
                </div>
                {formatSupply(treasuryData?.totalSupply).eur && (
                  <div className="text-[10px] opacity-75">
                    {formatSupply(treasuryData?.totalSupply).eur}
                  </div>
                )}
              </div>
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