import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ClientsCarousel from '@/components/ClientsCarousel';
import WorkGallery from '@/components/WorkGallery';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsCounter from '@/components/StatsCounter';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ClientsCarousel />
      <StatsCounter />
      <WorkGallery />
      <WhyChooseUs />
      <ContactSection />
    </>
  );
}

