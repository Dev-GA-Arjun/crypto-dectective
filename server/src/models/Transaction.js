import { Schema } from "mongoose";
import { getModel } from "./common.js";

const transactionSchema = new Schema(
  {
    hash: { type: String, required: true, trim: true },
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    valueWei: { type: String, required: true, trim: true },
    asset: { type: String, required: true, trim: true },
    timestamp: { type: Date, required: true },
    blockNumber: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      required: true,
    },
  },
  { timestamps: true },
);

transactionSchema.index({ caseId: 1, hash: 1 }, { unique: true });

export default getModel("Transaction", transactionSchema);
