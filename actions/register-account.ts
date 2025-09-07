"use server";

import { NEXT_PUBLIC_BASE_URL } from "@/constants/env";
import {
  RegisterResponseApiSchema,
  RegisterSchemaActions,
} from "@/schemas/actions";
import z from "zod";

type ActionStateType = {
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
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

export async function register(prevState: ActionStateType, formData: FormData) {
  const registerData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // validate data
  const register = RegisterSchemaActions.safeParse(registerData);
  if (!register.success) {
    const fieldErrors = z.flattenError(register.error).fieldErrors;
    return {
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      },
      response: {
        success: false,
        message: "Please fix the errors below and try again.",
      },
    };
  }

  // register user
  const url = `${NEXT_PUBLIC_BASE_URL}/api/auth/register`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(register.data),
  });

  const json = await req.json();

  if (req.status !== 201) {
    return {
      errors: prevState.errors,
      response: {
        success: false,
        message: json.message || "Something went wrong. Please try again.",
      },
    };
  }

  const responseApi = RegisterResponseApiSchema.parse(json);

  if (!responseApi.success) {
    return {
      errors: prevState.errors,
      response: {
        success: false,
        message: "Something went wrong. Please try again.",
      },
    };
  }

  return {
    errors: prevState.errors,
    response: {
      success: true,
      message: responseApi.message,
    },
  };
}
