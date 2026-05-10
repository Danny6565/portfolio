import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import FadeIn from "./components/FadeIn";

export default function Home() {
  return (
    <>
      <Hero />
      <FadeIn>
        <Projects />
      </FadeIn>
      <FadeIn delay={50}>
        <Skills />
      </FadeIn>
      <FadeIn delay={50}>
        <Contact />
      </FadeIn>
    </>
  );
}
