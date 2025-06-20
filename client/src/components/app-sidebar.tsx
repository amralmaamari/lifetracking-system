"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Inbox", href: "/inbox", icon: Inbox },
  { title: "Calendar", href: "/calendar", icon: Calendar },
  { title: "Search", href: "/search", icon: Search },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="min-w-[240px] border-r h-screen ">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent  >
            <SidebarMenu >
              {sidebarItems.map(({ title, href, icon: Icon }) => {
                const isActive = pathname === href;

                return (
                  <SidebarMenuItem key={title} active={isActive}>
                    <SidebarMenuButton asChild>
                      <Link href={href} className="flex items-center gap-2 w-full ">
                        <Icon size={18} />
                        <span className="text-sm">{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
