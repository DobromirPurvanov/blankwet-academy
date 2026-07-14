import { Header } from './components/custom/navigation/Header';
import { Footer } from './components/custom/navigation/Footer';
import { HeroSection } from './components/custom/sections/HeroSection';
import { ValueProposition } from './components/custom/sections/ValueProposition';
import { FeaturedCourses } from './components/custom/sections/FeaturedCourses';
import { CategoriesSection } from './components/custom/sections/CategoriesSection';
import { TestimonialsSection } from './components/custom/sections/TestimonialsSection';
import { InstructorSpotlight } from './components/custom/sections/InstructorSpotlight';
import { PricingSection } from './components/custom/sections/PricingSection';
import { FAQSection } from './components/custom/sections/FAQSection';
import { NewsletterCTA } from './components/custom/sections/NewsletterCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ValueProposition />
        <FeaturedCourses />
        <CategoriesSection />
        <TestimonialsSection />
        <InstructorSpotlight />
        <PricingSection />
        <FAQSection />
        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
