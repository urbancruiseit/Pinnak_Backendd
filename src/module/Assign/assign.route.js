import { Router } from "express";
import {
  getTravelAdvisorsByCityId,
  assignTravelAdvisor,
} from "../Assign/assign.controller.js";
const router = Router();

router.route("/travel-advisors/:cityId").get(getTravelAdvisorsByCityId);
router.route("/assign-travel-advisor/:leadId").patch(assignTravelAdvisor);
export default router;
