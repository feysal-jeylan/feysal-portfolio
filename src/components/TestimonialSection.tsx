import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

type Testimonial = {
  id: string;
  client_name: string;
  company: string | null;
  role: string | null;
  text: string;
  rating: number;
  photo: string | null;
};

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setTestimonials(data || []);
        setLoaded(true);
      });
  }, []);

  const next = useCallback(() => setCurrent(i => (i + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length), [testimonials.length]);

  useEffect(() => {
    if (paused || testimonials.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next, testimonials.length]);

  useEffect(() => { setCurrent(0); }, [testimonials.length]);

  // Don't render section if no published testimonials
  if (loaded && testimonials.length === 0) return null;
  if (!loaded) return null;

  const t = testimonials[current];

  return (
    <section className="py-24">
      <div className="section-container" ref={ref}>
        <p className="font-mono text-sm text-primary mb-2">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-10">
          What People <span className="gradient-text">Say</span>
        </h2>

        <div
          className="relative max-w-2xl mx-auto transition-all duration-700 opacity-100 translate-y-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass-card p-8 text-center">
            <Quote size={32} className="text-primary/30 mx-auto mb-4" />
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} className="text-primary fill-primary" />
              ))}
            </div>
            <p className="text-muted-foreground text-lg mb-6 min-h-[4.5rem]">"{t.text}"</p>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 overflow-hidden">
              {t.photo ? (
                <img src={t.photo} alt={t.client_name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-primary font-semibold text-lg">{t.client_name[0]}</span>
              )}
            </div>
            <p className="font-semibold text-foreground">{t.client_name}</p>
            <p className="text-sm text-muted-foreground">{t.role}{t.company ? `, ${t.company}` : ""}</p>
          </div>

          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={prev} className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all" aria-label="Previous testimonial">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                    aria-label={`Go to testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all" aria-label="Next testimonial">
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
