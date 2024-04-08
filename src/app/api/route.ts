import {NextResponse,NextRequest} from "next/server";

export async function GET(request: Request){
    const result = {
        message: "Hello World!"
    }

    return NextResponse.json(result);
}