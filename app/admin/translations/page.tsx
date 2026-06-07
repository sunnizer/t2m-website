import { notFound } from "next/navigation";
import TranslationsAdmin from "@/components/admin/TranslationsAdmin";

export default function TranslationsAdminPage() {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
    notFound();
  }

  return <TranslationsAdmin />;
}