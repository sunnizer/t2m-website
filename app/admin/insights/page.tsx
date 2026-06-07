import { notFound } from "next/navigation";
import InsightsAdmin from "@/components/admin/InsightsAdmin";

export default function InsightsAdminPage() {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
    notFound();
  }

  return <InsightsAdmin />;
}
