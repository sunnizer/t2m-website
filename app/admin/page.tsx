import { notFound } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminDashboardPage() {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
    notFound();
  }

  return <AdminDashboard />;
}