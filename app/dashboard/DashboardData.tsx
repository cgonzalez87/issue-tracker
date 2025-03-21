"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IssueSummary from "../IssueSummary";
import IssueChart from "../IssueChart";
import LatestIssues from "../LatestIssues";
import { Grid, Flex } from "@radix-ui/themes";
import useIssueDashboardStore from "../stores/issueDashboardStore";

const DashboardData = () => {
  const setSummary = useIssueDashboardStore((state) => state.setSummary);
  const summary = useIssueDashboardStore((state) => state.summary);

  const { data, isLoading, error } = useQuery({
    queryKey: ["issueSummary"],
    queryFn: async () => {
      const res = await axios.get("/api/issues/summary");
      return res.data;
    },
    refetchInterval: 5000, // Optional
  });

  useEffect(() => {
    if (data) {
      setSummary(data);
    }
  }, [data, setSummary]);

  if (isLoading) return <p>Loading dashboard data...</p>;
  if (error) return <p>Error loading dashboard data</p>;

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...summary} />
        <IssueChart {...summary} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default DashboardData;
