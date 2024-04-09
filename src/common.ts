import mysql from "mysql2/promise";
import {NextResponse} from "next/server";

export interface IDBSettings {
    host : string,
    port : number,
    user : string,
    password : string,
    database : string,
}

export const GetDBSettings = () : IDBSettings => {
    const env = process.env.NODE_ENV;
    //todo 개발용 db와 배포용 db가 달라진다면, 수정 필요
    if(env == 'development')
        return {
            host: process.env.host!, //!를 넣어서 어떠한 변수도 null이 아님을 명시
            port: parseInt(process.env.port!),
            user: process.env.user!,
            password: process.env.password!,
            database: process.env.database!,
        }
    else {
        return {
            host: process.env.host!,
            port: parseInt(process.env.port!),
            user: process.env.user!,
            password: process.env.password!,
            database: process.env.database!,
        }
    }
}

// 1. populate the connection parameters
let connectionParams = GetDBSettings();
export async function executeQuery(query: string, values: any[]) {
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

export function validateError () {
    console.log('validate Error');

    const response = {
        error: 'validate Error',
        returnedStatus: 200,
    }

    return NextResponse.json(response,{status : 200});
}

export async function checkDuplicateId(id :string){
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
export function sendMessageResponse(message:string){
    const response = {
        message: message ,
        returnedStatus: 200,
    }
    return NextResponse.json(response,{status:200})
}
