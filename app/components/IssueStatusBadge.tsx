"use client";

import { useIssueStatusStore } from "@/app/stores/issueStatusStore";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import React from "react";

interface Props {
  issueId: number;
}

const IssueStatusBadge = ({ issueId }: Props) => {
  // Retrieve the status for this issue from the store.
  // If nothing is set, default to "OPEN"
  const status =
    useIssueStatusStore((state) => state.statuses[issueId]) || "OPEN";

  const statusMap: Record<
    Status,
    { label: string; color: "red" | "violet" | "green" }
  > = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In progress", color: "violet" },
    CLOSED: { label: "Closed", color: "green" },
  };

  // Since new issues always default to OPEN, this fallback should work fine.
  const badgeData = statusMap[status as Status] || statusMap["OPEN"];

  return <Badge color={badgeData.color}>{badgeData.label}</Badge>;
};

export default IssueStatusBadge;
