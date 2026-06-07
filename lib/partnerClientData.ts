export type PartnerClientLogoSize = "small" | "medium" | "large" | "wide";

export type PartnerClientLogo = {
  id: string;
  name: string;
  shortName?: string;
  image?: string;
  className?: string;
  size?: PartnerClientLogoSize;
};

export type PartnerClientData = {
  clients: PartnerClientLogo[];
  partners: PartnerClientLogo[];
};

export const defaultPartnerClientData: PartnerClientData = {
  clients: [
    {
      id: "vinfast",
      name: "VinFast",
      shortName: "VINFAST",
      className: "tracking-[0.34em]",
      size: "wide",
    },
    {
      id: "samsung",
      name: "Samsung",
      shortName: "SAMSUNG",
      className: "tracking-[0.12em]",
      size: "wide",
    },
    {
      id: "shopee",
      name: "Shopee",
      shortName: "Shopee",
      size: "medium",
    },
    {
      id: "tp-link",
      name: "TP-Link",
      shortName: "tp-link",
      size: "medium",
    },
    {
      id: "vivo",
      name: "Vivo",
      shortName: "vivo",
      className: "tracking-[0.22em]",
      size: "medium",
    },
    {
      id: "la-roche-posay",
      name: "La Roche-Posay",
      shortName: "LA ROCHE-POSAY",
      size: "wide",
    },
    {
      id: "baoviet",
      name: "BaoViet",
      shortName: "BAOVIET",
      size: "wide",
    },
    {
      id: "fpt",
      name: "FPT",
      shortName: "FPT",
      className: "italic tracking-[0.08em]",
      size: "medium",
    },
    {
      id: "thegioididong",
      name: "The Gioi Di Dong",
      shortName: "thegioididong",
      size: "wide",
    },
    {
      id: "pnj",
      name: "PNJ",
      shortName: "PNJ",
      className: "font-serif tracking-[0.08em]",
      size: "medium",
    },
    {
      id: "momo",
      name: "MoMo",
      shortName: "momo",
      size: "medium",
    },
    {
      id: "vietcombank",
      name: "Vietcombank",
      shortName: "Vietcombank",
      size: "wide",
    },
    {
      id: "viettel",
      name: "Viettel Telecom",
      shortName: "viettel telecom",
      size: "wide",
    },
    {
      id: "lotte",
      name: "Lotte",
      shortName: "LOTTE",
      className: "tracking-[0.12em]",
      size: "wide",
    },
    {
      id: "tiki",
      name: "Tiki",
      shortName: "TIKI",
      className: "tracking-[0.14em]",
      size: "medium",
    },
    {
      id: "heineken",
      name: "Heineken",
      shortName: "HEINEKEN",
      className: "tracking-[0.12em]",
      size: "wide",
    },
    {
      id: "pg",
      name: "P&G",
      shortName: "P&G",
      className: "font-serif italic",
      size: "medium",
    },
    {
      id: "abbott",
      name: "Abbott",
      shortName: "Abbott",
      className: "font-serif",
      size: "medium",
    },
  ],
  partners: [
    {
      id: "meta",
      name: "Meta",
      shortName: "Meta",
      size: "medium",
    },
    {
      id: "tiktok",
      name: "TikTok",
      shortName: "TikTok",
      size: "medium",
    },
    {
      id: "youtube",
      name: "YouTube",
      shortName: "YouTube",
      size: "wide",
    },
    {
      id: "zalo",
      name: "Zalo",
      shortName: "Zalo",
      size: "medium",
    },
    {
      id: "google",
      name: "Google",
      shortName: "Google",
      size: "medium",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      shortName: "LinkedIn",
      size: "wide",
    },
    {
      id: "kompa",
      name: "Kompa",
      shortName: "Kompa",
      size: "medium",
    },
    {
      id: "reputa",
      name: "Reputa",
      shortName: "Reputa",
      size: "medium",
    },
    {
      id: "gcomm",
      name: "GCOMM",
      shortName: "gcomm",
      size: "medium",
    },
    {
      id: "younet-media",
      name: "YouNet Media",
      shortName: "YouNet Media",
      size: "wide",
    },
    {
      id: "admicro",
      name: "Admicro",
      shortName: "admicro",
      size: "wide",
    },
    {
      id: "brands-vietnam",
      name: "Brands Vietnam",
      shortName: "BRANDS Vietnam",
      size: "wide",
    },
  ],
};