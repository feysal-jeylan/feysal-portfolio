import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Award, LayoutDashboard, GraduationCap } from "lucide-react";
import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ target, suffix = "", visible }: { target: number; suffix?: string; visible: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!visible || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, target]);

  return <span>{count}{suffix}</span>;
}

const achievements = [
  { icon: LayoutDashboard, value: 1, suffix: "", label: "Admin Dashboard Built", desc: "Complete e-commerce management system" },
  { icon: Award, value: 6, suffix: "+", label: "Projects Completed", desc: "Frontend & full-stack projects" },
  { icon: GraduationCap, value: 2, suffix: "", label: "Certifications", desc: "Udacity Nanodegree & more" },
  { icon: Award, value: 150, suffix: "+", label: "Hours Learning", desc: "Self-directed study" },
];

export default function AchievementSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-secondary/30">
      <div className="section-container" ref={ref}>
        <p className="font-mono text-sm text-primary mb-2">Achievements</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-10">
          Impact & <span className="gradient-text">Milestones</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {achievements.map((a, i) => (
            <div
              key={a.label}
              className={`glass-card p-6 text-center hover:border-primary/30 transition-all duration-500 hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <a.icon className="mx-auto mb-3 text-primary" size={28} />
              <p className="text-3xl font-bold text-foreground">
                <AnimatedCounter target={a.value} suffix={a.suffix} visible={isVisible} />
              </p>
              <p className="text-sm font-medium text-foreground mt-1">{a.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
