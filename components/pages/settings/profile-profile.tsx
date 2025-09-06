"use client";

import { useAppStore } from "@/stores/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ProfileForm = () => {
  const user = useAppStore((state) => state.user);
  return (
    <form className="space-y-6" noValidate>
      <>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>

          <Input
            id="name"
            className="mt-1 block w-full"
            name="name"
            required
            autoComplete="name"
            placeholder="Full name"
            defaultValue={user?.name || ""}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>

          <Input
            id="email"
            type="email"
            className="mt-1 block w-full disabled:bg-muted"
            name="email"
            required
            autoComplete="username"
            placeholder="Email address"
            defaultValue={user?.email || ""}
            disabled={true}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button>Save</Button>
        </div>
      </>
    </form>
  );
};
