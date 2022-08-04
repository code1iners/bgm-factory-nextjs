import Favicon from "@/components/favicon";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <Favicon />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.statically.io/gh/code1iners/ce1pers-content-provider-gulp/v0.0.0/dist/mouse-click-effects/index.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
