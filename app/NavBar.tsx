"use client";
import { Skeleton } from "@/app/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaTasks } from "react-icons/fa";
import { useSession } from "next-auth/react";
import classNames from "classnames"; //this is a function that we call and give it an obj
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import MenuPanel from "./MenuPanel";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <MenuPanel />
            {/* <Link href="/">
              <img src="/favicon.ico" alt="Home" className="w-6 h-6" />
            </Link> */}
            {/* <NavLinks /> */}
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

// const NavLinks = () => {
//   const currentPath = usePathname(); //we can only use browser APIs in client components
//   const links = [
//     { label: "Dashboard", href: "/dashboard" },
//     { label: "Issues", href: "/issues/list" },
//     { label: "About", href: "/about" },
//   ];

//   return (
//     <ul className="flex space-x-6">
//       {links.map((link) => (
//         <li key={link.href}>
//           <Link
//             className={classNames({
//               "nav-link": true,
//               "!text-zinc-900": link.href === currentPath,
//             })}
//             href={link.href}
//           >
//             {link.label}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Sign in
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            // referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
