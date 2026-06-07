import { notFound } from "next/navigation";
import PartnerClientAdmin from "@/components/admin/PartnerClientAdmin";

export default function PartnerClientAdminPage() {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
    notFound();
  }

  return <PartnerClientAdmin />;
}