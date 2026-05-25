import React, { useEffect } from "react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import SelectedWork from "@/components/site/SelectedWork";
import AIProjects from "@/components/site/AIProjects";
import Experience from "@/components/site/Experience";
import Philosophy from "@/components/site/Philosophy";
import Skills from "@/components/site/Skills";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import ChatWidget from "@/components/site/ChatWidget";
import ScrollProgress from "@/components/site/ScrollProgress";

export default function Home() {
  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)]" data-testid="home-page">
      <ScrollProgress />
      <Nav />
      <Hero />
      <div className="hairline" />
      <About />
      <div className="hairline" />
      <SelectedWork />
      <div className="hairline" />
      <AIProjects />
      <div className="hairline" />
      <Experience />
      <div className="hairline" />
      <Philosophy />
      <div className="hairline" />
      <Skills />
      <div className="hairline" />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}
