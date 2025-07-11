import type { JWTPayload } from "jose";

export interface Payload {
  userId: string;
  expiresAt?: Date;
  role?: string;
}

export interface SessionPayload extends JWTPayload {
  userId: string;
  expiresAt: Date;
  role?: string;
}
