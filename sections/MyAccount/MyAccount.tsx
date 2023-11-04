import { SectionProps } from "deco/types.ts";
import MyAccountIsland from "$store/islands/MyAccount.tsx";
import { UserInfo, UserOrders } from "$store/types.ts";
import { getCustomerAccessToken } from "$store/utils/user.ts";
import {
  mkAdminFetcher,
  mkStoreFrontFetcher,
} from "$store/utils/storeFront.ts";

export interface Props {
  orders: UserOrders;
}

async function extractUserInfo(token?: string | null) {
  if (!token) {
    return null;
  }

  try {
    const fetcher = mkStoreFrontFetcher(
      "ramonetmal2",
      "79af056282d74bb4d717152572a3a7ec",
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

function parseOrders(orders: any[]): UserOrders {
  return orders.map((order) => {
    return {
      "@type": "UserOrder",
      id: order.id,
      createdAt: order.created_at,
      totalPrice: order.total_price,
      name: order.name,
      status: order.financial_status,
    };
  });
}

async function getCustomerOrders(customerId?: string | null) {
  if (!customerId) {
    return null;
  }

  try {
    const fetcher = mkAdminFetcher(
      "ramonetmal2",
      "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",
    );
    const data = await fetcher(`customers/${customerId}/orders.json`);

    const parsedOrders = parseOrders(data.orders);
    console.log("orders", parsedOrders);
    return parsedOrders;
  } catch (err) {
    return null;
  }
}

export async function loader(props: Props, _req: Request) {
  const token = getCustomerAccessToken(_req.headers);
  const userInfo = await extractUserInfo(token);
  const orders = await getCustomerOrders(userInfo?.customerId);

  return { orders };
}

function MyAccount({
  orders,
}: SectionProps<Awaited<ReturnType<typeof loader>>>) {
  return (
    <>
      <div>
        <MyAccountIsland orders={orders} />
      </div>
      <p>
        {JSON.stringify(orders, null, 2)}
      </p>
    </>
  );
}

export default MyAccount;