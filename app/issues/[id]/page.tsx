import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
import StatusSelect from "./StatusSelect";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) => {
  return prisma.issue.findUnique({ where: { id: issueId } });
}); //cache function from react

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issueId = parseInt(params.id);
  if (isNaN(issueId)) notFound();

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issueId={issue.id} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="3">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
            <StatusSelect issue={issue} />
          </Flex>
        </Box>
      )}{" "}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of task" + issue?.id,
  };
}

export default IssueDetailPage;
