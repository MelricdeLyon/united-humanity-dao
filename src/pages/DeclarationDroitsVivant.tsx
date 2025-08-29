import { Helmet } from "react-helmet-async";
import DeclarationDroitsVivant from "@/components/DeclarationDroitsVivant";

export default function DeclarationDroitsVivantPage() {
  return (
    <>
      <Helmet>
        <title>Déclaration des Droits de l'Être Humain et du Vivant - Humanité Unie</title>
        <meta name="description" content="Déclaration solennelle des droits inaliénables et sacrés de l'être humain et de toutes les formes de vie, fondée sur les principes de l'Humanétique et de l'Humanocratie." />
        <meta name="keywords" content="déclaration, droits humains, vivant, humanétique, humanocratie, environnement, biodiversité" />
        <link rel="canonical" href="/declaration-droits-vivant" />
      </Helmet>
      <DeclarationDroitsVivant />
    </>
  );
}