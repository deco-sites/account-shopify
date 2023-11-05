import { useEffect } from "preact/hooks";
import { invoke } from "../runtime.ts";

export default function GoogleOAuthUrlParser() {
  useEffect(() => {
    async function checkParamsAndLogin() {
      const url = new URL(window.location.href);
      const hash = url.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get("access_token");
      const state = params.get("state");
      if (token && state) {
        const stateObj = JSON.parse(state);
        if (stateObj.decoAuthProvider === "google") {
          await invoke["deco-sites/account-shopify"].actions.user.loginGoogle(
            {
              accessToken: token,
            },
          );
          history.replaceState({}, "", location.pathname);
          location.href = "/my-account";
        }
      }
    }
    checkParamsAndLogin();
  }, []);
  return null;
}
