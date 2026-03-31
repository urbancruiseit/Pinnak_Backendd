// src/module/Assign/assign.route.js
import { Router } from "express";
import {
  assignToEntity,
  getMyLeads,
  getAllLeads,
  removeAssignment,
  getLeadAssignment,
  getAssignmentStats,
} from "./assign.controller.js";

const router = Router();

// Assign lead to user
router.route("/assign").post(assignToEntity);

// Get leads assigned to logged-in user (for sales users)
router.route("/my-leads").get(getMyLeads);

// Get all leads with assignments (for admin)
router.route("/leads").get(getAllLeads);

// Get assignment details for a specific lead
router.route("/lead/:leadId/assignment").get(getLeadAssignment);

// Remove assignment from a lead
router.route("/lead/:leadId/remove").delete(removeAssignment);

// Get assignment statistics (optional)
router.route("/stats").get(getAssignmentStats);

export default router;