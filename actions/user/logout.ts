import { mkStoreFrontFetcher } from "$store/utils/storeFront.ts";
import { SHOPIFY_STOREFRONT_ACCESS_TOKEN, SHOPIFY_STORE_NAME } from "$store/utils/secrets.ts";
import { setCustomerAccessToken } from "deco-sites/account-shopify/utils/user.ts";

export interface Props {
  email: string;
  password: string;
}

const action = async (
  props: Props,
  _req: Request,
  ctx: any,
): Promise<void> => {
  const fetcher = mkStoreFrontFetcher(
    SHOPIFY_STORE_NAME,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  );
  fetcher(`mutation customerAccessTokenDelete {
    customerAccessTokenDelete(input: {
      email: "${props.email}",
      password: "${props.password}"
    }) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }`);
  setCustomerAccessToken(ctx.response.headers, "");
};

export default action;
