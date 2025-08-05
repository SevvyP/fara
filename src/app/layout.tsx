import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fara - Route Optimizer",
  description:
    "Optimize your travel routes using the traveling salesman algorithm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
