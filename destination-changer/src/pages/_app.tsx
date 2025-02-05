import "../styles/global.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
  <Component {...pageProps} />
  </SessionProvider>
  );
};

export default MyApp;