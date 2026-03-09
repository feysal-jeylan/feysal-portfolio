import { useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  tags: string[] | null;
  published_at: string | null;
  read_time: string | null;
  created_at: string;
};

const fallbackPosts = [
  {
    id: "1",
    title: "Building a Complete Admin Dashboard: My E-Commerce Journey",
    slug: "admin-dashboard-journey",
    content: "How I built order management, inventory tracking, and real-time analytics from scratch using HTML, CSS, and JavaScript.",
    excerpt: "How I built order management, inventory tracking, and real-time analytics from scratch using HTML, CSS, and JavaScript.",
    tags: ["E-Commerce", "Admin Dashboard", "JavaScript"],
    published_at: "2025-03-01",
    read_time: "5 min read",
    created_at: "2025-03-01",
  },
  {
    id: "2",
    title: "Why Mobile-First Development Matters",
    slug: "mobile-first-development",
    content: "Lessons learned from building responsive websites that prioritize the mobile experience from day one.",
    excerpt: "Lessons learned from building responsive websites that prioritize the mobile experience from day one.",
    tags: ["Responsive", "CSS", "Mobile"],
    published_at: "2025-02-15",
    read_time: "4 min read",
    created_at: "2025-02-15",
  },
  {
    id: "3",
    title: "Balancing University and Self-Taught Coding",
    slug: "university-self-taught-coding",
    content: "My journey of studying Business & Information Systems while teaching myself frontend development on the side.",
    excerpt: "My journey of studying Business & Information Systems while teaching myself frontend development on the side.",
    tags: ["Career", "Learning", "University"],
    published_at: "2025-01-20",
    read_time: "5 min read",
    created_at: "2025-01-20",
  },
];

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function BlogSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data && data.length > 0 ? data : fallbackPosts);
        setLoading(false);
      });
  }, []);

  const displayPosts = loading ? fallbackPosts : posts;

  return (
    <section id="blog" className="py-24 bg-secondary/30">
      <div className="section-container" ref={ref}>
        <p className="font-mono text-sm text-primary mb-2">Blog</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
          Latest <span className="gradient-text">Thoughts</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {displayPosts.map((post, i) => (
            <article
              key={post.id}
              className={`glass-card overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
              onClick={() => setSelected(post)}
            >
              <div className="h-32 bg-gradient-to-br from-primary/10 to-emerald-bright/5 flex items-center justify-center">
                <span className="font-mono text-xs text-primary/50">{post.tags?.[0] || "Blog"}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.published_at || post.created_at)}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.read_time}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt || post.content}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags?.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">{t}</span>
                  ))}
                </div>
                <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog post modal */}
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
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Close">
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(selected.published_at || selected.created_at)}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {selected.read_time}</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-4 pr-8">{selected.title}</h2>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selected.tags?.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">{t}</span>
                ))}
              </div>
              <div className="prose prose-sm prose-invert max-w-none">
                <p className="text-muted-foreground whitespace-pre-wrap">{selected.content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
