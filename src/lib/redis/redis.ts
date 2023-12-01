import { createClient } from "redis";

const env = process.env.NODE_ENV === "development";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT!;
const client = createClient(
  env
    ? {}
    : {
        password: REDIS_PASSWORD,
        socket: {
          host: REDIS_HOST,
          port: +REDIS_PORT,
        },
      }
);

let redisConnect: unknown;

async function startRedis() {
  if (redisConnect) return client;
  try {
    redisConnect = await client.connect();
    return client;
  } catch {
    throw Error("Error instantiating redis instance on the server");
  }
}

export default startRedis;
