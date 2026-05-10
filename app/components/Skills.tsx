const categories = [
  {
    name: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML / CSS"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "PostgreSQL", "REST APIs", "GraphQL"],
  },
  {
    name: "Tools",
    skills: ["Git", "Docker", "Vercel", "Linux"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="font-mono text-[--accent] text-sm mb-2">03. what i use</h2>
      <h3 className="text-3xl font-bold mb-12">Skills</h3>
      <div className="grid gap-8 sm:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat.name}>
            <h4 className="font-mono text-xs text-[--muted] uppercase tracking-widest mb-4">
              {cat.name}
            </h4>
            <ul className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <li
                  key={skill}
                  className="px-3 py-1.5 border border-[--border] rounded text-sm hover:border-[--accent]/50 hover:text-[--accent] transition-colors cursor-default"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
