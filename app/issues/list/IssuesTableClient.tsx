"use client";

import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Issue, Status } from "@prisma/client";
import IssueTable from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useIssueUpdateStore } from "@/app/stores/useIssueUpdateStore";
import LoadingIssuesPage from "./LoadingIssuesPage";

// Function to fetch issues from API based on status filter
const fetchIssues = async (status?: Status): Promise<Issue[]> => {
  const params = new URLSearchParams();
  params.set("pagination", "false");
  if (status) params.set("status", status);

  const res = await axios.get<Issue[]>(`/api/issues?${params.toString()}`);
  return res.data;
};

const IssuesTableClient = () => {
  const { lastUpdated } = useIssueUpdateStore();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const status = searchParams.get("status") as Status | undefined;

  const {
    data: issues,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["issues", status, lastUpdated],
    queryFn: () => fetchIssues(status),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["issues"], exact: false });
  }, [queryClient]);

  if (isLoading) return <LoadingIssuesPage />;
  if (error || !issues) return <p>Error loading issues</p>;

  return (
    <Flex direction="column" gap="3">
      <IssueTable issues={issues} />
    </Flex>
  );
};

export default IssuesTableClient;
