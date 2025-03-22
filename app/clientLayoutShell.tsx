"use client";

import { Container, Theme } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";

const shouldHideNavBarAndPadding = (pathname: string) => {
  const pathsToHideNavBar = ["/", "/about"];
  return pathsToHideNavBar.includes(pathname);
};

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavBarAndPadding = shouldHideNavBarAndPadding(pathname);

  return (
    <Theme accentColor="violet">
      {!hideNavBarAndPadding && <NavBar />}
      <main className={hideNavBarAndPadding ? "" : "p-5"}>
        <Container>{children}</Container>
      </main>
      <Toaster position="top-center" />
    </Theme>
  );
}
