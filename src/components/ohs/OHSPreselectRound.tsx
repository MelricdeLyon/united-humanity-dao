import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, AlertCircle } from 'lucide-react';

interface OHSElection {
  id: string;
  title: string;
  current_round: number;
  status: string;
  round_2_start_date: string;
  round_2_end_date: string;
}

interface OHSPreselectRoundProps {
  election: OHSElection;
}

const OHSPreselectRound: React.FC<OHSPreselectRoundProps> = ({ election }) => {
  const isRoundActive = election.status === 'active' && election.current_round === 2;

  return (
    <div className="space-y-6">
      <Card className={`border-2 ${isRoundActive ? 'border-blue-500 bg-blue-50/50' : 'border-muted'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Tour 2 - Présélection & Campagne OHS
            {isRoundActive && <Badge className="bg-blue-500">En cours</Badge>}
          </CardTitle>
          <CardDescription>
            Les candidats les plus nominés présentent leur vision détaillée pour la santé mondiale. 
            Possibilité de pétitions pour ajouter de nouveaux candidats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tour 2 - En développement</h3>
            <p className="text-muted-foreground">
              La phase de présélection et campagne sera disponible prochainement.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OHSPreselectRound;