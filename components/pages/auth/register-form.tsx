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
import { InputPassword } from "./input-password";
import { register } from "@/actions/register-account";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const [borderRed, setBorderRed] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [state, dispatch, pending] = useActionState(register, {
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
      setFormData({ email: "", password: "", confirmPassword: "" });

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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3 relative">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="millan@example.com"
                  required
                  className={cn(borderRed && state.errors.email && "border-red-500")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <InputPassword
                label="Password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                error={!!state.errors.password}
                borderRed={borderRed}
                setValue={(value) =>
                  setFormData({ ...formData, password: value })
                }
              />
              <InputPassword
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                error={!!state.errors.confirmPassword}
                value={formData.confirmPassword}
                borderRed={borderRed}
                setValue={(value) =>
                  setFormData({ ...formData, confirmPassword: value })
                }
              />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={pending}>
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/auth/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
