import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Users, Gift } from "lucide-react";

const ActivityBonusTab = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full">
          <Target className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold">Bonus d'Activité</h2>
        <p className="text-muted-foreground">
          Récompenses en JRC selon vos interactions au sein de la Nation
        </p>
      </div>

      <Card className="shadow-governance border-blue-200 bg-gradient-to-br from-background to-blue-50/30 dark:to-blue-950/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="mr-3 h-5 w-5 text-blue-600" />
              Allocation Coffre
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
              50 billions JRC
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">50T</p>
              <p className="text-sm text-muted-foreground">JRC alloués</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">Variable</p>
              <p className="text-sm text-muted-foreground">Récompense</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-accent">10%</p>
              <p className="text-sm text-muted-foreground">Part du trésor</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-secondary">Actif</p>
              <p className="text-sm text-muted-foreground">Statut</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityBonusTab;