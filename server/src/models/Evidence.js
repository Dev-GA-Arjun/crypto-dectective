import { Schema } from "mongoose";
import { getModel } from "./common.js";

const evidenceSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["chat", "report", "txhash", "address", "file"],
      required: true,
    },
    rawText: { type: String, required: true },
    source: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export default getModel("Evidence", evidenceSchema);
