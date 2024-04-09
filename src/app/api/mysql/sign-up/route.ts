import { NextResponse } from "next/server";

import {executeQuery,checkDuplicateId,validateError} from "@/common";

// 회원가입
export async function POST(request: Request) {
    const reqData = await request.json();
    console.log('sign-up req :',reqData);
    const name = reqData.name;
    const userId = reqData.user_id;
    const password = reqData.password;

    if(name == null || userId == null || password == null || await checkDuplicateId(userId) ){
        return validateError();
    }

    try {
        const results = await executeQuery
        ("INSERT INTO member (name,user_id,password) VALUES (?, ?, ?)",
            [name,userId,password]);
        //
        // console.log('results:',results);
        // if("affectedRows" in results && results.affectedRows == 1){
        //
        // }
        return NextResponse.json(results);
    }catch (e) {
        const response = {
            error: (e as Error).message,
            returnedStatus: 200,
        }
        return NextResponse.json(response,{status : 200});
    }

}