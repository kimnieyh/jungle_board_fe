'use client'

import {useRouter} from "next/navigation";
import Link from "next/link";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
// @ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function PostView({params}:{params:{postid:string}}) {
    const router = useRouter();
    const [post,setPost] = useState([{
        title: '',
        content:'',
        comment_id:'',
        comment:'',
        author:'',
    }]);
    const [formData, setFormData] = useState({
        comment: '',
        author: sessionStorage.getItem('id'),
        postId: params.postid,
    });
    const [submitted, setSubmitted] = useState(false);
    const [inputValue, setInputValue] = useState('');
// todo useRef : form data input data 같은 경우에!!
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData(){
            try {
                const response = await fetch(`/api/mysql/post?id=${params.postid}`);
                const data = await response.json();
                setPost(data);
            }catch (error) {
                console.error('Error fetching data:',error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[submitted]);

    function logout() {
        sessionStorage.setItem('id','');
        router.push('/');
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setInputValue(e.target.value);
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(false);
        try {
            const response = await axios
                .post('/api/mysql/post',formData)
                .then((res)=> {
                    console.log('res:',res);
                    if("affectedRows" in res.data){
                        setInputValue('');
                        setSubmitted(true);
                    }
                })

        }catch (e) {
            console.error('Error:',e);
        }
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
                ): (
                    <>
                        <div
                            id="title"
                            className="mb-2 block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                            {post[0].title}
                        </div>

                        <div id="content"
                             className="resize-none h-56 pl-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {post[0].content}</div>


                        <form onSubmit={handleSubmit}>
                        <div className="flex h-8 mb-6">
                            <input
                                id="comment"
                                name="comment"
                                value={inputValue}
                                onChange={handleChange}
                                className="pl-4 placeholder:italic border border-slate-300 w-full mt-5 h-full rounded-lg"
                                type="text"
                                placeholder="댓글을 입력하세요"
                            />
                            <button
                                type="submit"
                                className="h-full w-1/6 text-center text-sm bg-blue-500 ml-3 rounded-lg mt-5 font-bold text-white"
                            >작성</button>
                        </div>
                        </form>
                        {Array.isArray(post) && post.length === 0 ? (
                            <p>글 목록이 비어 있습니다.</p>
                        ) : (
                            <table className="table-auto w-full">
                                <tbody>
                                {post.map(({comment_id,comment,author}) => (
                                    <tr key={comment_id} className="border-b w-full space-y-2 ">
                                        <td>
                                            <div className="m-4">
                                                <div className="flex">
                                                    <div className="font-bold w-full">
                                                        {author}
                                                    </div>
                                                    <Menu as="div" className="relative inline-block text-left">
                                                    <Menu.Button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-gray-400">
                                                            <circle cx="12" cy="6" r="1.5" />
                                                            <circle cx="12" cy="12" r="1.5" />
                                                            <circle cx="12" cy="18" r="1.5" />
                                                        </svg>
                                                    </Menu.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                    <div className="absolute right-0 z-10 w-16 origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                         role="menu"
                                                         aria-orientation="vertical"
                                                         aria-labelledby="menu-button"
                                                    >
                                                        <Menu.Items className="py-1 text-center bg-white" >
                                                            <Menu.Item>
                                                                {({active})=>(
                                                                    <p className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}>수정</p>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active})=>(
                                                                    <p className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}>삭제</p>
                                                                )}
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </div>
                                                    </Transition>
                                                    </Menu>
                                                </div>
                                                <div className="font-light text-sm">
                                                    {comment}
                                                </div>
                                            </div>
                                        </td>
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

export default PostView;