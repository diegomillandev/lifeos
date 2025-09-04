"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavWorkspaces({
  items,
}: {
  items: {
    title: string;
    isActive?: boolean;
    icon: LucideIcon;
    url: string;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                className="cursor-pointer group/collapsible"
              >
                <SidebarMenuButton asChild className="flex">
                  <Link href={item.url} className="flex-1 flex items-center">
                    <item.icon className="mr-1.5" />
                    <span className="flex-1">{item.title}</span>
                    <span className="rotate-90 group-data-[state=open]/collapsible:-rotate-90 transition-all group-data-[state=open]/delay-300">
                      <ChevronRight size={18} />
                      <span className="sr-only">Toggle</span>
                    </span>
                  </Link>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items?.length ? (
                <>
                  <CollapsibleContent className="ps-4">
                    <SidebarMenuSub className="">
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubButton
                          key={subItem.title}
                          className="flex"
                          asChild
                        >
                          <Link href={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuSubButton>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
