// import './index.css';
// global css를 app component에서만 가져올 수 있다!! 

import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";

import book from "@/mock/books.json"; // @기호는 ts의 프로젝트 src 폴더를 가리키는 경로
import BookItem from "@/components/bok-item";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3 className={style.h3}>지금 추천하는 도서</h3>
        {book.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3 className={style.h3}>등록된 모든 도서</h3>
        {book.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

// js모든 함수는 객체임 그래서 메서드를 추가할 수 있음
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}