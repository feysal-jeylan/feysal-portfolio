import { useState } from "react";
import { Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_nxaflp9";
const TEMPLATE_ID = "template_1a428is";
const PUBLIC_KEY = "PNWznV4VWb7AZYx9y";

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.length > 1000) e.message = "Max 1000 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || sending) return;
    setSending(true);
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_email: "feysaljeylan67@gmail.com",
      }, PUBLIC_KEY)
      .then(() => {
        toast.success("Message sent! I'll respond within 24 hours.");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        toast.error("Failed to send. Please email me directly.");
      })
      .finally(() => setSending(false));
  };

  return (
    <section id="contact" className="py-24">
      <div className="section-container" ref={ref}>
        <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Left */}
          <div>
            <p className="font-mono text-sm text-primary mb-2">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10"><Mail size={20} className="text-primary" /></div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:feysaljeylan67@gmail.com" className="text-foreground hover:text-primary transition-colors text-sm">feysaljeylan67@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10"><MapPin size={20} className="text-primary" /></div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground text-sm">Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10"><Clock size={20} className="text-primary" /></div>
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-foreground text-sm">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input
                id="name"
                type="text"
                maxLength={100}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="Your name"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                maxLength={255}
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                id="message"
                rows={5}
                maxLength={1000}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-emerald-bright transition-all emerald-glow disabled:opacity-60"
            >
              {sending ? (<><Loader2 size={16} className="animate-spin" /> Sending...</>) : (<>Send Message <Send size={16} /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
