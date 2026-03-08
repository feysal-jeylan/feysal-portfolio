import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Small Business Owner",
    company: "Freelance Client",
    text: "Feysal delivered a clean, responsive website that exceeded my expectations. His attention to detail and clear communication made the process smooth.",
    rating: 5,
  },
  {
    name: "Ahmed K.",
    role: "Project Manager",
    company: "Tech Startup",
    text: "Great work on the e-commerce frontend. The admin dashboard was well-organized and intuitive. Would definitely recommend for web development projects.",
    rating: 5,
  },
  {
    name: "Liya T.",
    role: "Fellow Developer",
    company: "University Peer",
    text: "Feysal's code is exceptionally clean and well-documented. He combines technical skills with strong business understanding—a rare combination.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const next = useCallback(() => setCurrent(i => (i + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="py-24">
      <div className="section-container" ref={ref}>
        <p className="font-mono text-sm text-primary mb-2">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-10">
          What People <span className="gradient-text">Say</span>
        </h2>

        <div
          className={`relative max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass-card p-8 text-center">
            <Quote size={32} className="text-primary/30 mx-auto mb-4" />

            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={16} className="text-primary fill-primary" />
              ))}
            </div>

            <p className="text-muted-foreground text-lg mb-6 min-h-[4.5rem]">"{testimonials[current].text}"</p>

            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-semibold text-lg">{testimonials[current].name[0]}</span>
            </div>
            <p className="font-semibold text-foreground">{testimonials[current].name}</p>
            <p className="text-sm text-muted-foreground">{testimonials[current].role}, {testimonials[current].company}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all" aria-label="Previous testimonial">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all" aria-label="Next testimonial">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
