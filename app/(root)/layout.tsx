"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAppStore } from "@/stores/useAppStore";
import { useEffect } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetchUser = useAppStore((state) => state.fetchUser);
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <ModeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
