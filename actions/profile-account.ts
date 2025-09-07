"use server";

import { NEXT_PUBLIC_BASE_URL } from "@/constants/env";
import {
  ProfileResponseApiSchema,
  ProfileSchemaActions,
} from "@/schemas/actions";
import { cookies } from "next/headers";
import z from "zod";

type ActionStateType = {
  errors: {
    name?: string;
    email?: string;
  };
  response: {
    success: boolean;
    message: string;
    errors?: {
      name?: string;
      email?: string;
    };
  };
};

export async function profile(prevState: ActionStateType, formData: FormData) {
  const profileData = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
  };

  const profile = ProfileSchemaActions.safeParse(profileData);

  if (!profile.success) {
    const fieldErrors = z.flattenError(profile.error).fieldErrors;
    return {
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
      },
      response: prevState.response,
    };
  }

  const token = (await cookies()).get("LIFEOS_TOKEN")?.value;

  if (!token) {
    return {
      errors: {
        currentPassword: "User not authenticated.",
      },
      response: prevState.response,
    };
  }

  const url = `${NEXT_PUBLIC_BASE_URL}/api/auth/user`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      token: token,
    },
    body: JSON.stringify(profile.data),
  });

  const data = await req.json();

  if (req.status !== 200) {
    return {
      errors: {},
      response: {
        success: false,
        message: data.message,
        errors: data.errors,
      },
    };
  }

  const responseApi = ProfileResponseApiSchema.safeParse(data);

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
    errors: {},
    response: {
      success: true,
      message: responseApi.data.message,
    },
  };
}
