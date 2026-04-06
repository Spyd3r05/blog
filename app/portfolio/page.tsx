import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { HeroPortfolio } from "@/components/HeroPortfolio";

const Portfolio = () => {
  return (
    <div className="bg-background text-on-background font-body selection:bg-secondary-container selection:text-on-secondary-container">
      <div className="fixed inset-0 paper-grain z-60"></div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-20">
        <HeroPortfolio />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
