"use client";

import * as React from "react";
import {
  AudioWaveform,
  CalendarCheck2,
  LayoutDashboard,
  Tickets,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavWorkspaces } from "./nav-workspaces";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
  ],
  NavWorkspaces: [
    {
      title: "Habits",
      isActive: true,
      icon: CalendarCheck2,
      url: "/habits",
      items: [
        {
          title: "All Habits",
          url: "#",
        },
        {
          title: "Areas",
          url: "/habits/areas",
        },
      ],
    },
    {
      title: "Cash Tracker",
      isActive: true,
      icon: Tickets,
      url: "/cash-tracker",
      items: [
        {
          title: "Income",
          url: "/cash-tracker/income",
        },
        {
          title: "Expense",
          url: "/cash-tracker/expense",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <AudioWaveform className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-xl leading-tight">
                  <span className="truncate font-bold">LifeOS</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavWorkspaces items={data.NavWorkspaces} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  );
}
