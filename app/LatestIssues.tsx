import { prisma } from "@/prisma/client";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  Table,
  TableBody,
} from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size={"4"} mb={"5"}>
        Latest Tasks
      </Heading>
      <Table.Root>
        <TableBody>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex direction={"column"} align={"start"} gap={"2"}>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge issueId={issue.id} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      size={"2"}
                      radius="full"
                      fallback={"?"}
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
