"use client"
import Link from 'next/link'
import {useRouter} from "next/navigation";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
export default function Page() {
    const router = useRouter();
    
    const [formData,setFormData] = useState({
        user_id: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target;
        setFormData({...formData, [name]:value});
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await axios
                .post('/api/mysql/sign-in', formData)
                .then((res)=> {
                    if("message" in res.data){
                        alert(res.data.message);
                    }else {
                        router.push('/board')
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input onChange={handleChange} id="password" name="password" type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </div>
                    <div className="flex justify-between items-center">
                        <button type="submit" className="w-9/12 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">로그인</button>
                        <Link href={'/sign-up'}>
                        <button type="button" className="text-blue-500 hover:underline">회원가입</button>
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );

}