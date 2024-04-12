import {executeQuery} from "@/common";
import {NextResponse} from "next/server";

export async function GET(request:Request) {
    try{
        const {searchParams} = new URL (request.url);
        const id = searchParams.get('id');

        const results = await executeQuery(
            "SELECT comments.id AS comment_id, " +
            "       comments.comment AS comment, " +
            "       post.title AS title, " +
            "       post.content AS content, " +
            "       post_author.name AS post_author, " +
            "       comment_author.name AS comment_author " +
            "FROM comments " +
            "RIGHT JOIN post ON post.id = comments.post_id " +
            "LEFT JOIN member AS post_author ON post_author.id = post.author_id " +
            "LEFT JOIN member AS comment_author ON comment_author.id = comments.author_id " +
            "WHERE post.id = ? ",[id,]);

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
export async function DELETE(request:Request) {
    try{
        const reqData = await request.json();
        const post_id = reqData.post_id;
        const temp = await executeQuery(
            "DELETE from comments WHERE post_id = ? ", [post_id]
        );
        const result = await executeQuery(
            "DELETE from post WHERE id = ? ",[post_id]
        );
        return NextResponse.json(result,{status:200});
    }catch (e){
        const response = {
            error:(e as Error).message,
            returnedStatus:200
        };
        return NextResponse.json(response,{status:200});
    }
}
