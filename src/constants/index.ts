export const PORT = process.env.PORT || 5000;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
