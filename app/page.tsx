import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PluginsSection from "./components/PluginsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PluginsSection />
      </main>
      <Footer />
    </>
  );
}
