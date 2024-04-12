import {executeQuery} from "@/common";
import {NextResponse} from "next/server";

export async function GET(request:Request) {
    try{
        const {searchParams} = new URL (request.url);
        const id = searchParams.get('id');

        const results = await executeQuery(
            "select comments.id as comment_id, comments.comment as comment," +
            " post.title as title, post.content as content, member.name as author " +
            "from post left join comments on post.id = comments.post_id left join member " +
            "on member.id = comments.author_id where post.id = ? order by comments.id desc ",[id,]);

        // console.log('post : ',results);
        return NextResponse.json(results,{status:200});
    }catch (e){
        const response = {
            error: (e as Error).message,
            returnedStatus: 200
        };
        return  NextResponse.json(response,{status:200});
    }

}

export async function POST(request:Request) {
    try {
        const reqData = await request.json();
        const author = reqData.author;
        const comment = reqData.comment;
        const postId = reqData.postId;

        const result = await executeQuery(
            "insert into comments (comment,author_id,post_id)" +
            "values (?,?,?) ",[comment,author,postId]
        );
        return NextResponse.json(result,{status:200});
    }catch (e) {
        const response = {
            error: (e as Error).message,
            returnedStatus: 200
        };
        return NextResponse.json(response,{status:200});
    }
}
