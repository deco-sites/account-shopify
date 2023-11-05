import { setCustomerAccessToken } from "deco-sites/account-shopify/utils/user.ts";

export interface Props {}

const action = async (
  _props: Props,
  _req: Request,
  ctx: any,
): Promise<void> => {
  setCustomerAccessToken(ctx.response.headers, "");
};

export default action;
