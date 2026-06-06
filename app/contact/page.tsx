import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactProcess from "@/components/contact/ContactProcess";
import ContactFAQ from "@/components/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <ContactProcess />
      <ContactFAQ />
    </>
  );
}