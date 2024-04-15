"use client"
import Link from "next/link";
import {useRouter} from "next/navigation";
import ChatInput from "@/app/chat/chatInput";
import {useEffect, useRef, useState} from "react";
import {collection, onSnapshot, orderBy, query} from "@firebase/firestore";

import db from "../../../fire-config";
import axios from "axios";

export default function Page(){
    const scrollRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [chatData,setChatData] = useState<any[]>([]);
    function logout() {
        sessionStorage.setItem('id','');
        router.push('/');
    }
    const [myName, nameSet] = useState("");

    function getChatList(cd:(data:any[])=>void){
        const q = query(collection(db, "chat"), orderBy("time", "desc"));
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            const data = querySnapshot.docs.map((doc)=>({...doc.data(),id:doc.id}))
            console.log(data);
            cd(data);
        });
        return unsubscribe;
    }
    useEffect(()=>{
        async function dataFetch(){
            try{
                const response = await axios.post('/api', {
                    id: typeof window !== 'undefined' ?  sessionStorage.getItem('id'): null
                });
                nameSet(response.data[0].name);
            }catch (error) {
                console.error('Error getName:', error);
                throw error; // 오류를 다시 던져서 호출자에게 전파
            }
        }
        dataFetch();
        const unsubcribe = getChatList(data => setChatData(data))
        return () => {
            unsubcribe();
        }
    },[]);
    useEffect(() => {
        // 현재 스크롤 위치 === scrollRef.current.scrollTop
        // 스크롤 길이 === scrollRef.current.scrollHeight
        // @ts-ignore
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });


    return (
        <main className="flex flex-col items-center min-h-screen w-full p-24 mt-0">
            <header className="w-3/4 mb-8">
                <div className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
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
            <div className="bg-white p-8 rounded-lg shadow-md w-3/4 h-[70vh] ">
                <div ref={scrollRef} className="pl-5 pr-5 pt-3 h-5/6 overflow-auto w-5/6 ring-black ring-opacity-15 ring-1">

                    {chatData.slice().reverse().map((chat,index)=>{
                        // 초와 나노초를 합쳐서 밀리초로 변환
                        const milliseconds = chat.time.seconds * 1000 + Math.round(chat.time.nanoseconds / 1e6);
                        // 밀리초로 변환된 시간을 Date 객체로 생성
                        const time = new Date(milliseconds);
                        if(myName !== chat.name){
                            return(
                                <div key={index} className="flex justify-start">
                                    <span className="font-bold mr-2">{chat.name}</span>
                                    <div className="bg-gray-200 text-gray-800 p-2 rounded-lg mb-1 max-w-xs">
                                        {chat.text}
                                    </div>
                                    <p className="font-thin font-xs ml-2">{time.toLocaleString()}</p>
                                </div>);
                        }else {
                            return(
                                <div key={index} className="flex justify-end">
                                    <p className="font-thin font-xs mr-2">{time.toLocaleString()}</p>
                                    <div className="bg-blue-500 text-white p-2 rounded-lg mb-1 max-w-xs">
                                        {chat.text}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>


                <ChatInput/>
            </div>
        </main>
    );
}