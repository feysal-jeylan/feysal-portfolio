import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const posts = [
  {
    title: "Building a Complete Admin Dashboard: My E-Commerce Journey",
    date: "March 2026",
    readTime: "5 min read",
    preview: "How I built order management, inventory tracking, and real-time analytics from scratch using HTML, CSS, and JavaScript.",
    tags: ["E-Commerce", "Admin Dashboard", "JavaScript"],
  },
  {
    title: "Why Mobile-First Development Matters",
    date: "February 2026",
    readTime: "4 min read",
    preview: "Lessons learned from building responsive websites that prioritize the mobile experience from day one.",
    tags: ["Responsive", "CSS", "Mobile"],
  },
  {
    title: "Balancing University and Self-Taught Coding",
    date: "January 2026",
    readTime: "5 min read",
    preview: "My journey of studying Business & Information Systems while teaching myself frontend development on the side.",
    tags: ["Career", "Learning", "University"],
  },
];

export default function BlogSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="blog" className="py-24 bg-secondary/30">
      <div className="section-container" ref={ref}>
        <p className="font-mono text-sm text-primary mb-2">Blog</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
          Latest <span className="gradient-text">Thoughts</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article
              key={post.title}
              className={`glass-card overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="h-32 bg-gradient-to-br from-primary/10 to-emerald-bright/5 flex items-center justify-center">
                <span className="font-mono text-xs text-primary/50">{post.tags[0]}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.preview}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">{t}</span>
                  ))}
                </div>
                <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all cursor-default">
                  Coming Soon <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
