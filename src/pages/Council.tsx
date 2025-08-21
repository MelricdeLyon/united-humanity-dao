import React, { useState, useEffect } from 'react';
import { Users, Crown, Calendar, DollarSign, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

interface CouncilMember {
  id: string;
  position: string;
  department?: string;
  salary_usd_annual?: number;
  term_start: string;
  term_end?: string;
  is_active: boolean;
}

export default function Council() {
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCouncilMembers();
  }, []);

  const fetchCouncilMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('council_members')
        .select('*')
        .eq('is_active', true)
        .order('position');

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching council members:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position.toLowerCase()) {
      case 'président':
      case 'president': return <Crown className="h-5 w-5 text-yellow-500" />;
      case 'secrétaire':
      case 'secretary': return <Users className="h-5 w-5 text-blue-500" />;
      case 'trésorier':
      case 'treasurer': return <DollarSign className="h-5 w-5 text-green-500" />;
      default: return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatSalary = (salary?: number) => {
    if (!salary) return 'Non rémunéré';
    return `$${salary.toLocaleString()}/an`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin text-6xl">👥</div>
          <p className="text-muted-foreground">Chargement du conseil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 rounded-full">
              <Users className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
            Conseil de l'Humanité Unie
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Les dirigeants élus qui guident notre DAO vers un avenir décentralisé et démocratique
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membres Actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{members.length}</div>
              <p className="text-xs text-muted-foreground">Conseillers en fonction</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Départements</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(members.map(m => m.department).filter(Boolean)).size}
              </div>
              <p className="text-xs text-muted-foreground">Secteurs représentés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mandat Moyen</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5</div>
              <p className="text-xs text-muted-foreground">Années d'expérience</p>
            </CardContent>
          </Card>
        </div>

        {/* Council Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 text-white">
                      {member.position.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  {getPositionIcon(member.position)}
                  {member.position}
                </CardTitle>
                {member.department && (
                  <Badge variant="secondary">{member.department}</Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Début de mandat:</span>
                  </div>
                  <p className="text-sm font-medium ml-6">
                    {formatDate(member.term_start)}
                  </p>
                </div>

                {member.term_end && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Fin de mandat:</span>
                    </div>
                    <p className="text-sm font-medium ml-6">
                      {formatDate(member.term_end)}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Rémunération:</span>
                  </div>
                  <p className="text-sm font-medium ml-6">
                    {formatSalary(member.salary_usd_annual)}
                  </p>
                </div>

                <div className="pt-2">
                  <Badge 
                    variant={member.is_active ? "default" : "secondary"}
                    className="w-full justify-center"
                  >
                    {member.is_active ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {members.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun membre du conseil</h3>
              <p className="text-muted-foreground">
                Le conseil sera constitué prochainement par les citoyens de la DAO.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Information Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>À propos du Conseil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-muted-foreground mb-4">
                Le Conseil de l'Humanité Unie est l'organe exécutif de notre DAO, composé de membres élus 
                démocratiquement par les citoyens. Chaque conseiller représente un département spécifique 
                et travaille pour l'avancement de notre vision collective.
              </p>
              <p className="text-muted-foreground">
                Les membres du conseil sont responsables de l'exécution des décisions prises par la communauté, 
                de la gestion opérationnelle de la DAO, et de la représentation de nos intérêts dans 
                l'écosystème décentralisé mondial.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}