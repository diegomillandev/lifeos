"use server";

import { NEXT_PUBLIC_BASE_URL } from "@/constants/env";
import { cookies } from "next/headers";

export async function getUser() {
  try {
    const token = (await cookies()).get("LIFEOS_TOKEN")?.value;
    if (!token) return null;

    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/auth/check`, {
      headers: { token },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.success) return null;

    return {
      id: data.user._id,
      email: data.user.email ?? null,
      name: data.user.name ?? null,
    };
  } catch (err) {
    console.error("getUserAction failed", err);
    return null;
  }
}