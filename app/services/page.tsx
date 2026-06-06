import ServicesHero from "@/components/services/ServicesHero";
import ServicePillars from "@/components/services/ServicePillars";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceDeliverables from "@/components/services/ServiceDeliverables";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ServicesCTA from "@/components/services/ServicesCTA";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicePillars />
      <ServiceProcess />
      <ServiceDeliverables />
      <ServicesFAQ />
      <ServicesCTA />
    </>
  );
}