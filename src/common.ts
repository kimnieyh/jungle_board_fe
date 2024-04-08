export interface IDBSettings {
    host : string,
    port : number,
    user : string,
    password : string,
    database : string,
}

export const GetDBSettings = () : IDBSettings => {
    const env = process.env.NODE_ENV;
    //todo 개발용 db와 배포용 db가 달라진다면, 수정 필요
    if(env == 'development')
        return {
            host: process.env.host!, //!를 넣어서 어떠한 변수도 null이 아님을 명시
            port: parseInt(process.env.port!),
            user: process.env.user!,
            password: process.env.password!,
            database: process.env.database!,
        }
    else {
        return {
            host: process.env.host!,
            port: parseInt(process.env.port!),
            user: process.env.user!,
            password: process.env.password!,
            database: process.env.database!,
        }
    }
}