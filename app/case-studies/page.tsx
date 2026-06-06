import CaseStudiesHero from "@/components/case-studies/CaseStudiesHero";
import FeaturedEvents from "@/components/case-studies/FeaturedEvents";
import PartnerExperience from "@/components/case-studies/PartnerExperience";
import CaseStudyFormat from "@/components/case-studies/CaseStudyFormat";
import CaseStudiesCTA from "@/components/case-studies/CaseStudiesCTA";

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesHero />
      <FeaturedEvents />
      <PartnerExperience />
      <CaseStudyFormat />
      <CaseStudiesCTA />
    </>
  );
}