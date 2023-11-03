import { useUI } from "deco-sites/account-shopify/sdk/useUI.ts";

function LoginModal() {
  const { displayLoginModal } = useUI()

  return (
    <div class={`${displayLoginModal.value ? "block" : "hidden"} top-12 absolute flex flex-col rounded-lg shadow-md bg-white p-10`}>
      <div class="w-full text-center font-bold">Entrar com e-mail e senha</div>
      <div class="border-t-[1px] my-7 border-gray-400" />
      <div class="flex flex-col gap-5 items-center">
        <input
          class="rounded-sm border-2 border-gray-300 p-2"
          placeholder={"E-mail"}
        />
        <input
          class="rounded-sm border-2 border-gray-300 p-2"
          placeholder={"Senha"}
        />
        <button class="bg-red-600 text-white px-5 py-2 rounded-lg w-min">
          Entrar
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
