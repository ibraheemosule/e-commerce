import { createClient } from "redis";
const client = createClient();

let redisConnect: unknown;

async function startRedis() {
  console.log("here", redisConnect, "here");
  if (redisConnect) return client;
  try {
    redisConnect = await client.connect();
    return client;
  } catch {
    throw Error("Error instatiating instance on server");
  }
}

export default startRedis;
