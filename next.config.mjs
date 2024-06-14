import { config } from 'dotenv';

config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {},
    env: {
        host: process.env.HOST,
        mysql_port: process.env.MYSQL_PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
};

export default nextConfig;