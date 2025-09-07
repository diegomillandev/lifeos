"use client";

import { passwordAccount } from "@/actions/password-account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export const PasswordProfile = () => {
  const [state, dispatch, pending] = useActionState(passwordAccount, {
    errors: {},
    response: { success: false, message: "" },
  });

  useEffect(() => {
    if (state.response.success) {
      toast.success(state.response.message);
    } else if (state.response.message) {
      toast.error(state.response.message);
    }
  }, [state]);

  return (
    <form noValidate className="space-y-6" action={dispatch}>
      <>
        <div className="grid gap-2">
          <Label htmlFor="currentPassword">Current password</Label>

          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            className="mt-1 block w-full"
            autoComplete="current-password"
            placeholder="Current password"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="newPassword">New password</Label>

          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
            placeholder="New password"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmNewPassword">Confirm password</Label>

          <Input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
            placeholder="Confirm password"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button disabled={pending} type="submit">
            {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Save password
          </Button>
        </div>
      </>
    </form>
  );
};
