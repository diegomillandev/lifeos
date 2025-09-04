"use server";

import { NEXT_PUBLIC_BASE_URL } from "@/constants/env";
import { LoginResponseApiSchema, LoginSchemaActions } from "@/schemas/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

type ActionStateType = {
  errors: {
    email?: string;
    password?: string;
  };
  response: {
    success: boolean;
    message: string;
    errors?: {
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
    };
  };
};

export async function login(prevState: ActionStateType, formData: FormData) {
  const loginData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const login = LoginSchemaActions.safeParse(loginData);

  if (!login.success) {
    const fieldErrors = z.flattenError(login.error).fieldErrors;
    return {
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
      response: {
        success: false,
        message: "Please fix the errors below and try again.",
      },
    };
  }

  const url = `${NEXT_PUBLIC_BASE_URL}/api/auth/login`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login.data),
  });

  const json = await req.json();

  if (req.status !== 200) {
    return {
      errors: prevState.errors,
      response: {
        success: false,
        message: json.message || "Something went wrong. Please try again.",
      },
    };
  }

  const responseApi = LoginResponseApiSchema.parse(json);

  (await cookies()).set({
    name: "LIFEOS_TOKEN",
    value: responseApi.token,
    httpOnly: true,
    path: "/",
  });

  redirect("/")
  
  return {
    errors: prevState.errors,
    response: {
      success: responseApi.success,
      message: responseApi.message,
    },
  };
}
