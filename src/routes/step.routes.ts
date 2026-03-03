import { Router } from "express";
import * as controller from "../controllers/step.controller";

const router = Router();

router.post("/workflows/:workflowId/steps", controller.createStep);
router.get("/workflows/:workflowId/steps", controller.getSteps);
router.put("/steps/:id", controller.updateStep);
router.delete("/steps/:id", controller.deleteStep);

export default router;