import Header from "@/components/Header";
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
      
      <main>
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
