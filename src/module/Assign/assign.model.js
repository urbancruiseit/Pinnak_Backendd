import { hrmsPool, pool } from "../../config/mySqlDB.js";

export const findTravelAdvisorsByCityId = async (cityId) => {
  if (!cityId) throw new Error("City ID is required");

  try {
    const [rows] = await hrmsPool.execute(
      `SELECT 
         u.id,
         u.firstName,
         u.middleName,
         u.lastName
       FROM users u
       INNER JOIN roles r ON u.role_id = r.id
       INNER JOIN sub_department sd ON u.subDepartment_id = sd.id
       INNER JOIN access_control ac ON ac.employee_id = u.id
       INNER JOIN access_control_cities acc ON acc.access_control_id = ac.id
       WHERE acc.city_id = ?
       AND LOWER(sd.subDepartment_name) = 'tele-sales'
       AND LOWER(r.role_name) = 'travel advisor'
       AND u.is_active = 1`,
      [cityId],
    );

    return rows.map((user) => ({
      id: user.id,
      fullName: [user.firstName, user.middleName, user.lastName]
        .filter(Boolean)
        .join(" "),
    }));
  } catch (error) {
    console.error("findTravelAdvisorsByCityId error:", error);
    throw error;
  }
};

export const assignTravelAdvisorToLead = async (leadId, travelAdvisorId) => {
  if (!leadId) throw new Error("Lead ID is required");
  if (!travelAdvisorId) throw new Error("Travel Advisor ID is required");

  try {
    const [result] = await pool.execute(
      `UPDATE leads SET advisor_id = ? WHERE id = ?`,
      [travelAdvisorId, leadId],
    );

    if (result.affectedRows === 0) {
      throw new Error("Lead not found");
    }

    return { success: true, leadId, travelAdvisorId };
  } catch (error) {
    console.error("assignTravelAdvisorToLead error:", error);
    throw error;
  }
};
