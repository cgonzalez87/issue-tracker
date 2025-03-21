// app/dashboard/DashboardData.tsx
"use client";

import React from "react";
import IssueSummary from "../IssueSummary";
import IssueChart from "../IssueChart";
import LatestIssues from "../LatestIssues";
import { Grid, Flex } from "@radix-ui/themes";

const DashboardData = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction={"column"} gap="5">
        <IssueSummary />
        <IssueChart />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default DashboardData;
