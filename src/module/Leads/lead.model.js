import { pool } from "../../config/mySqlDB.js";
import { generateUUID } from "../../utils/uuid.js";

export const LEAD_TABLE = "leads";
const safe = (value) => (value === undefined ? null : value);

export const LEAD_COLUMNS = {
  ID: "id",
  UUID: "uuid",
  DATE: "date",
  ENQUIRY_TIME: "enquiryTime",
  NAME: "customerName",
  PHONE: "customerPhone",
  EMAIL: "customerEmail",
  COMPANY_NAME: "companyName",
  SOURCE: "source",
  TELESALES: "telecaller",
  STATUS: "status",
  CUSTOMER_TYPE: "customerType",
  CUSTOMER_CATEGORY_TYPE: "customerCategoryType",
  SERVICE_TYPE: "serviceType",
  VEHICLE_vehicle2: "vehicle2",
  VEHICLE_TYPE: "vehicles",
  VEHICLE_vehicle3: "vehicle3",
  REQUIREMENT_VEHICLE: "requirementVehicle",
  OCCASION_TYPE: "occasion",
  PICKUP_DATETIME: "pickupDateTime",
  DROP_DATETIME: "dropDateTime",
  DAYS: "days",
  PICKUP_ADDRESS: "pickupAddress",
  DROP_ADDRESS: "dropAddress",
  PASSENGER_TOTAL: "passengerTotal",
  PETS_NUMBER: "petsNumber",
  PETS_NAMES: "petsNames",
  KM: "km",
  SMALL_BAGGAGE: "smallBaggage",
  MEDIUM_BAGGAGE: "mediumBaggage",
  LARGE_BAGGAGE: "largeBaggage",
  AIRPORT_BAGGAGE: "airportBaggage",
  TOTAL_BAGGAGE: "totalBaggage",
  ITINERARY: "itinerary",
  TRIP_TYPE: "tripType",
  REMARKS: "remarks",
  MESSAGE: "message",
  DROP_CITY: "dropcity",
  PICKUP_CITY: "pickupcity",
  LOST_REASON: "lost_reason",
  ALTERNATE_PHONE: "alternatePhone",
  COUNTRY_NAME: "countryName",
  CITY: "city",
  CUSTOMER_CITY: "customerCity",
  VEHICLE1QUANTITY: "vehicle1Quantity",
  VEHICLE2QUANTITY: "vehicle2Quantity",
  VEHICLE3QUANTITY: "vehicle3Quantity",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
};

export const insertLead = async (data) => {
  try {
    const {
      date,
      enquiryTime,
      customerName,
      customerPhone,
      customerEmail,
      companyName,
      source,
      telecaller,
      status,
      customerType,
      customerCategoryType,
      serviceType,
      vehicle2,
      vehicles,
      vehicle3,
      requirementVehicle,
      occasion,
      pickupDateTime,
      dropDateTime,
      days,
      pickupAddress,
      dropAddress,
      passengerTotal,
      petsNumber,
      petsNames,
      km,
      smallBaggage,
      mediumBaggage,
      largeBaggage,
      airportBaggage,
      totalBaggage,
      itinerary,
      tripType,
      remarks,
      message,
      dropcity,
      pickupcity,
      lost_reason,
      alternatePhone,
      countryName,
      city,
      customerCity,
      vehicle1Quantity,
      vehicle2Quantity,
      vehicle3Quantity,
    } = data;

    const leadUuid = generateUUID();

    // STRING SAFE
    const safe = (v) => (v === "" || v === undefined ? null : v);

    // INTEGER SAFE
    const int = (v) => Number(v) || 0;

    const values = [
      leadUuid,
      safe(date),
      safe(enquiryTime),
      safe(customerName),
      safe(customerPhone),
      safe(customerEmail),
      safe(companyName),
      safe(source),
      safe(telecaller),
      safe(status),
      safe(customerType),
      safe(customerCategoryType),
      safe(serviceType),
      safe(vehicle2),
      safe(vehicles),
      safe(vehicle3),
      safe(requirementVehicle),
      safe(occasion),
      safe(pickupDateTime),
      safe(dropDateTime),

      int(days),

      safe(pickupAddress),
      safe(dropAddress),

      int(passengerTotal),
      int(petsNumber),

      safe(petsNames),

      int(km),

      int(smallBaggage),
      int(mediumBaggage),
      int(largeBaggage),
      int(airportBaggage),
      int(totalBaggage),

      itinerary && Array.isArray(itinerary) ? JSON.stringify(itinerary) : null,

      safe(tripType),
      safe(remarks),
      safe(message),
      safe(dropcity),
      safe(pickupcity),
      safe(lost_reason),
      safe(alternatePhone),
      safe(countryName),
      safe(city),
      safe(customerCity),

      int(vehicle1Quantity),
      int(vehicle2Quantity),
      int(vehicle3Quantity),
    ];

    const sql = `
      INSERT INTO ${LEAD_TABLE} (
        ${LEAD_COLUMNS.UUID},
        ${LEAD_COLUMNS.DATE},
        ${LEAD_COLUMNS.ENQUIRY_TIME},
        ${LEAD_COLUMNS.NAME},
        ${LEAD_COLUMNS.PHONE},
        ${LEAD_COLUMNS.EMAIL},
        ${LEAD_COLUMNS.COMPANY_NAME},
        ${LEAD_COLUMNS.SOURCE},
        ${LEAD_COLUMNS.TELESALES},
        ${LEAD_COLUMNS.STATUS},
        ${LEAD_COLUMNS.CUSTOMER_TYPE},
        ${LEAD_COLUMNS.CUSTOMER_CATEGORY_TYPE},
        ${LEAD_COLUMNS.SERVICE_TYPE},
        ${LEAD_COLUMNS.VEHICLE_vehicle2},
        ${LEAD_COLUMNS.VEHICLE_TYPE},
        ${LEAD_COLUMNS.VEHICLE_vehicle3},
        ${LEAD_COLUMNS.REQUIREMENT_VEHICLE},
        ${LEAD_COLUMNS.OCCASION_TYPE},
        ${LEAD_COLUMNS.PICKUP_DATETIME},
        ${LEAD_COLUMNS.DROP_DATETIME},
        ${LEAD_COLUMNS.DAYS},
        ${LEAD_COLUMNS.PICKUP_ADDRESS},
        ${LEAD_COLUMNS.DROP_ADDRESS},
        ${LEAD_COLUMNS.PASSENGER_TOTAL},
        ${LEAD_COLUMNS.PETS_NUMBER},
        ${LEAD_COLUMNS.PETS_NAMES},
        ${LEAD_COLUMNS.KM},
        ${LEAD_COLUMNS.SMALL_BAGGAGE},
        ${LEAD_COLUMNS.MEDIUM_BAGGAGE},
        ${LEAD_COLUMNS.LARGE_BAGGAGE},
        ${LEAD_COLUMNS.AIRPORT_BAGGAGE},
        ${LEAD_COLUMNS.TOTAL_BAGGAGE},
        ${LEAD_COLUMNS.ITINERARY},
        ${LEAD_COLUMNS.TRIP_TYPE},
        ${LEAD_COLUMNS.REMARKS},
        ${LEAD_COLUMNS.MESSAGE},
        ${LEAD_COLUMNS.DROP_CITY},
        ${LEAD_COLUMNS.PICKUP_CITY},
        ${LEAD_COLUMNS.LOST_REASON},
        ${LEAD_COLUMNS.ALTERNATE_PHONE},
        ${LEAD_COLUMNS.COUNTRY_NAME},
        ${LEAD_COLUMNS.CITY},
        ${LEAD_COLUMNS.CUSTOMER_CITY},
        ${LEAD_COLUMNS.VEHICLE1QUANTITY},
        ${LEAD_COLUMNS.VEHICLE2QUANTITY},
        ${LEAD_COLUMNS.VEHICLE3QUANTITY}
      )
      VALUES (${values.map(() => "?").join(", ")})
    `;

    const [result] = await pool.execute(sql, values);

    return {
      id: result.insertId,
      uuid: leadUuid,
      customerName,
      status,
      serviceType,
    };
  } catch (error) {
    console.error("Insert Lead Error:", error);
    throw error;
  }
};

export const findLeadByUUID = async (uuid) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM ${LEAD_TABLE} WHERE ${LEAD_COLUMNS.UUID} = ?`,
      [uuid],
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Find Lead Error:", error);
    throw error;
  }
};

// export const getLeads = async (page = 1, limit = 15) => {
//   try {
//     const pageNumber = parseInt(page, 10);
//     const limitNumber = parseInt(limit, 10);

//     if (isNaN(pageNumber) || pageNumber < 1) {
//       throw new Error("Invalid page number");
//     }
//     if (isNaN(limitNumber) || limitNumber < 1) {
//       throw new Error("Invalid limit number");
//     }

//     const offset = (pageNumber - 1) * limitNumber;

//     const [rows] = await pool.execute(
//       `SELECT * FROM ${LEAD_TABLE} ORDER BY ${LEAD_COLUMNS.CREATED_AT} DESC LIMIT ${limitNumber} OFFSET ${offset}`,
//     );

//     const [totalRows] = await pool.execute(
//       `SELECT COUNT(*) as count FROM ${LEAD_TABLE}`,
//     );
//     const total = totalRows[0].count;

//     return {
//       leads: rows,
//       total,
//       page: pageNumber,
//       totalPages: Math.ceil(total / limitNumber),
//     };
//   } catch (error) {
//     console.error("getLeads error:", error);
//     throw error;
//   }
// };

export const getLeads = async (page = 1, limit = 15) => {
  try {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new Error("Invalid page number");
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
      throw new Error("Invalid limit number");
    }

    const offset = (pageNumber - 1) * limitNumber;

    // ✅ NULL or not unwanted
    const [rows] = await pool.execute(
      `SELECT *
       FROM leads
       WHERE unwanted_status IS NULL 
          OR unwanted_status != 'unwanted'
       ORDER BY created_at DESC
       LIMIT ${limitNumber} OFFSET ${offset}`,
    );

    const [totalRows] = await pool.execute(
      `SELECT COUNT(*) as count
       FROM leads
       WHERE unwanted_status IS NULL 
          OR unwanted_status != 'unwanted'`,
    );

    const total = totalRows[0].count;

    return {
      leads: rows,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
  } catch (error) {
    console.error("getLeads error:", error);
    throw error;
  }
};

export const updateLeadById = async (leadId, data) => {
  try {
    const fieldsToExclude = ["created_at", "id", "uuid"];
    fieldsToExclude.forEach((field) => {
      delete data[field];
    });

    const dateFields = ["enquiryTime", "pickupDateTime", "dropDateTime"];
    dateFields.forEach((field) => {
      if (data[field]) {
        // Preserve the full datetime, don't strip time
        let formattedDate = data[field];

        // Convert from ISO format (with T) to MySQL format (with space) if needed
        if (formattedDate.includes("T")) {
          formattedDate = formattedDate.replace("T", " ");
        }

        // Ensure time has seconds (HH:MM:SS format)
        const parts = formattedDate.split(" ");
        if (parts.length === 2) {
          const timePart = parts[1];
          if (timePart && timePart.includes(":")) {
            const timeComponents = timePart.split(":");
            if (timeComponents.length === 2) {
              // Add seconds if only hours and minutes
              formattedDate = `${parts[0]} ${timePart}:00`;
            }
            // If already has 3 parts (HH:MM:SS), keep as is
          }
        } else if (parts.length === 1) {
          // If only date is provided, add default time 00:00:00
          formattedDate = `${parts[0]} 00:00:00`;
        }

        data[field] = formattedDate;
      }
    });

    if (Object.keys(data).length === 0) {
      return { affectedRows: 0 };
    }

    const setFields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(data);

    const [result] = await pool.execute(
      `UPDATE leads SET ${setFields}, updated_at = NOW() WHERE id = ?`,
      [...values, leadId],
    );

    return result;
  } catch (error) {
    console.error("updateUserById error:", error);
    throw error;
  }
};

export const updateLeadUnwantedStatus = async (leadId, status) => {
  try {
    // validation
    if (!leadId) {
      throw new Error("leadId is required");
    }

    if (!["wanted", "unwanted"].includes(status)) {
      throw new Error("Invalid status value");
    }

    const [result] = await pool.execute(
      `UPDATE leads 
       SET unwanted_status = ?, updated_at = NOW()
       WHERE id = ?`,
      [status, leadId],
    );

    return result;
  } catch (error) {
    console.error("updateLeadUnwantedStatus error:", error);
    throw error;
  }
};

export const getAllUnwantedLeadsModel = async () => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM ${LEAD_TABLE} 
       WHERE unwanted_status = 'unwanted'
       ORDER BY ${LEAD_COLUMNS.UPDATED_AT} DESC`,
    );

    console.log(`Found ${rows.length} unwanted leads`);
    return rows;
  } catch (error) {
    console.error("getAllUnwantedLeadsModel error:", error);
    throw error;
  }
};
