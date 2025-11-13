import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, ArrowRight, AlertCircle, Info, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NewsItem {
  id: string;
  date: string;
  category: "annonce" | "communiqué" | "décision" | "rapport";
  priority: "haute" | "normale" | "info";
  title: string;
  summary: string;
  source: string;
}

const officialNews: NewsItem[] = [
  {
    id: "1",
    date: "2025-03-15",
    category: "annonce",
    priority: "haute",
    title: "Ouverture de la période de nominations pour le Conseil Mondial",
    summary: "Le processus de nomination des nouveaux membres du Conseil Mondial est officiellement ouvert. Les citoyens éligibles peuvent soumettre leur candidature jusqu'au 31 mars 2025.",
    source: "Secrétariat Général"
  },
  {
    id: "2",
    date: "2025-03-12",
    category: "communiqué",
    priority: "normale",
    title: "Publication du rapport trimestriel de transparence",
    summary: "Le rapport de transparence Q1 2025 détaille l'utilisation des fonds publics, les décisions prises et les projets en cours. Consultation publique ouverte pendant 30 jours.",
    source: "Département de la Transparence"
  },
  {
    id: "3",
    date: "2025-03-10",
    category: "décision",
    priority: "haute",
    title: "Adoption de la proposition DAO-2025-047",
    summary: "La proposition concernant l'amélioration du système de vote électronique a été adoptée avec 87% d'approbation. Mise en œuvre prévue pour avril 2025.",
    source: "Conseil de Gouvernance"
  },
  {
    id: "4",
    date: "2025-03-08",
    category: "rapport",
    priority: "info",
    title: "Statistiques de participation citoyenne - Février 2025",
    summary: "Le mois de février enregistre un taux de participation record de 78.5% aux votes, démontrant l'engagement croissant de la communauté.",
    source: "Bureau des Statistiques"
  },
  {
    id: "5",
    date: "2025-03-05",
    category: "communiqué",
    priority: "normale",
    title: "Lancement du programme PERJRC",
    summary: "Le Programme d'Échange Régulier de Jours de Réserves Citoyennes est désormais opérationnel. Les citoyens peuvent effectuer leurs premières transactions.",
    source: "Trésorerie Nationale"
  }
];

const priorityConfig = {
  haute: { variant: "destructive" as const, icon: AlertCircle, label: "Priorité Haute" },
  normale: { variant: "default" as const, icon: Info, label: "Priorité Normale" },
  info: { variant: "secondary" as const, icon: FileText, label: "Information" }
};

const categoryConfig = {
  annonce: { color: "text-primary", label: "Annonce Officielle" },
  communiqué: { color: "text-secondary", label: "Communiqué de Presse" },
  décision: { color: "text-accent", label: "Décision Gouvernementale" },
  rapport: { color: "text-muted-foreground", label: "Rapport Officiel" }
};

const OfficialNews = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Actualités Officielles</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Annonces & Communiqués
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Suivez les dernières annonces gouvernementales, décisions officielles et communiqués de presse institutionnels
          </p>
        </div>

        {/* News Feed */}
        <div className="space-y-4">
          {officialNews.map((news) => {
            const PriorityIcon = priorityConfig[news.priority].icon;
            
            return (
              <Card key={news.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <Badge variant={priorityConfig[news.priority].variant} className="gap-1">
                          <PriorityIcon className="w-3 h-3" />
                          {priorityConfig[news.priority].label}
                        </Badge>
                        <Badge variant="outline" className={categoryConfig[news.category].color}>
                          {categoryConfig[news.category].label}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(news.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl mb-2">{news.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        Source: {news.source}
                      </CardDescription>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 shrink-0"
                      onClick={() => navigate(`/actualites/${news.id}`)}
                    >
                      Lire plus
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground">{news.summary}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate('/actualites')}
          >
            Voir toutes les actualités
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OfficialNews;