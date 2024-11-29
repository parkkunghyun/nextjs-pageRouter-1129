
import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/bok-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    // 현재 브라우저의 요청에 대한 모든 정보 포함됨
    const q = context.query.q;
    const searchBooks = await fetchBooks(q as string);
    return {
        props: {
            searchBooks,
        },
    }
}

export default function Page({searchBooks}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <div>
            {searchBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
       </div>
    )
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}