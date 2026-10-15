import { Schema } from "mongoose";
import {
  certaintyPlugin,
  evidenceRefSchema,
  getModel,
  requireEvidenceRefs,
} from "./common.js";

const edgeSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    amount: { type: String, required: true, trim: true },
    asset: { type: String, required: true, trim: true },
    timestamp: { type: Date, required: true },
    txHash: { type: String, trim: true, default: null },
    evidenceRefs: { type: [evidenceRefSchema], required: true },
  },
  { timestamps: true },
);

certaintyPlugin(edgeSchema);
requireEvidenceRefs(edgeSchema);

export default getModel("Edge", edgeSchema);
