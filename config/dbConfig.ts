import mongoose from "mongoose";

let cachedClient = null;
let cachedDb = null;

export default async function connectDB() {
  try {
    if (cachedDb) {
      return {
        client: cachedClient,
        db: cachedDb
      };
    }

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.mongo_uri);
    }

    cachedClient = mongoose;
    cachedDb = mongoose.connection;

    return {
      client: cachedClient,
      db: cachedDb
    };
  } catch (err: any) {
    console.log(err);
  }
}