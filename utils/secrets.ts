export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = Deno.env.get(
  "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
) ?? "";
export const SHOPIFY_ACCESS_TOKEN = Deno.env.get("SHOPIFY_ACCESS_TOKEN") ?? "";
export const SHOPIFY_STORE_NAME = Deno.env.get("SHOPIFY_STORE_NAME") ?? "";