import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
import { config } from 'dotenv';

config(); // 환경 변수 로드

export interface IDBSettings {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
}

export const GetDBSettings = (): IDBSettings => {
    const env = process.env.NODE_ENV;
    const settings = {
        host: process.env.HOST!,
        port: parseInt(process.env.MYSQL_PORT!, 10),
        user: process.env.USER!,
        password: process.env.PASSWORD!,
        database: process.env.DATABASE!,
    };
    console.log('settings:',settings);
    return settings;
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
const testDBConnection = async () => {
    try {
        const connectionParams = GetDBSettings();
        const connection = await mysql.createConnection(connectionParams);
        console.log('Connected to the database');
        await connection.end();
    } catch (e) {
        console.error('Database connection failed:', (e as Error).message);
    }
};

testDBConnection();

export function validateError() {
    console.log('validate Error');

    const response = {
        error: 'validate Error',
        returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 });
}

export async function checkDuplicateId(id: string) {
    try {
        const result = await executeQuery(
            "SELECT * FROM jungle_board.member WHERE user_id = ? ", [id]
        );
        return !(Array.isArray(result) && result.length === 0);
    } catch (e) {
        const response = {
            error: (e as Error).message,
            returnedStatus: 200,
        }
        console.log(response);
        return NextResponse.json(response, { status: 200 });
    }
}

export function sendMessageResponse(message: string) {
    const response = {
        message: message,
        returnedStatus: 200,
    }
    return NextResponse.json(response, { status: 200 });
}
