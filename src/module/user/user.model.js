import { pool } from "../../config/mySqlDB.js";
import bcrypt from "bcrypt";
import { generateUUID } from "../../utils/uuid.js";

export const USER_TABLE = "users";

export const USER_COLUMNS = {
  ID: "id",
  UUID: "uuid",
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
  CITY: "city",
  ROLE: "role",
  SUB_DEPARTMENT: "subDepartment_name",
  IS_ACTIVE: "is_active",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
};

// INSERT USER
export const insertUser = async ({
  name,
  email,
  password,
  city,
  role,
  subDepartment_name,
}) => {
  try {
    const [existing] = await pool.execute(
      `SELECT ${USER_COLUMNS.ID} FROM ${USER_TABLE} WHERE ${USER_COLUMNS.EMAIL} = ?`,
      [email],
    );

    if (existing.length > 0) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userUuid = generateUUID();

    const subDepartment = subDepartment_name ?? null;

    const sql = `
      INSERT INTO ${USER_TABLE} 
      (${USER_COLUMNS.UUID}, ${USER_COLUMNS.NAME}, ${USER_COLUMNS.EMAIL}, ${USER_COLUMNS.PASSWORD}, ${USER_COLUMNS.CITY}, ${USER_COLUMNS.ROLE}, ${USER_COLUMNS.SUB_DEPARTMENT})
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      userUuid,
      name,
      email,
      hashedPassword,
      city,
      role,
      subDepartment,
    ]);

    return {
      id: result.insertId,
      uuid: userUuid,
      name,
      email,
      city,
      role,
      subDepartment_name: subDepartment,
    };
  } catch (error) {
    console.error("Insert User Error:", error);
    throw error;
  }
};

// FIND USER BY EMAIL
export const findUserByEmail = async (email) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM ${USER_TABLE} WHERE ${USER_COLUMNS.EMAIL} = ?`,
      [email],
    );

    return rows[0] || null;
  } catch (error) {
    throw error;
  }
};

// FIND USER BY UUID
export const findUserByUUID = async (uuid) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM ${USER_TABLE} WHERE ${USER_COLUMNS.UUID} = ?`,
      [uuid],
    );

    return rows[0] || null;
  } catch (error) {
    throw error;
  }
};

// FIND USER BY ID
export const findUserById = async (id) => {
  if (id == null) throw new Error("User ID is required");

  try {
    const [rows] = await pool.execute(
      `SELECT * FROM ${USER_TABLE} WHERE ${USER_COLUMNS.ID} = ?`,
      [id],
    );

    return rows[0] || null;
  } catch (error) {
    console.error("findUserById error:", error);
    throw error;
  }
};

// SAVE REFRESH TOKEN
export const saveRefreshToken = async (userId, refreshToken) => {
  await pool.execute(
    `UPDATE ${USER_TABLE} SET refreshToken = ? WHERE ${USER_COLUMNS.ID} = ?`,
    [refreshToken, userId],
  );
};

// GET USERS BY ROLE
export const getUsersByRole = async (role) => {
  try {
    const [rows] = await pool.execute(
      `SELECT 
        ${USER_COLUMNS.UUID},
        ${USER_COLUMNS.NAME},
        ${USER_COLUMNS.EMAIL},
        ${USER_COLUMNS.SUB_DEPARTMENT}
       FROM ${USER_TABLE} 
       WHERE ${USER_COLUMNS.ROLE} = ?`,
      [role],
    );

    return rows;
  } catch (error) {
    console.error("getUsersByRole error:", error);
    throw error;
  }
};

// SALES USERS WRAPPER
export const getSalesUsers = () => getUsersByRole("sales");

// UPDATE USER
export const updateUserById = async (
  id,
  { name, email, password, city, role, subDepartment_name },
) => {
  try {
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const subDepartment = subDepartment_name ?? null;

    const sql = `
      UPDATE ${USER_TABLE}
      SET 
        ${USER_COLUMNS.NAME} = ?,
        ${USER_COLUMNS.EMAIL} = ?,
        ${USER_COLUMNS.PASSWORD} = COALESCE(?, ${USER_COLUMNS.PASSWORD}),
        ${USER_COLUMNS.CITY} = ?,
        ${USER_COLUMNS.ROLE} = ?,
        ${USER_COLUMNS.SUB_DEPARTMENT} = ?,
        ${USER_COLUMNS.UPDATED_AT} = NOW()
      WHERE ${USER_COLUMNS.ID} = ?
    `;

    const [result] = await pool.execute(sql, [
      name,
      email,
      hashedPassword,
      city,
      role,
      subDepartment,
      id,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return await findUserById(id);
  } catch (error) {
    console.error("updateUserById error:", error);
    throw error;
  }
};
