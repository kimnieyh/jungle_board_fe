'use client'
import Link from "next/link";
import {useRouter} from "next/navigation";

function NewPost(){
    const router = useRouter();
    function logout() {
        //todo 로그아웃 구현 필요
        router.push('/');
    }
    return(
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
                <form>
                    <label htmlFor="title" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                        새 글 작성</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="mb-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="제목을 입력해 주세요"
                    />

                    <textarea id="content" name="content"
                              className="resize-none h-56 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="내용을 입력해 주세요"></textarea>
                    <div className="text-end">
                        <button type="submit" className="rounded-full bg-blue-500 h-12 w-20 text-white font-bold mt-3">저장</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default NewPost;