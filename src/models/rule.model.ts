import mongoose, { Schema } from "mongoose";
import { IRule } from "../types/rule.types";

const RuleSchema = new Schema<IRule>(
    {
        step_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Step",
            required: true
        },
        condition: { type: String, required: true },
        next_step_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Step",
            default: null
        },
        priority: { type: Number, required: true }
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

RuleSchema.index({ step_id: 1, priority: 1 });

export default mongoose.model<IRule>("Rule", RuleSchema);
