import { promises as fs } from "fs";
import path from "path";
import rawInsights from "@/data/insights.json";

export type InsightPostType = "featured" | "trend" | "caseStudy" | "normal";

export type InsightCategory = {
  id: string;
  nameVi: string;
  nameEn: string;
  icon: string;
};

export type InsightPost = {
  id: string;
  titleVi: string;
  titleEn: string;
  excerptVi: string;
  excerptEn: string;
  contentVi?: string;
  contentEn?: string;
  categoryId: string;
  type: InsightPostType;
  image: string;
  author: string;
  dateVi: string;
  dateEn: string;
  readTimeVi: string;
  readTimeEn: string;
  slug: string;
  isFeatured?: boolean;
  isPopular?: boolean;
};

export type InsightSettings = {
  eyebrowVi: string;
  eyebrowEn: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  heroImage: string;
  searchPlaceholderVi: string;
  searchPlaceholderEn: string;
  newsletterTitleVi: string;
  newsletterTitleEn: string;
  newsletterDescriptionVi: string;
  newsletterDescriptionEn: string;
  ctaTitleVi: string;
  ctaTitleEn: string;
  ctaDescriptionVi: string;
  ctaDescriptionEn: string;
  ctaLabelVi: string;
  ctaLabelEn: string;
};

export type InsightsData = {
  settings: InsightSettings;
  categories: InsightCategory[];
  posts: InsightPost[];
};

const defaultContentVi = `## Vì sao nội dung này quan trọng?

Trong một campaign thực tế, kết quả không chỉ đến từ ngân sách media. Thương hiệu cần có cách lập kế hoạch rõ ràng, theo dõi tín hiệu đúng và tối ưu liên tục dựa trên dữ liệu.

## Cách T2M thường tiếp cận

T2M bắt đầu bằng mục tiêu kinh doanh, sau đó chuyển thành hệ KPI, channel mix, nội dung triển khai, tracking và báo cáo. Cách làm này giúp campaign dễ kiểm soát hơn, giảm tình trạng chạy rời rạc giữa nhiều team.

## Checklist nhanh

- Xác định mục tiêu chính và mục tiêu phụ của chiến dịch.
- Tách rõ KPI awareness, engagement, lead hoặc conversion.
- Chuẩn hóa tracking trước khi chạy media.
- Theo dõi social signal để hiểu phản ứng thật của người dùng.
- Báo cáo theo insight hành động được, không chỉ liệt kê số liệu.

## Gợi ý triển khai

Với các chiến dịch cần tốc độ, nên chia campaign theo phase: planning, launch, amplification, tracking và optimization. Mỗi phase cần một đầu ra rõ ràng để team client, agency và vendor cùng nhìn về một hướng.`;

const defaultContentEn = `## Why this matters

In a real campaign, performance does not come only from media budget. Brands need a clear planning system, proper signal tracking and continuous optimization based on data.

## How T2M approaches it

T2M starts with the business objective, then translates it into KPI structure, channel mix, execution content, tracking and reporting. This makes campaigns easier to control and reduces fragmented execution across teams.

## Quick checklist

- Define the primary and secondary campaign objectives.
- Separate awareness, engagement, lead and conversion KPIs.
- Standardize tracking before media launch.
- Monitor social signals to understand real audience response.
- Report actionable insights, not just raw numbers.

## Execution suggestion

For fast-moving campaigns, split the work into phases: planning, launch, amplification, tracking and optimization. Each phase should have a clear output so client, agency and vendor teams stay aligned.`;

export const defaultInsightsData: InsightsData = {
  settings: {
    eyebrowVi: "INSIGHT & NEWS",
    eyebrowEn: "INSIGHT & NEWS",
    titleVi: "Góc nhìn thực chiến cho chiến dịch hiệu quả hơn",
    titleEn: "Practical insights for more effective campaigns",
    descriptionVi: "Cập nhật xu hướng, chia sẻ kiến thức và kinh nghiệm thực chiến từ đội ngũ T2M.",
    descriptionEn: "Trends, knowledge and practical campaign experience from the T2M team.",
    heroImage: "/visuals/insights/insight-hero.svg",
    searchPlaceholderVi: "Tìm kiếm bài viết ...",
    searchPlaceholderEn: "Search articles ...",
    newsletterTitleVi: "Nhận insight mới nhất từ T2M",
    newsletterTitleEn: "Get the latest insights from T2M",
    newsletterDescriptionVi: "Xu hướng, kiến thức và case study được gửi đến bạn mỗi tuần.",
    newsletterDescriptionEn: "Trends, knowledge and case studies delivered weekly.",
    ctaTitleVi: "Bạn cần tư vấn chiến lược phù hợp với mục tiêu kinh doanh?",
    ctaTitleEn: "Need a campaign strategy that fits your business goals?",
    ctaDescriptionVi: "Đội ngũ T2M sẵn sàng đồng hành cùng bạn.",
    ctaDescriptionEn: "The T2M team is ready to work with you.",
    ctaLabelVi: "Liên hệ tư vấn ngay",
    ctaLabelEn: "Contact us",
  },
  categories: [
    { id: "all", nameVi: "Tất cả", nameEn: "All", icon: "grid" },
    { id: "performance", nameVi: "Performance Marketing", nameEn: "Performance Marketing", icon: "target" },
    { id: "media-planning", nameVi: "Media Planning", nameEn: "Media Planning", icon: "chart" },
    { id: "social", nameVi: "Social Media & Seeding", nameEn: "Social Media & Seeding", icon: "heart" },
    { id: "tracking", nameVi: "Tracking & Automation", nameEn: "Tracking & Automation", icon: "workflow" },
    { id: "case-study", nameVi: "Case Study", nameEn: "Case Study", icon: "briefcase" },
    { id: "trend", nameVi: "Xu hướng", nameEn: "Trend", icon: "sparkles" },
  ],
  posts: [],
};

export const insightsData = rawInsights as InsightsData;

export async function getInsightsData(): Promise<InsightsData> {
  const dataFilePath = path.join(process.cwd(), "data", "insights.json");

  try {
    const file = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(file) as InsightsData;
  } catch {
    return insightsData?.posts?.length ? insightsData : defaultInsightsData;
  }
}

export function getDefaultInsightContent(locale: "vi" | "en" = "vi") {
  return locale === "en" ? defaultContentEn : defaultContentVi;
}
