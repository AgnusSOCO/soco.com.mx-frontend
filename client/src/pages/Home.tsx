import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Technologies from "@/components/Technologies";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <Technologies />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

