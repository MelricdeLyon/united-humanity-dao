import { ArrowLeft, Scale, Scroll } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DeclarationDroitsVivant() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>

        {/* Document officiel */}
        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader className="text-center bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Scale className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-primary uppercase tracking-wider">
              Déclaration des Droits de l'Être Humain et du Vivant
            </h1>
            <div className="flex justify-center mt-4">
              <Scroll className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardContent className="p-8 lg:p-12 space-y-8">
            {/* Préambule */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary border-b border-primary/20 pb-2 mb-6">
                Préambule
              </h2>
              <div className="text-foreground/90 leading-relaxed space-y-4 text-justify">
                <p>
                  Les êtres conscients du monde entier, considérant que la méconnaissance, l'oubli ou le mépris des droits fondamentaux de l'être humain et du vivant sont les causes principales des souffrances humaines et des catastrophes environnementales, ont résolu d'exposer, dans une déclaration solennelle, les droits inaliénables et sacrés non seulement des êtres humains mais de toutes les formes de vie qui partagent notre planète.
                </p>
                <p>
                  Nous reconnaissons que les systèmes politiques traditionnels, devenus inadaptés aux défis contemporains, ont souvent privilégié les intérêts économiques au détriment du bien-être humain et planétaire. En conséquence, nous proclamons l'avènement d'un nouveau paradigme fondé sur l'Humanétique, un système qui place l'humain et le vivant au centre de toutes les préoccupations.
                </p>
                <p>
                  Cette déclaration, issue du Soulèvement Des Esclaves Modernes et soutenue par une conscience collective émergente, vise à établir les fondements d'une Humanocratie véritable, où chaque voix compte et où les décisions sont prises dans l'intérêt du bien commun et de l'harmonie avec la nature.
                </p>
                <p className="font-medium">
                  En conséquence, les signataires de cette déclaration reconnaissent et proclament solennellement les droits suivants de l'être humain et du vivant.
                </p>
              </div>
            </section>

            <Separator className="bg-primary/20" />

            {/* Principes fondamentaux */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary border-b border-primary/20 pb-2">
                Principes Fondamentaux
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 1.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Tous les êtres humains naissent et demeurent libres, égaux en dignité et en droits. Ils sont doués de conscience et de raison et doivent agir les uns envers les autres dans un esprit de fraternité et de respect mutuel.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 2.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Le but de toute organisation sociale est la préservation des droits naturels et imprescriptibles de l'être humain et du vivant. Ces droits sont la liberté, la dignité, la sûreté, la résistance à l'oppression, et le droit à un environnement sain et équilibré.
                  </p>
                </div>

                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 3.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Le principe de toute souveraineté réside essentiellement dans l'humanité tout entière. Nulle entité, économique ou autre, ne peut exercer d'autorité qui n'émane expressément de la volonté commune exprimée selon des principes humanocratiques.
                  </p>
                </div>

                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 4.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    La liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui ni aux écosystèmes. Ainsi, l'exercice des droits naturels de chaque être humain n'a de bornes que celles qui assurent aux autres membres de la communauté humaine et aux autres espèces vivantes la jouissance de ces mêmes droits.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-primary/20" />

            {/* Droits fondamentaux de l'être humain */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary border-b border-primary/20 pb-2">
                Droits Fondamentaux de l'Être Humain
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Article 5.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Nul ne doit être soumis à l'esclavage moderne sous quelque forme que ce soit, qu'il s'agisse d'exploitation économique, de travail forcé, de manipulation par des systèmes d'information biaisés, ou de détention arbitraire.
                  </p>
                </div>
                
                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Article 6.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Tout être humain a droit à un niveau de vie suffisant pour assurer sa santé, son bien-être et celui de sa famille, notamment pour l'alimentation, l'habillement, le logement, les soins médicaux ainsi que pour les services sociaux nécessaires.
                  </p>
                </div>

                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Article 7.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Tout être humain a droit à l'accès universel aux connaissances, à l'éducation et à l'information non biaisée. Les ressources éducatives doivent favoriser le développement personnel, la conscience critique et le respect du vivant.
                  </p>
                </div>

                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Article 8.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Nul ne peut être inquiété pour ses opinions ou croyances dès lors qu'elles respectent les principes fondamentaux d'humanité et n'incitent pas à la haine ou à la violence envers d'autres êtres humains ou envers le vivant.
                  </p>
                </div>

                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Article 9.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Tout être humain a droit à la protection contre toute forme de discrimination basée sur l'origine, la couleur, le sexe, la langue, la religion, l'opinion, l'orientation sexuelle, l'identité de genre, ou toute autre caractéristique intrinsèque ou extrinsèque.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-primary/20" />

            {/* Droits du vivant */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary border-b border-primary/20 pb-2">
                Droits du Vivant et Relation avec l'Environnement
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-accent/30 pl-6">
                  <h3 className="font-semibold text-accent mb-2">Article 10.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Toutes les formes de vie ont droit au respect de leur intégrité et de leur habitat naturel. La biodiversité est un patrimoine commun de l'humanité qui doit être préservé pour les générations présentes et futures.
                  </p>
                </div>
                
                <div className="border-l-4 border-accent/30 pl-6">
                  <h3 className="font-semibold text-accent mb-2">Article 11.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Tout être humain a le droit et le devoir de vivre en harmonie avec la nature et de contribuer à la protection de l'environnement pour le bien-être de toutes les espèces.
                  </p>
                </div>

                <div className="border-l-4 border-accent/30 pl-6">
                  <h3 className="font-semibold text-accent mb-2">Article 12.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les écosystèmes et les ressources naturelles doivent être gérés de manière durable et équitable, en privilégiant l'intérêt général et le bien commun sur les profits privés.
                  </p>
                </div>

                <div className="border-l-4 border-accent/30 pl-6">
                  <h3 className="font-semibold text-accent mb-2">Article 13.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les animaux, en tant qu'êtres sensibles, ont droit à la protection contre la cruauté, l'exploitation abusive et la souffrance inutile.
                  </p>
                </div>

                <div className="border-l-4 border-accent/30 pl-6">
                  <h3 className="font-semibold text-accent mb-2">Article 14.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Tout être humain a le droit à un environnement sain, à l'air pur, à l'eau potable et à des aliments non contaminés, ainsi qu'à la protection contre les pollutions et les risques environnementaux.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-primary/20" />

            {/* Principes de l'humanocratie */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary border-b border-primary/20 pb-2">
                Principes de l'Humanocratie
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 15.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    L'humanocratie, fondée sur l'humanétique, se caractérise par un système de gouvernance où les décisions sont prises de manière transparente, participative et inclusive, garantissant que chaque voix soit entendue et considérée.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 16.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les processus de nomination et de désignation des représentants se font sur la base des compétences, de l'intégrité et de l'engagement envers les principes humanétiques, plutôt que sur des logiques de pouvoir ou d'intérêts particuliers.
                  </p>
                </div>

                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 17.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Tout être humain a le droit de participer directement ou indirectement aux décisions qui affectent sa vie, sa communauté et son environnement, selon des modalités adaptées à sa situation et à ses capacités.
                  </p>
                </div>

                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 18.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les institutions humanocratiques sont fondées sur le principe de subsidiarité, qui veut que les décisions soient prises au niveau le plus proche possible des personnes concernées, tout en garantissant la cohérence et la solidarité globales.
                  </p>
                </div>

                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 19.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    La société a le droit et le devoir de demander des comptes à tout mandataire ou gestionnaire de la chose commune, dans un esprit de responsabilité et de redevabilité permanente.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-primary/20" />

            {/* Mise en œuvre et garanties */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary border-b border-primary/20 pb-2">
                Mise en Œuvre et Garanties
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-destructive/30 pl-6">
                  <h3 className="font-semibold text-destructive mb-2">Article 20.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Pour assurer la mise en œuvre effective de cette déclaration, sont instituées l'Organisation de l'Humanité Unie (OHU), l'Organisation Humaine de la Santé (OHS) et l'Organisation de la Symbiose Planétaire (OSP), remplaçant respectivement les anciennes structures internationales.
                  </p>
                </div>
                
                <div className="border-l-4 border-destructive/30 pl-6">
                  <h3 className="font-semibold text-destructive mb-2">Article 21.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Toute personne physique ou morale qui cause un dommage à l'environnement ou aux droits fondamentaux est tenue de le réparer et de restaurer l'équilibre rompu, selon le principe que le pollueur ou le responsable du dommage doit en assumer les conséquences.
                  </p>
                </div>

                <div className="border-l-4 border-destructive/30 pl-6">
                  <h3 className="font-semibold text-destructive mb-2">Article 22.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    L'éducation à l'humanétique et à la conscience écologique est un droit et un devoir pour tous les êtres humains, afin de promouvoir une culture du respect mutuel entre humains et envers toutes les formes de vie.
                  </p>
                </div>

                <div className="border-l-4 border-destructive/30 pl-6">
                  <h3 className="font-semibold text-destructive mb-2">Article 23.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les droits et principes énoncés dans la présente déclaration ne peuvent être interprétés comme impliquant pour un État, un groupement ou un individu un droit quelconque de se livrer à une activité ou d'accomplir un acte visant à la destruction des droits et libertés qui y sont énoncés.
                  </p>
                </div>

                <div className="border-l-4 border-destructive/30 pl-6">
                  <h3 className="font-semibold text-destructive mb-2">Article 24.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les communautés autochtones et locales ont le droit de préserver leurs connaissances traditionnelles et leurs pratiques en matière de conservation de la biodiversité et d'utilisation durable des ressources naturelles.
                  </p>
                </div>

                <div className="border-l-4 border-destructive/30 pl-6">
                  <h3 className="font-semibold text-destructive mb-2">Article 25.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les conflits relatifs à l'interprétation et à l'application de cette déclaration seront résolus par des instances de médiation et d'arbitrage humanocratiques, privilégiant toujours les solutions pacifiques et le dialogue.
                  </p>
                </div>
              </div>
            </section>

            {/* Signature finale */}
            <div className="mt-12 pt-8 border-t border-primary/20 text-center">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Scale className="h-12 w-12 text-primary opacity-50" />
                </div>
                <p className="text-lg font-medium text-primary">
                  Déclaration adoptée par l'Humanité Unie
                </p>
                <p className="text-sm text-muted-foreground">
                  Pour la préservation des droits de l'être humain et du vivant
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}