import { useRouter } from "next/router"
import style from "./[id].module.css";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import { notFound } from "next/navigation";
import Head from "next/head";


export const getStaticPaths = () => {

    return {
        paths: [
            { params: { id: "1" } },
            {params: {id: "2"}},
            {params: {id: "3"}},
        ],

        //대체 즉 예외상황에 대비하는 보함
        //fallback: false // not-found로 보내버림

        //fallback: "blocking", // blocking은 ssr방식으로 생성 즉 이것도 정적페이지로 저장을 해버림
        // 역시나 이것도 서버의 문제가 있다면 사전 렌더링이 오래걸림!!

        fallback: true, // 일단 props없는 부분들만 먼저 보냄 ssg + 그리고 데이터 줌 ssr
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;

    const oneBook = await fetchOneBook(Number(id));

    if (!oneBook) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            oneBook
        }
    };
}

export default function Page({oneBook}: InferGetStaticPropsType<typeof getStaticProps>) {
    // const mockData = {
    //     "id": 1,
    //     "title": "한 입 크기로 잘라 먹는 리액트",
    //     "subTitle": "자바스크립트 기초부터 애플리케이션 배포까지",
    //     "description": "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
    //     "author": "이정환",
    //     "publisher": "프로그래밍인사이트",
    //     "coverImgUrl": "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg"
    // };

    const router = useRouter();
    if (router.isFallback) {
        return (<>
            <Head>
                <title>한입북스</title>
                <meta property="og:image" content="/thumbnail.png" />
                <meta property="og:title" content="한입북스" />
                <meta property="og:description" content="한입 북스에 등록된 도서를 만나보세요" />
            </Head>
            "데이터를 로딩 중입니다..."
        </>)
    };
    if (!oneBook) return "book이 없습니다";
    const { id, title, subTitle, description, author, publisher, coverImgUrl } = oneBook;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:image" content={coverImgUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
            </Head>
            <div className={style.container}>
            <div className={style.cover_img_container}  style={{ backgroundImage: `url('${coverImgUrl}')` }}>
                <img src={coverImgUrl} alt="" />
            </div>

            <div className={style.title} >{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>{author} | {publisher}</div>
            <div className={style.description}>{description}</div>
        </div>
        </>
    )
}
// [id].tsx에서는 http://localhost:3000/book/2/222 -> 한번 더 들어가는건 안됨
// [...id].tsx에서는 http://localhost:3000/book/2/222 -> 2222로 나옴
// 위의 방식을 catch all segment라고 있어보이게 부른다고 함!

// /book 으로 그냥 인덱스면 index.tsx아니면 대응이 안됨 
// [[...id]].tsx면 걍 모든게 다 됨!!
// optional catch all segment라는 최종복 

