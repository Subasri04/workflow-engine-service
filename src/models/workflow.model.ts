import mongoose, { Schema } from "mongoose";
import { IWorkflow } from "../types/workflow.types";

const WorkflowSchema = new Schema<IWorkflow>(
    {
        name: { type: String, required: true },
        version: { type: Number, required: true },
        is_active: { type: Boolean, default: true },
        input_schema: { type: Object, required: true },
        start_step_id: { type: String }
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

WorkflowSchema.index({ name: 1, version: 1 }, { unique: true });

export default mongoose.model<IWorkflow>("Workflow", WorkflowSchema);
