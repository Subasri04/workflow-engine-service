import { Router } from "express";
import * as controller from "../controllers/rule.controller";

const router = Router();

router.post("/steps/:stepId/rules", controller.createRule);
router.get("/steps/:stepId/rules", controller.getRules);
router.put("/rules/:id", controller.updateRule);
router.delete("/rules/:id", controller.deleteRule);

export default router;
