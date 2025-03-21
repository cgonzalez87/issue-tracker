// app/issues/list/page.tsx
import IssueActions from "./IssueActions";
import IssuesTableClient from "./IssuesTableClient";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

const IssuesPage = () => {
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssuesTableClient />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tasks List",
  description: "View all tasks",
};

export default IssuesPage;
