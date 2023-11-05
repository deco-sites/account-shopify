import { useUI } from "deco-sites/account-shopify/sdk/useUI.ts";
import { UserInfo } from "deco-sites/account-shopify/types.ts";
import { invoke } from "../runtime.ts";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

const OAUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const OAUTH_SCOPE = "profile email openid";
const REDIRECT_URI = "http://localhost:8000";

export function triggerLoginGoogle() {
  const params = new URLSearchParams({
    client_id:
      "983586597102-fnjbm1i6k5f37psvs06o9igplh177pui.apps.googleusercontent.com",
    redirect_uri: REDIRECT_URI,
    response_type: "token",
    scope: OAUTH_SCOPE,
    state: JSON.stringify({
      decoAuthProvider: "google",
    }),
  });
  window.location.href = `${OAUTH_ENDPOINT}?${params.toString()}`;
}

interface Props {
  userInfo?: UserInfo | null;
}

function LoginModal(props: Props) {
  const { displayLoginModal, selectedMyAccountTab } = useUI();
  const { userInfo } = props;
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const doLogin = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoading(true);
      setHasError(false);
      const token = await invoke[
        "deco-sites/account-shopify"
      ].actions.user.loginShopify({
        email,
        password,
      });
      setIsLoading(false);
      if (token) {
        location.href = "/my-account";
      } else {
        setHasError(true);
      }
    },
    []
  );

  const doLogout = useCallback(async () => {
    await invoke["deco-sites/account-shopify"].actions.user.logout();
    location.href = "/";
  }, []);

  const ref = useRef<any>(null);

  const handleClickOutside = useCallback(
    (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        displayLoginModal.value = false;
      }
    },
    [ref]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside, displayLoginModal]);

  return (
    <div
      ref={ref}
      class={`${
        displayLoginModal.value ? "block" : "hidden"
      } top-12 absolute flex flex-col rounded-lg shadow-md bg-white p-10`}
    >
      <div class="w-full text-center font-bold">
        {userInfo ? `Olá ${userInfo.firstName}!` : "Entrar com e-mail e senha"}
      </div>
      <div class="border-t-[1px] my-7 border-gray-400" />
      {/* Create a form element that receives an email and a password and in the form submit it invokes doLogin */}
      {userInfo ? (
        <div class="flex flex-col w-40 gap-5">
          <a
            class="underline text-sm text-gray-600 whitespace-nowrap"
            href="/my-account#option=Dados"
            onClick={() => {
              selectedMyAccountTab.value = "Dados";
            }}
          >
            Minha Conta
          </a>
          <a
            class="underline text-sm text-gray-600 whitespace-nowrap"
            href="/my-account#option=Pedidos"
            onClick={() => {
              selectedMyAccountTab.value = "Pedidos";
            }}
          >
            Meus Pedidos
          </a>
          <button
            onClick={doLogout}
            class="underline text-xs text-gray-600 whitespace-nowrap self-end"
            href="/my-account"
          >
            Sair
          </button>
        </div>
      ) : (
        <>
          <div>
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
                type="password"
                class="rounded-sm border-2 border-gray-300 p-2"
                placeholder={"Senha"}
              />
              <button
                class="bg-red-600 text-white h-[56px] hover:opacity-90 px-5 min-w-[350px] text-center py-2 rounded-lg w-min disabled:bg-gray-800 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Carregando..." : "Entrar"}
              </button>
            </form>
            {hasError && (
              <div class="w-full text-red-700 text-sm text-center mt-5">
                Algo de errado aconteceu, tente novamente.
              </div>
            )}
          </div>
          <div>
            <button
              class="flex flex-row justify-center mt-2 hover:opacity-90 items-center bg-blue-600 text-white px-5 min-w-[350px] text-center py-2 rounded-lg"
              onClick={triggerLoginGoogle}
            >
              <img
                class="h-[40px]"
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              />
              <p>Logar com Google</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default LoginModal;
