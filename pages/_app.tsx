import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import { makeTouchEffect } from "@/libs/clients/useAnimation/helpers";

function MyApp({ Component, pageProps }: AppProps) {
  /**
   * Added Mouse click effect.
   */
  useEffect(() => {
    window.addEventListener("click", makeTouchEffect);
    return () => {
      window.removeEventListener("click", makeTouchEffect);
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
