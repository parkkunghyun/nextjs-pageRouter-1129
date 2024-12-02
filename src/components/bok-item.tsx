import type { BookData } from "@/types"
import Link from "next/link"
import style from './book-item.module.css';

export default function BookItem({
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl
}: BookData) {
    // Mock Data - 임시 데이터를 만들게 됨
    return (
        <Link href={`/book/${id}`} className={style.container}>
            <img src={coverImgUrl} alt="book-img" />
            <div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <br />
                <div className={style.author}>{author} | {publisher}</div>
            </div>
        </Link>
    )
}