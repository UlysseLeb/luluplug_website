import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PluginsSection from "./components/PluginsSection";
import About from "./components/About";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PluginsSection />
        <About />
      </main>
      <Marquee />
      <Footer />
    </>
  );
}
