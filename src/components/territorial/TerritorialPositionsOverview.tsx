import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useTerritorialPositions, useOrganizationalOrgans } from "@/hooks/use-territorial";
import { Users, Crown, Shield, Briefcase, Calendar, Euro, User, UserCheck } from "lucide-react";
import type { TerritorialLevel } from "@/types/territorial";

interface TerritorialPositionsOverviewProps {
  territorialEntityId: string;
  level: TerritorialLevel;
}

const levelPositions = {
  commune: [
    { title: "Maire", count: 1, salary: "2500€/mois", mandate: "6 ans", status: "occupied" },
    { title: "Adjoints au Maire", count: 8, salary: "400€/mois", mandate: "6 ans", status: "partially" },
    { title: "Conseillers Municipaux", count: 29, salary: "200€/mois", mandate: "6 ans", status: "partially" },
    { title: "Directeur Général des Services", count: 1, salary: "4500€/mois", mandate: "Permanent", status: "vacant" },
  ],
  interco: [
    { title: "Président", count: 1, salary: "3200€/mois", mandate: "6 ans", status: "occupied" },
    { title: "Vice-Présidents", count: 12, salary: "600€/mois", mandate: "6 ans", status: "partially" },
    { title: "Conseillers Communautaires", count: 85, salary: "300€/mois", mandate: "6 ans", status: "occupied" },
    { title: "Directeur Général", count: 1, salary: "5500€/mois", mandate: "Permanent", status: "occupied" },
  ],
  region: [
    { title: "Président de Région", count: 1, salary: "5700€/mois", mandate: "6 ans", status: "occupied" },
    { title: "Vice-Présidents", count: 15, salary: "2200€/mois", mandate: "6 ans", status: "occupied" },
    { title: "Conseillers Régionaux", count: 183, salary: "1500€/mois", mandate: "6 ans", status: "partially" },
    { title: "Directeur Général des Services", count: 1, salary: "8000€/mois", mandate: "Permanent", status: "occupied" },
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "occupied": return "bg-green-100 text-green-800";
    case "partially": return "bg-yellow-100 text-yellow-800";
    case "vacant": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "occupied": return "Complet";
    case "partially": return "Partiel";
    case "vacant": return "Vacant";
    default: return "Inconnu";
  }
};

const getOccupancyRate = (status: string) => {
  switch (status) {
    case "occupied": return 100;
    case "partially": return 65;
    case "vacant": return 0;
    default: return 0;
  }
};

export const TerritorialPositionsOverview = ({ territorialEntityId, level }: TerritorialPositionsOverviewProps) => {
  const { data: organs = [] } = useOrganizationalOrgans(territorialEntityId);
  const positions = levelPositions[level] || [];

  const totalPositions = positions.reduce((sum, pos) => sum + pos.count, 0);
  const occupiedPositions = positions.reduce((sum, pos) => {
    const rate = getOccupancyRate(pos.status) / 100;
    return sum + Math.floor(pos.count * rate);
  }, 0);
  const occupancyRate = totalPositions > 0 ? (occupiedPositions / totalPositions) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Structure des Postes de Direction
          </CardTitle>
          <CardDescription>
            Organisation hiérarchique et répartition des responsabilités
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalPositions}</div>
              <div className="text-sm text-muted-foreground">Postes Total</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{occupiedPositions}</div>
              <div className="text-sm text-muted-foreground">Postes Occupés</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">{totalPositions - occupiedPositions}</div>
              <div className="text-sm text-muted-foreground">Postes Vacants</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{Math.round(occupancyRate)}%</div>
              <div className="text-sm text-muted-foreground">Taux d'Occupation</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Taux d'occupation global</span>
              <span>{Math.round(occupancyRate)}%</span>
            </div>
            <Progress value={occupancyRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Positions Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {positions.map((position, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {position.title === "Maire" || position.title.includes("Président") ? (
                    <Crown className="h-4 w-4 text-yellow-600" />
                  ) : position.title.includes("Directeur") ? (
                    <Briefcase className="h-4 w-4 text-purple-600" />
                  ) : (
                    <User className="h-4 w-4 text-blue-600" />
                  )}
                  {position.title}
                </CardTitle>
                <Badge className={getStatusColor(position.status)}>
                  {getStatusText(position.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Nombre de postes</span>
                  </div>
                  <span className="font-medium">{position.count}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Rémunération</span>
                  </div>
                  <span className="font-medium">{position.salary}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Durée mandat</span>
                  </div>
                  <span className="font-medium">{position.mandate}</span>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Taux d'occupation</span>
                    <span>{getOccupancyRate(position.status)}%</span>
                  </div>
                  <Progress value={getOccupancyRate(position.status)} className="h-1" />
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <UserCheck className="h-3 w-3 mr-1" />
                    Voir Titulaires
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Shield className="h-3 w-3 mr-1" />
                    Candidater
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};