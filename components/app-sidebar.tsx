"use client";

import {
  ChevronUp,
  LayoutDashboard,
  NotebookTabs,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./logo";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut, useSession } from "~/lib/auth-client";
import { toast } from "sonner";

export function AppSidebar() {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();

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
                  icon: LayoutDashboard,
                },
                {
                  title: "Inventory",
                  url: "/dashboard/inventory",
                  icon: NotebookTabs,
                },
                {
                  title: "Sales",
                  url: "/dashboard/sales",
                  icon: ShoppingCart,
                },
                {
                  title: "Customers",
                  url: "/dashboard/customers",
                  icon: Users,
                },
              ].map(({ title, url, icon }) => {
                const LinkIcon = icon;

                return (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === url}
                      size="lg"
                    >
                      <Link href={url}>
                        <LinkIcon /> {title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <div className="flex flex-col gap-0">
                    <span className="text-gray-900 text-sm">
                      {session.data?.user.name}
                    </span>
                    <span className="text-gray-700 text-xs">
                      {session.data?.user.email}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-60">
                <DropdownMenuItem
                  onClick={async () =>
                    await signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push("/login");
                          toast.success("You have been logged out.");
                        },
                      },
                    })
                  }
                >
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
