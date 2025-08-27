import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

const TransactionBonusTab = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-full">
          <Zap className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold">Bonus de Transactions</h2>
        <p className="text-muted-foreground">
          Bonus valables uniquement pour les transactions de particuliers à professionnels
        </p>
      </div>

      <Card className="shadow-governance border-purple-200 bg-gradient-to-br from-background to-purple-50/30 dark:to-purple-950/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="mr-3 h-5 w-5 text-purple-600" />
              Allocation Coffre
            </div>
            <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
              50 billions JERR
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">50T</p>
              <p className="text-sm text-muted-foreground">JERR alloués</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">B2C</p>
              <p className="text-sm text-muted-foreground">Uniquement</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-accent">10%</p>
              <p className="text-sm text-muted-foreground">Part du trésor</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-secondary">Bientôt</p>
              <p className="text-sm text-muted-foreground">Disponible</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionBonusTab;