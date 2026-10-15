import { Schema } from "mongoose";
import {
  certaintyPlugin,
  evidenceRefSchema,
  getModel,
  requireEvidenceRefs,
} from "./common.js";

const findingSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    evidenceRefs: { type: [evidenceRefSchema], required: true },
  },
  { _id: false },
);

certaintyPlugin(findingSchema);
requireEvidenceRefs(findingSchema);

const reportSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },
    summary: { type: String, required: true, trim: true },
    findings: { type: [findingSchema], default: [] },
    freezeRequestDraft: { type: String, default: "" },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default getModel("Report", reportSchema);
