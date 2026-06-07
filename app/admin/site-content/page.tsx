import { notFound } from "next/navigation";
import SiteContentAdmin from "@/components/admin/SiteContentAdmin";

export default function SiteContentAdminPage() {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
    notFound();
  }

  return <SiteContentAdmin />;
}
