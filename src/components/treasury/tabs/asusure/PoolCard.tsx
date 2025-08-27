import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Home, Heart, TrendingUp, Users, Wallet } from "lucide-react";

interface PoolData {
  id: string;
  name: string;
  description: string;
  icon: string;
  deposit: number;
  participants: number;
  totalFunds: number;
  monthlyClaimsJRC: number;
  averageContribution: number;
  color: string;
}

interface PoolCardProps {
  pool: PoolData;
}

const PoolCard = ({ pool }: PoolCardProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="h-6 w-6" />;
      case 'Home':
        return <Home className="h-6 w-6" />;
      case 'Heart':
        return <Heart className="h-6 w-6" />;
      default:
        return <Wallet className="h-6 w-6" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          iconBg: 'bg-blue-500/10',
          iconColor: 'text-blue-600',
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-700',
          badgeBorder: 'border-blue-300'
        };
      case 'green':
        return {
          iconBg: 'bg-green-500/10',
          iconColor: 'text-green-600',
          badgeBg: 'bg-green-100',
          badgeText: 'text-green-700',
          badgeBorder: 'border-green-300'
        };
      case 'red':
        return {
          iconBg: 'bg-red-500/10',
          iconColor: 'text-red-600',
          badgeBg: 'bg-red-100',
          badgeText: 'text-red-700',
          badgeBorder: 'border-red-300'
        };
      default:
        return {
          iconBg: 'bg-primary/10',
          iconColor: 'text-primary',
          badgeBg: 'bg-primary/10',
          badgeText: 'text-primary',
          badgeBorder: 'border-primary/30'
        };
    }
  };

  const colors = getColorClasses(pool.color);

  return (
    <Card className="hover:shadow-governance transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 ${colors.iconBg} rounded-lg`}>
              <div className={colors.iconColor}>
                {getIcon(pool.icon)}
              </div>
            </div>
            <div>
              <CardTitle className="text-lg">{pool.name}</CardTitle>
              <CardDescription>{pool.description}</CardDescription>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`${colors.badgeBg} ${colors.badgeText} ${colors.badgeBorder}`}
          >
            {pool.deposit} JRC
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Métriques du pool */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Users className="h-4 w-4 text-primary mr-1" />
            </div>
            <p className="text-lg font-bold text-primary">{pool.participants.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Participants</p>
          </div>
          
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Wallet className="h-4 w-4 text-secondary mr-1" />
            </div>
            <p className="text-lg font-bold text-secondary">{(pool.totalFunds / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground">JRC Fonds</p>
          </div>
        </div>

        {/* Sinistralité du mois */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sinistres ce mois</span>
            <span className="font-medium">{pool.monthlyClaimsJRC.toLocaleString()} JRC</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Quote-part individuelle</span>
            <span className="font-bold text-accent">{pool.averageContribution.toFixed(1)} JRC</span>
          </div>
        </div>

        {/* Avantage de la taille */}
        <div className="p-3 bg-success/5 rounded-lg">
          <div className="flex items-center text-xs text-success mb-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            Effet de mutualisation
          </div>
          <p className="text-xs text-muted-foreground">
            Un sinistre de 10,000 JRC = seulement {(10000 / pool.participants).toFixed(1)} JRC par personne
          </p>
        </div>

        {/* Exemples de couverture */}
        <div className="text-xs text-muted-foreground space-y-1">
          {pool.id === 'automobile' && (
            <>
              <p>• Accidents, vol, incendie véhicule</p>
              <p>• Responsabilité civile conducteur</p>
              <p>• Tous types de véhicules</p>
            </>
          )}
          {pool.id === 'habitation' && (
            <>
              <p>• Incendie, dégâts des eaux, vol</p>
              <p>• Catastrophes naturelles</p>
              <p>• Responsabilité civile habitat</p>
            </>
          )}
          {pool.id === 'sante' && (
            <>
              <p>• Frais médicaux imprévus</p>
              <p>• Hospitalisation, chirurgie</p>
              <p>• Incapacité, invalidité</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PoolCard;