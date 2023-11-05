import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function UserButton() {
  const { displayLoginModal } = useUI();

  return (
    <>
      <Button
        class="btn-circle btn-sm btn-ghost hidden sm:block"
        aria-label="search icon button"
        onMouseOver={() => {
          displayLoginModal.value = true
        }} 
      >
        <Icon id="User" size={24} strokeWidth={0.4} />
      </Button>
    </>
  );
}
