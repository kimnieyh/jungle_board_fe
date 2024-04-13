'use client'
import Link from 'next/link'
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from 'axios';
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        user_id: '',
        name: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await axios
                .post('/api/mysql/sign-up', formData)
                .then((res)=> {
                    if("affectedRows" in res.data){
                        alert('회원가입이 완료되었습니다.');
                        router.push('/');
                    }else{
                        alert('중복된 아이디 입니다.');
                    }
                    console.log(res);
                });
        }catch (e){
            console.error('Error:',e);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                        <input onChange={handleChange} id="user_id" name="user_id" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-m edium text-gray-700">Name</label>
                        <input onChange={handleChange} id="name" name="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input onChange={handleChange} id="password" name="password" type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <div className="flex justify-between items-center">
                        <button type="submit" className="w-9/12 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">회원가입</button>
                        <Link href={'/'}>
                        <button type="button" className="text-blue-500 hover:underline">취소</button>
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );

}