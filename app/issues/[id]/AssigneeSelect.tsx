"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useIssueUpdateStore } from "@/app/stores/useIssueUpdateStore";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  const queryClient = useQueryClient();

  const updateAssignee = useMutation({
    mutationFn: async (userId: string) => {
      const res = await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      });
      return res.data;
    },
    onSuccess: (_, userId) => {
      // Look up the user name from the users list
      const assignedUser = users?.find((u: User) => u.id === userId);
      if (userId) {
        toast.success(
          `Assignee updated successfully! Now assigned to ${
            assignedUser?.name || "Unknown"
          }`
        );
      } else {
        toast.success("Assignee updated successfully! Now unassigned.");
      }
      useIssueUpdateStore.getState().refresh(); // 👈 Trigger refetch
      queryClient.invalidateQueries({ queryKey: ["issues"], exact: false });
    },
    onError: () => {
      toast.error("Failed to update assignee");
    },
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) => updateAssignee.mutate(userId)}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user: User) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<User[]>("/api/users");
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
  });

export default AssigneeSelect;
