import { Request, Response } from "express";
import * as workflowService from "../services/workflow.service";

export async function createWorkflow(req: Request, res: Response) {
    try {
        const workflow = await workflowService.createWorkflow(req.body);
        res.status(201).json(workflow);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getWorkflows(req: Request, res: Response) {
    const workflows = await workflowService.getWorkflows();
    res.json(workflows);
}

export async function getWorkflowById(req: Request, res: Response) {
    const id = req.params.id as string;
    const workflow = await workflowService.getWorkflowById(id);
    if (!workflow) return res.status(404).json({ message: "Not found" });
    res.json(workflow);
}

export async function updateWorkflow(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        const workflow = await workflowService.updateWorkflow(id, req.body);
        res.json(workflow);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function deleteWorkflow(req: Request, res: Response) {
    const id = req.params.id as string;
    await workflowService.deleteWorkflow(id);
    res.json({ message: "Deleted" });
}
