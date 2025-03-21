// app/dashboard/page.tsx
import dynamic from "next/dynamic";
import { Metadata } from "next";

// ✅ Dynamically import the client-only DashboardData
const DashboardData = dynamic(() => import("./DashboardData"), {
  ssr: false, // ❗ ensure it’s rendered only on the client
});

export default function Home() {
  return <DashboardData />;
}

export const forceDynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Task Tracker Dashboard",
  description: "View summary of tasks",
};
