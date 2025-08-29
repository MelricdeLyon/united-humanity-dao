import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Euro } from "lucide-react";
import { useTerritorialEntities } from "@/hooks/use-territorial";
import type { TerritorialEntity, TerritorialLevel } from "@/types/territorial";

interface TerritorialSelectorProps {
  selectedEntityId?: string;
  onEntitySelect: (entityId: string) => void;
  level?: TerritorialLevel;
}

const levelLabels: Record<TerritorialLevel, string> = {
  commune: "Commune/Ville",
  interco: "Intercommunalité/Agglomération", 
  region: "Région"
};

const levelColors: Record<TerritorialLevel, string> = {
  commune: "bg-green-100 text-green-800",
  interco: "bg-blue-100 text-blue-800",
  region: "bg-purple-100 text-purple-800"
};

export const TerritorialSelector = ({ 
  selectedEntityId, 
  onEntitySelect, 
  level 
}: TerritorialSelectorProps) => {
  const { data: entities = [], isLoading } = useTerritorialEntities();
  
  const filteredEntities = level 
    ? entities.filter(e => e.level === level)
    : entities;

  const selectedEntity = entities.find(e => e.id === selectedEntityId);

  const formatPopulation = (pop?: number) => {
    if (!pop) return "N/A";
    return new Intl.NumberFormat('fr-FR').format(pop);
  };

  const formatBudget = (budget?: number) => {
    if (!budget) return "N/A";
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(budget);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Sélectionner un territoire
            </label>
            <Select value={selectedEntityId} onValueChange={onEntitySelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un territoire..." />
              </SelectTrigger>
              <SelectContent>
                {filteredEntities.map((entity) => (
                  <SelectItem key={entity.id} value={entity.id}>
                    <div className="flex items-center gap-2">
                      <Badge className={levelColors[entity.level]}>
                        {levelLabels[entity.level]}
                      </Badge>
                      <span>{entity.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEntity && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">{selectedEntity.name}</h3>
                <Badge className={levelColors[selectedEntity.level]}>
                  {levelLabels[selectedEntity.level]}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Population:</span>
                  <span className="font-medium">{formatPopulation(selectedEntity.population)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Budget annuel:</span>
                  <span className="font-medium">{formatBudget(selectedEntity.budget_annual)}</span>
                </div>
                
                {selectedEntity.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Adresse:</span>
                    <span className="font-medium truncate">{selectedEntity.address}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};