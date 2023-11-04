import { SectionProps } from "deco/types.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "$store/components/header/Alert.tsx";
import Navbar from "$store/components/header/Navbar.tsx";
import { headerHeight } from "$store/components/header/constants.ts";
import { UserInfo, UserOrders } from "$store/types.ts";
import { getCustomerAccessToken } from "$store/utils/user.ts";
import { mkStoreFrontFetcher, mkAdminFetcher } from "$store/utils/storeFront.ts";

export interface Props {
  alerts: string[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };

  userInfo: UserInfo | null;
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

export async function loader(
  props: Props,
  _req: Request,
  ctx: any,
): Promise<Props> {
  const token = getCustomerAccessToken(_req.headers);

  return {
    ...props,
    userInfo: await extractUserInfo(token),
  };
}

function Header({
  alerts,
  searchbar,
  navItems,
  logo,
  userInfo,
}: SectionProps<Awaited<ReturnType<typeof loader>>>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <p>{JSON.stringify(userInfo)}</p>
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-50">
            <Alert alerts={alerts} />
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
