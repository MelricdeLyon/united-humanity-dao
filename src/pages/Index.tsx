import Header from "@/components/Header";
import SubNavigation from "@/components/SubNavigation";
import HeroSection from "@/components/HeroSection";
import GovernanceDashboard from "@/components/GovernanceDashboard";
import OrganizationStructure from "@/components/OrganizationStructure";
import TechnicalOverview from "@/components/TechnicalOverview";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation />
      
      <main>
        <section className="py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">HUMANITÉ UNIE DAO</h1>
          <p className="text-lg text-muted-foreground">La première Organisation Décentralisée Autonome mondiale</p>
        </section>
        <HeroSection />
        <GovernanceDashboard />
        <OrganizationStructure />
        <TechnicalOverview />
        <Roadmap />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
