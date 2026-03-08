import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementSection from "@/components/AchievementSection";
import TestimonialSection from "@/components/TestimonialSection";
import UpworkSection from "@/components/UpworkSection";
import BlogSection from "@/components/BlogSection";
import GitHubSection from "@/components/GitHubSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <AchievementSection />
      <TestimonialSection />
      <UpworkSection />
      <BlogSection />
      <GitHubSection />
      <NewsletterSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default Index;
