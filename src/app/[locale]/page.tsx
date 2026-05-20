import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Nosotros from "@/components/Nosotros";
import Features from "@/components/Features";
import Servicios from "@/components/Servicios";
import ComoFunciona from "@/components/ComoFunciona";
import NecesitasAyuda from "@/components/NecesitasAyuda";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Nosotros />
      <Features />
      <Servicios />
      <ComoFunciona />
      <NecesitasAyuda />
      <Footer />
    </main>
  );
}
