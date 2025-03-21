// app/dashboard/DashboardData.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IssueSummary from "../IssueSummary";
import IssueChart from "../IssueChart";
import LatestIssues from "../LatestIssues";
import { Grid, Flex } from "@radix-ui/themes";

// Define the structure of the summary data
interface SummaryData {
  open: number;
  inProgress: number;
  closed: number;
}

const DashboardData = () => {
  const { data, isLoading, error } = useQuery<SummaryData>({
    queryKey: ["issueSummary"],
    queryFn: async () => {
      const res = await axios.get("/api/issues/summary");
      return res.data;
    },
    // Optionally, poll for fresh data every 5 seconds:
    refetchInterval: 5000,
  });

  if (isLoading) return <p>Loading dashboard data...</p>;
  if (error || !data) return <p>Error loading dashboard data</p>;

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction={"column"} gap="5">
        {/* Pass the counts to your components */}
        <IssueSummary
          open={data.open}
          inProgress={data.inProgress}
          closed={data.closed}
        />
        <IssueChart
          open={data.open}
          inProgress={data.inProgress}
          closed={data.closed}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default DashboardData;
