import {executeQuery} from "@/common";
import {NextResponse} from "next/server";

export async function DELETE(request:Request) {
    try{
        const reqData = await request.json();
        const comment_id = reqData.commentId;

        const result = await executeQuery(
            "DELETE from comments WHERE id = ? ",[comment_id]
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

export async function PUT(request:Request) {
    try {
        const reqData = await request.json();
        const comment_id = reqData.commentId;
        const comment = reqData.comment;
        console.log(comment,",",comment_id);
        const result = await executeQuery(
            "UPDATE comments SET comment = ? WHERE id = ? ",[comment,comment_id]
        );
        return NextResponse.json(result,{status:200});
    }catch (e) {
        const response = {
            error:(e as Error).message,
            returnedStatus:200
        };
        return NextResponse.json(response,{status:200});
    }
}