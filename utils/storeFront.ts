import { fetchSafe } from "apps/utils/fetch.ts";

export const mkStoreFrontFetcher = (
  account: string,
  storefrontAccessToken: string,
): (_: string) => Promise<any> => {
  return async (query: string): Promise<any> => {
    const response = await fetchSafe(
      `https://${account}.myshopify.com/api/unstable/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
        body: JSON.stringify({
          query,
        }),
      },
    );

    const { data } = await response.json();

    return data;
  };
};
