import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function UserButton() {
  const { count } = useUI();

  return (
    <>
      <Button
        class="btn-circle btn-sm btn-ghost hidden sm:block"
        aria-label="search icon button"
        onClick={() => {
          console.log("ramon")
        }}
      >
        RAMON<Icon id="MagnifyingGlass" size={24} strokeWidth={0.1} />
      </Button>
    </>
  );
}
