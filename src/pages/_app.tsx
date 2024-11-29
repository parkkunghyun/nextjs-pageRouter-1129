import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

// component -> 페이지 역할을 할 컴포넌트
// pageProps -> component에 보낼 객체를 모아둠

type NextPageWithLayout = NextPage & {
  getLayout: (page: ReactNode) => ReactNode;
}

export default function App({ Component, pageProps }:
  AppProps & { Component: NextPageWithLayout }) {
  //console.log(Component.getLayout);

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );
}