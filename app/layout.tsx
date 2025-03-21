"use client";

import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";
import AuthProvider from "@/app/auth/Provider";
import QueryClientProvider from "./QueryClientProvider";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const shouldHideNavBarAndPadding = (pathname: string) => {
  const pathsToHideNavBar = ["/", "/about"];
  return pathsToHideNavBar.includes(pathname);
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavBarAndPadding = shouldHideNavBarAndPadding(pathname);

  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet">
              {!hideNavBarAndPadding && <NavBar />}
              <main className={hideNavBarAndPadding ? "" : "p-5"}>
                <Container>{children}</Container>
              </main>
              <Toaster position="top-center" /> {/* Move Toaster here */}
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
