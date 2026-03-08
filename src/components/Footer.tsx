import { Github, Linkedin, Mail, ExternalLink, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/feysal-jeylan", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/feysal-jeylan", label: "LinkedIn" },
  { icon: ExternalLink, href: "https://upwork.com/freelancers/~01cad10ded435b78f3", label: "Upwork" },
  { icon: Mail, href: "mailto:feysaljeylan67@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="text-center md:text-left">
            <p className="font-mono text-lg font-semibold text-foreground">Feysal Jeylan</p>
            <p className="text-sm text-muted-foreground">Frontend Developer</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</a>
            ))}
          </nav>

          <div className="flex gap-3">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">© 2026 Feysal Jeylan. Built with HTML · CSS · JavaScript</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
