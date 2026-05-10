import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarField from "./components/StarField";
import CursorGlow from "./components/CursorGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Danny O'Connor — Portfolio",
  description: "Personal portfolio showcasing my projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[--background] text-[--foreground]">
        {/* Starfield canvas — fixed, behind everything */}
        <StarField />
        <CursorGlow />

        {/* Nebula blobs */}
        <div
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <div
            className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full"
            style={{
              background: "rgba(49,46,129,0.22)",
              filter: "blur(120px)",
            }}
          />
          <div
            className="absolute top-1/2 -left-32 w-[450px] h-[450px] rounded-full"
            style={{
              background: "rgba(7,89,133,0.18)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full"
            style={{
              background: "rgba(6,78,59,0.14)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Nav */}
        <header className="fixed top-0 inset-x-0 z-50 border-b border-[--border] bg-[--background]/80 backdrop-blur-sm">
          <nav className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between">
            <span className="font-mono text-sm text-[--accent]">danny.dev</span>
            <ul className="flex gap-6 text-sm text-[--muted]">
              {["about", "projects", "skills", "contact"].map((s) => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    className="hover:text-[--foreground] transition-colors capitalize"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="flex-1 pt-14 relative z-10">{children}</main>

        <footer className="relative z-10 border-t border-[--border] py-6 text-center text-xs text-[--muted]">
          © {new Date().getFullYear()} Danny O&apos;Connor. Built with Next.js + Tailwind.
        </footer>
      </body>
    </html>
  );
}
