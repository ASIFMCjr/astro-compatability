"use server";

import { cookies } from "next/headers";

export const setTokens = (access_token: string, refresh_token: string) => {
  cookies().set("refresh_token", refresh_token, { secure: true });
  cookies().set("access_token", access_token);
};

export const getTokens = () => {
  const access_token = cookies().get("access_token")?.value;
  return { access_token: access_token || "" };
};
