"use client";

import { Skeleton } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useIssueStatusStore } from "@/app/stores/issueStatusStore";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const queryClient = useQueryClient();
  const setStatus = useIssueStatusStore((state) => state.setStatus);

  // Mutation to update issue status
  const updateStatus = useMutation({
    mutationFn: async (newStatus: Status) => {
      const res = await axios.patch(`/api/issues/${issue.id}`, {
        status: newStatus,
      });
      return res.data;
    },
    onSuccess: (updatedIssue, newStatus: Status) => {
      toast.success("Status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["issues"] }); // If needed for lists
      // Update the store for this specific issue:
      setStatus(issue.id, newStatus);
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={(newValue) => updateStatus.mutate(newValue as Status)}
      >
        <Select.Trigger placeholder="Select Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            <Select.Item value="OPEN">Open</Select.Item>
            <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
            <Select.Item value="CLOSED">Closed</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
