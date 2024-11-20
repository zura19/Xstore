import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
// @ts-expect-error idk
let cached = global.mongoose;

if (!cached) {
  // @ts-expect-error idk
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// export  connectToDB;

// import mongoose from "mongoose";

// const uri = process.env.MONGO_URI as string;

// if (!uri) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

// export async function connectToDB() {
//   try {
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(uri);
//       console.log("Connected to MongoDB");
//     }
//   } catch (error) {
//     console.error("Could not connect to MongoDB:", error);
//   }
// }
