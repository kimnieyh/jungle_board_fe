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
// 글 작성
export async function POST(request: Request) {
    const reqData = await request.json();
    console.log('add post req :',reqData);
    const title = reqData.title;
    const content = reqData.content;
    const userId = reqData.author;
    //todo 제목 작성 필수로 변경 필요
    try {
        const results = await executeQuery
        ("INSERT INTO post (title,content,author_id) VALUES (?, ?, ?)",
            [title,content,userId]);

        return NextResponse.json(results);
    }catch (e) {
        const response = {
            error: (e as Error).message,
            returnedStatus: 200,
        }
        return NextResponse.json(response,{status : 200});
    }

}