import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayoutShell from "@/app/clientLayoutShell";
import AuthProvider from "@/app/auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

// ✅ Now you can add metadata and favicon
export const metadata = {
  title: "Task Tracker",
  description: "View summary of tasks",
  icons: {
    icon: "/favicon.ico",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <ClientLayoutShell>{children}</ClientLayoutShell>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
