import { useState } from "react";
import { Send, Loader2, Mail } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_nxaflp9";
const TEMPLATE_ID = "template_1a428is";
const PUBLIC_KEY = "PNWznV4VWb7AZYx9y";

export default function NewsletterSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (sending) return;
    setSending(true);
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        from_name: "Newsletter Subscriber",
        from_email: email,
        message: `New newsletter subscription from: ${email}`,
        to_email: "feysaljeylan67@gmail.com",
      }, PUBLIC_KEY)
      .then(() => {
        toast.success("Subscribed! Thanks for joining.");
        setEmail("");
      })
      .catch(() => {
        toast.error("Subscription failed. Please try again.");
      })
      .finally(() => setSending(false));
  };

  return (
    <section className="py-16">
      <div className="section-container" ref={ref}>
        <div className={`glass-card p-8 sm:p-10 text-center max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Get updates from my journey</h3>
          <p className="text-muted-foreground mb-6">New projects, blog posts, and lessons learned—delivered to your inbox.</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              maxLength={255}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={sending}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-emerald-bright transition-all emerald-glow disabled:opacity-60 whitespace-nowrap"
            >
              {sending ? <><Loader2 size={16} className="animate-spin" /> Subscribing...</> : <><Send size={16} /> Subscribe</>}
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">No spam, unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
