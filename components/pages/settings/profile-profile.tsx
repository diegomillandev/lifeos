"use client";

import { useAppStore } from "@/stores/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profile } from "@/actions/profile-account";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export const ProfileForm = () => {
  const user = useAppStore((state) => state.user);
  const fetchUser = useAppStore((state) => state.fetchUser);

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  const [state, dispatch, pending] = useActionState(profile, {
    errors: {},
    response: {
      success: false,
      message: "",
    },
  });

  useEffect(() => {
    if (state.response.success) {
      toast.success(state.response.message);
    } else if (state.response.message) {
      toast.error(state.response.message);
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form className="space-y-6" noValidate action={dispatch}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          className="mt-1 block w-full"
          name="name"
          required
          autoComplete="name"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email address</Label>

        <Input
          id="email"
          type="email"
          className="mt-1 block w-full read-only:bg-muted"
          name="email"
          required
          autoComplete="username"
          placeholder="Email address"
          value={email}
          readOnly
        />
      </div>

      <div className="flex items-center gap-4">
        <Button disabled={pending} type="submit">
          {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  );
};
