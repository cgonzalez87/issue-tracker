"use client";

import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";

// Define the structure of the summary data
interface SummaryData {
  open: number;
  inProgress: number;
  closed: number;
}

// Function to fetch the summary data from your API endpoint
const fetchSummaryData = async (): Promise<SummaryData> => {
  const res = await axios.get("/api/issues?includeCounts=true");
  return res.data.counts;
};

const IssueChart = () => {
  const { data, isLoading, error } = useQuery<SummaryData>({
    queryKey: ["issueSummary"],
    queryFn: fetchSummaryData,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  if (isLoading) return <Skeleton />;
  if (error || !data) return <p>Error loading issue chart data</p>;

  const chartData = [
    { label: "Open", value: data.open },
    { label: "In progress", value: data.inProgress },
    { label: "Closed", value: data.closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Bar
            dataKey={"value"}
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
