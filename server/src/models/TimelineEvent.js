import { Schema } from "mongoose";
import {
  certaintyPlugin,
  evidenceRefSchema,
  getModel,
  requireEvidenceRefs,
} from "./common.js";

const timelineEventSchema = new Schema(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },
    timestamp: { type: Date, required: true },
    kind: {
      type: String,
      enum: ["chat", "tx", "detector"],
      required: true,
    },
    summary: { type: String, required: true, trim: true },
    evidenceRefs: { type: [evidenceRefSchema], required: true },
  },
  { timestamps: true },
);

certaintyPlugin(timelineEventSchema);
requireEvidenceRefs(timelineEventSchema);

export default getModel("TimelineEvent", timelineEventSchema);
