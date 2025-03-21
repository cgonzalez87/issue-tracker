"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Skeleton } from "@/app/components";
import { Status } from "@prisma/client";

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

const IssueSummary = () => {
  const { data, isLoading, error } = useQuery<SummaryData>({
    queryKey: ["issueSummary"],
    queryFn: fetchSummaryData,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  if (isLoading) return <Skeleton />;
  if (error || !data) return <p>Error loading issue summary data</p>;

  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open tasks", value: data.open, status: "OPEN" },
    {
      label: "In Progress tasks",
      value: data.inProgress,
      status: "IN_PROGRESS",
    },
    { label: "Closed tasks", value: data.closed, status: "CLOSED" },
  ];

  return (
    <Flex gap={"4"}>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex gap={"1"} direction={"column"}>
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size={"5"} className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
