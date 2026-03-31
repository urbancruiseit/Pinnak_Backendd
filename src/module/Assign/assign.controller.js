import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  assignLeadToUser,
  getLeadsByUser,
  getAllLeadsWithAssignments,
  removeLeadAssignment,
  getLeadWithAssignment,
  isLeadAssigned,
  getAssignedUserDetails,
} from "./assign.model.js";

// Assign lead to sales user
const assignToEntity = asyncHandler(async (req, res) => {
  const { leadId, userId } = req.body;
  // Validation
  if (!leadId) {
    throw new ApiError(400, "Lead ID is required");
  }

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  // Check if lead exists and assign
  const assigned = await assignLeadToUser(leadId, userId);

  if (!assigned) {
    throw new ApiError(404, "Lead not found");
  }

  // Get updated lead details
  const updatedLead = await getLeadWithAssignment(leadId);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        lead: updatedLead,
        assignedBy: assignedBy,
        assignedAt: new Date(),
      },
      "Lead assigned successfully",
    ),
  );
});

// Get leads assigned to logged-in user (for sales users)
const getMyLeads = asyncHandler(async (req, res) => {
  const userId = req.user?.uuid || req.user?.id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const leads = await getLeadsByUser(userId);

  res
    .status(200)
    .json(new ApiResponse(200, leads, "My leads fetched successfully"));
});

// Get all leads with assignments (for admin/supervisor)
const getAllLeads = asyncHandler(async (req, res) => {
  const leads = await getAllLeadsWithAssignments();

  res
    .status(200)
    .json(new ApiResponse(200, leads, "All leads fetched successfully"));
});

// Remove assignment from a lead
const removeAssignment = asyncHandler(async (req, res) => {
  const { leadId } = req.params;

  if (!leadId) {
    throw new ApiError(400, "Lead ID is required");
  }

  // Check if lead is assigned
  const isAssigned = await isLeadAssigned(leadId);

  if (!isAssigned) {
    throw new ApiError(400, "Lead is not assigned to any user");
  }

  const removed = await removeLeadAssignment(leadId);

  if (!removed) {
    throw new ApiError(404, "Lead not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Assignment removed successfully"));
});

// Get assignment details for a specific lead
const getLeadAssignment = asyncHandler(async (req, res) => {
  const { leadId } = req.params;

  if (!leadId) {
    throw new ApiError(400, "Lead ID is required");
  }

  const assignedUser = await getAssignedUserDetails(leadId);

  if (!assignedUser) {
    return res
      .status(200)
      .json(new ApiResponse(200, { assigned: false }, "Lead is not assigned"));
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        assigned: true,
        user: assignedUser,
      },
      "Assignment details fetched successfully",
    ),
  );
});

// Get lead statistics by assigned users
const getAssignmentStats = asyncHandler(async (req, res) => {
  const sql = `
    SELECT 
      u.uuid,
      u.name,
      u.email,
      COUNT(l.id) as lead_count
    FROM users u
    LEFT JOIN leads l ON u.uuid = l.assigned_to
    WHERE u.role LIKE '%sales%'
    GROUP BY u.uuid, u.name, u.email
    ORDER BY lead_count DESC
  `;

  const [rows] = await pool.execute(sql);

  res
    .status(200)
    .json(
      new ApiResponse(200, rows, "Assignment statistics fetched successfully"),
    );
});

export {
  assignToEntity,
  getMyLeads,
  getAllLeads,
  removeAssignment,
  getLeadAssignment,
  getAssignmentStats,
};