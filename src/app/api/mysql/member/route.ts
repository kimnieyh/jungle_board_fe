import { NextResponse, NextRequest } from "next/server";

import mysql from 'mysql2/promise';

import {GetDBSettings, IDBSettings} from "@/common";
import {redirect} from "next/navigation";

// 1. populate the connection parameters
let connectionParams = GetDBSettings();
async function executeQuery(query: string, values: any[]) {
    try {
        // 데이터베이스 연결
        const connection = await mysql.createConnection(connectionParams);

        // 쿼리 실행 및 결과 반환
        const [results] = await connection.execute(query, values);

        // 연결 종료
        await connection.end();

        return results;
    } catch (e) {
        console.log('Error:', (e as Error).message);
        throw e;
    }
}

function validateError () {
    console.log('validate Error');

    const response = {
        error: 'validate Error',
        returnedStatus: 200,
    }

    return NextResponse.json(response,{status : 200});
}

async function checkDuplicateId(id :string){
    try {
        const result = await executeQuery(
            "SELECT * FROM jungle_board.member WHERE user_id = ? ",[id,]);
        return !(Array.isArray(result) && result.length === 0);
    }catch (e){
        const response = {
            error: (e as Error).message,
            returnedStatus: 200,
        }
        return NextResponse.json(response,{status : 200});
    }
}

export async function GET(request : Request) {
    try {

        const results = await executeQuery("SELECT * FROM jungle_board.member", []);

        return NextResponse.json(results);

    }catch (e){
        const response = {
            error: (e as Error).message,
            returnedStatus: 200,
        }
        return NextResponse.json(response,{status : 200});
    }
}
export async function POST(request: Request) {
    console.log('post start!');
    const reqData = await request.json();
    console.log(reqData);
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