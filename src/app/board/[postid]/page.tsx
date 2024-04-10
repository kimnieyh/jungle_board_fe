'use client'

import {useRouter} from "next/navigation";
import Link from "next/link";
import {useEffect, useState} from "react";

function PostView({params}:{params:{postid:string}}) {
    const router = useRouter();
    const [post,setPost] = useState([{
        title: '',
        content:'',
    }])
    useEffect(() => {
        async function fetchData(){
            try {
                console.log(params.postid);
                const response = await fetch(`/api/mysql/post?id=${params.postid}`);
                const data = await response.json();
                setPost(data);
            }catch (error) {
                console.error('Error fetching data:',error);
            }
        }
        fetchData();
    },[]);
    function logout() {
        sessionStorage.setItem('id','');
        router.push('/');
    }

    return (
        <main className="flex flex-col items-center min-h-screen p-24 mt-0">
            <header className="w-full mb-8">
                <div className="flex justify-between items-center py-4 px-8 bg-blue-500 text-white">
                    <div>
                        <Link href="/board">
                            <div className="text-lg font-bold hover:underline">글 목록</div>
                        </Link>
                    </div>
                    <div>
                        <button onClick={logout} className="text-lg font-bold hover:underline">로그아웃</button>
                    </div>
                </div>
            </header>
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <div
                    id="title"
                    className="mb-2 block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                    {post[0].title}
                </div>

                <div id="content"
                     className="resize-none h-56 pl-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {post[0].content}</div>
                <div className="flex h-8 mb-6">
                    <input
                        className="pl-4 placeholder:italic border border-slate-300 w-full mt-5 h-full rounded-lg"
                        type="text"
                        placeholder="댓글을 입력하세요"
                    />
                    <button
                        className="h-full w-1/6 text-center text-sm bg-blue-500 ml-3 rounded-lg mt-5 font-bold text-white"
                    >작성</button>
                </div>
            </div>
        </main>
    );
}

export default PostView;