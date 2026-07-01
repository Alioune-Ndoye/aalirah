import Hero from '../sections/Hero';
import ServicesGrid from '../sections/ServicesGrid';
import WhyUs from '../sections/WhyUs';
import WhyChoose from '../sections/WhyChoose';
import Showcase from '../sections/Showcase';
import Testimonials from '../sections/Testimonials';
import Faq from '../sections/Faq';
import Contact from '../sections/Contact';
import QuoteForm from '../sections/QuoteForm';
import Seo, { JsonLd } from '../components/Seo';
import { meta, faqLd } from '../lib/seo';

export default function Home() {
  return (
    <>
      <Seo {...meta.home} />
      <JsonLd data={faqLd()} />
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <WhyChoose />
      <QuoteForm />
      <Showcase />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
