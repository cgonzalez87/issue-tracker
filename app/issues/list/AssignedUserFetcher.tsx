// "use client"; // Mark this as a client component

// import { useEffect, useState } from "react";

// interface Props {
//   assignedToUserId: string | null;
// }

// const AssignedUserFetcher = ({ assignedToUserId }: Props) => {
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     if (!assignedToUserId) return;

//     const fetchUserName = async () => {
//       const res = await fetch(`/api/issues/assigned-users`);
//       const users = await res.json();
//       const user = users.find((u: { id: string }) => u.id === assignedToUserId);
//       setUserName(user?.name || "Unassigned");
//     };

//     fetchUserName();
//   }, [assignedToUserId]);

//   return <>{userName || "Unassigned"}</>;
// };

// export default AssignedUserFetcher;
