import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface OHSElection {
  id: string;
  current_round: number;
  status: string;
  round_1_start_date: string;
  round_1_end_date: string;
  round_2_start_date: string;
  round_2_end_date: string;
  round_3_start_date: string;
  round_3_end_date: string;
}

interface OHSElectionTimelineProps {
  election: OHSElection;
}

const OHSElectionTimeline: React.FC<OHSElectionTimelineProps> = ({ election }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const diff = end - now;
    
    if (diff <= 0) return "Terminé";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}j ${hours}h restantes`;
    return `${hours}h restantes`;
  };

  const getRoundStatus = (roundNumber: number) => {
    if (election.status === 'completed') return 'completed';
    if (election.current_round > roundNumber) return 'completed';
    if (election.current_round === roundNumber && election.status === 'active') return 'active';
    return 'upcoming';
  };

  const getRoundIcon = (roundNumber: number) => {
    const status = getRoundStatus(roundNumber);
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'active':
        return <Circle className="h-5 w-5 text-blue-500 animate-pulse" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getCurrentRoundEndDate = () => {
    switch (election.current_round) {
      case 1:
        return election.round_1_end_date;
      case 2:
        return election.round_2_end_date;
      case 3:
        return election.round_3_end_date;
      default:
        return '';
    }
  };

  const getOverallProgress = () => {
    if (election.status === 'completed') return 100;
    if (election.status === 'upcoming') return 0;
    return (election.current_round / 3) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Barre de progression globale */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Progression de la nomination</span>
          <span className="text-muted-foreground">
            {election.status === 'active' && `Tour ${election.current_round}/3`}
            {election.status === 'completed' && 'Terminé'}
            {election.status === 'upcoming' && 'À venir'}
          </span>
        </div>
        <Progress value={getOverallProgress()} className="h-3" />
        {election.status === 'active' && (
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Tour en cours: {election.current_round}</span>
            <span>{getTimeRemaining(getCurrentRoundEndDate())}</span>
          </div>
        )}
      </div>

      {/* Timeline des tours */}
      <div className="grid gap-4">
        {/* Tour 1 */}
        <div className="flex items-center gap-4 p-4 rounded-lg border">
          <div className="flex-shrink-0">
            {getRoundIcon(1)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">Tour 1 - Nominations Libres</h4>
              <Badge variant={getRoundStatus(1) === 'active' ? 'default' : 'secondary'}>
                {getRoundStatus(1) === 'active' && 'En cours'}
                {getRoundStatus(1) === 'completed' && 'Terminé'}
                {getRoundStatus(1) === 'upcoming' && 'À venir'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Chaque citoyen peut nominer librement un expert en santé de son choix
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Début: {formatDate(election.round_1_start_date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Fin: {formatDate(election.round_1_end_date)}</span>
              </div>
              {getRoundStatus(1) === 'active' && (
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{getTimeRemaining(election.round_1_end_date)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tour 2 */}
        <div className="flex items-center gap-4 p-4 rounded-lg border">
          <div className="flex-shrink-0">
            {getRoundIcon(2)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">Tour 2 - Présélection & Campagne</h4>
              <Badge variant={getRoundStatus(2) === 'active' ? 'default' : 'secondary'}>
                {getRoundStatus(2) === 'active' && 'En cours'}
                {getRoundStatus(2) === 'completed' && 'Terminé'}
                {getRoundStatus(2) === 'upcoming' && 'À venir'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Les plus nominés présentent leur vision pour la santé mondiale, pétitions possibles
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Début: {formatDate(election.round_2_start_date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Fin: {formatDate(election.round_2_end_date)}</span>
              </div>
              {getRoundStatus(2) === 'active' && (
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{getTimeRemaining(election.round_2_end_date)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tour 3 */}
        <div className="flex items-center gap-4 p-4 rounded-lg border">
          <div className="flex-shrink-0">
            {getRoundIcon(3)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">Tour 3 - Vote Final</h4>
              <Badge variant={getRoundStatus(3) === 'active' ? 'default' : 'secondary'}>
                {getRoundStatus(3) === 'active' && 'En cours'}
                {getRoundStatus(3) === 'completed' && 'Terminé'}
                {getRoundStatus(3) === 'upcoming' && 'À venir'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Vote démocratique final entre les 3 finalistes sélectionnés
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Début: {formatDate(election.round_3_start_date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Fin: {formatDate(election.round_3_end_date)}</span>
              </div>
              {getRoundStatus(3) === 'active' && (
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{getTimeRemaining(election.round_3_end_date)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OHSElectionTimeline;