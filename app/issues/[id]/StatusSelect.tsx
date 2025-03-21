"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React from "react";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const queryClient = useQueryClient();
  const updateStatus = useMutation({
    mutationFn: async (newStatus: Status) => {
      const res = await axios.patch(`/api/issues/${issue.id}`, {
        status: newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Status updated successfully!");
      // Invalidate the query that fetches this issue's details:
      queryClient.invalidateQueries({ queryKey: ["issue", issue.id] });
      // Also, if you have an issues list query, invalidate that as well:
      queryClient.invalidateQueries({ queryKey: ["issues"] });
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
    </>
  );
};

export default StatusSelect;
