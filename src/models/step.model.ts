import mongoose, { Schema } from "mongoose";
import { IStep } from "../types/step.types";

const StepSchema = new Schema<IStep>(
    {
        workflow_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workflow",
            required: true
        },
        name: { type: String, required: true },
        step_type: {
            type: String,
            enum: ["task", "approval", "notification"],
            required: true
        },
        order: { type: Number, required: true },
        metadata: { type: Object }
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

StepSchema.index({ workflow_id: 1 });

export default mongoose.model<IStep>("Step", StepSchema);
