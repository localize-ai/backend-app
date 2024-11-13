import Redis, { RedisOptions } from "ioredis";

require('dotenv').config();


const options: RedisOptions = {
    keepAlive: 1000,
    tls: {
        rejectUnauthorized: false,
    },
};

const redis = new Redis(
    process.env.REDIS_URL,
    options,
);

export default redis;
