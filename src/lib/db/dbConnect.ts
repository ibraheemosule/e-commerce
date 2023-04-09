import mongoose from "mongoose";

const globalRoot = global as typeof globalThis & {
  mongoose: { [key: string]: unknown };
};

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached: { [key: string]: unknown } = globalRoot.mongoose;

if (!cached) {
  cached = globalRoot.mongoose = { connection: null, promise: null };
}

async function dbConnect() {
  if (cached.connnection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = await mongoose
      .connect(MONGODB_URI as string)
      .then((mongoose) => {
        console.log("Connected to DB");
        return mongoose;
      })
      .catch(() => {
        throw Error();
        return;
      });
  }
  cached.connection = await cached.promise;
  return cached.connection;
}

export default dbConnect;
