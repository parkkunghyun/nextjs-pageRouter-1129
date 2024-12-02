
import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/bok-item";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";

// GetStaticPropsContext에서는 query로 받을 수 없음 즉 쿼리를 받을 수 없음
// 대신 client에서 직접 진행해줄수는 있음
// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//     // 현재 브라우저의 요청에 대한 모든 정보 포함됨
//     const q = context.query.q;
//     const searchBooks = await fetchBooks(q as string);
//     return {
//         props: {
//             searchBooks,
//         },
//     }
// }



//export default function Page({searchBooks}: InferGetServerSidePropsType<typeof getServerSideProps>) {
export default function Page() {
    const [searchBooks, setBooks] = useState<BookData[]>([]);
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    useEffect(() => {
        if (q) {
            // 검색 결과를 불러오는 로직
            fetchSearchResult();
        }
    }, [q]);
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