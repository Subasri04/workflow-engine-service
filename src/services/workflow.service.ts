import Workflow from "../models/workflow.model";

export async function createWorkflow(data: any) {
    const existing = await Workflow.find({ name: data.name }).sort({ version: -1 });

    const version = existing.length > 0 ? existing[0].version + 1 : 1;

    const workflow = await Workflow.create({
        ...data,
        version,
        is_active: true
    });

    return workflow;
}

export async function getWorkflows() {
    return Workflow.find().sort({ created_at: -1 });
}

export async function getWorkflowById(id: string) {
    return Workflow.findById(id);
}

export async function updateWorkflow(id: string, data: any) {
    const existing = await Workflow.findById(id);
    if (!existing) throw new Error("Workflow not found");

    return createWorkflow({
        ...existing.toObject(),
        ...data,
        _id: undefined
    });
}

export async function deleteWorkflow(id: string) {
    return Workflow.findByIdAndDelete(id);
}
