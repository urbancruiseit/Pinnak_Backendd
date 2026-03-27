import { Router } from "express";
import {
  createLeads,
  listLeads,
  updateLeadByIdController,
  updateLeadUnwantedStatusController,
  getAllUnwantedLeadsController,
} from "./lead.controller.js";
const router = Router();

router.route("/").post(createLeads);
router.route("/").get(listLeads);
router.route("/unwanted/:id").patch(updateLeadUnwantedStatusController);
router.route("/unwanted/all").get(getAllUnwantedLeadsController);
router.route("/:id").put(updateLeadByIdController);
export default router;
