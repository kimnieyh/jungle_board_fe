import {NextResponse} from "next/server";
import {executeQuery} from "@/common";

export async function GET() {
    try {
        const results = await executeQuery(
            "SELECT * FROM jungle_board.post ", []);

        console.log('post list : ',results);

        return NextResponse.json(results,{status:200});

    }catch (e) {
        const response = {
            error: (e as Error).message,
            returnedStatus: 200
        };
        return NextResponse.json(response,{status:200});
    }
}