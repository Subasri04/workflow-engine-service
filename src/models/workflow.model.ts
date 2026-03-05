import mongoose, { Schema, Document } from "mongoose";

export interface IWorkflow extends Document {
    name: string;
    version: number;
    is_active: boolean;
    input_schema: Record<string, unknown>;
    start_step_id?: string;
    created_at: Date;
    updated_at: Date;
}

const WorkflowSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        version: {
            type: Number,
            default: 1,
        },

        is_active: {
            type: Boolean,
            default: true,
        },

        input_schema: {
            type: Schema.Types.Mixed,
            required: true,
        },

        start_step_id: {
            type: Schema.Types.ObjectId,
            ref: "Step",
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

export default mongoose.model<IWorkflow>("Workflow", WorkflowSchema);
