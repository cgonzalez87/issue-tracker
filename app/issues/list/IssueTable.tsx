import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import AssigneeSelect from "../[id]/AssigneeSelect";

interface Props {
  issues: Issue[];
}

const IssueTable = ({ issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.label}
              className={column.className}
            >
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {new Date(issue.createdAt).toDateString()}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <AssigneeSelect issue={issue} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  className?: string;
}[] = [
  { label: "Issue" },
  { label: "Status", className: "hidden md:table-cell" },
  { label: "Created", className: "hidden md:table-cell" },
  { label: "Assigned User", className: "hidden md:table-cell" },
];

export default IssueTable;
