import { NextResponse, NextRequest } from "next/server";

import mysql from 'mysql2/promise';

import {GetDBSettings, IDBSettings} from "@/common";

// 1. populate the connection parameters
let connectionParams = GetDBSettings();

export async function GET(request : Request) {
    try {
        // 2. connect to database
        const connection = await mysql.createConnection(connectionParams);

        // 3. create a query to fetch data
        let get_exp_query = "";
        get_exp_query = "SELECT * FROM jungle_board.member";

        let values: any[] = [];

        // 4. exec the query and retrieve the results
        const [ results ] = await connection.execute(get_exp_query,values);

        await connection.end();

        return NextResponse.json(results);

    }catch (e){
        console.log('Error: API -',(e as Error).message);

        const response = {
            error: (e as Error).message,
            returnedStatus: 200,
        }

        return NextResponse.json(response,{status : 200});
    }
}