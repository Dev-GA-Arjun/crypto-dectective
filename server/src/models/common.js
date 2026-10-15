import mongoose from "mongoose";

const { Schema } = mongoose;

export const evidenceRefSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["chat", "tx", "evidence"],
      required: true,
    },
    id: { type: String, required: true, trim: true },
    excerpt: { type: String, trim: true },
  },
  { _id: false },
);

export function requireEvidenceRefs(schema) {
  schema.path("evidenceRefs").validate({
    validator(references) {
      return Array.isArray(references) && references.length > 0;
    },
    message: "At least one evidence reference is required.",
  });
}

export function certaintyPlugin(schema) {
  schema.add({
    status: {
      type: String,
      enum: ["verified", "inferred"],
      required: true,
    },
    confidence: { type: Number, min: 0, max: 1 },
    reason: { type: String, trim: true },
  });

  schema.pre("validate", function validateInferredCertainty() {
    if (this.status === "inferred") {
      if (this.confidence == null) {
        this.invalidate("confidence", "Inferred items require a confidence value.");
      }
      if (!this.reason) {
        this.invalidate("reason", "Inferred items require a reason.");
      }
    }
  });
}

export function getModel(name, schema) {
  return mongoose.models[name] ?? mongoose.model(name, schema);
}
