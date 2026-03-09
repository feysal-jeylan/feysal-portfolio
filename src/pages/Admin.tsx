import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2, LogOut, Eye, EyeOff, ArrowLeft, Download, Star } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  tags: string[] | null;
  featured_image: string | null;
  published: boolean;
  published_at: string | null;
  read_time: string | null;
  created_at: string;
};

type Testimonial = {
  id: string;
  client_name: string;
  company: string | null;
  role: string | null;
  text: string;
  rating: number;
  photo: string | null;
  published: boolean;
  featured: boolean;
  received_date: string | null;
  created_at: string;
};

function LoginForm({ onLogin }: { onLogin: (e: string, p: string) => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glass-card p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-foreground mb-1">Admin Login</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in to manage your content</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-emerald-bright transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : null} Sign In
          </button>
        </form>
        <Link to="/" className="text-xs text-muted-foreground hover:text-primary mt-4 block text-center">← Back to site</Link>
      </div>
    </div>
  );
}

function BlogForm({ post, onSave, onCancel }: { post?: BlogPost | null; onSave: () => void; onCancel: () => void }) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [tags, setTags] = useState(post?.tags?.join(", ") || "");
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "");
  const [readTime, setReadTime] = useState(post?.read_time || "5 min read");
  const [published, setPublished] = useState(post?.published || false);
  const [publishedAt, setPublishedAt] = useState(post?.published_at?.split("T")[0] || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      content,
      excerpt: excerpt || null,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      featured_image: featuredImage || null,
      read_time: readTime,
      published,
      published_at: publishedAt || (published ? new Date().toISOString() : null),
    };

    const { error } = post
      ? await supabase.from("blog_posts").update(data).eq("id", post.id)
      : await supabase.from("blog_posts").insert(data);

    if (error) toast.error(error.message);
    else { toast.success(post ? "Post updated!" : "Post created!"); onSave(); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug (auto-generated)"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <input value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Excerpt / Preview text"
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" rows={8}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" />
      <div className="grid sm:grid-cols-4 gap-4">
        <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma-separated)"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} placeholder="Featured image URL"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input value={readTime} onChange={e => setReadTime(e.target.value)} placeholder="Read time"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input type="date" value={publishedAt} onChange={e => setPublishedAt(e.target.value)} placeholder="Publish date"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
        <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="rounded border-border" />
        Published (visible on live site)
      </label>
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-emerald-bright transition-colors disabled:opacity-60 flex items-center gap-2">
          {saving ? <Loader2 size={14} className="animate-spin" /> : null} {post ? "Update" : "Create"} Post
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg border border-border text-foreground text-sm hover:bg-secondary transition-colors">Cancel</button>
      </div>
    </form>
  );
}

function TestimonialForm({ testimonial, onSave, onCancel }: { testimonial?: Testimonial | null; onSave: () => void; onCancel: () => void }) {
  const [clientName, setClientName] = useState(testimonial?.client_name || "");
  const [company, setCompany] = useState(testimonial?.company || "");
  const [role, setRole] = useState(testimonial?.role || "");
  const [text, setText] = useState(testimonial?.text || "");
  const [rating, setRating] = useState(testimonial?.rating || 5);
  const [photo, setPhoto] = useState(testimonial?.photo || "");
  const [published, setPublished] = useState(testimonial?.published || false);
  const [featured, setFeatured] = useState(testimonial?.featured || false);
  const [receivedDate, setReceivedDate] = useState(testimonial?.received_date || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data: Record<string, unknown> = {
      client_name: clientName,
      company: company || null,
      role: role || null,
      text,
      rating,
      photo: photo || null,
      published,
    };
    // Add new columns - these may not be in generated types yet
    (data as any).featured = featured;
    (data as any).received_date = receivedDate || null;

    const { error } = testimonial
      ? await supabase.from("testimonials").update(data as any).eq("id", testimonial.id)
      : await supabase.from("testimonials").insert(data as any);

    if (error) toast.error(error.message);
    else { toast.success(testimonial ? "Testimonial updated!" : "Testimonial created!"); onSave(); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client Name" required
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role / Job Title"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Testimonial text" rows={3} required
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" />
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} type="button" onClick={() => setRating(n)}
                className={`p-1 transition-colors ${n <= rating ? "text-primary" : "text-muted-foreground/30"}`}>
                <Star size={20} className={n <= rating ? "fill-primary" : ""} />
              </button>
            ))}
          </div>
        </div>
        <input value={photo} onChange={e => setPhoto(e.target.value)} placeholder="Photo URL"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input type="date" value={receivedDate} onChange={e => setReceivedDate(e.target.value)} placeholder="Date received"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="rounded border-border" />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="rounded border-border" />
          Featured
        </label>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-emerald-bright transition-colors disabled:opacity-60 flex items-center gap-2">
          {saving ? <Loader2 size={14} className="animate-spin" /> : null} {testimonial ? "Update" : "Create"} Testimonial
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg border border-border text-foreground text-sm hover:bg-secondary transition-colors">Cancel</button>
      </div>
    </form>
  );
}

function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const ADMIN_EMAIL = "feysaljeylan67@gmail.com";

export default function Admin() {
  const { user, loading, signIn, signOut } = useAuth();
  const [tab, setTab] = useState<"blog" | "testimonials">("blog");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null | undefined>(undefined);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null | undefined>(undefined);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setTestimonials((data as any[]) || []);
  };

  useEffect(() => {
    if (!user) return;
    Promise.all([fetchPosts(), fetchTestimonials()]).then(() => setDataLoading(false));
  }, [user]);

  const deletePost = async (id: string) => {
    if (!confirm("Delete this blog post permanently?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("Post deleted");
    fetchPosts();
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial permanently?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    toast.success("Testimonial deleted");
    fetchTestimonials();
  };

  const togglePublish = async (table: "blog_posts" | "testimonials", id: string, current: boolean) => {
    await supabase.from(table).update({ published: !current } as any).eq("id", id);
    toast.success(!current ? "Published!" : "Unpublished");
    table === "blog_posts" ? fetchPosts() : fetchTestimonials();
  };

  const handleBackup = () => {
    const date = new Date().toISOString().split("T")[0];
    const backup = { blog_posts: posts, testimonials, exported_at: new Date().toISOString() };
    downloadJSON(backup, `backup-${date}.json`);
    toast.success("Backup downloaded!");
  };

  const handleLogin = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    if (error) toast.error(error.message);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!user) return <LoginForm onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="section-container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors"><ArrowLeft size={18} /></Link>
            <h1 className="font-mono text-lg font-semibold text-foreground">CMS Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleBackup}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted-foreground text-xs hover:text-primary hover:border-primary/40 transition-all">
              <Download size={14} /> Backup Data
            </button>
            <span className="text-xs text-muted-foreground hidden sm:inline">{user.email}</span>
            <button onClick={() => signOut()} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Sign out">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="section-container py-8">
        <div className="flex gap-2 mb-8">
          <button onClick={() => setTab("blog")}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${tab === "blog" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            Blog Posts ({posts.length})
          </button>
          <button onClick={() => setTab("testimonials")}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${tab === "testimonials" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            Testimonials ({testimonials.length})
          </button>
        </div>

        {dataLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={24} /></div>
        ) : tab === "blog" ? (
          <div>
            {editingPost !== undefined ? (
              <div className="glass-card p-6 mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">{editingPost ? "Edit Post" : "New Post"}</h2>
                <BlogForm post={editingPost} onSave={() => { setEditingPost(undefined); fetchPosts(); }} onCancel={() => setEditingPost(undefined)} />
              </div>
            ) : (
              <button onClick={() => setEditingPost(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-emerald-bright transition-colors mb-6">
                <Plus size={16} /> New Post
              </button>
            )}

            <div className="space-y-3">
              {posts.map(p => (
                <div key={p.id} className="glass-card p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground truncate">{p.title}</h3>
                      {p.published ? (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary flex items-center gap-1"><Eye size={10} /> Live</span>
                      ) : (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground flex items-center gap-1"><EyeOff size={10} /> Draft</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{p.published_at ? new Date(p.published_at).toLocaleDateString() : new Date(p.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => togglePublish("blog_posts", p.id, p.published)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" title={p.published ? "Unpublish" : "Publish"}>
                      {p.published ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button onClick={() => setEditingPost(p)} className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"><Pencil size={14} /></button>
                    <button onClick={() => deletePost(p.id)} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No blog posts yet. Create your first one!</p>}
            </div>
          </div>
        ) : (
          <div>
            {editingTestimonial !== undefined ? (
              <div className="glass-card p-6 mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">{editingTestimonial ? "Edit Testimonial" : "New Testimonial"}</h2>
                <TestimonialForm testimonial={editingTestimonial} onSave={() => { setEditingTestimonial(undefined); fetchTestimonials(); }} onCancel={() => setEditingTestimonial(undefined)} />
              </div>
            ) : (
              <button onClick={() => setEditingTestimonial(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-emerald-bright transition-colors mb-6">
                <Plus size={16} /> New Testimonial
              </button>
            )}

            <div className="space-y-3">
              {testimonials.map(t => (
                <div key={t.id} className="glass-card p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground truncate">{t.client_name}</h3>
                      <span className="text-xs text-muted-foreground">{t.company}</span>
                      {t.published ? (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary flex items-center gap-1"><Eye size={10} /> Live</span>
                      ) : (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground flex items-center gap-1"><EyeOff size={10} /> Draft</span>
                      )}
                      {t.featured && <span className="text-xs px-1.5 py-0.5 rounded bg-accent text-accent-foreground">★ Featured</span>}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">"{t.text}"</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => togglePublish("testimonials", t.id, t.published)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all" title={t.published ? "Unpublish" : "Publish"}>
                      {t.published ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button onClick={() => setEditingTestimonial(t)} className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"><Pencil size={14} /></button>
                    <button onClick={() => deleteTestimonial(t.id)} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              {testimonials.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-2">No testimonials yet</p>
                  <p className="text-xs text-muted-foreground">Click "New Testimonial" to add your first real client testimonial.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
