import { About } from "@/components/shared/about";
import { Articles } from "@/components/shared/articals";
import { Contact } from "@/components/shared/contact";
import { Gallery } from "@/components/shared/gallery";
import { Hero } from "@/components/shared/hero";
import { Projects } from "@/components/shared/projects";
import { Skills } from "@/components/shared/skills";

export default function Home() {
  return (
    <div >
  
      <Hero />
      <About />
      <Projects />
      <Gallery />
      <Articles />
      <Skills />
      <Contact />
    </div>
  );
}
