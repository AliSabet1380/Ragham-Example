import { SignJWT, jwtVerify } from "jose";

import { JWT_SECRET, JWT_EXPIRES_IN } from "@constants";

import type { SessionPayload, Payload } from "@utils/cookie/cookie.types";

export const encode = async ({
  userId,
  role,
  expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000),
}: Payload): Promise<string> => {
  return await new SignJWT({ userId, role, expiresAt })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .setProtectedHeader({ alg: "HS256" })
    .sign(JWT_SECRET);
};

export const decode = async (
  session: string | undefined = ""
): Promise<SessionPayload | null> => {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (!payload) return null;

    return payload;
  } catch {
    return null;
  }
};

export const veifySession = async (
  session: string | undefined = ""
): Promise<SessionPayload | null> => {
  const payload = await decode(session);

  if (!payload) return null;

  const isExpired = new Date(payload.expiresAt).getTime() < Date.now();
  if (isExpired) return null;

  return payload;
};
