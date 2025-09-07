import { JWT_SECRET } from "@/constants/env";
import { SignJWT, jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secret = JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
};

export async function generateJWT(userId: string) {
  try {
    const jwt = await new SignJWT({ id: userId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30h")
      .sign(getJwtSecretKey());

    return jwt;
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("Failed to generate JWT");
  }
}

type DecodedJWT = {
  payload: { id: string; iat: number; exp: number };
  protectedHeader: { alg: string };
};

export async function verifyJWT(token: string): Promise<DecodedJWT> {
  const secret = getJwtSecretKey();
  return await jwtVerify(token, secret);
}
