import { useUI } from "deco-sites/account-shopify/sdk/useUI.ts";
import { UserInfo } from "deco-sites/account-shopify/types.ts";
import { invoke } from "../runtime.ts";
import { useCallback } from "preact/hooks";

interface Props {
  userInfo: UserInfo;
}

function LoginModal() {
  const { displayLoginModal } = useUI();

  const doLogin = useCallback(async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await invoke["deco-sites/account-shopify"].actions.user.login(
      {
        email,
        password,
      },
    );
    location.href = "/my-account";
  }, []);

  return (
    <div
      class={`${
        displayLoginModal.value ? "block" : "hidden"
      } top-12 absolute flex flex-col rounded-lg shadow-md bg-white p-10`}
    >
      <div class="w-full text-center font-bold">Entrar com e-mail e senha</div>
      <div class="border-t-[1px] my-7 border-gray-400" />
      {/* Create a form element that receives an email and a password and in the form submit it invokes doLogin */}

      <form
        class="flex flex-col gap-5 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (!e.target) {
            return;
          }
          const email = (e.target as any).email.value;
          const password = (e.target as any).password.value;
          doLogin({ email, password });
        }}
      >
        <input
          name="email"
          class="rounded-sm border-2 border-gray-300 p-2"
          placeholder={"E-mail"}
        />
        <input
          name="password"
          class="rounded-sm border-2 border-gray-300 p-2"
          placeholder={"Senha"}
        />
        <button
          class="bg-red-600 text-white px-5 py-2 rounded-lg w-min"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginModal;
