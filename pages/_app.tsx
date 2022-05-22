import "../styles/globals.css";
import type { AppProps } from "next/app";
import WebLayout from "@/components/layouts/WebLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WebLayout>
      <Component {...pageProps} />
    </WebLayout>
  );
}

export default MyApp;
