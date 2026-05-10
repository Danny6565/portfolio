export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center px-6 max-w-4xl mx-auto"
    >
      <p className="font-mono text-sm text-[--accent] mb-4">Hi, my name is</p>
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4">
        Danny O&apos;Connor.
      </h1>
      <h2 className="text-3xl sm:text-5xl font-bold text-[--muted] mb-6">
        I build things for the web.
      </h2>
      <p className="max-w-xl text-[--muted] leading-relaxed text-lg">
        I&apos;m a software developer focused on crafting clean, user-friendly
        experiences. I love turning ideas into products that people enjoy using.
      </p>
      <div className="mt-10 flex gap-4 flex-wrap">
        <a
          href="#projects"
          className="px-6 py-3 border border-[--accent] text-[--accent] rounded font-mono text-sm hover:bg-[--accent]/10 transition-colors"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 text-[--muted] font-mono text-sm hover:text-[--foreground] transition-colors"
        >
          Get in touch →
        </a>
      </div>
    </section>
  );
}
