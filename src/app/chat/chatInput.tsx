"use client"
import React, {useState} from "react";
import {addDoc, collection} from "@firebase/firestore";
import db from "../../../fire-config";
import axios from "axios";

const ChatInput= () =>{
    const [message, setMessage] = useState("");

    async function getName(): Promise<string> {
        try {
            const response = await axios.post('/api', {
                id: typeof window !== 'undefined' ?  sessionStorage.getItem('id'): null
            });
            return response.data[0].name;
        } catch (error) {
            console.error('Error getName:', error);
            throw error; // 오류를 다시 던져서 호출자에게 전파
        }
    }
    async function onSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            const name = await getName(); // getName 함수 호출 및 결과 대기
            await addDoc(collection(db, "chat"), {
                text: message,
                time: new Date(),
                name: name,
            });
            setMessage("");
        } catch (error) {
            console.error('Error onSubmit:', error);
        }
    }
    return (
        <div className="w-full">
            <form onSubmit={onSubmit} className="flex h-8">
                <input
                    id="message"
                    name="message"
                    className="pl-4 placeholder:italic border border-slate-300 w-full mt-5 h-full rounded-lg"
                    type="text"
                    placeholder="보낼 내용을 입력하세요"
                    value={message}
                    onChange={(e)=> setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="h-full w-1/6 text-center text-sm bg-gradient-to-r from-purple-500 to-pink-500 ml-3 rounded-lg mt-5 font-bold text-white"
                >전송</button>
            </form>
        </div>
    )
}

export default ChatInput;