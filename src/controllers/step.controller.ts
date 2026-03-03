import { Request, Response } from "express";
import * as stepService from "../services/step.service";

export async function createStep(req: Request, res: Response) {
    try {
        const step = await stepService.createStep({
            ...req.body,
            workflow_id: req.params.workflowId
        });
        res.status(201).json(step);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getSteps(req: Request, res: Response) {
    const workflowId = req.params.workflowId as string;
    const steps = await stepService.getStepsByWorkflow(workflowId);
    res.json(steps);
}

export async function updateStep(req: Request, res: Response) {
    const id = req.params.id as string;
    const step = await stepService.updateStep(id, req.body);
    res.json(step);
}

export async function deleteStep(req: Request, res: Response) {
    const id = req.params.id as string;
    await stepService.deleteStep(id);
    res.json({ message: "Deleted" });
}
