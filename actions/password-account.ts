"use server";

import { NEXT_PUBLIC_BASE_URL } from "@/constants/env";
import { ChangePasswordSchemaActions } from "@/schemas/actions";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: {
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  };
  response: {
    success: boolean;
    message: string;
    errors?: {
      currentPassword?: string[];
      newPassword?: string[];
      confirmNewPassword?: string[];
    };
  };
};

export async function passwordAccount(
  prevState: ActionStateType,
  formData: FormData
) {
  const passwordData = {
    currentPassword: formData.get("currentPassword") as string,
    newPassword: formData.get("newPassword") as string,
    confirmNewPassword: formData.get("confirmNewPassword") as string,
  };

  const password = ChangePasswordSchemaActions.safeParse(passwordData);

  if (!password.success) {
    const fieldErrors = password.error.flatten().fieldErrors;

    return {
      errors: {
        currentPassword: fieldErrors.currentPassword?.[0],
        newPassword: fieldErrors.newPassword?.[0],
        confirmNewPassword: fieldErrors.confirmNewPassword?.[0],
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

  const url = `${NEXT_PUBLIC_BASE_URL}/api/auth/change-password`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      token: token,
    },
    body: JSON.stringify(password.data),
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

  console.log(data);

  return {
    errors: {},
    response: { success: true, message: data.message },
  };
}
