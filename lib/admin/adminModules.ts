import {
  FileCog,
  FileText,
  Languages,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type AdminModuleStatus = "active" | "planned";

export type AdminModule = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  status: AdminModuleStatus;
  badge?: string;
};

export const adminModules: AdminModule[] = [
  {
    id: "translations",
    title: "Translations",
    description: "Quản lý nội dung song ngữ VI / EN cho website.",
    href: "/admin/translations",
    icon: Languages,
    status: "active",
    badge: "Content",
  },
  {
    id: "partners",
    title: "Partner & Client",
    description: "Quản lý logo khách hàng, đối tác và kích thước hiển thị.",
    href: "/admin/partners",
    icon: UsersRound,
    status: "active",
    badge: "Logo CMS",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Quản lý dự án tiêu biểu, ảnh, tag và chỉ số nổi bật.",
    href: "/admin/case-studies",
    icon: FileText,
    status: "active",
    badge: "Portfolio",
  },

  {
    id: "site-content",
    title: "Site Content",
    description: "Quản lý MST, địa chỉ, contact, social link và placeholder theo từng page.",
    href: "/admin/site-content",
    icon: FileCog,
    status: "active",
    badge: "Settings",
  },
  {
    id: "site-settings",
    title: "Website Settings",
    description: "Cấu hình SEO, social links, CTA, theme và thông tin chung.",
    href: "/admin/settings",
    icon: Settings,
    status: "planned",
    badge: "Coming soon",
  },
  {
    id: "permissions",
    title: "Roles & Permissions",
    description: "Chuẩn bị phân quyền Owner / Editor / Viewer cho admin.",
    href: "/admin/permissions",
    icon: ShieldCheck,
    status: "planned",
    badge: "Coming soon",
  },
  {
    id: "cms",
    title: "CMS Dashboard",
    description: "Không gian tổng hợp bài viết, landing page và dữ liệu website.",
    href: "/admin/cms",
    icon: LayoutDashboard,
    status: "planned",
    badge: "Coming soon",
  },
];