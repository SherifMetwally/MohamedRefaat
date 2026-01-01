import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ClientsCarousel from '@/components/ClientsCarousel';
import WorkGalleryServer from '@/components/WorkGalleryServer';
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
      <WorkGalleryServer source="home" />
      <WhyChooseUs />
      <ContactSection />
    </>
  );
}

