import { ArrowLeft, Shield, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DeclarationDroitsNumeriques() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
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
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-primary uppercase tracking-wider">
              Déclaration des Droits Numériques de l'Être Humain
            </h1>
            <div className="flex justify-center mt-4">
              <Wifi className="h-6 w-6 text-muted-foreground" />
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
                  Nous, êtres humains connectés du monde entier, reconnaissons que la révolution numérique, bien qu'elle offre des opportunités sans précédent (accès généralisé à l'information, innovation collaborative, etc.), a aussi engendré de nouvelles formes d'exploitation, de fracture sociale et de surveillance.
                </p>
                <p>
                  L'ignorance ou la violation des droits fondamentaux dans l'espace numérique est aujourd'hui source de nombreuses injustices et souffrances. Inspirés par la déclaration des droits de l'être humain et du vivant, nous proclamons solennellement les droits numériques de chaque individu et du bien commun.
                </p>
                <p>
                  Nous affirmons que la transformation digitale doit placer « les personnes au centre », et que les technologies doivent servir le bien-être humain et planétaire. En conséquence, nous établissons, dans un esprit d'humanisme numérique, les principes et droits suivants.
                </p>
                <p className="font-medium">
                  Les signataires reconnaissent ces droits comme universels et inaliénables, applicables à tous les habitants du cyberespace.
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
                    La souveraineté numérique appartient à l'humanité tout entière. Aucune autorité – entreprise ou organisation – ne peut exercer un contrôle sur les individus qui n'émane pas de leur consentement éclairé et de la volonté collective. La souveraineté numérique, c'est la capacité de maîtriser les technologies : elle se définit comme « la maîtrise de notre présent et de notre destin... par l'usage des technologies ». Elle implique la liberté d'agir dans le cyberespace et le contrôle de « nos réseaux, nos communications électroniques et nos données ».
                  </p>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 2.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    La finalité de toute organisation numérique (publique ou privée) est la préservation des droits fondamentaux de l'être humain dans l'environnement digital : liberté, dignité, sécurité, accès universel à l'information et aux connaissances, ainsi que le droit à un numérique sain et équilibré. Nul n'est autorisé à altérer ces droits sous couvert de progrès technologique ou d'efficacité économique. Toute innovation doit être mise au service de l'être humain et de la vie.
                  </p>
                </div>

                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 3.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    La liberté sur le réseau consiste à pouvoir tout entreprendre tant que cela ne nuit ni à autrui, ni au bien commun. L'exercice des droits numériques de chaque individu ne peut être limité que dans la mesure strictement nécessaire pour garantir à tous les mêmes droits numériques et assurer le respect mutuel.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-primary/20" />

            {/* Droits fondamentaux dans l'espace numérique */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary border-b border-primary/20 pb-2">
                Droits Fondamentaux dans l'Espace Numérique
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Droit à la connectivité universelle.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Chaque personne a droit à un accès fiable, abordable et de qualité aux réseaux numériques (internet, radio, etc.). L'accès universel à Internet est aujourd'hui de plus en plus considéré comme indispensable à l'exercice des droits de l'homme. Les collectivités et entreprises ont l'obligation d'étendre l'infrastructure et les ressources nécessaires pour que nul ne soit exclu du réseau, quelles que soient sa situation ou ses moyens.
                  </p>
                </div>
                
                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Neutralité du réseau.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    La neutralité d'Internet est garantie : tout trafic d'information doit être traité de manière égale, sans discrimination ni blocage arbitraire. Les opérateurs ne doivent pas établir d'accès « à plusieurs vitesses » favorisant certains contenus au détriment d'autres. Chaque utilisateur final doit pouvoir choisir librement comment utiliser Internet, ce qui protège la diversité des contenus et favorise la liberté d'expression ainsi que le droit d'accès au savoir.
                  </p>
                </div>

                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Droit à la vie privée et aux données personnelles.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    La vie privée est inviolable en ligne. Tout individu a droit à la confidentialité de ses communications et de ses données. Il doit pouvoir utiliser l'Internet avec l'assurance que ses informations personnelles ne seront ni récoltées indûment ni exploitées sans son consentement. La déclaration constate qu'« il est de plus en plus difficile de protéger la vie privée en ligne » et alerte sur la recrudescence de la surveillance de masse (collecte biométrique, reconnaissance faciale, etc.). Par conséquent, tout recueil d'informations doit être transparent, sécurisé et soumis au contrôle citoyen.
                  </p>
                </div>

                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Droit à la sécurité numérique.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Chaque utilisateur a droit à la protection de ses systèmes et de ses données contre toute cyber-attaque, infiltration ou sabotage. Les protocoles de chiffrement, l'authentification et les mises à jour de sécurité doivent être accessibles à tous. Les autorités et les entreprises doivent coopérer pour identifier et neutraliser les menaces informatiques, tout en respectant l'État de droit.
                  </p>
                </div>

                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Droit à l'information et à l'éducation numérique.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Tous ont droit à un accès universel aux connaissances, à l'éducation et à l'information impartiale. Les ressources éducatives et culturelles doivent être partagées librement et encourager le développement de l'esprit critique en ligne. Les technologies numériques doivent promouvoir le savoir collectif. Comme le rappelle l'introduction aux droits numériques, les mêmes droits fondamentaux (liberté d'expression, vie privée, accès à l'information) s'exercent en ligne qu'hors ligne.
                  </p>
                </div>

                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Droit à la liberté d'expression en ligne.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    La liberté d'expression en ligne est pleinement protégée. Nul ne peut être censuré ou puni pour avoir exprimé ses idées dans les espaces numériques, à condition de respecter les droits d'autrui. La Commission africaine des droits de l'homme et l'ONU soulignent que « les mêmes droits que les personnes ont hors ligne doivent être protégés en ligne », notamment le droit à la liberté d'expression. Aucune opinion légitime, respectueuse de l'humanité, ne peut être interdite sur Internet.
                  </p>
                </div>

                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Droit à la déconnexion.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Chacun a le droit de suspendre sa connexion aux outils numériques afin de préserver son équilibre personnel. Le principe du « droit à la déconnexion » assure que nul ne soit contraint à la disponibilité permanente liée aux dispositifs numériques professionnels ou sociaux. Ce droit protège le temps de repos et la sphère privée de toute intrusion numérique.
                  </p>
                </div>

                <div className="border-l-4 border-secondary/30 pl-6">
                  <h3 className="font-semibold text-secondary mb-2">Droit à la non-discrimination numérique.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les technologies ne doivent ni reproduire ni renforcer les discriminations existantes. Les algorithmes, plateformes et services en ligne doivent être conçus pour traiter toutes les personnes équitablement, sans égard à l'origine, au genre, au handicap, à la religion, à l'orientation sexuelle, ou à toute autre caractéristique intrinsèque ou extrinsèque. Chacun a droit à un accès égal aux services numériques, à condition que ceux-ci respectent les principes fondamentaux d'humanité.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-primary/20" />

            {/* Principes de gouvernance numérique */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary border-b border-primary/20 pb-2">
                Principes de Gouvernance Numérique
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-accent/30 pl-6">
                  <h3 className="font-semibold text-accent mb-2">Article 4.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    La gouvernance des réseaux et des données doit être transparente, participative et inclusive. Les protocoles, algorithmes et lois du numérique doivent être ouverts au contrôle public. Les acteurs numériques (citoyens, experts, entreprises, associations) participent à l'élaboration des règles et protocoles selon des modalités adaptées.
                  </p>
                </div>

                <div className="border-l-4 border-accent/30 pl-6">
                  <h3 className="font-semibold text-accent mb-2">Article 5.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les représentants et responsables de la sphère numérique sont choisis pour leur compétence, leur intégrité et leur engagement envers les valeurs humanistiques, non pour des intérêts particuliers. Les processus de nomination (par consensus, tirage au sort informatisé, etc.) garantissent une participation équitable.
                  </p>
                </div>

                <div className="border-l-4 border-accent/30 pl-6">
                  <h3 className="font-semibold text-accent mb-2">Article 6.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Tout individu a le droit de participer, directement ou indirectement, aux décisions qui affectent sa vie numérique : conception des services, gestion des plateformes, régulation des données. Les outils de démocratie numérique (forums publics en ligne, consultations, référendums électroniques sécurisés) favorisent cette implication citoyenne.
                  </p>
                </div>

                <div className="border-l-4 border-accent/30 pl-6">
                  <h3 className="font-semibold text-accent mb-2">Article 7.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les structures de gouvernance numérique respectent le principe de subsidiarité : les décisions doivent être prises au niveau le plus proche possible des utilisateurs concernés, tout en assurant la cohérence et la solidarité globale de l'écosystème digital.
                  </p>
                </div>

                <div className="border-l-4 border-accent/30 pl-6">
                  <h3 className="font-semibold text-accent mb-2">Article 8.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    La société a le droit et le devoir d'exiger des redevabilités permanentes de la part de tout acteur du numérique. Entreprises, organisations et entités publiques doivent rendre compte de leurs actions en ligne. La transparence et l'auditabilité des systèmes sont obligatoires.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-primary/20" />

            {/* Intelligence artificielle et éthique */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary border-b border-primary/20 pb-2">
                Intelligence Artificielle et Éthique
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-destructive/30 pl-6">
                  <h3 className="font-semibold text-destructive mb-2">Article 9.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    L'intelligence artificielle (IA) est un outil qui doit servir le bien de l'humanité. Son usage doit être régi par l'éthique, la transparence et la responsabilité. En particulier, la Recommandation de l'UNESCO sur l'IA affirme que la protection des droits de l'homme repose sur des principes tels que la transparence et l'équité, avec la responsabilité humaine au cœur du contrôle des systèmes d'IA. Tout système d'IA doit fonctionner de manière explicable et sous supervision humaine. Les algorithmes utilisés en public doivent être audités et leurs biais corrigés. Aucune intelligence artificielle ne peut justifier de limiter ou d'affaiblir les droits fondamentaux énoncés ici.
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
                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 10.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Des mécanismes de veille et de médiation seront établis pour assurer l'application effective de cette déclaration. Tout préjudice numérique ou technologique causé aux droits fondamentaux doit être réparé. Le principe est que « le responsable » d'une cyber-atteinte (violation de données, déni de service, manipulation d'information, etc.) assume les conséquences de ses actes. Les dommages causés par la fragmentation des réseaux ou la censure doivent entraîner réparation et rétablissement des droits.
                  </p>
                </div>

                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 11.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    L'éducation à la citoyenneté numérique et à l'éthique technologique est un droit et un devoir universel. Le système éducatif, les médias et les institutions doivent promouvoir une culture du respect mutuel et de l'esprit critique à l'ère digitale.
                  </p>
                </div>

                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 12.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les droits et principes énoncés dans cette déclaration ne peuvent être interprétés comme autorisant quiconque – État, entité ou individu – à se livrer à une activité visant à détruire ou affaiblir ces mêmes droits et libertés numériques.
                  </p>
                </div>

                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 13.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les « communautés numériques locales » (par exemple groupes de développeurs, réseaux communautaires, projets d'open source) ont le droit de préserver et de partager leurs savoir-faire et leurs pratiques traditionnels du numérique. Leur contribution au bien commun doit être protégée et valorisée.
                  </p>
                </div>

                <div className="border-l-4 border-primary/30 pl-6">
                  <h3 className="font-semibold text-primary mb-2">Article 14.</h3>
                  <p className="text-foreground/90 leading-relaxed text-justify">
                    Les différends relatifs à l'interprétation ou à l'application de la présente déclaration seront réglés par des instances de médiation et d'arbitrage numérique, privilégiant toujours le dialogue, la négociation et la recherche de solutions pacifiques.
                  </p>
                </div>
              </div>
            </section>

            {/* Signature finale */}
            <div className="mt-12 pt-8 border-t border-primary/20 text-center">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Shield className="h-12 w-12 text-primary opacity-50" />
                </div>
                <p className="text-lg font-medium text-primary">
                  Déclaration adoptée par l'Organisation de l'Humanité Unie
                </p>
                <p className="text-sm text-muted-foreground">
                  Pour la préservation des droits numériques de l'être humain
                </p>
                <p className="text-xs text-muted-foreground italic">
                  En foi de quoi, les signataires de cette déclaration reconnaissent et proclament solennellement que ces droits numériques sont universels, inaliénables et doivent inspirer toutes les règles et technologies de la société.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}