import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const TeamTab = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-gray-500/10 to-slate-500/10 rounded-full">
          <Users className="h-6 w-6 text-gray-600" />
        </div>
        <h2 className="text-xl font-bold">Équipe CydJerr</h2>
        <p className="text-muted-foreground">
          Allocation transparente pour l'équipe de développement
        </p>
      </div>

      <Card className="shadow-governance border-gray-200 bg-gradient-to-br from-background to-gray-50/30 dark:to-gray-950/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="mr-3 h-5 w-5 text-gray-600" />
              Allocation Équipe
            </div>
            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
              10 billions JERR
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-gray-600">10T</p>
              <p className="text-sm text-muted-foreground">JERR alloués</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">Équipe</p>
              <p className="text-sm text-muted-foreground">Développement</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-accent">2%</p>
              <p className="text-sm text-muted-foreground">Part du trésor</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-2xl font-bold text-secondary">Verrouillé</p>
              <p className="text-sm text-muted-foreground">Statut</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamTab;