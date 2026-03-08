import { useState } from "react";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Lightbulb, Wrench, BookOpen } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  category: string;
  tech: string[];
  description: string;
  fullDescription: string;
  challenges: string[];
  lessons: string[];
  live?: string;
  liveAlt?: { label: string; url: string };
  github?: string;
  featured?: boolean;
  stats?: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform with Admin Dashboard",
    category: "E-commerce",
    tech: ["HTML5", "CSS3", "JavaScript", "Admin Dashboard", "Analytics", "Inventory Management"],
    description: "Complete e-commerce solution with customer-facing store and comprehensive admin dashboard.",
    fullDescription: "Complete e-commerce solution with customer-facing store and comprehensive admin dashboard featuring order management, product inventory, customer tracking, real-time analytics, and system configuration.",
    challenges: [
      "Building a dual-interface system (store + admin) with shared data architecture",
      "Implementing real-time analytics dashboard with dynamic chart rendering",
      "Creating responsive inventory management with CRUD operations",
    ],
    lessons: [
      "Modular code architecture is essential for large-scale projects",
      "Admin dashboards require careful UX design for data-heavy interfaces",
      "Performance optimization matters when rendering multiple data visualizations",
    ],
    live: "https://feysal-jeylan.github.io/ecommerce-template/",
    liveAlt: { label: "Admin Dashboard", url: "https://feysal-jeylan.github.io/ecommerce-template/admin-dashboard" },
    github: "https://github.com/feysal-jeylan/ecommerce-template",
    featured: true,
  },
  {
    title: "Mela Software Project",
    category: "Tools",
    tech: ["HTML5", "CSS3", "JavaScript", "EdTech", "Responsive"],
    description: "Educational technology platform with AI-powered learning and global community features.",
    fullDescription: "Educational technology platform with AI-powered learning, global community features, and real-time analytics. Serving schools across multiple countries with expert-led content.",
    challenges: [
      "Designing an intuitive interface for diverse user groups (students, teachers, admins)",
      "Building responsive layouts that work across low-bandwidth environments",
      "Implementing accessible navigation for educational content",
    ],
    lessons: [
      "EdTech platforms need extra focus on accessibility and simplicity",
      "User research across different demographics improves UX significantly",
      "Performance optimization is critical for users in developing regions",
    ],
    live: "https://feysal-jeylan.github.io/Mela-Software/",
    github: "https://github.com/feysal-jeylan/Mela-Software-Project",
    stats: [
      { label: "Schools", value: "486" },
      { label: "Countries", value: "50" },
      { label: "Experts", value: "100" },
    ],
  },
  {
    title: "Amazon Clone",
    category: "E-commerce",
    tech: ["HTML5", "CSS3", "JavaScript", "E-commerce"],
    description: "Amazon-inspired clone featuring product listings, cart UI, and authentication flow.",
    fullDescription: "Amazon-inspired clone featuring product listings, cart UI, and authentication flow. Built to understand large-scale e-commerce UI patterns and component architecture.",
    challenges: [
      "Replicating complex Amazon UI components with pure CSS",
      "Building a functional cart system with vanilla JavaScript",
      "Handling multiple product categories and filtering logic",
    ],
    lessons: [
      "Reverse-engineering existing UIs teaches advanced CSS techniques",
      "State management is crucial even in vanilla JS projects",
      "E-commerce UX patterns are transferable across platforms",
    ],
    github: "https://github.com/feysal-jeylan/amazon-clone-ecommerce",
  },
  {
    title: "Calendar Converter",
    category: "Tools",
    tech: ["Python", "Algorithms"],
    description: "Python application displaying Ethiopian, Gregorian, and Julian calendars side-by-side.",
    fullDescription: "Python application that converts between Ethiopian, Gregorian, and Julian calendars. Implements complex calendar algorithms for accurate date conversion across different calendar systems.",
    challenges: [
      "Implementing accurate calendar conversion algorithms",
      "Handling edge cases in date calculations across systems",
      "Building an intuitive interface for comparing three calendar systems",
    ],
    lessons: [
      "Algorithm design requires thorough testing with edge cases",
      "Date/time systems are more complex than they appear",
      "Python's strengths shine in algorithmic problem-solving",
    ],
  },
  {
    title: "First Portfolio",
    category: "Learning",
    tech: ["HTML", "CSS", "Portfolio"],
    description: "My first portfolio website—where the journey began.",
    fullDescription: "My first portfolio website built with pure HTML and CSS. This project marked the beginning of my web development journey and taught me the fundamentals of web design.",
    challenges: [
      "Learning HTML structure and semantic markup from scratch",
      "Understanding CSS positioning and layout systems",
      "Making the site responsive without frameworks",
    ],
    lessons: [
      "Strong fundamentals are the foundation of good development",
      "Every developer starts somewhere—the key is to keep building",
      "Pure HTML/CSS skills remain valuable regardless of frameworks",
    ],
    live: "https://feysal-jeylan.github.io/portfolio/",
    github: "https://github.com/feysal-jeylan/portfolio",
  },
  {
    title: "Mini Projects Collection",
    category: "Learning",
    tech: ["HTML", "CSS", "JavaScript"],
    description: "Various small projects: calculators, to-do apps, landing pages, and UI components.",
    fullDescription: "A collection of smaller projects including calculators, to-do apps, landing pages, and various UI components. Each project focused on mastering specific JavaScript concepts and CSS techniques.",
    challenges: [
      "Implementing different JavaScript patterns across varied projects",
      "Maintaining clean code across multiple small codebases",
      "Balancing learning new concepts while reinforcing fundamentals",
    ],
    lessons: [
      "Building many small projects accelerates learning more than one big project",
      "Each project teaches unique problem-solving approaches",
      "Code organization habits formed early pay dividends later",
    ],
  },
];

const filters = ["All", "E-commerce", "Tools", "Learning"];

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24">
      <div className="section-container" ref={ref}>
        <p className="font-mono text-sm text-primary mb-2">Projects</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
          Featured <span className="gradient-text">Work</span>
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <div
              key={p.title}
              className={`glass-card overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setSelected(p)}
            >
              <div className="h-40 bg-gradient-to-br from-primary/10 to-emerald-bright/5 flex items-center justify-center relative">
                <span className="font-mono text-sm text-primary/60">{p.tech[0]}</span>
                {p.featured && (
                  <span className="absolute top-3 right-3 text-xs font-mono text-primary-foreground bg-primary px-2 py-0.5 rounded">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.description}</p>
                {p.stats && (
                  <div className="flex gap-3 mb-3">
                    {p.stats.map(s => (
                      <div key={s.label} className="text-center">
                        <p className="text-sm font-bold text-primary">{s.value}</p>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">{t}</span>
                  ))}
                  {p.tech.length > 4 && (
                    <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">+{p.tech.length - 4}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10" aria-label="Close">
                <X size={20} />
              </button>

              {selected.featured && (
                <span className="inline-block text-xs font-mono text-primary-foreground bg-primary px-2 py-0.5 rounded mb-3">
                  Most Advanced Project
                </span>
              )}

              <h3 className="text-xl font-bold text-foreground mb-3 pr-8">{selected.title}</h3>
              <p className="text-muted-foreground mb-5">{selected.fullDescription}</p>

              {/* Stats for Mela */}
              {selected.stats && (
                <div className="flex gap-6 mb-5 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  {selected.stats.map(s => (
                    <div key={s.label} className="text-center">
                      <p className="text-2xl font-bold text-primary">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Wrench size={14} className="text-primary" /> Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map(t => <span key={t} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">{t}</span>)}
                </div>
              </div>

              {/* Challenges */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Lightbulb size={14} className="text-primary" /> Challenges & Solutions
                </h4>
                <ul className="space-y-1.5">
                  {selected.challenges.map((c, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary mt-0.5">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lessons */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BookOpen size={14} className="text-primary" /> Lessons Learned
                </h4>
                <ul className="space-y-1.5">
                  {selected.lessons.map((l, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary mt-0.5">•</span> {l}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {selected.live && (
                  <a href={selected.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-emerald-bright transition-colors">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                {selected.liveAlt && (
                  <a href={selected.liveAlt.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/80 text-primary-foreground text-sm font-medium hover:bg-emerald-bright transition-colors">
                    <ExternalLink size={16} /> {selected.liveAlt.label}
                  </a>
                )}
                {selected.github && (
                  <a href={selected.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                    <Github size={16} /> GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
