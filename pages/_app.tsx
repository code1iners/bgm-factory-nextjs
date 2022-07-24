import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import "@/styles/globals.css";
import makeRotateEffect from "@/libs/clients/useAnimation/helpers/clickEffect/rotate-effect";

function MyApp({ Component, pageProps }: AppProps) {
  /**
   * Added Mouse click effect.
   */
  useEffect(() => {
    window.addEventListener("click", makeRotateEffect);
    return () => {
      window.removeEventListener("click", makeRotateEffect);
    };
  });

  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </RecoilRoot>
  );
}

export default MyApp;
