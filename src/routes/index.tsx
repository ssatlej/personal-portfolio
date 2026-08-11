import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ParticleField } from "@/components/ParticleField";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Satlej Sunil — Senior Software Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Satlej Sunil, senior software engineer building fast, elegant and reliable products for the web.",
      },
      { property: "og:title", content: "Satlej Sunil — Senior Software Engineer" },
      {
        property: "og:description",
        content:
          "Portfolio of Satlej Sunil, senior software engineer building fast, elegant and reliable products for the web.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://satlej.com/" },
      { property: "og:image", content: "https://satlej.com/og-image.png" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Satlej Sunil — Senior Software Engineer" },
      {
        name: "twitter:description",
        content:
          "Portfolio of Satlej Sunil, senior software engineer building fast, elegant and reliable products for the web.",
      },
      { name: "twitter:image", content: "https://satlej.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://satlej.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Satlej Sunil",
          url: "https://satlej.com",
          jobTitle: "Senior Software Engineer",
          sameAs: ["https://github.com/ssatlej"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleField />
      <Navbar />
      <main className="relative z-10">
        <Hero />

        <About />

        <Skills />

        <Experience />

        <Projects />

        <Contact />
      </main>

      <footer className="relative z-10 border-t border-border py-10">
        <div className="container-page flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Satlej Sunil</p>
          <p>Designed & built with care.</p>
        </div>
      </footer>
    </div>
  );
}
