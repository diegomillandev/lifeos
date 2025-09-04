import { RegisterForm } from "@/components/pages/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LifeOS | Register",
}

export default function RegisterPage() {
  return (
    <RegisterForm />
  )
}