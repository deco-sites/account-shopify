import {
  getUserInfoFromGoogleToken,
  GoogleUserInfo,
} from "$store/utils/googleUserInfo.ts";
import {
  mkAdminFetcher,
  mkStoreFrontFetcher,
} from "$store/utils/storeFront.ts";
import {
  SHOPIFY_ACCESS_TOKEN,
  SHOPIFY_STORE_NAME,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
} from "$store/utils/secrets.ts";
import loginShopify from "./loginShopify.ts";

export interface Props {
  accessToken: string;
}

const DECO_STABLE_PASS = "DECO_STABLE_PASS";

async function ensureShopifyCustomerExists(googleUser: GoogleUserInfo) {
  try {
    const fetcher = mkStoreFrontFetcher(
      SHOPIFY_STORE_NAME,
      SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    );

    const data = await fetcher(
      `mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
          }
          customerUserErrors {
            message
          }
        }
      }`,
      {
        input: {
          email: googleUser.email,
          password: DECO_STABLE_PASS,
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
        },
      },
    );

    const customerId = data.customerCreate.customer.id;

    return customerId;
  } catch (err) {
    console.log(err);
  }
}

const action = async (
  props: Props,
  _req: Request,
  ctx: any,
): Promise<void> => {
  const googleUser = await getUserInfoFromGoogleToken(props.accessToken);
  console.log("googleUser", googleUser);
  await ensureShopifyCustomerExists(googleUser);
  console.log("ensured");
  await loginShopify(
    {
      email: googleUser.email,
      password: DECO_STABLE_PASS,
    },
    _req,
    ctx,
  );
};

export default action;
