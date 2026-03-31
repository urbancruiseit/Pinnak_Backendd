import { pool } from "../../config/mySqlDB.js";

// Assign lead to sales user
export const assignLeadToUser = async (leadId, userId) => {
  const sql = `
    UPDATE leads 
    SET assigned_to = ?, 
        updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;
  
  const [result] = await pool.execute(sql, [userId, leadId]);
  return result.affectedRows > 0;
};

// Get leads assigned to a specific user
export const getLeadsByUser = async (userId) => {
  const sql = `
    SELECT 
      l.*,
      u.name as assigned_to_name,
      u.email as assigned_to_email
    FROM leads l
    LEFT JOIN users u ON l.assigned_to = u.uuid
    WHERE l.assigned_to = ?
    ORDER BY l.created_at DESC
  `;
  
  const [rows] = await pool.execute(sql, [userId]);
  return rows;
};

// Get all leads with assignment details (for admin)
export const getAllLeadsWithAssignments = async () => {
  const sql = `
    SELECT 
      l.*,
      u.name as assigned_to_name,
      u.email as assigned_to_email,
      u.role as assigned_to_role
    FROM leads l
    LEFT JOIN users u ON l.assigned_to = u.uuid
    ORDER BY l.created_at DESC
  `;
  
  const [rows] = await pool.execute(sql);
  return rows;
};

// Remove assignment (set assigned_to to NULL)
export const removeLeadAssignment = async (leadId) => {
  const sql = `
    UPDATE leads 
    SET assigned_to = NULL, 
        updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;
  
  const [result] = await pool.execute(sql, [leadId]);
  return result.affectedRows > 0;
};

// Get single lead with assignment details
export const getLeadWithAssignment = async (leadId) => {
  const sql = `
    SELECT 
      l.*,
      u.name as assigned_to_name,
      u.email as assigned_to_email
    FROM leads l
    LEFT JOIN users u ON l.assigned_to = u.uuid
    WHERE l.id = ?
  `;
  
  const [rows] = await pool.execute(sql, [leadId]);
  return rows[0] || null;
};

// Check if lead is already assigned
export const isLeadAssigned = async (leadId) => {
  const sql = `
    SELECT assigned_to FROM leads WHERE id = ?
  `;
  
  const [rows] = await pool.execute(sql, [leadId]);
  return rows[0]?.assigned_to !== null;
};

// Get assigned user details for a lead
export const getAssignedUserDetails = async (leadId) => {
  const sql = `
    SELECT 
      u.uuid,
      u.name,
      u.email,
      u.role
    FROM leads l
    INNER JOIN users u ON l.assigned_to = u.uuid
    WHERE l.id = ? AND l.assigned_to IS NOT NULL
  `;
  
  const [rows] = await pool.execute(sql, [leadId]);
  return rows[0] || null;
}; 