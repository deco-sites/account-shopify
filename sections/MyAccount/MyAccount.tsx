import { SectionProps } from "deco/types.ts";
import MyAccountIsland from "$store/islands/MyAccount.tsx";
import { Address, CustomerInfo, UserInfo, UserOrders } from "$store/types.ts";
import { getCustomerAccessToken } from "$store/utils/user.ts";
import {
  SHOPIFY_ACCESS_TOKEN,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
} from "$store/utils/secrets.ts";
import { useUI } from "$store/sdk/useUI.ts";
import {
  mkAdminFetcher,
  mkStoreFrontFetcher,
} from "$store/utils/storeFront.ts";
import { useEffect } from "preact/hooks";

export interface Props {}

async function extractUserInfo(token?: string | null) {
  if (!token) {
    return null;
  }

  try {
    const fetcher = mkStoreFrontFetcher(
      "ramonetmal2",
      SHOPIFY_STOREFRONT_ACCESS_TOKEN
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
    const customer: CustomerInfo = data.customer;
    const customerId = customer.id.split("/").pop();

    return {
      ...customer,
      customerId,
    };
  } catch (e) {
    console.log(e);
    return e;
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
      products: order.line_items.map((item: any) => {
        return item.product_id;
      }),
    };
  });
}

async function getCustomerOrders(customerId?: string | null) {
  if (!customerId) {
    return null;
  }

  try {
    const fetcher = mkAdminFetcher("ramonetmal2", SHOPIFY_ACCESS_TOKEN);
    const data = await fetcher(`customers/${customerId}/orders.json`);

    const parsedOrders = parseOrders(data.orders);
    return parsedOrders;
  } catch (err) {
    return null;
  }
}

async function getCustomerAddresses(customerId?: string | null) {
  if (!customerId) {
    return null;
  }

  try {
    const fetcher = mkAdminFetcher("ramonetmal2", SHOPIFY_ACCESS_TOKEN);
    const data = await fetcher(`customers/${customerId}/addresses.json`);
    return data?.addresses;
  } catch (err) {
    return null;
  }
}

async function getOrdersProductImages(orders?: UserOrders | null) {
  if (!orders) {
    return {};
  }

  const allProductIds = orders.reduce((acc: string[], order) => {
    return [...acc, ...order.products];
  }, []);

  if (allProductIds.length === 0) {
    return {};
  }

  const fetcher = mkAdminFetcher("ramonetmal2", SHOPIFY_ACCESS_TOKEN);

  const products = await fetcher(
    `products.json?ids=${allProductIds.join(",")}`
  );

  const productImages: Record<string, string> = {};
  products.products.forEach((product: any) => {
    productImages[product.id] = product.image.src;
  });

  return productImages;
}

export async function loader(props: Props, _req: Request) {
  const token = getCustomerAccessToken(_req.headers);
  const userInfo = await extractUserInfo(token);
  const orders = await getCustomerOrders(userInfo?.customerId);
  const addresses = await getCustomerAddresses(userInfo?.customerId);
  const productImages = await getOrdersProductImages(orders);
  return { orders, userInfo, productImages, addresses };
}

function MyAccount({
  orders,
  userInfo,
  productImages,
  addresses,
}: SectionProps<Awaited<ReturnType<typeof loader>>>) {
  return (
    <MyAccountIsland
      addresses={addresses}
      productImages={productImages}
      orders={orders}
      userInfo={userInfo}
    />
  );
}

export default MyAccount;
