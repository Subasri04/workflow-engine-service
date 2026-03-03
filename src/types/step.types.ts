import { Document } from "mongoose";

export type StepType = "task" | "approval" | "notification";

export interface IStep extends Document {
    workflow_id: string;
    name: string;
    step_type: StepType;
    order: number;
    metadata?: Record<string, any>;
    created_at: Date;
    updated_at: Date;
}
