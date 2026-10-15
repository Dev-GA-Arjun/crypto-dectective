import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createApp } from "./app.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(currentDirectory, "../../.env") });

const port = Number(process.env.PORT ?? 5000);
const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/traceledger";
const app = createApp();

try {
  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`TraceLedger API listening on http://localhost:${port}`);
  });
} catch (error) {
  console.error("Unable to connect to MongoDB:", error);
  process.exitCode = 1;
}
