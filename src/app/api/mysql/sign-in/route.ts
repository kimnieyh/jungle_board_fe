import { NextResponse, NextRequest } from "next/server";

import {executeQuery,sendMessageResponse,checkDuplicateId,validateError} from "@/common";

//로그인
export async function POST(request : Request) {
    try {
        const reqData = await request.json();
        console.log('sign-in req :',reqData);
        const userId = reqData.user_id;
        const password = reqData.password;
        const result = await executeQuery(
            "SELECT * FROM jungle_board.member WHERE user_id = ? LIMIT 1 ", [userId]);

        if(Array.isArray(result) && result.length == 0){
            return sendMessageResponse('존재하지 않는 아이디 입니다.');
        }
        if(Array.isArray(result) && 'password' in result[0] && password !== result[0].password){
            return  sendMessageResponse('비밀번호가 일치하지 않습니다.');
        }
        console.log('로그인 성공 :',result);
        return NextResponse.json(result);

    }catch (e){
        const response = {
            error: (e as Error).message,
            returnedStatus: 200,
        }
        return NextResponse.json(response,{status : 200});
    }
}