"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { InputPassword } from "./input-password";
import { useActionState, useEffect, useState } from "react";
import { login } from "@/actions/login-account";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [borderRed, setBorderRed] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [state, dispatch, pending] = useActionState(login, {
    errors: {},
    response: {
      success: false,
      message: "",
    },
  });

  useEffect(() => {
    if (state.response.success) {
      toast.success(state.response.message);
      setBorderRed(false);
      setFormData({ email: "", password: "" });

      const timer = setTimeout(() => {
        router.push("/auth/login");
      }, 2000);

      return () => clearTimeout(timer);
    } else if (state.response.message) {
      toast.error(state.response.message);
    }
  }, [state.response, router]);

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={cn(
                    borderRed && state.errors.email && "border-red-500"
                  )}
                  value={formData.email}
                  placeholder="millan@example.com"
                  required
                />
              </div>
              <InputPassword
                label="Password"
                name="password"
                placeholder="Your password"
                borderRed={borderRed}
                error={!!state.errors.password}
                setValue={(value) =>
                  setFormData({ ...formData, password: value })
                }
              />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={pending}>
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="underline underline-offset-4"
              >
                Signup
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
