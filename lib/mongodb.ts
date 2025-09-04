import mongoose, { Mongoose } from "mongoose";
import { MONGODB_URI } from "@/constants/env";

declare global {
  var mongooseCache: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

async function connectDB(): Promise<Mongoose> {
  if (global.mongooseCache.conn) return global.mongooseCache.conn;

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log(
          `MongoDB connected: ${mongooseInstance.connection.host}:${mongooseInstance.connection.port}`
        );
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        throw err;
      });
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
}

export default connectDB;
