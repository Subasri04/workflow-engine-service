import { Router } from "express";
import WorkflowController from "./routes/workflow.routes";
import stepRoutes from "./routes/step.routes";
import ruleRoutes from "./routes/rule.routes";

const router = Router();

router.use("/workflows", WorkflowController);
router.use("/", stepRoutes);
router.use("/", ruleRoutes);

export default router;
