import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import { signal } from "@preact/signals";
import { useCallback, useState } from "preact/hooks";
import { useUI } from "deco-sites/account-shopify/sdk/useUI.ts";

function Navbar({ items, searchbar, logo }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();
  // const { count } = useUI();
  const [count, setCount] = useState(0)
  const handleCount = useCallback(() => {
    console.log('afoijasofidsa')
    setCount(count+1)
    // count.value = count.value+1
  }, [])

  return (
    <>
        <div class="flex-none w-44 flex items-center justify-end gap-2">

          <div>{`count: ${count}`}</div>
          <button
            class="btn btn-circle btn-sm btn-ghost"
            onClick={handleCount}
            aria-label="Log in"
          >
            <Icon id="User" size={24} strokeWidth={0.4} />
          </button>
        </div>
    </>
  );
}

export default Navbar;
