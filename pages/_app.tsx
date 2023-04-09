import { NotificationContextProvider } from "@/common/store/notification-context";
import Layout from "@/components/ui/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Component {...pageProps} />
    </NotificationContextProvider>
  );
}
