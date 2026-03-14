import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  // If BOOKING_MODE is true, redirect to /book instantly on the server
  if (process.env.NEXT_PUBLIC_BOOKING_MODE === 'true') {
    redirect('/book');
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <About />
        <Reviews />
        <CTABanner />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
