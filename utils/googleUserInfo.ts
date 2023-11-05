import { fetchSafe } from "apps/utils/fetch.ts";

export interface GoogleUserInfo {
  id: string;
  name: string;
  email: string;
  picture: string;
  locale: string;
  firstName: string;
  lastName: string;
}

export const getUserInfoFromGoogleToken = async (
  accessToken: string,
): Promise<GoogleUserInfo> => {
  const response = await fetchSafe(
    `https://www.googleapis.com/userinfo/v2/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();

  const googleUserInfo: GoogleUserInfo = {
    id: data.id,
    name: data.name,
    email: data.email,
    picture: data.picture,
    locale: data.locale,
    firstName: data.given_name,
    lastName: data.family_name,
  };

  return googleUserInfo;
};
