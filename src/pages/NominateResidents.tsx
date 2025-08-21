import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResidentNominationForm } from "@/components/ResidentNominationForm";
import { EligiblePoolViewer } from "@/components/EligiblePoolViewer";
import { Users, Award, Heart, Globe, Shield, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NominateResidents() {
  const navigate = useNavigate();
  const [activeOrg, setActiveOrg] = useState<'osp' | 'ohu' | 'ohs'>('osp');
  const [refreshPool, setRefreshPool] = useState(0);

  const organizations = [
    {
      id: 'osp' as const,
      name: 'Organisation de la Symbiose Planétaire',
      shortName: 'OSP',
      icon: Globe,
      color: 'bg-green-500',
      description: 'Gouvernance écologique et symbiose planétaire',
      focus: 'Climat, environnement et développement durable'
    },
    {
      id: 'ohu' as const,
      name: 'Organisation de l\'Humanité Unie',
      shortName: 'OHU',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Droits humains et justice sociale',
      focus: 'Égalité, justice et droits fondamentaux'
    },
    {
      id: 'ohs' as const,
      name: 'Organisation Humaine de la Santé',
      shortName: 'OHS',
      icon: Stethoscope,
      color: 'bg-red-500',
      description: 'Santé publique et innovation médicale',
      focus: 'Médecine, recherche et bien-être'
    }
  ];

  const handleNominationSubmitted = () => {
    setRefreshPool(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-primary to-primary-foreground text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nomination d'Habitants
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Identifiez et nominés les talents de notre communauté pour les tirages au sort démocratiques
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Heart className="h-3 w-3 mr-1" />
                Humanocratie
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Award className="h-3 w-3 mr-1" />
                Tirage au sort
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Transparence totale
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Sélection d'organisation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {organizations.map((org) => {
            const IconComponent = org.icon;
            const isActive = activeOrg === org.id;
            
            return (
              <Card 
                key={org.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setActiveOrg(org.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${org.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{org.shortName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {isActive ? 'Sélectionné' : 'Cliquer pour sélectionner'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-2">{org.description}</p>
                  <p className="text-xs text-muted-foreground">{org.focus}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contenu principal */}
        <Tabs defaultValue="nominate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nominate">Nominer</TabsTrigger>
            <TabsTrigger value="pool">Pool d'Éligibles</TabsTrigger>
            <TabsTrigger value="process">Processus</TabsTrigger>
          </TabsList>

          <TabsContent value="nominate" className="space-y-6">
            <ResidentNominationForm 
              organizationType={activeOrg}
              onNominationSubmitted={handleNominationSubmitted}
            />
          </TabsContent>

          <TabsContent value="pool" className="space-y-6">
            <EligiblePoolViewer 
              organizationType={activeOrg}
              key={`${activeOrg}-${refreshPool}`}
            />
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comment fonctionne la nomination d'habitants ?</CardTitle>
                <CardDescription>
                  Le processus démocratique de sélection des Humanéticiens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center space-y-2">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full inline-block">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold">1. Nomination</h3>
                    <p className="text-sm text-muted-foreground">
                      Les habitants nominent d'autres habitants qu'ils jugent compétents
                    </p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full inline-block">
                      <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold">2. Validation</h3>
                    <p className="text-sm text-muted-foreground">
                      Les nominations sont validées par la communauté selon des critères transparents
                    </p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full inline-block">
                      <Heart className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="font-semibold">3. Pool d'éligibles</h3>
                    <p className="text-sm text-muted-foreground">
                      Les personnes validées intègrent le pool pour le tirage au sort
                    </p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full inline-block">
                      <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold">4. Tirage au sort</h3>
                    <p className="text-sm text-muted-foreground">
                      Sélection transparente et vérifiable des Humanéticiens
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Principes fondamentaux :</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span><strong>Transparence totale :</strong> Tous les processus sont publics et vérifiables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span><strong>Égalité des chances :</strong> Chaque habitant peut nominer et être nominé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span><strong>Méritocratie participative :</strong> Les compétences sont reconnues par les pairs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span><strong>Blockchain et traçabilité :</strong> Chaque étape est enregistrée et vérifiable</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button onClick={() => navigate('/random-selection')} variant="outline">
                    Voir les tirages au sort
                  </Button>
                  <Button onClick={() => navigate('/governance')} variant="outline">
                    Gouvernance générale
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}