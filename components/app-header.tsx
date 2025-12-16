"use client";

import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useSidebar } from "./ui/sidebar";

export function AppHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 bg-background flex items-center shrink-0 h-16 border-b px-4 md:px-8">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-semibold text-xl">Dashboard</h1>
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          className="block md:hidden"
        >
          <Menu />
        </Button>
      </div>
    </header>
  );
}
