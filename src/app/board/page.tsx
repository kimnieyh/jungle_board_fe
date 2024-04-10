'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { throws } from "assert";

function PostList() {
    const router = useRouter();
    // 글 목록을 저장할 상태 변수
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 글 목록을 가져오는 함수
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/mysql/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function logout() {
        //todo 로그아웃 구현 필요
        router.push('/');
    }

    return (
        <main className="flex flex-col items-center min-h-screen p-24 mt-0">
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
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    (Array.isArray(posts) && posts.length == 0) ? (
                        <p>글 목록이 비어 있습니다.</p>
                    ) : (
                        <ul className="space-y-2">
                            {posts.map(post => (
                                <li key={post.id}>
                                    <Link href={`/board/${post.id}`}>
                                        <div className="text-blue-500 hover:underline">{post.title}</div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
        </main>
    );
}

export default PostList;