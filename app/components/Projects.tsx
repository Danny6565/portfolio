const projects = [
  {
    title: "Brisbane Transit Live",
    description:
      "Real-time interactive map tracking every bus, train, ferry and metro across South East Queensland. Pulls live vehicle positions from TransLink's GTFS-RT feed every 15 seconds and overlays route lines from the static GTFS timetable data.",
    tags: ["Next.js", "TypeScript", "React Leaflet", "GTFS-RT"],
    href: "#",
    repo: "#",
    image: "/projects/brisbane-transit.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="font-mono text-[--accent] text-sm mb-2">02. what i&apos;ve built</h2>
      <h3 className="text-3xl font-bold mb-12">Projects</h3>
      <div className="flex flex-col gap-8">
        {projects.map((p) => (
          <div
            key={p.title}
            className="flex flex-col md:flex-row bg-white/[0.03] backdrop-blur-md border border-white/[0.07] rounded-xl overflow-hidden hover:bg-white/[0.05] hover:border-[--accent]/30 transition-all duration-300 group"
          >
            {/* Preview image */}
            {p.image && (
              <div className="md:w-[58%] overflow-hidden border-b md:border-b-0 md:border-r border-white/[0.07] shrink-0">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col justify-between p-8 flex-1">
              <div>
                <div className="flex justify-between items-start mb-5">
                  <svg
                    className="w-8 h-8 text-[--accent]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <div className="flex gap-3">
                    <a href={p.repo} className="text-[--muted] hover:text-[--foreground] transition-colors" aria-label="GitHub">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                    <a href={p.href} className="text-[--muted] hover:text-[--foreground] transition-colors" aria-label="Live site">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                <h4 className="font-semibold text-xl mb-3 group-hover:text-[--accent] transition-colors">
                  {p.title}
                </h4>
                <p className="text-[--muted] text-sm leading-relaxed">{p.description}</p>
              </div>
              <ul className="flex flex-wrap gap-2 mt-6">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-xs text-[--accent] bg-[--accent]/10 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
