import dynamicImport from "next/dynamic";
import { Metadata } from "next";

// ✅ Dynamically import the client-only DashboardData
const DashboardData = dynamicImport(() => import("./DashboardData"), {
  ssr: false, // ❗ ensure it’s rendered only on the client
});

export default function Home() {
  return <DashboardData />;
}

// ✅ Correct Next.js export without conflict
export const dynamic = "force-dynamic"; // Forces dynamic rendering

export const metadata: Metadata = {
  title: "Task Tracker Dashboard",
  description: "View summary of tasks",
};
