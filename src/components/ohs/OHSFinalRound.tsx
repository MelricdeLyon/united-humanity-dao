import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, AlertCircle } from 'lucide-react';

interface OHSElection {
  id: string;
  title: string;
  current_round: number;
  status: string;
  round_3_start_date: string;
  round_3_end_date: string;
}

interface OHSFinalRoundProps {
  election: OHSElection;
}

const OHSFinalRound: React.FC<OHSFinalRoundProps> = ({ election }) => {
  const isRoundActive = election.status === 'active' && election.current_round === 3;

  return (
    <div className="space-y-6">
      <Card className={`border-2 ${isRoundActive ? 'border-purple-500 bg-purple-50/50' : 'border-muted'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Tour 3 - Vote Final OHS
            {isRoundActive && <Badge className="bg-purple-500">En cours</Badge>}
          </CardTitle>
          <CardDescription>
            Vote démocratique final entre les 3 finalistes sélectionnés pour diriger l'Organisation Humaine de la Santé.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tour 3 - En développement</h3>
            <p className="text-muted-foreground">
              Le vote final sera disponible une fois les finalistes sélectionnés.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OHSFinalRound;