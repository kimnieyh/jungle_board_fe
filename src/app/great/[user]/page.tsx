type PageParams = {
    user: string,
}

export default function page({params}:{params:PageParams}) {
    return (
        <div>
            <h1>hello {params.user}!</h1>
        </div>
    );
}