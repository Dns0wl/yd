import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hayu Widyas Office Dashboard",
  description: "Manual Paper generator for Hayu Widyas.",
  metadataBase: new URL("https://dash.hayuwidyas.com"),
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-accent">
        {children}
      </body>
    </html>
  );
}
