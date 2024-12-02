// import './index.css';
// global css를 app component에서만 가져올 수 있다!! 

import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";

import book from "@/mock/books.json"; // @기호는 ts의 프로젝트 src 폴더를 가리키는 경로
import BookItem from "@/components/bok-item";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// getStaticProps는 SSG방식으로 변형해줌
export const getStaticProps = async () => {
  console.log("인덱스 페이지");

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ])

  return {
    props: {
      allBooks,
      recoBooks,
    }
  }
};

export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  // 이것도 서버에서 먼저 실행되고 그 다음에 브라우저에서 실행됨!!
  // hydration때 한번 더 실행됨
  // console.log(allBooks);
  // window.location; -> 그래서 이것도 안됨!!

  // useEffect(() => {
  //   console.log(window); // 컴포넌트가 마운트 이후에 가능
  // }, []);

  return (
    <div className={style.container}>
      <section>
        <h3 className={style.h3}>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3 className={style.h3}>등록된 모든 도서</h3>
        {allBooks.map((book) => (
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