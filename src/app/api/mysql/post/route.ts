import {executeQuery} from "@/common";
import {NextResponse} from "next/server";

export async function GET(request:Request) {
    try{
        const {searchParams} = new URL (request.url);
        const id = searchParams.get('id');
        console.log(id);
        const results = await executeQuery(
            "select * from post where id = ? ",[id,]);

        console.log('post : ',results);
        return NextResponse.json(results,{status:200});
    }catch (e){
        const response = {
            error: (e as Error).message,
            returnedStatus: 200
        };
        return  NextResponse.json(response,{status:200});
    }

}