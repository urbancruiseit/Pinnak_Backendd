import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  getLeads,
  insertLead,
  updateLeadById,
  updateLeadUnwantedStatus,
  getAllUnwantedLeadsModel,
} from "./lead.model.js";
// import { sendNotification } from "../../utils/sendNotification.js";

const createLeads = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log("data", data);
  // Validate required fields (basic)

  const newLead = await insertLead(data);

  if (!newLead) {
    throw new ApiError(400, "Lead could not be created");
  }
  // 🔔 Notification send
  // await sendNotification(
  //   "New Lead Created",
  //   `New lead added: ${data.name}`
  // );
  res
    .status(201)
    .json(new ApiResponse(201, newLead, "Lead created successfully"));
});

const listLeads = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 14;

  const leadsData = await getLeads(page, limit);

  if (!leadsData || leadsData.leads.length === 0) {
    throw new ApiError(404, "Lead data not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, leadsData, "Leads fetched successfully"));
});

const updateLeadByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  if (!id) {
    throw new ApiError(400, null, "Lead ID is required");
  }

  const updatedUser = await updateLeadById(id, updateData);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

const updateLeadUnwantedStatusController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { unwanted_status } = req.body;
  console.log(id, unwanted_status);
  // validation
  if (!id || !unwanted_status) {
    throw new ApiError(400, "id and status are required");
  }

  if (!["wanted", "unwanted"].includes(unwanted_status)) {
    throw new ApiError(400, "Invalid status value");
  }

  // model call
  const result = await updateLeadUnwantedStatus(id, unwanted_status);

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Lead not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Lead status updated successfully"));
});

// Controller to get all unwanted leads (complete data)
export const getAllUnwantedLeadsController = asyncHandler(async (req, res) => {
  const leads = await getAllUnwantedLeadsModel();
  
  if (!leads || leads.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, [], "No unwanted leads found")
    );
  }
  
  return res.status(200).json(
    new ApiResponse(200, leads, "All unwanted leads fetched successfully")
  );
});
export {
  createLeads,
  listLeads,
  updateLeadByIdController,
  updateLeadUnwantedStatusController,
  
};
