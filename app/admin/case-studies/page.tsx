import { notFound } from "next/navigation";
import CaseStudiesAdmin from "@/components/admin/CaseStudiesAdmin";

export default function CaseStudiesAdminPage() {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
    notFound();
  }

  return <CaseStudiesAdmin />;
}