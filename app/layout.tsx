import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ABeeZee } from "next/font/google";
const abeezee = ABeeZee({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "MeetUs Ar",
  // description: "React.js Developer Assessment Application",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={abeezee.className}>{children}</body>
    </html>
  );
}
