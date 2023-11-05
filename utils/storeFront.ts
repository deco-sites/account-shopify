import { fetchSafe } from "apps/utils/fetch.ts";

export const mkAdminFetcher = (
  account: string,
  adminApiKey: string,
): (
  endpoint: string,
  method?: string,
  version?: string,
  body?: string,
) => Promise<any> => {
  return async (
    endpoint: string,
    method: string = "GET",
    version: string = "2023-10",
    body?: string,
  ): Promise<any> => {
    const url =
      `https://${account}.myshopify.com/admin/api/${version}/${endpoint}`;
    const response = await fetchSafe(
      url,
      {
        method,
        headers: {
          "X-Shopify-Access-Token": adminApiKey,
        },
        body,
      },
    );
    const data = await response.json();

    return data;
  };
};

export const mkStoreFrontFetcher = (
  account: string,
  storefrontAccessToken: string,
): (query: string, variables?: any) => Promise<any> => {
  return async (query: string, variables?: any): Promise<any> => {
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
          variables,
        }),
      },
    );

    const { data } = await response.json();

    return data;
  };
};
