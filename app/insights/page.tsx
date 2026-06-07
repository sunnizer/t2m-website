import InsightsPage from "@/components/insights/InsightsPage";
import { getInsightsData } from "@/lib/insightsData";

export const dynamic = "force-dynamic";

export default async function InsightsRoutePage() {
  const data = await getInsightsData();
  return <InsightsPage data={data} />;
}
