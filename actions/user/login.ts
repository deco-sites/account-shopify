import { setCustomerAccessToken } from "deco-sites/account-shopify/utils/user.ts";
import { mkStoreFrontFetcher } from "deco-sites/account-shopify/utils/storeFront.ts";

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
    "ramonetmal2",
    "79af056282d74bb4d717152572a3a7ec",
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
    const token =
      data.customerAccessTokenCreate.customerAccessToken.accessToken;

    console.log("set customer token", token);
    setCustomerAccessToken(ctx.response.headers, token);
  } catch (error) {
  }
};

export default action;
