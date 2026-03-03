import { Request, Response } from "express";
import * as ruleService from "../services/rule.service";

export async function createRule(req: Request, res: Response) {
    try {
        const rule = await ruleService.createRule({
            ...req.body,
            step_id: req.params.stepId
        });
        res.status(201).json(rule);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getRules(req: Request, res: Response) {
    const stepId = req.params.stepId as string;
    const rules = await ruleService.getRulesByStep(stepId);
    res.json(rules);
}

export async function updateRule(req: Request, res: Response) {
    const id = req.params.id as string;
    const rule = await ruleService.updateRule(id, req.body);
    res.json(rule);
}

export async function deleteRule(req: Request, res: Response) {
    const id = req.params.id as string;
    await ruleService.deleteRule(id);
    res.json({ message: "Deleted" });
}
