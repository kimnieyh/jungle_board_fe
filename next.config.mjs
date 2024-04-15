/** @type {import('next').NextConfig} */
const nextConfig = {experimental: {

    },
    env: {
        host : "54.180.124.141",
        port : "3306",
        user : "root",
        password : "1234",
        database : "jungle_board",
    }
};
export default nextConfig;
