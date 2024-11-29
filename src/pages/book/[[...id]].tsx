import { useRouter } from "next/router"

export default function Page() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <h1>book {id}</h1>
        </div>
    )
}
// [id].tsx에서는 http://localhost:3000/book/2/222 -> 한번 더 들어가는건 안됨
// [...id].tsx에서는 http://localhost:3000/book/2/222 -> 2222로 나옴
// 위의 방식을 catch all segment라고 있어보이게 부른다고 함!

// /book 으로 그냥 인덱스면 index.tsx아니면 대응이 안됨 
// [[...id]].tsx면 걍 모든게 다 됨!!
// optional catch all segment라는 최종복 

