import mongoose, { Schema, Document, Types } from "mongoose";

export type ExecutionStatus =
    | "pending"
    | "in_progress"
    | "completed"
    | "failed"
    | "canceled";

export interface IRuleLog {
    rule: string;
    result: boolean;
    error?: string;
}

export interface IStepLog {
    step_id: Types.ObjectId;
    step_name: string;
    rule_logs: IRuleLog[];
    executed_at: Date;
}

export interface IExecution extends Document {
    workflow_id: Types.ObjectId;
    workflow_version: number;
    status: ExecutionStatus;
    data: Record<string, unknown>;
    logs: IStepLog[];
    current_step_id: Types.ObjectId | null;
    retries: number;
    started_at: Date;
    ended_at?: Date;
}

const RuleLogSchema = new Schema<IRuleLog>(
    {
        rule: { type: String, required: true },
        result: { type: Boolean, required: true },
        error: { type: String }
    },
    { _id: false }
);

const StepLogSchema = new Schema<IStepLog>(
    {
        step_id: { type: Schema.Types.ObjectId, required: true },
        step_name: { type: String, required: true },
        rule_logs: { type: [RuleLogSchema], default: [] },
        executed_at: { type: Date, default: Date.now }
    },
    { _id: false }
);

const ExecutionSchema = new Schema<IExecution>({
    workflow_id: {
        type: Schema.Types.ObjectId,
        ref: "Workflow",
        required: true
    },
    workflow_version: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed", "failed", "canceled"],
        default: "pending"
    },
    data: {
        type: Schema.Types.Mixed,
        required: true
    },
    logs: {
        type: [StepLogSchema],
        default: []
    },
    current_step_id: {
        type: Schema.Types.ObjectId,
        ref: "Step",
        default: null
    },
    retries: {
        type: Number,
        default: 0
    },
    started_at: {
        type: Date,
        default: Date.now
    },
    ended_at: {
        type: Date
    }
});

export default mongoose.model<IExecution>("Execution", ExecutionSchema);
