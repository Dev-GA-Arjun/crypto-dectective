import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Case, Evidence, Transaction } from "./models/index.js";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const seedDirectory = path.resolve(currentDirectory, "../seed");
const caseId = new mongoose.Types.ObjectId("670000000000000000000001");

dotenv.config({ path: path.resolve(currentDirectory, "../../.env") });

async function readSeedFile(name) {
  const filePath = path.join(seedDirectory, name);
  return fs.readFile(filePath, "utf8");
}

function createEvidenceId(sourceKey) {
  const hex = createHash("sha256").update(sourceKey).digest("hex").slice(0, 24);
  return new mongoose.Types.ObjectId(hex);
}

async function seedDemoCase() {
  const [chatText, transactionText, labelsText] = await Promise.all([
    readSeedFile("demo-chat.txt"),
    readSeedFile("demo-txs.json"),
    readSeedFile("exchange-labels.json"),
  ]);
  const transactionFixture = JSON.parse(transactionText);
  const exchangeFixture = JSON.parse(labelsText);

  if (
    transactionFixture.datasetType !== "synthetic-demo-fixture" ||
    !transactionFixture.notice ||
    exchangeFixture.datasetType !== "synthetic-demo-fixture" ||
    !exchangeFixture.notice ||
    !Array.isArray(transactionFixture.transactions) ||
    !Array.isArray(exchangeFixture.labels)
  ) {
    throw new Error("Seed files must identify and describe the synthetic demo fixture.");
  }

  const transactions = transactionFixture.transactions.map((transaction) => ({
    ...transaction,
    caseId,
  }));
  const evidence = [
    {
      _id: createEvidenceId("traceledger-demo-chat"),
      caseId,
      type: "chat",
      rawText: chatText.trim(),
      source: "demo-chat.txt - synthetic scenario",
    },
    {
      _id: createEvidenceId("traceledger-demo-fixture-notices"),
      caseId,
      type: "file",
      rawText: `${transactionFixture.notice}\n${JSON.stringify(exchangeFixture, null, 2)}`,
      source: "demo-txs.json and exchange-labels.json - synthetic fixture notices",
    },
    ...transactions.map((transaction) => ({
      _id: createEvidenceId(`traceledger-demo-tx-${transaction.hash}`),
      caseId,
      type: "txhash",
      rawText: transaction.hash,
      source: "demo-txs.json - fictional transaction hash",
    })),
  ];

  await Case.findOneAndUpdate(
    { _id: caseId },
    {
      $set: {
        title: "Synthetic demo case: Northstar wallet trace",
        victimName: "Maya",
        status: "open",
      },
    },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
  );

  for (const item of evidence) {
    await Evidence.findOneAndUpdate(
      { _id: item._id },
      { $set: item },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    );
  }

  for (const transaction of transactions) {
    await Transaction.findOneAndUpdate(
      { caseId, hash: transaction.hash },
      { $set: transaction },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    );
  }

  await Promise.all([
    Evidence.deleteMany({
      caseId,
      _id: { $nin: evidence.map((item) => item._id) },
    }),
    Transaction.deleteMany({
      caseId,
      hash: { $nin: transactions.map((transaction) => transaction.hash) },
    }),
  ]);

  return { evidenceCount: evidence.length, transactionCount: transactions.length };
}

try {
  await mongoose.connect(
    process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/traceledger",
  );
  const { evidenceCount, transactionCount } = await seedDemoCase();
  console.log(
    `Loaded the synthetic demo case with ${evidenceCount} evidence records and ${transactionCount} fictional transactions.`,
  );
} catch (error) {
  console.error("Unable to seed the demo case:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
