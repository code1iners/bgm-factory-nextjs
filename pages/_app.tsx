import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { RecoilRoot, useRecoilValue } from "recoil";
import { useEffect } from "react";
import "@/styles/globals.css";
import makeRotateEffect from "@/libs/clients/useAnimation/helpers/clickEffect/rotate-effect";
import { isDarkAtom } from "@/stores/configs/darkMode";

function MyApp({ Component, pageProps }: AppProps) {
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
