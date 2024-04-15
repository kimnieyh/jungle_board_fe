import {NextResponse,NextRequest} from "next/server";
import {executeQuery} from "@/common";

export async function POST(request: Request){
    try {
        const reqData = await request.json();
        const id = reqData.id;
        const result = await executeQuery(
            "SELECT * FROM jungle_board.member WHERE id = ? ",[id,]);
        console.log(result);
        return NextResponse.json(result,{status:200});
    }catch (e){
        const response = {
            error: (e as Error).message,
            returnedStatus: 200,
        }
        return NextResponse.json(response,{status : 200});
    }
}
