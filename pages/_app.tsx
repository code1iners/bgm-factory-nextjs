import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";
import "@/assets/styles/globals.css";

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
