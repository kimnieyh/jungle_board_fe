"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {useRouter} from "next/navigation";

function PostList() {
    const router = useRouter();
    // 글 목록을 저장할 상태 변수
    const [posts, setPosts] = useState([]);

    // 글 목록을 가져오는 함수
    useEffect(() => {
        // todo 실제로는 서버로부터 글 목록을 가져와야 하지만 예시를 위해 임시로 설정
        const fakePosts = [
            { id: 1, title: '첫 번째 글' },
            { id: 2, title: '두 번째 글' },
            { id: 3, title: '세 번째 글' },
            { id: 4, title: '네 번째 글' },
            { id: 5, title: '다섯 번째 글' },
        ];
        setPosts(fakePosts);
    }, []);

    function logout() {
        //todo 로그아웃 구현 필요
        router.push('/');
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-24">
            <header className="w-full mb-8">
                <div className="flex justify-between items-center py-4 px-8 bg-blue-500 text-white">
                    <div>
                        <Link href="/new-post">
                            <div className="text-lg font-bold hover:underline">글 작성</div>
                        </Link>
                    </div>
                    <div>
                        <button onClick={logout} className="text-lg font-bold hover:underline">로그아웃</button>
                    </div>
                </div>
            </header>
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h1 className="text-lg font-bold mb-4">글 목록</h1>
                <ul className="space-y-2">
                    {posts.map(post => (
                        <li key={post.id}>
                            <Link href={`/board/${post.id}`}>
                                <div className="text-blue-500 hover:underline">{post.title}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default PostList;