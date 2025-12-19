"use client";

import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useSidebar } from "./ui/sidebar";

export function AppHeader({ title }: { title: string }) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 bg-card flex items-center h-16 border-b z-10">
      <div className="flex items-center justify-between max-w-7xl w-full mx-auto p-4 md:px-8">
        <h1 className="font-semibold text-xl">{title}</h1>
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
