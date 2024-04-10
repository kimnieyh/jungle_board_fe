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

    // @ts-ignore
    // @ts-ignore
    return (
        <main className="flex flex-col items-center min-h-screen p-24 mt-0">
            <header className="w-full mb-8">
                <div className="flex justify-between items-center py-4 px-8 bg-blue-500 text-white">
                    <div>
                        <Link href="/board/new-post">
                            <div className="text-lg font-bold hover:underline">글 작성</div>
                        </Link>
                    </div>
                    <div>
                        <button onClick={logout} className="text-lg font-bold hover:underline">로그아웃</button>
                    </div>
                </div>
            </header>
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="table-auto w-full">
                        {Array.isArray(posts) && posts.length === 0 ? (
                            <tbody>
                            <tr>
                                <td>글 목록이 비어 있습니다.</td>
                            </tr>
                            </tbody>
                        ) : (
                            <>
                                <thead>
                                <tr className="border-b text-lg font-bold mb-4">
                                    <th>제목</th>
                                    <th>글쓴이</th>
                                </tr>
                                </thead>
                                <tbody>
                                {posts.map(({id, title}) => (
                                    <tr key={id} className="border-b w-full space-y-2 ">
                                        <td>
                                            <Link href={`/board/${id}`}>
                                                <div className="text-blue-500 hover:underline m-4">{title}</div>
                                            </Link>
                                        </td>
                                        <td className="text-center">작성자</td> {/* post에 작성자 정보가 있다면 post.author 로 수정*/}
                                    </tr>
                                ))}
                                </tbody>
                            </>
                        )}
                    </table>
                )}
            </div>
        </main>

    );
}

export default PostList;