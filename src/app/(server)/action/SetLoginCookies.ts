"use server";
import { cookies } from "next/headers";

export const SetLoginCookies = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const cookieStore = cookies();
  cookieStore.set("email", email);
  cookieStore.set("password", password);
  return {
    email,
    password,
  };
};
