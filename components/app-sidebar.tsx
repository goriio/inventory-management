"use client";

import { LayoutDashboard, NotebookTabs } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="p-4">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                {
                  title: "Dashboard",
                  url: "/dashboard",
                  Icon: LayoutDashboard,
                },
                {
                  title: "Inventory",
                  url: "/inventory",
                  Icon: NotebookTabs,
                },
              ].map(({ title, url, Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(url)}
                    size="lg"
                  >
                    <Link href={url}>
                      <Icon /> {title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
