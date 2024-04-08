/** @type {import('next').NextConfig} */
const nextConfig = {experimental: {
        appDir: true,
    },
    env: {
        host : "localhost",
        port : "3306",
        user : "root",
        password : "1234",
        database : "jungle_board",
    }
};
export default nextConfig;
