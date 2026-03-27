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
  IS_ACTIVE: "is_active",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
};

export const insertUser = async ({ name, email, password, city, role }) => {
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

    const sql = `
      INSERT INTO ${USER_TABLE} 
      (${USER_COLUMNS.UUID}, ${USER_COLUMNS.NAME}, ${USER_COLUMNS.EMAIL}, ${USER_COLUMNS.PASSWORD}, ${USER_COLUMNS.CITY}, ${USER_COLUMNS.ROLE})
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      userUuid,
      name,
      email,
      hashedPassword,
      city,
      role,
    ]);

    return {
      id: result.insertId,
      uuid: userUuid,
      name,
      email,
      city,
      role,
    };
  } catch (error) {
    console.error("Insert User Error:", error);
    throw error;
  }
};

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

export const saveRefreshToken = async (userId, refreshToken) => {
  await pool.execute("UPDATE users SET refreshToken = ? WHERE id = ?", [
    refreshToken,
    userId,
  ]);
};

// user.model.js (add this function)

export const getUsersByRole = async (role) => {
  try {
    const [rows] = await pool.execute(
      `SELECT ${USER_COLUMNS.UUID}, ${USER_COLUMNS.NAME}, ${USER_COLUMNS.EMAIL} 
       FROM ${USER_TABLE} 
       WHERE ${USER_COLUMNS.ROLE} = ?`,
      [role]
    );
    return rows;
  } catch (error) {
    console.error("getUsersByRole error:", error);
    throw error;
  }
};

// Optional: a specific wrapper for sales
export const getSalesUsers = () => getUsersByRole('sales');