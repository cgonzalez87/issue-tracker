"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  issueId: number;
  assignedToUserId: string | null;
}

const fetchUsers = async () => {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

const AssignedUserDropdown = ({ issueId, assignedToUserId }: Props) => {
  const queryClient = useQueryClient();

  // Fetch users using React Query
  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 30, // 🔄 Fetch fresh users every 30 seconds
  });

  // Mutation for assigning a user
  const mutation = useMutation({
    mutationFn: async (newUserId: string) => {
      await fetch(`/api/issues/${issueId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignedToUserId: newUserId === "unassigned" ? null : newUserId,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] }); // 🔄 Refetch issues
      queryClient.invalidateQueries({ queryKey: ["users"] }); // 🔄 Refetch users so dropdown updates
    },
  });

  const handleAssignUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    mutation.mutate(event.target.value);
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <select
      defaultValue={assignedToUserId ?? "unassigned"}
      onChange={handleAssignUser}
      className="border px-2 py-1 rounded"
    >
      <option value="unassigned">Unassigned</option>
      {users.map((user: { id: string; name: string }) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default AssignedUserDropdown;
