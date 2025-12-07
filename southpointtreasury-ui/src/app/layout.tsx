import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Southpoint Treasury - Dashboard",
  description: "Financial management dashboard for Southpoint Treasury",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
