import { mkStoreFrontFetcher } from "./storeFront.ts";
import {
  SHOPIFY_ACCESS_TOKEN,
  SHOPIFY_STORE_NAME,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
} from "$store/utils/secrets.ts";

export async function extractUserInfo(token?: string | null) {
  if (!token) {
    return null;
  }

  try {
    const fetcher = mkStoreFrontFetcher(
      SHOPIFY_STORE_NAME,
      SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    );

    const data = await fetcher(`query {
      customer(customerAccessToken: "${token}") {
        id
        firstName
        lastName
        acceptsMarketing
        email
        phone
      }
    }`);

    const customer = data.customer;
    const customerId = customer.id.split("/").pop();

    return {
      ...customer,
      customerId,
    };
  } catch (e) {
    return null;
  }
}
