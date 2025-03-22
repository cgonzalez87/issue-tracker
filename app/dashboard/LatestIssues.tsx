"use client";

// Import necessary libraries and components
import {
  Avatar,
  Card,
  Flex,
  Heading,
  Table,
  TableBody,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { IssueStatusBadge } from "../components";
import LatestIssuesLoading from "./LatestIssuesLoading";

// Define a minimal Issue type (adjust as needed)
interface Issue {
  id: number;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  createdAt: string; // Dates are received as strings from the API
  assignedToUser?: {
    image?: string;
  } | null;
}

// Function to fetch the latest 5 issues from your API endpoint
const fetchLatestIssues = async (): Promise<Issue[]> => {
  // Use the "take=5" query parameter to limit the number of issues returned
  const res = await axios.get<Issue[]>("/api/issues?take=5");
  return res.data;
};

// LatestIssues component uses React Query to fetch data
const LatestIssues = () => {
  // useQuery fetches data on the client side and automatically re-renders when data changes.
  const {
    data: issues,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestIssues"],
    queryFn: fetchLatestIssues,
    refetchOnWindowFocus: false, // Prevent refetch on window focus (optional)
  });

  // Display a loading message while data is being fetched
  if (isLoading) return <LatestIssuesLoading />;
  // Display an error message if the fetch fails
  if (error || !issues) return <p>Error loading issues</p>;

  // Render the latest issues in a card with a table
  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Tasks
      </Heading>
      <Table.Root>
        <TableBody>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    {/* Convert the createdAt string to a Date for display */}
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && issue.assignedToUser.image && (
                    <Avatar
                      src={issue.assignedToUser.image}
                      size="2"
                      radius="full"
                      fallback="?"
                    />
                  )}
                </Flex>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {new Date(issue.createdAt).toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
