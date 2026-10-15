import { Schema } from "mongoose";
import { getModel } from "./common.js";

const caseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    victimName: { type: String, trim: true },
    status: {
      type: String,
      enum: ["open", "investigating", "closed"],
      default: "open",
    },
  },
  { timestamps: true },
);

export default getModel("Case", caseSchema);
