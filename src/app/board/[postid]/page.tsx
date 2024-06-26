'use client'

import {useRouter} from "next/navigation";
import Link from "next/link";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
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
        comment_author:'',
        post_author:'',
        post_author_id:'',
        comment_author_id:'',
        commentEdit: false,
    }]);
    const [formData, setFormData] = useState({
        comment: '',
        comment_author: typeof window !== 'undefined' ?  sessionStorage.getItem('id'): null,
        postId: params.postid,
    });
    const [heart,heartChange] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [inputValue, setInputValue] = useState('');

// todo useRef : form data input data 같은 경우에!!
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log('useEffect....');
        async function fetchData(){
            try {
                const response = await fetch(`/api/mysql/post?id=${params.postid}`);
                const data = await response.json();
                setPost(data);
            }catch (error) {
                console.error('Error fetching data:',error);
            } finally {
                console.log(post[0])
                setLoading(false);
            }
        }
        fetchData();

    },[submitted,heart]);

    function logout() {
        sessionStorage.setItem('id','');
        router.push('/');
    }
    const removePost = async ()=>{
        setSubmitted(false);
        try {
            const response = await axios
                .delete('/api/mysql/post',{
                    data: {
                        post_id:params.postid,
                    }
                })
                .then((res)=>{
                    alert('삭제되었습니다.');
                    router.push('/board');
                })
        }catch (e){
            console.error('Error:',e);
        }
    }

    const editPost = async () => {

    }
    const removeComment = async (comment_id : string) =>{
        setSubmitted(false);
        try {
            const response = await axios
                .delete('/api/mysql/comment',{
                    data : {
                        commentId: comment_id
                    }
                })
                .then((res) => {
                    setSubmitted(true);
                })
        }catch (e) {
            console.error('Error:',e);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setInputValue(e.target.value);
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }
    const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(false);
        try {
            let data = {
                commentId: '',
                comment: '',
            };
            post.map(({commentEdit,comment_id,comment})=>{
                if(commentEdit){
                    data.commentId = comment_id;
                    data.comment = comment;
                }
            })
            const response = await axios
                .put('/api/mysql/comment',data)
                .then((res)=>{
                    setSubmitted(true);
                })
        }catch (e) {
            console.error('Error:',e);
        }
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(false);
        try {
            const response = await axios
                .post('/api/mysql/comment',formData)
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
            <header className="w-3/4 min-w-96 mb-8">
                <div className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <div>                        <Link href="/board">
                        <div className="text-lg font-bold hover:underline">글 목록</div>
                    </Link>
                    </div>
                    <div>
                        <button onClick={logout} className="text-lg font-bold hover:underline">로그아웃</button>
                    </div>
                </div>
            </header>
            <div className="bg-white p-8 rounded-lg shadow-md min-w-96 w-3/4">

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
                        <div className="flex mb-3">
                            <div className="font-bold w-full">
                                {post[0].post_author}
                            </div>
                            {(post[0].post_author_id.toString() === (typeof window !== 'undefined' ?  sessionStorage.getItem('id'): null)) ?
                                (<Menu as="div" className="relative inline-block text-left">
                                        <Menu.Button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-gray-400">
                                                <circle cx="8" cy="12" r="1.5" />
                                                <circle cx="14" cy="12" r="1.5" />
                                                <circle cx="20" cy="12" r="1.5" />
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
                                                <Menu.Items className="text-center bg-white" >
                                                    <Menu.Item>
                                                        {({active})=>(
                                                            <button onClick={editPost} className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700',
                                                                'block w-full py-2 text-sm'
                                                            )}>수정</button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({active})=>(
                                                            <button onClick={removePost} className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block w-full py-2 text-sm'
                                                            )}>삭제</button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </div>
                                        </Transition>
                                    </Menu>
                               ) : (<></>)}

                        </div>
                        <div
                            id="title"
                            className="mb-2 block w-full border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                            {post[0].title}
                        </div>

                        <div id="content"
                             className="resize-none h-56 pl-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {post[0].content}</div>
                        <div className="w-full h-8 pt-3 pl-4 flex">
                            {heart?(<button onClick={()=>heartChange(false)}>
                                <svg fill="#ff0707" viewBox="0 0 122 122" width="24" height="24">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M 65,29 C 59,19 49,12 37,12 20,12 7,25 7,42 7,75 25,80 65,118 105,80 123,75 123,42 123,25 110,12 93,12 81,12 71,19 65,29 z"/>
                                </svg>
                            </button>):(<button onClick={()=>heartChange(true)}>
                                <svg aria-label="좋아요" className="love hover:animate-bounce" color="#262626" fill="#262626" height="24" role="img"
                                     viewBox="0 0 24 24" width="24">
                                    <path
                                        d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                                </svg>
                            </button>)}
                        </div>

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
                                className="h-full w-1/6 text-center text-sm bg-gradient-to-r from-purple-500 to-pink-500 ml-3 rounded-lg mt-5 font-bold text-white"
                            >작성</button>
                        </div>
                        </form>
                        {(Array.isArray(post) && post.length === 0) || post[0].comment === null ? (
                            <></>
                        ) : (
                            <table className="table-auto w-full">
                                <tbody>
                                {post.map(({comment_id,comment,comment_author,commentEdit,comment_author_id}) => (
                                    <tr key={comment_id} className="border-b w-full space-y-2 ">
                                        <td>
                                            <div className="m-4">
                                                <div className="flex">
                                                    <div className="font-bold w-full">
                                                        {comment_author}
                                                    </div>
                                                    {(comment_author_id.toString() === (typeof window !== 'undefined' ?  sessionStorage.getItem('id'): null))? (
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
                                                                        <Menu.Items className="text-center bg-white" >
                                                                            <Menu.Item>
                                                                                {({active})=>(
                                                                                    <button onClick={() => {
                                                                                        setPost(post =>
                                                                                            post.map(item =>
                                                                                                item.comment_id === comment_id
                                                                                                    ? { ...item, commentEdit: true }
                                                                                                    : { ...item, commentEdit: false}
                                                                                            )
                                                                                        );
                                                                                    }} className={classNames(
                                                                                        active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700',
                                                                                        'block w-full py-2 text-sm'
                                                                                    )}>수정</button>
                                                                                )}
                                                                            </Menu.Item>
                                                                            <Menu.Item>
                                                                                {({active})=>(
                                                                                    <button onClick={() => removeComment(comment_id)} className={classNames(
                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                        'block w-full py-2 text-sm'
                                                                                    )}>삭제</button>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </Menu.Items>
                                                                    </div>
                                                                </Transition>
                                                            </Menu>
                                                    )
                                                        : (<></>)}

                                                </div>
                                                {commentEdit ? (
                                                    <form onSubmit={handleCommentSubmit}>
                                                        <div className="flex h-8 mb-6">
                                                            <input
                                                                id="comment"
                                                                name="comment"
                                                                onChange={(e)=>{
                                                                    setPost(post=>
                                                                    post.map(item=>
                                                                    item.comment_id === comment_id
                                                                    ? {...item, comment: e.target.value}: item));
                                                                }}
                                                                value={comment}
                                                                className="pl-4 placeholder:italic border border-slate-300 mt-1 w-full h-full rounded-lg"
                                                                type="text"
                                                                placeholder="댓글을 입력하세요"
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="h-full w-1/6 text-center text-sm bg-blue-800 ml-3 rounded-lg mt-1 font-bold text-white"
                                                            >수정</button>
                                                        </div>
                                                    </form>
                                                ):(
                                                    <div className="font-light text-sm">
                                                        {comment}
                                                    </div>
                                                )}
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