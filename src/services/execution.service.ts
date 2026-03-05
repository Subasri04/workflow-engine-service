import Workflow from "../models/workflow.model";
import Step from "../models/step.model";
import Execution from "../models/execution.model";
import { evaluateRules } from "../utils/ruleEngine";

export async function startExecution(workflowId: string, data: any) {

  // 1️⃣ Get workflow
  const workflow = await Workflow.findById(workflowId);

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  // 2️⃣ Get first step (lowest order)
  const firstStep = await Step.findOne({
    workflow_id: workflowId
  }).sort({ order: 1 });

  if (!firstStep) {
    throw new Error("No steps found for workflow");
  }

  // 3️⃣ Create execution
  const execution = await Execution.create({
    workflow_id: workflow._id,
    workflow_version: workflow.version,
    status: "running",
    started_at: new Date(),
    data,
    logs: [],
    current_step_id: firstStep._id
  });

  let currentStep = firstStep;

  // 4️⃣ Execute workflow
  while (currentStep) {

    // Evaluate rules
    const evaluation = await evaluateRules(
      currentStep._id.toString(),
      data
    );

    // Log step execution
    execution.logs.push({
      step_id: currentStep._id,
      step_name: currentStep.name,
      executed_at: new Date(),
      rule_logs: evaluation.logs
    });

    // If no next step → workflow ends
    if (!evaluation.nextStepId) {
      break;
    }

    // Move to next step
    const nextStep = await Step.findById(evaluation.nextStepId);

    if (!nextStep) {
      break;
    }

    currentStep = nextStep;
    execution.current_step_id = nextStep._id;
  }

  execution.status = "completed";
  execution.ended_at = new Date();
  execution.current_step_id = null;

  await execution.save();

  return execution;
}