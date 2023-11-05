import { setCustomerAccessToken } from "$store/utils/user.ts";
import { mkStoreFrontFetcher } from "$store/utils/storeFront.ts";
import { SHOPIFY_STOREFRONT_ACCESS_TOKEN, SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_NAME } from "$store/utils/secrets.ts";

export interface Props {
  email: string;
  password: string;
}

const action = async (
  props: Props,
  _req: Request,
  ctx: any,
): Promise<string | undefined> => {
  const fetcher = mkStoreFrontFetcher(
    SHOPIFY_STORE_NAME,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  );

  const data = await fetcher(`mutation customerAccessTokenCreate {
    customerAccessTokenCreate(input: {
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

  try {
    const token = data.customerAccessTokenCreate.customerAccessToken.accessToken;
    setCustomerAccessToken(ctx.response.headers, token);
    return token
  } catch (error) {
    return undefined
  }
};

export default action;
