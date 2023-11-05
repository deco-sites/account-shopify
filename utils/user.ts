import { getCookies, setCookie } from "std/http/cookie.ts";

const AUTH_COOKIE = "customer_access_token";

const ONE_WEEK_MS = 7 * 24 * 3600 * 1_000;

export const getCustomerAccessToken = (
  headers: Headers,
): string | undefined => {
  const cookies = getCookies(headers);

  return cookies[AUTH_COOKIE];
};

export const setCustomerAccessToken = (headers: Headers, userToken: string) =>
  setCookie(headers, {
    name: AUTH_COOKIE,
    value: userToken,
    path: "/",
    expires: new Date(Date.now() + ONE_WEEK_MS),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
