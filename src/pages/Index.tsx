import Header from "@/components/Header";
import SubNavigation from "@/components/SubNavigation";
import InstitutionalHero from "@/components/home/InstitutionalHero";
import InstitutionsGrid from "@/components/home/InstitutionsGrid";
import OfficialDeclarations from "@/components/home/OfficialDeclarations";
import GovernanceStats from "@/components/home/GovernanceStats";
import TechnicalOverview from "@/components/TechnicalOverview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation />
      
      <main>
        <InstitutionalHero />
        <GovernanceStats />
        <InstitutionsGrid />
        <OfficialDeclarations />
        <TechnicalOverview />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
