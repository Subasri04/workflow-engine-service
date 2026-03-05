import { Request, Response } from "express";
import * as workflowService from "../services/workflow.service";
import Workflow from "../models/workflow.model";

export const createWorkflow = async (req: Request, res: Response) => {

    const { name, is_active, input_schema } = req.body;

    const workflow = await Workflow.create({
        name,
        is_active,
        input_schema
    });

    res.json(workflow);
};

export const getWorkflows = async (_req: Request, res: Response) => {

    const workflows = await Workflow.find();

    res.json(workflows);
};

export const getWorkflowById = async (req: Request, res: Response) => {

    const workflow = await Workflow.findById(req.params.id);

    res.json(workflow);
};

export const updateWorkflow = async (req: Request, res: Response) => {

    const { name, is_active, input_schema } = req.body;

    const workflow = await Workflow.findByIdAndUpdate(
        req.params.id,
        {
            name,
            is_active,
            input_schema
        },
        { new: true }
    );

    res.json(workflow);
};

export async function deleteWorkflow(req: Request, res: Response) {
    const id = req.params.id as string;
    await workflowService.deleteWorkflow(id);
    res.json({ message: "Deleted" });
}
