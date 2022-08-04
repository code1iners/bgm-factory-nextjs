import { Html, Head, Main, NextScript } from "next/document";
import Favicon from "@/components/favicon";
import CustomCdn from "@/components/custom-cdn";

export default function Document() {
  return (
    <Html>
      <Head>
        <Favicon />
        <CustomCdn />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
