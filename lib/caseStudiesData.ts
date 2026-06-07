export type CaseStudyMetricIcon =
  | "message"
  | "users"
  | "line"
  | "bar"
  | "rocket"
  | "report";

export type CaseStudyMetric = {
  id: string;
  value: string;
  labelVi: string;
  labelEn: string;
  icon: CaseStudyMetricIcon;
};

export type CaseStudyItem = {
  id: string;
  nameVi: string;
  nameEn: string;
  categoryVi: string;
  categoryEn: string;
  image: string;
  tags: string[];
  metrics: CaseStudyMetric[];
};

export type CaseStudiesData = {
  caseStudies: CaseStudyItem[];
};

export const defaultCaseStudiesData: CaseStudiesData = {
  caseStudies: [
    {
      id: "song-1-doi-co-lai",
      nameVi: "Sống 1 đời có lãi",
      nameEn: "A Life Worth Living",
      categoryVi: "Social Campaign",
      categoryEn: "Social Campaign",
      image: "/cases/song-1-doi-co-lai.jpg",
      tags: ["Social", "Seeding"],
      metrics: [
        {
          id: "discussion",
          value: "230K+",
          labelVi: "Thảo luận",
          labelEn: "Discussions",
          icon: "message",
        },
        {
          id: "reach",
          value: "98M+",
          labelVi: "Lượt tiếp cận",
          labelEn: "Reach",
          icon: "users",
        },
        {
          id: "benchmark",
          value: "2.1x",
          labelVi: "So với benchmark",
          labelEn: "Vs benchmark",
          icon: "line",
        },
      ],
    },
    {
      id: "vinh-quang-cong-an-nhan-dan",
      nameVi: "Vinh quang Công an nhân dân",
      nameEn: "People’s Public Security Glory",
      categoryVi: "Public Event",
      categoryEn: "Public Event",
      image: "/cases/vinh-quang-cong-an-nhan-dan.jpg",
      tags: ["Event", "Monitoring"],
      metrics: [
        {
          id: "discussion",
          value: "180K+",
          labelVi: "Thảo luận",
          labelEn: "Discussions",
          icon: "message",
        },
        {
          id: "reach",
          value: "76M+",
          labelVi: "Lượt tiếp cận",
          labelEn: "Reach",
          icon: "users",
        },
        {
          id: "engagement",
          value: "1.8x",
          labelVi: "Engagement rate",
          labelEn: "Engagement rate",
          icon: "bar",
        },
      ],
    },
    {
      id: "vietinbank-countdown-2025",
      nameVi: "VietinBank Countdown 2025",
      nameEn: "VietinBank Countdown 2025",
      categoryVi: "Banking Event",
      categoryEn: "Banking Event",
      image: "/cases/vietinbank-countdown-2025.jpg",
      tags: ["Banking", "Reporting"],
      metrics: [
        {
          id: "discussion",
          value: "320K+",
          labelVi: "Thảo luận",
          labelEn: "Discussions",
          icon: "message",
        },
        {
          id: "reach",
          value: "120M+",
          labelVi: "Lượt tiếp cận",
          labelEn: "Reach",
          icon: "users",
        },
        {
          id: "traffic",
          value: "2.6x",
          labelVi: "Traffic uplift",
          labelEn: "Traffic uplift",
          icon: "line",
        },
      ],
    },
  ],
};