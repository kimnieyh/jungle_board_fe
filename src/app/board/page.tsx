'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

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
        sessionStorage.setItem('id','');
        router.push('/');
    }

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
                    <div role="status">
                        <svg aria-hidden="true"
                             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <>
                        {Array.isArray(posts) && posts.length === 0 ? (
                            <p>글 목록이 비어 있습니다.</p>
                        ) : (
                            <table className="table-auto w-full">
                                <thead>
                                <tr className="border-b text-lg font-bold mb-4">
                                    <th>제목</th>
                                    <th>글쓴이</th>
                                </tr>
                                </thead>
                                <tbody>
                                {posts.map(({id, title,name}) => (
                                    <tr key={id} className="border-b w-full space-y-2 ">
                                        <td>
                                            <Link href={`/board/${id}`}>
                                                <div className="text-blue-500 hover:underline m-4">{title}</div>
                                            </Link>
                                        </td>
                                        <td className="text-center">{name}</td>
                                    </tr>))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}

export default PostList;