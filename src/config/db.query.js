

// CREATE TABLE `uc_pinnak`.`users` (
// id INT AUTO_INCREMENT PRIMARY KEY,       
//     uuid CHAR(36) NOT NULL UNIQUE,           
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(150) NOT NULL UNIQUE,      
//     password VARCHAR(255) NOT NULL,
//     role ENUM('user', 'admin', 'presale', 'bdm', 'sales', 'city manager', 'team leader') NOT NULL ,
//     is_active BOOLEAN DEFAULT TRUE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     INDEX idx_email (email)                 
// );




// CREATE TABLE `uc_pinnak`.`leads` (

// id BIGINT AUTO_INCREMENT PRIMARY KEY,
//   uuid VARCHAR(36) NOT NULL,
//   name VARCHAR(255) NOT NULL,
//   phone VARCHAR(50) NOT NULL,
//   email VARCHAR(150) NOT NULL,
//   companyName VARCHAR(255) NOT NULL,
//   source VARCHAR(100) NOT NULL,
//   telesales VARCHAR(100) NOT NULL,
//   status VARCHAR(50) NOT NULL,
//   customerType VARCHAR(100) NOT NULL,
//   customerCategoryType VARCHAR(100),
//   serviceType VARCHAR(100) NOT NULL,
//   vehiclevehicle2 VARCHAR(100),
//   vehicleType VARCHAR(100),
//   vehiclevehicle3 VARCHAR(100),
//   occasionType VARCHAR(100),
//   pickupDateTime VARCHAR(100),
//   dropDateTime VARCHAR(100),

//   days BIGINT NOT NULL,
//   pickupAddress TEXT NOT NULL,
//   dropAddress TEXT NOT NULL,
//   passengerTotal BIGINT NOT NULL,
//   petsNumber BIGINT DEFAULT 0,

//   petsNames VARCHAR(255),
//   km VARCHAR(255) NOT NULL,

//   smallbaggage BIGINT DEFAULT 0,
//   mediumbaggage BIGINT DEFAULT 0,
//   largebaggage BIGINT DEFAULT 0,
//   airportbaggage BIGINT DEFAULT 0,
//   totalbaggage BIGINT DEFAULT 0,

//   itinerary JSON,
//   tripType VARCHAR(50) NOT NULL,
//   remarks TEXT,
//   message TEXT,
//   lost_reason TEXT,

//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

// );



