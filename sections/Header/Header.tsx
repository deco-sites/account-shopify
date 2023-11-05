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
import {
  mkAdminFetcher,
  mkStoreFrontFetcher,
} from "$store/utils/storeFront.ts";
import GoogleOAuthUrlParser from "$store/islands/GoogleOAuthUrlParser.tsx";

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
      <GoogleOAuthUrlParser />
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-50">
            <Alert alerts={alerts} />
            <Navbar
              userInfo={userInfo}
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
