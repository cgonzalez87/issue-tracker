"use client";

import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Issue } from "@prisma/client";
import IssueTable, { IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useIssueUpdateStore } from "@/app/stores/useIssueUpdateStore"; // Adjust path
import LoadingIssuesPage from "./LoadingIssuesPage";

// Async function to fetch issues from your API endpoint using provided query parameters
const fetchIssues = async (searchParams: IssueQuery): Promise<Issue[]> => {
  const params = new URLSearchParams();
  params.set("pagination", "false"); // We fetch all issues (no pagination)
  if (searchParams.status) params.set("status", searchParams.status);
  if (searchParams.orderBy) params.set("orderBy", searchParams.orderBy);
  if (searchParams.page) params.set("page", searchParams.page);

  const res = await axios.get<Issue[]>(`/api/issues?${params.toString()}`);
  return res.data;
};

const IssuesTableClient = () => {
  const { lastUpdated } = useIssueUpdateStore(); // Grab timestamp
  // Use useSearchParams to read current URL search parameters
  const searchParamsRaw = useSearchParams();
  const queryClient = useQueryClient();

  // Build an IssueQuery object from the URL parameters.
  // You can adjust default values as needed.
  const searchParams: IssueQuery = {
    status: (searchParamsRaw.get("status") as IssueQuery["status"]) || "", // If blank, no filter
    orderBy:
      (searchParamsRaw.get("orderBy") as IssueQuery["orderBy"]) || "createdAt",
    page: searchParamsRaw.get("page") || "1",
  };

  // Use React Query to fetch issues with the current searchParams
  const {
    data: issues,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["issues", searchParams, lastUpdated], // Include lastUpdated to refetch when it changes
    queryFn: () => fetchIssues(searchParams),
    refetchOnMount: "always", // Always refetch when the component mounts
    refetchOnWindowFocus: true, // Refetch when window regains focus
    staleTime: 0, // Data is immediately stale
  });

  // Invalidate queries on mount in case of browser caching
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["issues"], exact: false });
  }, [queryClient]);

  if (isLoading) return <LoadingIssuesPage />;
  if (error || !issues) return <p>Error loading issues</p>;

  return (
    <Flex direction="column" gap="3">
      {/* Render the table with the fetched issues */}
      <IssueTable searchParams={searchParams} issues={issues} />
    </Flex>
  );
};

export default IssuesTableClient;
