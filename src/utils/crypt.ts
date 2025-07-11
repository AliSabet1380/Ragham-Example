import { genSalt, hash, compare } from "bcryptjs";

export const hashPassword = async (
  password: string,
  saltRound: number = 10
): Promise<string> => {
  const salt = await genSalt(saltRound);
  return await hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => await compare(password, hashPassword);
