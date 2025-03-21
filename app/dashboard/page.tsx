// app/dashboard/page.tsx
import DashboardData from "./DashboardData";
import { Metadata } from "next";

export default function Home() {
  return <DashboardData />;
}

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Task Tracker Dashboard",
  description: "View summary of tasks",
};
