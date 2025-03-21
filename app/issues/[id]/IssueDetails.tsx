"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IssueStatusBadge } from "@/app/components";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import React from "react";
import IssueDetailsLoading from "./IssueDetailsLoading";

interface IssueDetailsProps {
  issueId: number;
}

const IssueDetails = ({ issueId }: IssueDetailsProps) => {
  const {
    data: issue,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["issue", issueId],
    queryFn: async () => {
      const res = await axios.get(`/api/issues/${issueId}`);
      return res.data;
    },
    refetchOnWindowFocus: false, // optional: adjust as needed
  });

  if (isLoading) return <IssueDetailsLoading />;
  if (error || !issue) return <p>Error loading issue</p>;

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{new Date(issue.createdAt).toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
