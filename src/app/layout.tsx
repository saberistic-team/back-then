import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./styles.css";

export const metadata: Metadata = {
  title: "BackThen",
  description:
    "One good question every week. Over time, the story of your life.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
