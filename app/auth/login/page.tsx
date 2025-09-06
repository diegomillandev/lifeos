import { LoginForm } from "@/components/pages/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LifeOS | Login",
}

export default function LoginPage() {
  return (
    <LoginForm />
  )
}