import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "~/components/ui/sonner";

const figtree = Figtree({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Inventory Management",
    template: "%s | Inventory Management",
  },
  description:
    "Monitor key metrics through a centralized dashboard for inventory and time-series statistics, plus dedicated pages for inventory, sales, and customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
