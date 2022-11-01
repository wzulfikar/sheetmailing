import type { AppProps } from "next/app";
import Head from "next/head";
import { HamburgerProvider } from "src/mailing/components/HamburgerContext";

import "../styles/globals.css";

export default function Mailing({ Component, pageProps }: AppProps) {
  return (
    <HamburgerProvider>
      <Head>
        <title>SheetMailing</title>
      </Head>
      <Component {...pageProps} />
    </HamburgerProvider>
  );
}
