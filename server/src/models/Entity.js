import { Schema } from "mongoose";
import {
  evidenceRefSchema,
  getModel,
  requireEvidenceRefs,
} from "./common.js";

const entitySchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },
    kind: {
      type: String,
      enum: ["wallet", "txhash", "exchange", "person", "amount"],
      required: true,
    },
    value: { type: String, required: true, trim: true },
    label: { type: String, trim: true },
    labelStatus: {
      type: String,
      enum: ["verified", "inferred"],
      required: true,
    },
    evidenceRefs: { type: [evidenceRefSchema], required: true },
  },
  { timestamps: true },
);

requireEvidenceRefs(entitySchema);

export default getModel("Entity", entitySchema);
