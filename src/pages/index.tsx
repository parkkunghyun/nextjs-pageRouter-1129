// import './index.css';
// global css를 app component에서만 가져올 수 있다!! 

import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";


export default function Home() {
  return (
    <>
      <h1 className={style.h1}>index</h1>
      <h2 className={style.h2} >H2</h2>
    </>
  );
}

// js모든 함수는 객체임 그래서 메서드를 추가할 수 있음
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}