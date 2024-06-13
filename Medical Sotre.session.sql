-------------------------Table Create Start------------

-- Create TESTING table
CREATE TABLE "TEST"
(
    "TEST_NAME" VARCHAR(30),
    "TEST_ID" INTEGER ,
    "TEST_PHONE" NUMERIC(12,0)
);

-- Create DOCTOR table
CREATE TABLE "DOCTOR"
(
    "D_NAME" VARCHAR(30),
    "D_ID" INTEGER NOT NULL,
    "D_PHONE" NUMERIC(12,0),
    "D_EMAIL" VARCHAR(40),
    "D_SPECIALIST" VARCHAR(40),
    CONSTRAINT "DOCTOR_PK" PRIMARY KEY ("D_ID")
);

-- Create CUSTOMER table
CREATE TABLE "CUSTOMER"
(
    "C_ID" INTEGER NOT NULL,
    "C_NAME" VARCHAR(30),
    "C_AGE" INTEGER NOT NULL,
    "C_ADDRESS" VARCHAR(50),
    "C_CONTACT" NUMERIC(12,0) NOT NULL,
    "C_SERVE" INTEGER NOT NULL,
    "D_ID" INTEGER,
    CONSTRAINT "CUS_PK" PRIMARY KEY ("C_ID"),
    CONSTRAINT "CUSTOMER_CK1" CHECK ("C_AGE" >= 18)
);

-- Create MEDICAL_SHOP table
CREATE TABLE "MEDICAL_SHOP"
(
    "SHOP_BATCH" VARCHAR(40) NOT NULL,
    "SHOP_NAME" VARCHAR(40),
    "SHOP_ADDRESS" VARCHAR(40),
    CONSTRAINT "MEDICAL_SHOP_PK2" PRIMARY KEY ("SHOP_BATCH")
);

-- Create EMPLOYEES table
CREATE TABLE "EMPLOYEES"
(
    "E_ID" VARCHAR(40) NOT NULL,
    "E_NAME" VARCHAR(40),
    "E_AGE" INTEGER,
    "E_BLOOD" VARCHAR(40),
    "E_SALARY" NUMERIC(10,0),
    "E_PHONE" NUMERIC(12,0),
    "E_DESIGNATION" VARCHAR(40),
    CONSTRAINT "MEDICAL_SHOP_PK" PRIMARY KEY ("E_ID"),
    CONSTRAINT "MEDICAL_SHOP_CK1" CHECK ("E_AGE" >= 18),
    CONSTRAINT "MEDICAL_SHOP_CK2" CHECK ("E_DESIGNATION" IN ('cashier', 'staff', 'manager'))
);

-- Create INVENTORY table
CREATE TABLE "INVENTORY"
(
    "M_ID" INTEGER NOT NULL,
    "M_NAME" VARCHAR(40) NOT NULL,
    "M_TYPE" VARCHAR(40),
    "M_PRICE" NUMERIC(4,0) NOT NULL,
    "M_IMPORT_DATE" DATE,
    "M_EXPIRE_DATE" DATE,
    "M_REMAIN" NUMERIC(4,0),
    CONSTRAINT "INVENTORY_PK" PRIMARY KEY ("M_ID")
);


-- Create COMPANIES table
CREATE TABLE "COMPANIES"
(
    "BATCH" VARCHAR(40) NOT NULL,
    "NAME" VARCHAR(40),
    "ESTABLISHED" DATE,
    "GROWTH" NUMERIC(4,2),
    "TOTAL_GENERICS" INTEGER,
    "HEADQUARTER" VARCHAR(40),
    "MAIL" VARCHAR(40),
    CONSTRAINT "COMPANY_PK" PRIMARY KEY ("BATCH"),
    CONSTRAINT "COMPANY_UK1" UNIQUE ("NAME", "MAIL")
);

-- Create PAYMENT_HISTORY table
CREATE TABLE "PAYMENT_HISTORY"
(
    "M_NAME" VARCHAR(50),
    "TAKEN_DATE" VARCHAR(40),
    "M_ID" INTEGER NOT NULL,
    "C_ID" INTEGER NOT NULL,
    "D_ID" INTEGER,
    "M_QUANTITY" NUMERIC(2,0) NOT NULL,
    "SERVED_BY" VARCHAR(40),
    CONSTRAINT "MEDICINE_PK" PRIMARY KEY ("M_ID"),
    CONSTRAINT "MEDICINE_FK" FOREIGN KEY ("C_ID") REFERENCES "CUSTOMER" ("C_ID"),
    CONSTRAINT "MEDICINE_FK2" FOREIGN KEY ("D_ID") REFERENCES "DOCTOR" ("D_ID"),
    CONSTRAINT "MEDICINE_CON" FOREIGN KEY ("M_ID") REFERENCES "INVENTORY" ("M_ID") ON DELETE CASCADE,
    CONSTRAINT "MEDICINE_CON4" FOREIGN KEY ("SERVED_BY") REFERENCES "EMPLOYEES" ("E_ID")
);

-- Create SUPPLIER table
CREATE TABLE "SUPPLIER"
(
    "S_ID" VARCHAR(40) NOT NULL,
    "S_NAME" VARCHAR(40),
    "S_AGE" NUMERIC(4,2),
    "S_ADDRESS" VARCHAR(40),
    "S_PHONE" NUMERIC(12,0),
    CONSTRAINT "SUPPLIER_PK" PRIMARY KEY ("S_ID"),
    CONSTRAINT "SUPPLIER_CK1" CHECK ("S_AGE" >= 18)
);

-- Create SUPPLY_HISTORY table
CREATE TABLE "SUPPLY_HISTORY"
(
    "SUPPLIED_BY" VARCHAR(40) NOT NULL,
    "SUPPLID_DATE" DATE,
    "TOTAL_AMMOUNT" NUMERIC(10,0),
    "SUPPLY_COUNT" INTEGER,
    CONSTRAINT "SUPPLY_HISTORY_CK1" CHECK ("TOTAL_AMMOUNT" >= 1000),
    CONSTRAINT "SUPPLY_HISTORY_FK2" FOREIGN KEY ("SUPPLIED_BY") REFERENCES "SUPPLIER" ("S_ID") ON DELETE CASCADE
);
-------------------------Table Create End------------

-------------------------DATA INSERT START------------
-- Insert data into DOCTOR table
INSERT INTO "DOCTOR" ("D_NAME", "D_ID", "D_PHONE", "D_EMAIL", "D_SPECIALIST")
VALUES
('Dr. John Smith', 1, 123456789012, 'john.smith@example.com', 'Cardiologist'),
('Dr. Jane Doe', 2, 987654321012, 'jane.doe@example.com', 'Neurologist'),
('Dr. Emily White', 3, 456789123012, 'emily.white@example.com', 'Pediatrician');

-- Insert data into CUSTOMER table
INSERT INTO "CUSTOMER" ("C_ID", "C_NAME", "C_AGE", "C_ADDRESS", "C_CONTACT", "C_SERVE", "D_ID")
VALUES
(1, 'Alice Johnson', 28, '123 Elm Street', 123456789012, 10, 1),
(2, 'Bob Smith', 45, '456 Oak Avenue', 987654321012, 20, 2),
(3, 'Charlie Brown', 35, '789 Pine Road', 456789123012, 30, 3);

-- Insert data into MEDICAL_SHOP table
INSERT INTO "MEDICAL_SHOP" ("SHOP_BATCH", "SHOP_NAME", "SHOP_ADDRESS")
VALUES
('BATCH001', 'Health Pharmacy', '101 Main Street'),
('BATCH002', 'Wellness Drugstore', '202 High Street'),
('BATCH003', 'Care Chemist', '303 Low Street');

-- Insert data into EMPLOYEES table
INSERT INTO "EMPLOYEES" ("E_ID", "E_NAME", "E_AGE", "E_BLOOD", "E_SALARY", "E_PHONE", "E_DESIGNATION")
VALUES
('E001', 'John Carter', 30, 'O+', 50000, 123456789012, 'manager'),
('E002', 'Emily Clark', 25, 'A-', 40000, 987654321012, 'cashier'),
('E003', 'Michael Brown', 40, 'B+', 45000, 456789123012, 'staff');

-- Insert data into INVENTORY table
INSERT INTO "INVENTORY" ("M_ID", "M_NAME", "M_TYPE", "M_PRICE", "M_IMPORT_DATE", "M_EXPIRE_DATE", "M_REMAIN")
VALUES
(1, 'Paracetamol', 'Tablet', 50, '2023-01-01', '2025-01-01', 100),
(2, 'Amoxicillin', 'Capsule', 30, '2023-02-01', '2024-02-01', 150),
(3, 'Cough Syrup', 'Liquid', 70, '2023-03-01', '2024-03-01', 200);

-- Insert data into COMPANIES table
INSERT INTO "COMPANIES" ("BATCH", "NAME", "ESTABLISHED", "GROWTH", "TOTAL_GENERICS", "HEADQUARTER", "MAIL")
VALUES
('B001', 'PharmaCorp', '2000-01-01', 5.50, 50, 'New York', 'contact@pharmacorp.com'),
('B002', 'MediLife', '2005-06-15', 6.75, 40, 'Los Angeles', 'info@medilife.com'),
('B003', 'HealthGen', '2010-11-20', 7.25, 60, 'Chicago', 'support@healthgen.com');

-- Insert data into PAYMENT_HISTORY table
INSERT INTO "PAYMENT_HISTORY" ("M_NAME", "TAKEN_DATE", "M_ID", "C_ID", "D_ID", "M_QUANTITY", "SERVED_BY")
VALUES
('Paracetamol', '2023-04-01', 1, 1, 1, 2, 'E001'),
('Amoxicillin', '2023-04-02', 2, 2, 2, 1, 'E002'),
('Cough Syrup', '2023-04-03', 3, 3, 3, 3, 'E003');

-- Insert data into SUPPLIER table
INSERT INTO "SUPPLIER" ("S_ID", "S_NAME", "S_AGE", "S_ADDRESS", "S_PHONE")
VALUES
('S001', 'Global Supplies', 35.00, '123 Supply Street', 123456789012),
('S002', 'Health Supplies', 40.00, '456 Warehouse Road', 987654321012),
('S003', 'MediDistributors', 38.50, '789 Logistic Lane', 456789123012);

-- Insert data into SUPPLY_HISTORY table
INSERT INTO "SUPPLY_HISTORY" ("SUPPLIED_BY", "SUPPLID_DATE", "TOTAL_AMMOUNT", "SUPPLY_COUNT")
VALUES
('S001', '2023-04-01', 2000, 50),
('S002', '2023-04-02', 3000, 60),
('S003', '2023-04-03', 1500, 40);
-------------------------DATA INSERT END------------

-------------------------Modify Table START------------
ALTER TABLE "TEST" ADD COLUMN "product" BOOLEAN;
ALTER TABLE "TEST" DROP COLUMN product;
-------------------------Modify Table END------------

-------------------------DROP Table START------------
-- Drop the DOCTOR table
DROP TABLE IF EXISTS "DOCTOR";

-- Drop the CUSTOMER table
DROP TABLE IF EXISTS "CUSTOMER";

-- Drop the MEDICAL_SHOP table
DROP TABLE IF EXISTS "MEDICAL_SHOP";

-- Drop the EMPLOYEES table
DROP TABLE IF EXISTS "EMPLOYEES";

-- Drop the INVENTORY table
DROP TABLE IF EXISTS "INVENTORY";

-- Drop the COMPANIES table
DROP TABLE IF EXISTS "COMPANIES";

-- Drop the PAYMENT_HISTORY table
DROP TABLE IF EXISTS "PAYMENT_HISTORY";

-- Drop the SUPPLIER table
DROP TABLE IF EXISTS "SUPPLIER";

-- Drop the SUPPLY_HISTORY table
DROP TABLE IF EXISTS "SUPPLY_HISTORY";

-- Drop database 
DROP DATABASE [IF EXISTS] database_name
[WITH (FORCE)]
-------------------------DROP Table END------------


-------------------------QUERY COMMAND START---------------

-- Table Data show by *  QUERY START---------------
SELECT * FROM "DOCTOR";
SELECT * FROM "CUSTOMER";
SELECT * FROM "MEDICAL_SHOP";
SELECT * FROM "EMPLOYEES";
SELECT * FROM "INVENTORY";
SELECT * FROM "COMPANIES";
SELECT * FROM "PAYMENT_HISTORY";
SELECT * FROM "SUPPLIER";
SELECT * FROM "SUPPLY_HISTORY";
-- Table Data show by * QUERY END---------------

-- Query data from the DOCTOR table START------------

-- Query find one data by unique thing
SELECT * FROM "DOCTOR" WHERE "D_ID" = 1

SELECT "D_NAME" FROM "DOCTOR";

-- Query data from one column (D_NAME)
SELECT "D_NAME" FROM "DOCTOR";

-- Query data from multiple columns (D_NAME and D_SPECIALIST)
SELECT "D_NAME", "D_SPECIALIST" FROM "DOCTOR";

-- Using PostgreSQL SELECT statement with expressions (concatenating D_NAME and D_SPECIALIST)
SELECT "D_NAME" || ' - ' || "D_SPECIALIST" AS "Doctor_Details" FROM "DOCTOR";


-- Update Table data
UPDATE "DOCTOR" SET "D_NAME" ='AKRAM', "D_PHONE"=0234234234, "D_EMAIL"='SDFJ@GMAIL.COM', "D_SPECIALIST"='SDFJKSD' WHERE "D_ID"=4;


-- Using PostgreSQL SELECT statement without a FROM clause (generate a constant value)
SELECT 1 AS "One";

-- Query data from the DOCTOR table END------------

-- Query data from the CUSTOMER table START------------

-- Query data from one column (C_NAME)
SELECT "C_NAME" FROM "CUSTOMER";

-- Query data from multiple columns (C_NAME and C_ADDRESS)
SELECT "C_NAME", "C_ADDRESS" FROM "CUSTOMER";

-- Using PostgreSQL SELECT statement with expressions (calculate total served amount)
SELECT "C_NAME", "C_SERVE" * 2 AS "Total_Served_Amount" FROM "CUSTOMER";

-- Using PostgreSQL SELECT statement without a FROM clause (generate a sequence of numbers)
SELECT generate_series(1, 10) AS "Number";

-- Query data from the CUSTOMER table END------------

-- Query data from the MEDICAL table START------------

-- Query data from one column (SHOP_NAME)
SELECT "SHOP_NAME" FROM "MEDICAL_SHOP";

-- Query data from multiple columns (SHOP_NAME and SHOP_ADDRESS)
SELECT "SHOP_NAME", "SHOP_ADDRESS" FROM "MEDICAL_SHOP";

-- Using PostgreSQL SELECT statement with expressions (combine SHOP_NAME and SHOP_ADDRESS)
SELECT "SHOP_NAME" || ', ' || "SHOP_ADDRESS" AS "Shop_Location" FROM "MEDICAL_SHOP";

-- Using PostgreSQL SELECT statement without a FROM clause (generate a constant string)
SELECT 'Medical Shop' AS "Type";

-- Query data from the MEDICAL table END------------

-- Query data from the EMPLOYEES table START------------

-- Query data from one column (E_NAME)
SELECT "E_NAME" FROM "EMPLOYEES";

-- Query data from multiple columns (E_NAME and E_DESIGNATION)
SELECT "E_NAME", "E_DESIGNATION" FROM "EMPLOYEES";

-- Using PostgreSQL SELECT statement with expressions (concatenate E_NAME and E_DESIGNATION)
SELECT "E_NAME" || ' - ' || "E_DESIGNATION" AS "Employee_Details" FROM "EMPLOYEES";

-- Using PostgreSQL SELECT statement without a FROM clause (generate a constant value)
SELECT 'Employee' AS "Type";

-- Query data from the EMPLOYEES table END------------

-- Query data from the INVENTORY table START------------

-- Query data from one column (M_NAME)
SELECT "M_NAME" FROM "INVENTORY";

-- Query data from multiple columns (M_NAME and M_TYPE)
SELECT "M_NAME", "M_TYPE" FROM "INVENTORY";

-- Using PostgreSQL SELECT statement with expressions (calculate total price)
SELECT "M_NAME", "M_PRICE" * "M_REMAIN" AS "Total_Price" FROM "INVENTORY";

-- Using PostgreSQL SELECT statement without a FROM clause (generate a constant value)
SELECT 'Inventory Item' AS "Type";

-- Query data from the INVENTORY table END------------
-- Query data from the COMPANIES table START------------

-- Query data from one column (NAME)
SELECT "NAME" FROM "COMPANIES";

-- Query data from multiple columns (NAME and ESTABLISHED)
SELECT "NAME", "ESTABLISHED" FROM "COMPANIES";

-- Using PostgreSQL SELECT statement with expressions (calculate growth rate)
SELECT "NAME", "GROWTH" * 100 AS "Growth_Rate_Percentage" FROM "COMPANIES";

-- Using PostgreSQL SELECT statement without a FROM clause (generate a constant value)
SELECT 'Company' AS "Type";

-- Query data from the COMPANIES table END------------

-- Query data from the PAYMENT_HISTORY table START------------

-- Query data from one column (M_NAME)
SELECT "M_NAME" FROM "PAYMENT_HISTORY";

-- Query data from multiple columns (M_NAME and M_QUANTITY)
SELECT "M_NAME", "M_QUANTITY" FROM "PAYMENT_HISTORY";

-- Using PostgreSQL SELECT statement with expressions (calculate total payment)
SELECT "M_NAME", "M_QUANTITY" * 100 AS "Total_Payment" FROM "PAYMENT_HISTORY";

-- Using PostgreSQL SELECT statement without a FROM clause (generate a constant value)
SELECT 'Payment' AS "Type";

-- Query data from the PAYMENT_HISTORY table END------------

-- Query data from the SUPPLIER table START------------

-- Query data from one column (S_NAME)
SELECT "S_NAME" FROM "SUPPLIER";

-- Query data from multiple columns (S_NAME and S_AGE)
SELECT "S_NAME", "S_AGE" FROM "SUPPLIER";

-- Using PostgreSQL SELECT statement with expressions (calculate discount based on age)
SELECT "S_NAME", CASE WHEN "S_AGE" >= 40 THEN 'Senior Discount' ELSE 'No Discount' END AS "Discount" FROM "SUPPLIER";

-- Using PostgreSQL SELECT statement without a FROM clause (generate a constant value)
SELECT 'Supplier' AS "Type";

-- Query data from the SUPPLIER table END------------

-- Query data from the SUPPLY_HISTORY table START------------

-- Query data from one column (SUPPLIED_BY)
SELECT "SUPPLIED_BY" FROM "SUPPLY_HISTORY";

-- Query data from multiple columns (SUPPLIED_BY and SUPPLID_DATE)
SELECT "SUPPLIED_BY", "SUPPLID_DATE" FROM "SUPPLY_HISTORY";

-- Using PostgreSQL SELECT statement with expressions (format date)
SELECT "SUPPLIED_BY", TO_CHAR("SUPPLID_DATE", 'DD-Mon-YYYY') AS "Supply_Date" FROM "SUPPLY_HISTORY";

-- Using PostgreSQL SELECT statement without a FROM clause (generate a constant value)
SELECT 'Supply' AS "Type";

-- Query data from the SUPPLY_HISTORY table END------------
-------------------------QUERY COMMAND END---------------


-- HELP 
-- Detail table data 
\d table_name
-- Detail table list
\l
-- help 
\?