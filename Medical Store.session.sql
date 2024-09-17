-------------------------Table Create Start------------

---- DOCTOR TABLE START ------

-- Drop existing objects related to DOCTOR
DROP SEQUENCE IF EXISTS doctor_id_seq;
DROP TABLE IF EXISTS "DOCTOR";
DROP FUNCTION IF EXISTS set_doctor_id;
DROP TRIGGER IF EXISTS set_doctor_id_trigger ON "DOCTOR";

-- Create sequence for DOCTOR
CREATE SEQUENCE doctor_id_seq START 1 INCREMENT 1;

-- Create function to set default value for D_ID
CREATE OR REPLACE FUNCTION set_doctor_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW."D_ID" := 'D' || nextval('doctor_id_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to set up the DOCTOR table
CREATE OR REPLACE FUNCTION create_doctor_table() RETURNS void AS $$
BEGIN
    EXECUTE '
    CREATE TABLE "DOCTOR"
    (
        "D_ID" VARCHAR(40) NOT NULL,
        "D_NAME" VARCHAR(30) NOT NULL,
        "D_PHONE" NUMERIC(12,0),
        "D_EMAIL" VARCHAR(40),
        "D_SPECIALIST" VARCHAR(40),
        "D_PHOTO" TEXT,
        CONSTRAINT "DOCTOR_PK" PRIMARY KEY ("D_ID")
    )';
END;
$$ LANGUAGE plpgsql;

-- Call the function to create the DOCTOR table
SELECT create_doctor_table();

CREATE TRIGGER set_doctor_id_trigger
BEFORE INSERT ON "DOCTOR"
FOR EACH ROW
EXECUTE FUNCTION set_doctor_id();

-- Create a function to insert data into the DOCTOR table
CREATE OR REPLACE FUNCTION insert_doctor_data(
    d_name VARCHAR(40),
    d_phone NUMERIC(12,0),
    d_email VARCHAR(40),
    d_specialist VARCHAR(40),
    d_photo TEXT
) RETURNS void AS $$
BEGIN
    INSERT INTO "DOCTOR" ("D_NAME", "D_PHONE", "D_EMAIL", "D_SPECIALIST", "D_PHOTO")
    VALUES (d_name, d_phone, d_email, d_specialist, d_photo);
END;
$$ LANGUAGE plpgsql;

-- Insert data into DOCTOR table using the function
SELECT insert_doctor_data('Dr. John Smith', 123456789012, 'john.smith@example.com', 'Cardiologist', 'A');
SELECT insert_doctor_data('Dr. Jane Doe', 987654321012, 'jane.doe@example.com', 'Neurologist', 'B');
SELECT insert_doctor_data('Dr. Emily White', 456789123012, 'emily.white@example.com', 'Pediatrician', 'C');
SELECT insert_doctor_data('Dr. Alice Johnson', 234567890123, 'alice.johnson@example.com', 'Dermatologist', 'D');
SELECT insert_doctor_data('Dr. snow white', 567347890123, 'snow.white@example.com', 'medicine', 'E');
SELECT insert_doctor_data('Dr. phebe buffey', 890537890123, 'phebe@example.com', 'Endocrinologists', 'F');
SELECT insert_doctor_data('Dr. monika gellar', 234567857890, 'monika@example.com', 'Allergists', 'G');
SELECT insert_doctor_data('Dr. rachel green', 234567845623, 'rachel@example.com', 'gynecologists', 'H');
SELECT insert_doctor_data('Dr. chandler bing', 234567897652, 'chandler@example.com', 'Dermatologist', 'I');
SELECT insert_doctor_data('Dr. joey tribbiyoni', 890763978652, 'joey@example.com', 'Endocrinologists', 'J');
SELECT insert_doctor_data('Dr. ross gellar', 379346576923, 'ross@example.com', 'Gastroenterologists', 'K');
SELECT insert_doctor_data('Dr. iftehad kamal', 656726097564, 'iftee234@example.com', 'Pediatricians', 'L');
SELECT insert_doctor_data('Dr. Asif kabir', 567834562189, 'asif980@example.com', 'Neurologist', 'M');
SELECT insert_doctor_data('Dr. Akram hossain', 567345678923, 'akram567@example.com', 'Cardiologist', 'N');
SELECT insert_doctor_data('Dr. Afnan siddiki',762435698567, 'afnan456@example.com', 'gynecologists', 'O');


-- Create a function to update data into the DOCTOR table
CREATE OR REPLACE FUNCTION update_doctor_data(
    doctor_id VARCHAR(40),
    d_name VARCHAR(40),
    d_phone NUMERIC(12,0),
    d_email VARCHAR(40),
    d_specialist VARCHAR(40),
    d_photo TEXT
) RETURNS void AS $$
BEGIN
    UPDATE "DOCTOR"
    SET
        "D_NAME" = d_name,
        "D_PHONE" = d_phone,
        "D_EMAIL" = d_email,
        "D_SPECIALIST" = d_specialist,
        "D_PHOTO" = d_photo
    WHERE
        "D_ID" = doctor_id;
END;
$$ LANGUAGE plpgsql;


--Update data into DOCTOR table using the function
SELECT update_doctor_data('D1','saifur rahman', 4945672349, 'saifur@example.com', 'Cardiologist', 'Y');
SELECT update_doctor_data('D3','mahbub chowdhury', 89673453478, 'mahbub@example.com', 'Pediatrician', 'X');


SELECT * FROM "DOCTOR";

---- DOCTOR TABLE END ------


---- CUSTOMER TABLE START -----
DROP SEQUENCE IF EXISTS customer_id_seq;
DROP TABLE IF EXISTS "CUSTOMER";
DROP FUNCTION IF EXISTS set_customer_id;
DROP TRIGGER IF EXISTS set_customer_id_trigger ON "CUSTOMER";


CREATE SEQUENCE customer_id_seq START 1 INCREMENT 1;

CREATE OR REPLACE FUNCTION set_customer_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW."C_ID" := 'C' || nextval('customer_id_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a function to set up the table, sequence, function, and trigger
CREATE OR REPLACE FUNCTION create_customer_table() RETURNS void AS $$
BEGIN
    
    -- Create CUSTOMER table
    EXECUTE '
    CREATE TABLE "CUSTOMER"
    (
        "C_ID" VARCHAR(40) NOT NULL,
        "C_NAME" VARCHAR(30) NOT NULL,
        "C_AGE" INTEGER NOT NULL,
        "C_ADDRESS" VARCHAR(50),
        "C_CONTACT" NUMERIC(12,0) NOT NULL,
        "C_SERVE" INTEGER NOT NULL,
        "D_ID" VARCHAR(40),
        "C_PHOTO" TEXT,
        CONSTRAINT "CUS_PK" PRIMARY KEY ("C_ID"),
        CONSTRAINT "CUSTOMER_FK1" FOREIGN KEY ("D_ID") REFERENCES "DOCTOR" ("D_ID")
    )';
    
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_customer_id_trigger
BEFORE INSERT ON "CUSTOMER"
FOR EACH ROW
EXECUTE FUNCTION set_customer_id();

-- Call the function to create the table, sequence, function, and trigger
SELECT create_customer_table();

-- Verify the table creation
SELECT * FROM "CUSTOMER";

-- Create a function to insert data into the CUSTOMER table
CREATE OR REPLACE FUNCTION insert_customer_data(
    c_name VARCHAR(30),
    c_age INTEGER,
    c_address VARCHAR(50),
    c_contact NUMERIC(12,0),
    c_serve INTEGER,
	d_id VARCHAR(40)
) RETURNS void AS $$
BEGIN
    INSERT INTO "CUSTOMER" ("C_NAME", "C_AGE", "C_ADDRESS", "C_CONTACT", "C_SERVE", "D_ID")
    VALUES (c_name,c_age,c_address,c_contact, c_serve,d_id);
END;
$$ LANGUAGE plpgsql;

-- Insert data into customer table using the function
SELECT insert_customer_data('Bob Smith', 25, '456 Oak Avenue', 82.5491, 15, 'D2');
SELECT insert_customer_data('Charlie Brown', 35, '789 Maple Drive', 75.9312, 20, 'D3');
SELECT insert_customer_data('David Johnson', 28, '987 Pine Lane', 69.2447, 12, 'D4');
SELECT insert_customer_data('Emily Davis', 32, '654 Cedar Road', 87.1265, 18, 'D5');
SELECT insert_customer_data('Frank Wilson', 27, '321 Birch Court', 91.7753, 14, 'D6');
SELECT insert_customer_data('Grace Lee', 29, '876 Walnut Boulevard', 84.6372, 16, 'D7');
SELECT insert_customer_data('Henry Garcia', 31, '543 Mahogany Parkway', 79.8534, 22, 'D8');
SELECT insert_customer_data('Ivy Moore', 33, '210 Spruce Circle', 88.9481, 19, 'D9');
SELECT insert_customer_data('Jack Brown', 26, '789 Pineapple Lane', 77.3619, 11, 'D10');
SELECT insert_customer_data('Kate Anderson', 34, '654 Orange Street', 85.4923, 17, 'D11');
SELECT insert_customer_data('Liam Taylor', 23, '432 Lemon Drive', 72.8196, 13, 'D12');
SELECT insert_customer_data('Mia Martinez', 37, '987 Grape Avenue', 96.1254, 21, 'D13');
SELECT insert_customer_data('Noah Wilson', 24, '321 Cherry Court', 63.2718, 8, 'D14');
SELECT insert_customer_data('Olivia Clark', 36, '876 Berry Boulevard', 70.5893, 25, 'D15');
SELECT insert_customer_data('Patrick White', 30, '543 Apple Parkway', 81.7264, 10, 'D1');
SELECT insert_customer_data('Quinn Harris', 28, '210 Pear Circle', 94.3215, 15, 'D2');
SELECT insert_customer_data('Rachel Scott', 31, '789 Plum Lane', 89.0276, 18, 'D3');
SELECT insert_customer_data('Samuel King', 27, '432 Banana Drive', 76.9347, 12, 'D4');
SELECT insert_customer_data('Taylor Green', 29, '654 Mango Street', 83.2498, 14, 'D5');
SELECT insert_customer_data('Uma Thompson', 32, '876 Kiwi Boulevard', 72.1643, 20, 'D6');
SELECT insert_customer_data('Victor Baker', 25, '987 Apricot Avenue', 67.4821, 11, 'D7');
SELECT insert_customer_data('Willow Young', 33, '321 Peach Court', 90.5732, 16, 'D8');
SELECT insert_customer_data('Xavier Reed', 26, '543 Nectar Parkway', 78.3954, 19, 'D9');
SELECT insert_customer_data('Yara Davis', 34, '210 Plum Circle', 86.9321, 22, 'D10');
SELECT insert_customer_data('Zachary Brown', 30, '789 Cherry Lane', 73.8165, 13, 'D11');
SELECT insert_customer_data('Alice Hasan', 30, '123 Elm Street', 93.1738, 10, 'D12');
SELECT insert_customer_data('Bob Smith', 25, '456 Oak Avenue', 82.5491, 15, 'D13');
SELECT insert_customer_data('Charlie Brown', 35, '789 Maple Drive', 75.9312, 20, 'D14');
SELECT insert_customer_data('David Johnson', 28, '987 Pine Lane', 69.2447, 12, 'D15');
SELECT insert_customer_data('Emily Davis', 32, '654 Cedar Road', 87.1265, 18, 'D1');
SELECT insert_customer_data('Frank Wilson', 27, '321 Birch Court', 91.7753, 14, 'D2');
SELECT insert_customer_data('Grace Lee', 29, '876 Walnut Boulevard', 84.6372, 16, 'D3');
SELECT insert_customer_data('Henry Garcia', 31, '543 Mahogany Parkway', 79.8534, 22, 'D4');
SELECT insert_customer_data('Ivy Moore', 33, '210 Spruce Circle', 88.9481, 19, 'D5');
SELECT insert_customer_data('Jack Brown', 26, '789 Pineapple Lane', 77.3619, 11, 'D6');
SELECT insert_customer_data('Kate Anderson', 34, '654 Orange Street', 85.4923, 17, 'D7');
SELECT insert_customer_data('Liam Taylor', 23, '432 Lemon Drive', 72.8196, 13, 'D8');
SELECT insert_customer_data('Mia Martinez', 37, '987 Grape Avenue', 96.1254, 21, 'D9');
SELECT insert_customer_data('Noah Wilson', 24, '321 Cherry Court', 63.2718, 8, 'D10');
SELECT insert_customer_data('Olivia Clark', 36, '876 Berry Boulevard', 70.5893, 25, 'D11');
SELECT insert_customer_data('Patrick White', 30, '543 Apple Parkway', 81.7264, 10, 'D12');
SELECT insert_customer_data('Quinn Harris', 28, '210 Pear Circle', 94.3215, 15, 'D13');
SELECT insert_customer_data('Rachel Scott', 31, '789 Plum Lane', 89.0276, 18, 'D14');
SELECT insert_customer_data('Samuel King', 27, '432 Banana Drive', 76.9347, 12, 'D15');
SELECT insert_customer_data('Taylor Green', 29, '654 Mango Street', 83.2498, 14, 'D1');

-- Create a function to update data into the CUSTOMER table
CREATE OR REPLACE FUNCTION update_customer_data(
    customer_id VARCHAR(40),
    c_name VARCHAR(30),
    c_age INTEGER,
    c_address VARCHAR(50),
    c_contact NUMERIC(12,0),
    c_serve INTEGER,
    d_id VARCHAR(40)
) RETURNS void AS $$
BEGIN
    UPDATE "CUSTOMER"
    SET
        "C_NAME" = c_name,
        "C_AGE" = c_age,
        "C_ADDRESS" = c_address,
        "C_CONTACT" = c_contact,
        "C_SERVE" = c_serve,
        "D_ID" = d_id
    WHERE
        "C_ID" = customer_id;
END;
$$ LANGUAGE plpgsql;


-- update data into customer table using the function
SELECT update_customer_data('C2', 'Akram hossain', 46, '789 Maple road', 759312, 21, 'D14');
SELECT update_customer_data('C4', 'Asif kabir', 39, '654 Cedar Road', 871265, 22, 'D2');


SELECT * FROM "CUSTOMER";


---- CUSTOMER TABLE END ------



---- MEDICAL TABLE START ------

-- Drop existing objects related to MEDICAL_SHOP
DROP SEQUENCE IF EXISTS medical_id_seq;
DROP TABLE IF EXISTS "MEDICAL_SHOP";
DROP FUNCTION IF EXISTS set_medical_id;
DROP TRIGGER IF EXISTS set_medical_id_trigger ON "MEDICAL_SHOP";

-- Create sequence for MEDICAL_SHOP
CREATE SEQUENCE medical_id_seq START 1 INCREMENT 1;

-- Create function to set default value for SHOP_BATCH
CREATE OR REPLACE FUNCTION set_medical_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW."SHOP_BATCH" := 'SB' || nextval('medical_id_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to set up the MEDICAL_SHOP table
CREATE OR REPLACE FUNCTION create_medical_shop_table() RETURNS void AS $$
BEGIN
    EXECUTE '
    CREATE TABLE "MEDICAL_SHOP"
    (
        "SHOP_BATCH" VARCHAR(40) NOT NULL,
        "SHOP_NAME" VARCHAR(40) NOT NULL,
        "SHOP_ADDRESS" VARCHAR(40),
        CONSTRAINT "MEDICAL_SHOP_PK" PRIMARY KEY ("SHOP_BATCH")
    )';
END;
$$ LANGUAGE plpgsql;

-- Call the function to create the MEDICAL_SHOP table
SELECT create_medical_shop_table();

-- Create trigger to set SHOP_BATCH before inserting a new record into MEDICAL_SHOP
CREATE TRIGGER set_medical_id_trigger
BEFORE INSERT ON "MEDICAL_SHOP"
FOR EACH ROW
EXECUTE FUNCTION set_medical_id();

-- Verify the MEDICAL_SHOP table creation
SELECT * FROM "MEDICAL_SHOP";




-- Create a function to insert data into the MEDICAL SHOP table
CREATE OR REPLACE FUNCTION insert_MEDICAL_SHOP_data(
    shop_name VARCHAR(40),
	shop_address VARCHAR(40)
) RETURNS void AS $$
BEGIN
    INSERT INTO "MEDICAL_SHOP" ("SHOP_NAME", "SHOP_ADDRESS")
    VALUES (shop_name,shop_address);
END;
$$ LANGUAGE plpgsql;

-- Insert data into MEDICAL SHOP table using the function
SELECT insert_MEDICAL_SHOP_data('MediPlus Pharmacy', '12 Oak Avenue');
SELECT insert_MEDICAL_SHOP_data('Vitality Drugs', '45 Elm Street');
SELECT insert_MEDICAL_SHOP_data('Healthy Living Pharmacy', '78 Pine Road');
SELECT insert_MEDICAL_SHOP_data('Quick Cure Pharmacy', '90 Maple Lane');
SELECT insert_MEDICAL_SHOP_data('EcoHealth Drugstore', '34 Cedar Court');
SELECT insert_MEDICAL_SHOP_data('Natures Pharmacy', '56 Birch Avenue');
SELECT insert_MEDICAL_SHOP_data('Wellcare Chemist', '89 Willow Street');
SELECT insert_MEDICAL_SHOP_data('PharmaSolutions', '23 Spruce Drive');
SELECT insert_MEDICAL_SHOP_data('Healing Hands Pharmacy', '67 Juniper Lane');
SELECT insert_MEDICAL_SHOP_data('Prime Wellness Center', '10 Pinecrest Boulevard');
SELECT insert_MEDICAL_SHOP_data('MediCare Pharmacy', '55 Cedar Lane');
SELECT insert_MEDICAL_SHOP_data('Healthwise Drugs', '32 Maple Avenue');
SELECT insert_MEDICAL_SHOP_data('Serenity Pharmacy', '78 Oak Street');
SELECT insert_MEDICAL_SHOP_data('Elite Care Chemist', '43 Willow Lane');
SELECT insert_MEDICAL_SHOP_data('Harmony Drugstore', '21 Birch Street');
SELECT insert_MEDICAL_SHOP_data('Community Pharmacy', '67 Elm Avenue');
SELECT insert_MEDICAL_SHOP_data('GreenLife Pharmacy', '89 Pine Road');
SELECT insert_MEDICAL_SHOP_data('Holistic Wellness Pharmacy', '14 Spruce Court');
SELECT insert_MEDICAL_SHOP_data('Quick Relief Chemist', '76 Cedar Avenue');
SELECT insert_MEDICAL_SHOP_data('Family Health Pharmacy', '54 Birch Lane');
SELECT insert_MEDICAL_SHOP_data('Wellness Express', '30 Maple Street');
SELECT insert_MEDICAL_SHOP_data('MediHelp Pharmacy', '65 Oak Drive');
SELECT insert_MEDICAL_SHOP_data('Herbal Healing Pharmacy', '88 Willow Court');
SELECT insert_MEDICAL_SHOP_data('CareFirst Chemist', '22 Pine Lane');
SELECT insert_MEDICAL_SHOP_data('VitaPharm', '47 Elm Avenue');
SELECT insert_MEDICAL_SHOP_data('Pristine Pharmacy', '90 Cedar Street');
SELECT insert_MEDICAL_SHOP_data('Happy Health Drugs', '33 Juniper Drive');
SELECT insert_MEDICAL_SHOP_data('Nature Cure Pharmacy', '58 Pinecrest Boulevard');
SELECT insert_MEDICAL_SHOP_data('EcoPharm', '79 Maple Lane');
SELECT insert_MEDICAL_SHOP_data('HealWell Pharmacy', '36 Oak Avenue');
SELECT insert_MEDICAL_SHOP_data('LifeMed Pharmacy', '52 Elm Street');
SELECT insert_MEDICAL_SHOP_data('Caring Hands Pharmacy', '75 Pine Road');
SELECT insert_MEDICAL_SHOP_data('Green Valley Drugs', '18 Cedar Court');
SELECT insert_MEDICAL_SHOP_data('Wellbeing Chemist', '61 Spruce Drive');
SELECT insert_MEDICAL_SHOP_data('PureHealth Pharmacy', '84 Juniper Lane');
SELECT insert_MEDICAL_SHOP_data('MetroCare Pharmacy', '19 Pinecrest Boulevard');
SELECT insert_MEDICAL_SHOP_data('Sunrise Pharmacy', '63 Cedar Lane');
SELECT insert_MEDICAL_SHOP_data('Holistic Care Pharmacy', '82 Maple Avenue');
SELECT insert_MEDICAL_SHOP_data('Optimal Health Drugs', '25 Oak Street');
SELECT insert_MEDICAL_SHOP_data('Fast Relief Pharmacy', '68 Willow Lane');
SELECT insert_MEDICAL_SHOP_data('MediCenter Pharmacy', '91 Birch Street');
SELECT insert_MEDICAL_SHOP_data('Natures Way Pharmacy', '35 Elm Avenue');
SELECT insert_MEDICAL_SHOP_data('Essential Health Pharmacy', '77 Pine Road');
SELECT insert_MEDICAL_SHOP_data('CareZone Chemist', '20 Spruce Court');
SELECT insert_MEDICAL_SHOP_data('MediPrime Pharmacy', '53 Cedar Avenue');
SELECT insert_MEDICAL_SHOP_data('Reliable Care Pharmacy', '86 Birch Lane');
SELECT insert_MEDICAL_SHOP_data('Unity Pharmacy', '39 Maple Street');


-- Create a function to update data into the MEDICAL SHOP tab
CREATE OR REPLACE FUNCTION update_medical_shop_data(
    shop_batch VARCHAR(40),
    shop_name VARCHAR(40),
    shop_address VARCHAR(40)
) RETURNS void AS $$
BEGIN
    UPDATE "MEDICAL_SHOP"
    SET
        "SHOP_NAME" = shop_name,
        "SHOP_ADDRESS" = shop_address
    WHERE
        "SHOP_BATCH" = shop_batch;
END;
$$ LANGUAGE plpgsql;


-- update data into MEDICAL SHOP table using the function
SELECT update_medical_shop_data('SB3', 'saifur Pharmacy', '23 Spruce Drive');
SELECT update_medical_shop_data('SB2', 'get cure Pharmacy', '32 Maple Avenue');




SELECT * FROM "MEDICAL_SHOP";

----- MEDICAL SHOP END ------




-------- EMPLOYEES TABLE START --------

-- Drop existing objects related to EMPLOYEES
DROP SEQUENCE IF EXISTS employee_id_seq;
DROP TABLE IF EXISTS "EMPLOYEES";
DROP FUNCTION IF EXISTS set_employee_id;
DROP TRIGGER IF EXISTS set_employee_id_trigger ON "EMPLOYEES";

-- Create sequence for EMPLOYEES
CREATE SEQUENCE employee_id_seq START 1 INCREMENT 1;

-- Create function to set default value for E_ID
CREATE OR REPLACE FUNCTION set_employee_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW."E_ID" := 'E' || nextval('employee_id_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to set up the EMPLOYEES table
CREATE OR REPLACE FUNCTION create_employee_table() RETURNS void AS $$
BEGIN
    EXECUTE '
    CREATE TABLE "EMPLOYEES"
    (
        "E_ID" VARCHAR(40) NOT NULL,
        "E_NAME" VARCHAR(40) NOT NULL,
        "E_AGE" INTEGER NOT NULL,
        "E_BLOOD" VARCHAR(40) NOT NULL,
        "E_SALARY" NUMERIC(10,0) NOT NULL,
        "E_PHONE" NUMERIC(12,0) NOT NULL,
        "E_DESIGNATION" VARCHAR(40) NOT NULL,
        CONSTRAINT "EMPLOYEES_PK" PRIMARY KEY ("E_ID"),
        CONSTRAINT "EMPLOYEES_CK1" CHECK ("E_AGE" >= 18),
        CONSTRAINT "EMPLOYEES_CK2" CHECK ("E_DESIGNATION" IN (''Cashier'', ''Staff'', ''Manager''))
    )';
END;
$$ LANGUAGE plpgsql;

-- Call the function to create the EMPLOYEES table
SELECT create_employee_table();

-- Create trigger to set E_ID before inserting a new record into EMPLOYEES
CREATE TRIGGER set_employee_id_trigger
BEFORE INSERT ON "EMPLOYEES"
FOR EACH ROW
EXECUTE FUNCTION set_employee_id();

-- Verify the EMPLOYEES table creation
SELECT * FROM "EMPLOYEES";





--Create a function to insert data into the EMPLOYEES table
CREATE OR REPLACE FUNCTION insert_employees_data(
    e_name VARCHAR(40),
	e_age INTEGER,
	e_blood VARCHAR(40),
	e_salary NUMERIC(10,0), 
	e_phone NUMERIC(12,0),
	e_designation VARCHAR(40)
) RETURNS void AS $$
BEGIN
    INSERT INTO "EMPLOYEES" ("E_NAME", "E_AGE", "E_BLOOD", "E_SALARY", "E_PHONE", "E_DESIGNATION")
    VALUES (e_name,e_age,e_blood,e_salary,e_phone,e_designation);
END;
$$ LANGUAGE plpgsql;

-- Insert data into EMPLOYEES table using the function
SELECT insert_employees_data('John Martinez', 30, 'O+', 51000, '123456789012', 'Manager');
SELECT insert_employees_data('Emily Garcia', 26, 'A-', 41000, '987654321012', 'Cashier');
SELECT insert_employees_data('Michael Johnson', 40, 'B+', 46000, '456789123012', 'Staff');
SELECT insert_employees_data('Emma Davis', 33, 'AB-', 54000, '890123456789', 'Manager');
SELECT insert_employees_data('William Smith', 29, 'O-', 42000, '567890123456', 'Cashier');
SELECT insert_employees_data('Sarah Brown', 45, 'A+', 59000, '234567890123', 'Staff');
SELECT insert_employees_data('James Williams', 32, 'B-', 48000, '345678901234', 'Manager');
SELECT insert_employees_data('Olivia Rodriguez', 28, 'O+', 43000, '456789012345', 'Cashier');
SELECT insert_employees_data('David Martinez', 35, 'A-', 56000, '567890123456', 'Staff');
SELECT insert_employees_data('Emily Johnson', 31, 'AB+', 52000, '678901234567', 'Manager');
SELECT insert_employees_data('Michael Garcia', 27, 'O-', 40000, '789012345678', 'Cashier');
SELECT insert_employees_data('John Davis', 42, 'B+', 60000, '890123456789', 'Staff');
SELECT insert_employees_data('Emma Smith', 34, 'AB-', 55000, '901234567890', 'Manager');
SELECT insert_employees_data('William Brown', 29, 'O-', 42000, '012345678901', 'Cashier');
SELECT insert_employees_data('Sarah Williams', 38, 'A+', 57000, '123456789012', 'Staff');
SELECT insert_employees_data('James Rodriguez', 36, 'B-', 58000, '234567890123', 'Manager');
SELECT insert_employees_data('Olivia Johnson', 30, 'O+', 51000, '345678901234', 'Cashier');
SELECT insert_employees_data('David Davis', 44, 'A-', 63000, '456789012345', 'Staff');
SELECT insert_employees_data('Emily Martinez', 25, 'AB+', 40000, '567890123456', 'Manager');
SELECT insert_employees_data('Michael Garcia', 37, 'O-', 59000, '678901234567', 'Cashier');
SELECT insert_employees_data('John Smith', 41, 'B+', 62000, '789012345678', 'Staff');
SELECT insert_employees_data('Emma Brown', 28, 'AB-', 44000, '890123456789', 'Manager');
SELECT insert_employees_data('William Williams', 33, 'O-', 53000, '901234567890', 'Cashier');
SELECT insert_employees_data('Sarah Rodriguez', 39, 'A+', 60000, '012345678901', 'Staff');
SELECT insert_employees_data('James Davis', 31, 'B-', 54000, '123456789012', 'Manager');
SELECT insert_employees_data('Olivia Johnson', 26, 'O+', 41000, '234567890123', 'Cashier');
SELECT insert_employees_data('David Smith', 43, 'A-', 64000, '345678901234', 'Staff');
SELECT insert_employees_data('Emily Martinez', 29, 'AB+', 48000, '456789012345', 'Manager');
SELECT insert_employees_data('Michael Garcia', 35, 'O-', 55000, '567890123456', 'Cashier');
SELECT insert_employees_data('John Smith', 30, 'B+', 52000, '678901234567', 'Staff');
SELECT insert_employees_data('Emma Brown', 37, 'AB-', 59000, '789012345678', 'Manager');
SELECT insert_employees_data('William Williams', 32, 'O-', 54000, '890123456789', 'Cashier');
SELECT insert_employees_data('Sarah Rodriguez', 38, 'A+', 58000, '901234567890', 'Staff');
SELECT insert_employees_data('James Davis', 27, 'B-', 49000, '012345678901', 'Manager');
SELECT insert_employees_data('Olivia Johnson', 44, 'O+', 64000, '123456789012', 'Cashier');
SELECT insert_employees_data('David Smith', 34, 'A-', 56000, '234567890123', 'Staff');
SELECT insert_employees_data('Emily Martinez', 31, 'AB+', 53000, '345678901234', 'Manager');
SELECT insert_employees_data('Michael Garcia', 39, 'O-', 60000, '456789012345', 'Cashier');
SELECT insert_employees_data('John Smith', 28, 'B+', 45000, '567890123456', 'Staff');
SELECT insert_employees_data('Emma Brown', 36, 'AB-', 58000, '678901234567', 'Manager');
SELECT insert_employees_data('William Williams', 25, 'O-', 39000, '789012345678', 'Cashier');
SELECT insert_employees_data('Sarah Rodriguez', 40, 'A+', 61000, '890123456789', 'Staff');
SELECT insert_employees_data('James Davis', 33, 'B-', 56000, '901234567890', 'Manager');
SELECT insert_employees_data('Olivia Johnson', 29, 'O+', 46000, '012345678901', 'Cashier');
SELECT insert_employees_data('David Smith', 42, 'A-', 62000, '123456789012', 'Staff');

--Create a function to update data into the EMPLOYEES table
CREATE OR REPLACE FUNCTION update_employee_data(
    e_id VARCHAR(40),
    e_name VARCHAR(40),
    e_age INTEGER,
    e_blood VARCHAR(40),
    e_salary NUMERIC(10,0),
    e_phone NUMERIC(12,0),
    e_designation VARCHAR(40)
) RETURNS void AS $$
BEGIN
    UPDATE "EMPLOYEES"
    SET
        "E_NAME" = e_name,
        "E_AGE" = e_age,
        "E_BLOOD" = e_blood,
        "E_SALARY" = e_salary,
        "E_PHONE" = e_phone,
        "E_DESIGNATION" = e_designation
    WHERE
        "E_ID" = e_id;
END;
$$ LANGUAGE plpgsql;

-- update data into EMPLOYEES table using the function
SELECT update_employee_data('E3', 'leo messi', 31, 'O-', 52000, '123456789012', 'Manager');
SELECT update_employee_data('E7', 'cristiano ronaldo', 27, 'A+', 42000, '987654321012', 'Cashier');


SELECT * FROM "EMPLOYEES";

------ EMPLOYEES END -------


---------- INVENTORY TABLE START -----------
-- Drop existing objects related to INVENTORY
DROP SEQUENCE IF EXISTS inventory_id_seq;
DROP TABLE IF EXISTS "INVENTORY";
DROP FUNCTION IF EXISTS set_inventory_id;
DROP TRIGGER IF EXISTS set_inventory_id_trigger ON "INVENTORY";

-- Create sequence for INVENTORY
CREATE SEQUENCE inventory_id_seq START 1 INCREMENT 1;

-- Create function to set default value for M_ID
CREATE OR REPLACE FUNCTION set_inventory_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW."M_ID" := 'M' || nextval('inventory_id_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to set up the INVENTORY table
CREATE OR REPLACE FUNCTION create_inventory_table() RETURNS void AS $$
BEGIN
    EXECUTE '
    CREATE TABLE "INVENTORY"
    (
        "M_ID" VARCHAR(40) NOT NULL,
        "M_NAME" VARCHAR(40) NOT NULL,
        "M_TYPE" VARCHAR(40) NOT NULL,
        "M_PRICE" NUMERIC(4,0) NOT NULL,
        "M_IMPORT_DATE" DATE NOT NULL,
        "M_EXPIRE_DATE" DATE NOT NULL,
        "M_REMAIN" NUMERIC(10,0),
        CONSTRAINT "INVENTORY_PK" PRIMARY KEY ("M_ID"),
        CONSTRAINT "INVENTORY_UK1" UNIQUE ("M_NAME")
    )';
END;
$$ LANGUAGE plpgsql;

-- Call the function to create the INVENTORY table
SELECT create_inventory_table();

-- Create trigger to set M_ID before inserting a new record into INVENTORY
CREATE TRIGGER set_inventory_id_trigger
BEFORE INSERT ON "INVENTORY"
FOR EACH ROW
EXECUTE FUNCTION set_inventory_id();

-- Verify the INVENTORY table creation
SELECT * FROM "INVENTORY";


-- Create function to insert data into the INVENTORY table
CREATE OR REPLACE FUNCTION insert_inventory_data(
    m_name VARCHAR(100),
	m_type VARCHAR(40),
    m_price NUMERIC(4,0),
    m_import_date  DATE,
    m_expiry_date DATE,
    m_remain NUMERIC(10,0)
) RETURNS void AS $$
BEGIN
    INSERT INTO "INVENTORY" ("M_NAME", "M_TYPE", "M_PRICE", "M_IMPORT_DATE", "M_EXPIRE_DATE", "M_REMAIN")
    VALUES (m_name,m_type,m_price,m_import_date,m_expiry_date,m_remain);
END;
$$ LANGUAGE plpgsql;

--Insert data into INVENTORY table using the function
SELECT insert_inventory_data('Paracetamol', 'Tablet', 50, '2023-01-01', '2025-01-01', 100);
SELECT insert_inventory_data('Amoxicillin', 'Capsule', 30, '2023-02-01', '2024-02-01', 150);
SELECT insert_inventory_data('Cough Syrup', 'Liquid', 70, '2023-03-01', '2024-03-01', 200);
SELECT insert_inventory_data('Seclo', 'Tablet', 40, '2023-02-10', '2024-04-10', 300);


-- Create function to update data into the INVENTORY table
CREATE OR REPLACE FUNCTION update_inventory_data(
    m_id VARCHAR(40),
    m_name VARCHAR(40),
    m_type VARCHAR(40),
    m_price NUMERIC(4,0),
    m_import_date DATE,
    m_expiry_date DATE,
    m_remain NUMERIC(10,0)
) RETURNS void AS $$
BEGIN
    UPDATE "INVENTORY"
    SET
        "M_NAME" = m_name,
        "M_TYPE" = m_type,
        "M_PRICE" = m_price,
        "M_IMPORT_DATE" = m_import_date,
        "M_EXPIRE_DATE" = m_expiry_date,
        "M_REMAIN" = m_remain
    WHERE
        "M_ID" = m_id;
END;
$$ LANGUAGE plpgsql;


--update data into INVENTORY table using the function
SELECT update_inventory_data('M1', 'Paracetamol', 'Tablet', 55, '2023-01-01', '2025-01-01', 110);
SELECT update_inventory_data('M2', 'Amoxicillin', 'Capsule', 35, '2023-02-01', '2024-02-01', 160);



SELECT * FROM "INVENTORY";
--------- INVENTORY TABLE END ---------


------- COMPANIES TABLE START ---------

-- Drop existing objects related to COMPANIES
DROP SEQUENCE IF EXISTS company_batch_seq;
DROP TABLE IF EXISTS "COMPANIES";
DROP FUNCTION IF EXISTS set_company_batch;
DROP TRIGGER IF EXISTS set_company_batch_trigger ON "COMPANIES";

-- Create sequence for COMPANIES
CREATE SEQUENCE company_batch_seq START 1 INCREMENT 1;

-- Create function to set default value for BATCH
CREATE OR REPLACE FUNCTION set_company_batch()
RETURNS TRIGGER AS $$
BEGIN
    NEW."BATCH" := 'CMP' || nextval('company_batch_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to set up the COMPANIES table
CREATE OR REPLACE FUNCTION create_companies_table() RETURNS void AS $$
BEGIN
    EXECUTE '
    CREATE TABLE "COMPANIES"
    (
        "BATCH" VARCHAR(40) NOT NULL,
        "NAME" VARCHAR(40) NOT NULL,
        "ESTABLISHED" DATE,
        "GROWTH" NUMERIC(4,2),
        "TOTAL_GENERICS" INTEGER,
        "HEADQUARTER" VARCHAR(40),
        "EMAIL" VARCHAR(40) NOT NULL,
        CONSTRAINT "COMPANY_PK" PRIMARY KEY ("BATCH"),
        CONSTRAINT "COMPANY_UK1" UNIQUE ("NAME", "EMAIL")
    )';
END;
$$ LANGUAGE plpgsql;

-- Call the function to create the COMPANIES table
SELECT create_companies_table();

-- Create trigger to set BATCH before inserting a new record into COMPANIES
CREATE TRIGGER set_company_batch_trigger
BEFORE INSERT ON "COMPANIES"
FOR EACH ROW
EXECUTE FUNCTION set_company_batch();

-- Verify the COMPANIES table creation
SELECT * FROM "COMPANIES";

CREATE OR REPLACE FUNCTION insert_companies_data(
    name VARCHAR(40),
    established DATE,
    growth NUMERIC(4,2),
    total_generics INTEGER,
    headquarter VARCHAR(40),
    email VARCHAR(40)
) RETURNS void AS $$
BEGIN
    INSERT INTO "COMPANIES" ("NAME", "ESTABLISHED", "GROWTH", "TOTAL_GENERICS", "HEADQUARTER", "EMAIL")
    VALUES (name, established, growth, total_generics, headquarter, email);
END;
$$ LANGUAGE plpgsql;


-- Insert data into COMPANIES table using the function
SELECT insert_companies_data('PharmaCorp', '2000-01-01', 5.50, 50, 'New York', 'contact@pharmacorp.com');
SELECT insert_companies_data('MediLife', '2005-06-15', 6.75, 40, 'Los Angeles', 'info@medilife.com');
SELECT insert_companies_data('HealthGen', '2010-11-20', 7.25, 60, 'Chicago', 'support@healthgen.com');

--create a function to update the table
CREATE OR REPLACE FUNCTION update_company_data(
    batch VARCHAR(40),
    name VARCHAR(40),
    established DATE,
    growth NUMERIC(4,2),
    total_generics INTEGER,
    headquarter VARCHAR(40),
    email VARCHAR(40)
) RETURNS void AS $$
BEGIN
    UPDATE "COMPANIES"
    SET
        "NAME" = name,
        "ESTABLISHED" = established,
        "GROWTH" = growth,
        "TOTAL_GENERICS" = total_generics,
        "HEADQUARTER" = headquarter,
        "EMAIL" = email
    WHERE
        "BATCH" = batch;
END;
$$ LANGUAGE plpgsql;

-- Update data into COMPANIES table using the function
SELECT update_company_data('CMP1', 'PharmaCorp', '2000-01-01', 5.75, 55, 'New York', 'contact@pharmacorp.com');
SELECT update_company_data('CMP2', 'MediLife', '2005-06-15', 6.50, 45, 'Los Angeles', 'info@medilife.com');




SELECT * FROM "COMPANIES";

-------- COMPANIES TABLE END ---------

-------- PAYMENT TABLE START -------
DROP TABLE IF EXISTS "PAYMENT_HISTORY";

-- Create function to set up the PAYMENT_HISTORY table
CREATE OR REPLACE FUNCTION create_payment_history_table() RETURNS void AS $$
BEGIN
    EXECUTE '
    CREATE TABLE "PAYMENT_HISTORY"
    (
        "M_ID" VARCHAR(40) NOT NULL,
        "M_NAME" VARCHAR(50) NOT NULL,
        "C_ID" VARCHAR(50) NOT NULL,
        "D_ID" VARCHAR(50) NOT NULL,
        "TAKEN_DATE" VARCHAR(40) NOT NULL,
        "M_QUANTITY" NUMERIC(2,0) NOT NULL,
        "SERVED_BY" VARCHAR(50) NOT NULL,
        CONSTRAINT "MEDICINE_PK" PRIMARY KEY ("M_ID"),
        CONSTRAINT "MEDICINE_FK" FOREIGN KEY ("C_ID") REFERENCES "CUSTOMER" ("C_ID"),
        CONSTRAINT "MEDICINE_FK2" FOREIGN KEY ("D_ID") REFERENCES "DOCTOR" ("D_ID"),
        CONSTRAINT "MEDICINE_CON" FOREIGN KEY ("M_ID") REFERENCES "INVENTORY" ("M_ID") ON DELETE CASCADE,
        CONSTRAINT "MEDICINE_CON1" FOREIGN KEY ("M_NAME") REFERENCES "INVENTORY" ("M_NAME") ON DELETE CASCADE,
        CONSTRAINT "MEDICINE_CON4" FOREIGN KEY ("SERVED_BY") REFERENCES "EMPLOYEES" ("E_ID")
    )';
END;
$$ LANGUAGE plpgsql;


SELECT create_payment_history_table();
SELECT * FROM "PAYMENT_HISTORY";

-- Create function to insert data into PAYMENT_HISTORY table
CREATE OR REPLACE FUNCTION insert_payment_history_data(
    m_id VARCHAR(40),
    m_name VARCHAR(50),
    c_id VARCHAR(50),
    d_id VARCHAR(50),
    taken_date VARCHAR(40),
    m_quantity NUMERIC(2,0),
    served_by VARCHAR(50)
) RETURNS void AS $$
BEGIN
    INSERT INTO "PAYMENT_HISTORY" ("M_ID", "M_NAME", "C_ID", "D_ID", "TAKEN_DATE", "M_QUANTITY", "SERVED_BY")
    VALUES (m_id, m_name, c_id, d_id, taken_date, m_quantity, served_by);
END;
$$ LANGUAGE plpgsql;

-- Insert data into PAYMENT_HISTORY table using the function
SELECT insert_payment_history_data('M3', 'Cough Syrup', 'C4', 'D4', '2024-01-25', 4, 'E4');
SELECT insert_payment_history_data('M5', 'Seclo', 'C5', 'D5', '2024-02-24', 3, 'E5');
SELECT insert_payment_history_data('M2', 'Amoxicillin', 'C6', 'D6', '2024-01-23', 2, 'E6');


--create a function to update the table
CREATE OR REPLACE FUNCTION update_payment_history_data(
    m_id VARCHAR(40),
    m_name VARCHAR(50),
    c_id VARCHAR(50),
    d_id VARCHAR(50),
    taken_date VARCHAR(40),
    m_quantity NUMERIC(2,0),
    served_by VARCHAR(50)
) RETURNS void AS $$
BEGIN
    UPDATE "PAYMENT_HISTORY"
    SET
        "M_NAME" = m_name,
        "C_ID" = c_id,
        "D_ID" = d_id,
        "TAKEN_DATE" = taken_date,
        "M_QUANTITY" = m_quantity,
        "SERVED_BY" = served_by
    WHERE
        "M_ID" = m_id;
END;
$$ LANGUAGE plpgsql;

--update data into the table
SELECT update_payment_history_data('M3', 'Cough Syrup', 'C7', 'D7', '2024-01-26', 5, 'E7');
SELECT update_payment_history_data('M5', 'Seclo', 'C8', 'D8', '2024-02-25', 4, 'E8');



SELECT * FROM "PAYMENT_HISTORY";

--------- PAYMENT TABLE END --------- 

------- SUPPLIER TABLE START ------
-- Drop existing objects related to SUPPLIER
DROP SEQUENCE IF EXISTS supplier_batch_seq;
DROP TABLE IF EXISTS "SUPPLIER";
DROP FUNCTION IF EXISTS set_supplier_batch;
DROP TRIGGER IF EXISTS set_supplier_batch_trigger ON "SUPPLIER";

-- Create sequence for SUPPLIER
CREATE SEQUENCE supplier_batch_seq START 1 INCREMENT 1;

-- Create function to set default value for S_ID
CREATE OR REPLACE FUNCTION set_supplier_batch()
RETURNS TRIGGER AS $$
BEGIN
    NEW."S_ID" := 'SP' || nextval('supplier_batch_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to set up the SUPPLIER table
CREATE OR REPLACE FUNCTION create_supplier_table() RETURNS void AS $$
BEGIN
    EXECUTE '
    CREATE TABLE "SUPPLIER"
    (
        "S_ID" VARCHAR(40) NOT NULL,
        "S_NAME" VARCHAR(40) NOT NULL,
        "S_AGE" NUMERIC(4,2) NOT NULL,
        "S_ADDRESS" VARCHAR(40),
        "S_PHONE" NUMERIC(12,0) NOT NULL,
        CONSTRAINT "SUPPLIER_PK" PRIMARY KEY ("S_ID"),
        CONSTRAINT "SUPPLIER_CK1" CHECK ("S_AGE" >= 18)
    )';
END;
$$ LANGUAGE plpgsql;

-- Call the function to create the SUPPLIER table
SELECT create_supplier_table();

-- Create trigger to set S_ID before inserting a new record into SUPPLIER
CREATE TRIGGER set_supplier_batch_trigger
BEFORE INSERT ON "SUPPLIER"
FOR EACH ROW
EXECUTE FUNCTION set_supplier_batch();

-- Verify the SUPPLIER table creation
SELECT * FROM "SUPPLIER";

CREATE OR REPLACE FUNCTION insert_supplier_data(
    s_name VARCHAR(40),
    s_age NUMERIC(4,2),
    s_address VARCHAR(40),
    s_phone NUMERIC(12,0)
) RETURNS void AS $$
BEGIN
    INSERT INTO "SUPPLIER" ("S_NAME", "S_AGE", "S_ADDRESS", "S_PHONE")
    VALUES (s_name, s_age, s_address, s_phone);
END;
$$ LANGUAGE plpgsql;

-- Insert data into SUPPLIER table using the function
SELECT insert_supplier_data('Global Supplies', 35.00, '123 Supply Street', 123456789012);
SELECT insert_supplier_data('Health Supplies', 40.00, '456 Warehouse Road', 987654321012);
SELECT insert_supplier_data('MediDistributors', 38.50, '789 Logistic Lane', 456789123012);


--create a function to update data
CREATE OR REPLACE FUNCTION update_supplier_data(
    s_id VARCHAR(40),
    s_name VARCHAR(40),
    s_age NUMERIC(4,2),
    s_address VARCHAR(40),
    s_phone NUMERIC(12,0)
) RETURNS void AS $$
BEGIN
    UPDATE "SUPPLIER"
    SET
        "S_NAME" = s_name,
        "S_AGE" = s_age,
        "S_ADDRESS" = s_address,
        "S_PHONE" = s_phone
    WHERE
        "S_ID" = s_id;
END;
$$ LANGUAGE plpgsql;


--update data into the table
SELECT update_supplier_data('SP1', 'Global Suppliers Inc.', 36.50, '456 Supply Avenue', 111111111111);
SELECT update_supplier_data('SP2', 'Healthcare Suppliers', 39.25, '789 Distribution Center', 222222222222);


SELECT * FROM "SUPPLIER";

------- SUPPLIER TABLE END ------


------- SUPPLIER HISTORY TABLE START ------

-- Drop existing objects related to SUPPLY_HISTORY
DROP TABLE IF EXISTS "SUPPLY_HISTORY";

-- Create function to set up the SUPPLY_HISTORY table
CREATE OR REPLACE FUNCTION create_supply_history_table() RETURNS void AS $$
BEGIN
    EXECUTE '
    CREATE TABLE "SUPPLY_HISTORY"
    (
        "SUPPLIED_BY" VARCHAR(40) NOT NULL,
        "SUPPLID_DATE" DATE NOT NULL,
        "TOTAL_AMMOUNT" NUMERIC(10,0) NOT NULL,
        "SUPPLY_COUNT" INTEGER NOT NULL,
        CONSTRAINT "SUPPLY_HISTORY_CK1" CHECK ("TOTAL_AMMOUNT" >= 1000),
        CONSTRAINT "SUPPLY_HISTORY_FK2" FOREIGN KEY ("SUPPLIED_BY") REFERENCES "SUPPLIER" ("S_ID") ON DELETE CASCADE
    )';
END;
$$ LANGUAGE plpgsql;

-- Call the function to create the SUPPLY_HISTORY table
SELECT create_supply_history_table();

-- Verify the SUPPLY_HISTORY table creation
SELECT * FROM "SUPPLY_HISTORY";



-- Create function to insert data into SUPPLY_HISTORY table
CREATE OR REPLACE FUNCTION insert_supply_history_data(
    supplied_by VARCHAR(40),
    supplied_date DATE,
    total_amount NUMERIC(10,0),
    supply_count INTEGER
) RETURNS void AS $$
BEGIN
    INSERT INTO "SUPPLY_HISTORY" ("SUPPLIED_BY", "SUPPLID_DATE", "TOTAL_AMMOUNT", "SUPPLY_COUNT")
    VALUES (supplied_by, supplied_date, total_amount, supply_count);
END;
$$ LANGUAGE plpgsql;


-- Insert data into SUPPLY_HISTORY table using the function
SELECT insert_supply_history_data('SP1', '2023-04-01', 2000, 50);
SELECT insert_supply_history_data('SP2', '2023-04-02', 3000, 60);
SELECT insert_supply_history_data('SP3', '2023-04-03', 1500, 40);


--create a function to update the table
CREATE OR REPLACE FUNCTION update_supply_history_data(
    supplied_by VARCHAR(40),
    supplied_date DATE,
    total_amount NUMERIC(10,0),
    supply_count INTEGER
) RETURNS void AS $$
BEGIN
    UPDATE "SUPPLY_HISTORY"
    SET
        "TOTAL_AMMOUNT" = total_amount,
        "SUPPLY_COUNT" = supply_count
    WHERE
        "SUPPLIED_BY" = supplied_by
        AND "SUPPLID_DATE" = supplied_date;
END;
$$ LANGUAGE plpgsql;


--update data into the table
SELECT update_supply_history_data('SP1', '2023-04-01', 2500, 55);
SELECT update_supply_history_data('SP2', '2023-04-02', 3200, 65);


SELECT * FROM "SUPPLY_HISTORY";

------- SUPPLIER HISTORY TABLE END ------
-------------------------Table Create End------------


-------------------------DROP Table START------------

-- Create a stored procedure to drop a table if it exists
CREATE OR REPLACE PROCEDURE drop_table_if_exists(table_name TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    EXECUTE format('DROP TABLE IF EXISTS %I;', table_name);
END;
$$;
 
-- Create a stored procedure to drop a database if it exists
CREATE OR REPLACE PROCEDURE drop_database_if_exists(database_name TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    EXECUTE format('DROP DATABASE IF EXISTS %I;', database_name);
END;
$$;
 
 
CALL drop_table_if_exists('DOCTOR');
CALL drop_table_if_exists('CUSTOMER');
 

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

-- Table Data show by JSON *  QUERY START---------------
DROP FUNCTION IF EXISTS get_table_data_json(table_name VARCHAR);
 
-- Define function to return JSON for all rows in a table
CREATE OR REPLACE FUNCTION get_table_data_json(table_name VARCHAR)
RETURNS TABLE (record JSON) AS $$
BEGIN
    RETURN QUERY EXECUTE format('SELECT row_to_json(t) FROM %I t', table_name);
END;
$$ LANGUAGE plpgsql;
 
 
------- Data show by json ------
SELECT * FROM get_table_data_json('DOCTOR');
SELECT * FROM get_table_data_json('CUSTOMER');
SELECT * FROM get_table_data_json('MEDICAL_SHOP');
SELECT * FROM get_table_data_json('EMPLOYEES');
SELECT * FROM get_table_data_json('INVENTORY');
SELECT * FROM get_table_data_json('COMPANIES');
SELECT * FROM get_table_data_json('PAYMENT_HISTORY');
SELECT * FROM get_table_data_json('SUPPLIER');
SELECT * FROM get_table_data_json('SUPPLY_HISTORY');
 
-- Data Show by Table 
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

-----------Functions to exicute the queries------------
--FUNCTION FOR THE Query ORDER BY---
CREATE OR REPLACE FUNCTION order_table(table_name VARCHAR, column_name VARCHAR, order_type VARCHAR)
RETURNS JSON AS $$
DECLARE
    json_result JSON;
    order_dir VARCHAR := CASE WHEN upper(order_type) = 'DESC' THEN 'DESC' ELSE 'ASC' END;
BEGIN
    EXECUTE '
        SELECT json_agg(t)
        FROM (
            SELECT *
            FROM ' || quote_ident(table_name) || '
            ORDER BY ' || quote_ident(column_name) || ' ' || order_dir
        || ') t'
    INTO json_result;

    RETURN json_result;
END;
$$ LANGUAGE plpgsql;

SELECT order_table('CUSTOMER', 'C_NAME', 'ASC');
SELECT order_table('CUSTOMER', 'C_NAME', 'DESC');


 
--FUNCTION FOR THE Query WHERE---
CREATE OR REPLACE FUNCTION get_specific_data(table_name VARCHAR, column_name VARCHAR, value_to_find VARCHAR)
RETURNS JSON AS $$
DECLARE
    json_result JSON;
BEGIN
    EXECUTE '
        SELECT json_agg(t)
        FROM (
            SELECT *
            FROM ' || quote_ident(table_name) || '
            WHERE ' || quote_ident(column_name) || ' = $1
        ) t'
    INTO json_result
    USING value_to_find;
 
    RETURN json_result;
END;
$$ LANGUAGE plpgsql;
 
 
SELECT get_specific_data('DOCTOR', 'D_SPECIALIST', 'Cardiologist');
SELECT get_specific_data('DOCTOR', 'D_ID', 'D15');


-- Inner Join data show 
DROP FUNCTION IF EXISTS perform_join(
    VARCHAR,
    VARCHAR,
    VARCHAR,
    VARCHAR,
    VARCHAR
);

SELECT * FROM "DOCTOR";
DELETE FROM "DOCTOR" WHERE "D_ID" = 'D55';
DELETE FROM "DOCTOR" WHERE "D_ID" = 'D56';
DELETE FROM "DOCTOR" WHERE "D_ID" = 'D57';
DELETE FROM "DOCTOR" WHERE "D_ID" = 'D59';

CREATE OR REPLACE FUNCTION perform_join(
    table1_name VARCHAR,
    table2_name VARCHAR,
    join_type VARCHAR, -- 'INNER', 'LEFT', 'RIGHT', 'FULL'
    col1_name VARCHAR,
    col2_name VARCHAR)
RETURNS TABLE (
    -- Columns from DOCTOR
    "D_ID" VARCHAR(40),
    "D_NAME" VARCHAR(30),
    "D_PHONE" NUMERIC(12,0),
    "D_EMAIL" VARCHAR(40),
    "D_SPECIALIST" VARCHAR(40),
    "D_PHOTO" TEXT,
    -- Columns from CUSTOMER
    "C_ID" VARCHAR(40),
    "C_NAME" VARCHAR(30),
    "C_AGE" INTEGER,
    "C_ADDRESS" VARCHAR(50),
    "C_CONTACT" NUMERIC(12,0),
    "C_SERVE" INTEGER,
    "C_PHOTO" TEXT,
    -- Columns from MEDICAL_SHOP
    "SHOP_BATCH" VARCHAR(40),
    "SHOP_NAME" VARCHAR(40),
    "SHOP_ADDRESS" VARCHAR(40),
    -- Columns from EMPLOYEES
    "E_ID" VARCHAR(40),
    "E_NAME" VARCHAR(40),
    "E_AGE" INTEGER,
    "E_BLOOD" VARCHAR(40),
    "E_SALARY" NUMERIC(10,0),
    "E_PHONE" NUMERIC(12,0),
    "E_DESIGNATION" VARCHAR(40),
    -- Columns from INVENTORY
    "M_ID" VARCHAR(40),
    "M_NAME" VARCHAR(40),
    "M_TYPE" VARCHAR(40),
    "M_PRICE" NUMERIC(4,0),
    "M_IMPORT_DATE" DATE,
    "M_EXPIRE_DATE" DATE,
    "M_REMAIN" NUMERIC(10,0),
    -- Columns from COMPANIES
    "BATCH" VARCHAR(40),
    "NAME" VARCHAR(40),
    "ESTABLISHED" DATE,
    "GROWTH" NUMERIC(4,2),
    "TOTAL_GENERICS" INTEGER,
    "HEADQUARTER" VARCHAR(40),
    "EMAIL" VARCHAR(40),
    -- Columns from PAYMENT_HISTORY
    "PH_M_ID" VARCHAR(40),
    "PH_M_NAME" VARCHAR(50),
    "PH_C_ID" VARCHAR(50),
    "PH_D_ID" VARCHAR(50),
    "TAKEN_DATE" VARCHAR(40),
    "M_QUANTITY" NUMERIC(2,0),
    "SERVED_BY" VARCHAR(50),
    -- Columns from SUPPLIER
    "S_ID" VARCHAR(40),
    "S_NAME" VARCHAR(40),
    "S_AGE" NUMERIC(4,2),
    "S_ADDRESS" VARCHAR(40),
    "S_PHONE" NUMERIC(12,0),
    -- Columns from SUPPLY_HISTORY
    "SUPPLIED_BY" VARCHAR(40),
    "SUPPLID_DATE" DATE,
    "TOTAL_AMMOUNT" NUMERIC(10,0),
    "SUPPLY_COUNT" INTEGER
) AS $$
BEGIN
    RETURN QUERY EXECUTE format('
        SELECT 
            t1."D_ID", t1."D_NAME", t1."D_PHONE", t1."D_EMAIL", t1."D_SPECIALIST", t1."D_PHOTO",
            t2."C_ID", t2."C_NAME", t2."C_AGE", t2."C_ADDRESS", t2."C_CONTACT", t2."C_SERVE", t2."C_PHOTO",
            t3."SHOP_BATCH", t3."SHOP_NAME", t3."SHOP_ADDRESS",
            t4."E_ID", t4."E_NAME", t4."E_AGE", t4."E_BLOOD", t4."E_SALARY", t4."E_PHONE", t4."E_DESIGNATION",
            t5."M_ID", t5."M_NAME", t5."M_TYPE", t5."M_PRICE", t5."M_IMPORT_DATE", t5."M_EXPIRE_DATE", t5."M_REMAIN",
            t6."BATCH", t6."NAME", t6."ESTABLISHED", t6."GROWTH", t6."TOTAL_GENERICS", t6."HEADQUARTER", t6."EMAIL",
            t7."M_ID" AS "PH_M_ID", t7."M_NAME" AS "PH_M_NAME", t7."C_ID" AS "PH_C_ID", t7."D_ID" AS "PH_D_ID", t7."TAKEN_DATE", t7."M_QUANTITY", t7."SERVED_BY",
            t8."S_ID", t8."S_NAME", t8."S_AGE", t8."S_ADDRESS", t8."S_PHONE",
            t9."SUPPLIED_BY", t9."SUPPLID_DATE", t9."TOTAL_AMMOUNT", t9."SUPPLY_COUNT"
        FROM %I t1
        %s JOIN %I t2 ON t1.%I = t2.%I
        LEFT JOIN "MEDICAL_SHOP" t3 ON t2."D_ID" = t3."SHOP_BATCH"
        LEFT JOIN "EMPLOYEES" t4 ON t2."C_ID" = t4."E_ID"
        LEFT JOIN "INVENTORY" t5 ON t2."C_ID" = t5."M_ID"
        LEFT JOIN "COMPANIES" t6 ON t2."C_ID" = t6."BATCH"
        LEFT JOIN "PAYMENT_HISTORY" t7 ON t2."C_ID" = t7."C_ID"
        LEFT JOIN "SUPPLIER" t8 ON t2."C_ID" = t8."S_ID"
        LEFT JOIN "SUPPLY_HISTORY" t9 ON t2."C_ID" = t9."SUPPLIED_BY"',
        table1_name, join_type, table2_name, col1_name, col2_name);
END;
$$ LANGUAGE plpgsql;

SELECT "D_ID","C_ID" FROM perform_join('DOCTOR', 'CUSTOMER', 'CROSS', 'D_ID', 'D_ID');


-- Having QUery 
CREATE OR REPLACE FUNCTION group_by_column(table_name VARCHAR, group_by_column VARCHAR, having_condition VARCHAR DEFAULT 'COUNT(*) > 0')
RETURNS JSON AS $$
DECLARE
    json_result JSON;
BEGIN
    EXECUTE '
        SELECT json_agg(row_to_json(t))
        FROM (
            SELECT ' || quote_ident(group_by_column) || ' AS ' || quote_ident(group_by_column) || ', COUNT(*) AS count
            FROM ' || quote_ident(table_name) || '
            GROUP BY ' || quote_ident(group_by_column) || '
            HAVING ' || having_condition || '
        ) t'
    INTO json_result;

    RETURN json_result;
END;
$$ LANGUAGE plpgsql;


SELECT group_by_column('DOCTOR', 'D_SPECIALIST', 'COUNT(*) > 1');

CREATE OR REPLACE FUNCTION group_by_column_aggregate(
    table_name VARCHAR,
    group_by_column VARCHAR,
    aggregation_function VARCHAR DEFAULT 'COUNT',
    having_condition VARCHAR DEFAULT 'COUNT(*) > 1'
)
RETURNS JSON AS $$
DECLARE
    json_result JSON;
    query_text TEXT;
BEGIN
    -- Construct the dynamic SQL query
    query_text := '
        SELECT json_agg(row_to_json(t))
        FROM (
            SELECT ' || quote_ident(group_by_column) || ' AS ' || quote_ident(group_by_column) || ', ' ||
            CASE 
                WHEN aggregation_function = 'COUNT' THEN 'COUNT(*)'
                WHEN aggregation_function = 'SUM' THEN 'SUM(' || quote_ident(group_by_column) || ')'
                WHEN aggregation_function = 'AVG' THEN 'AVG(' || quote_ident(group_by_column) || ')'
                WHEN aggregation_function = 'MIN' THEN 'MIN(' || quote_ident(group_by_column) || ')'
                WHEN aggregation_function = 'MAX' THEN 'MAX(' || quote_ident(group_by_column) || ')'
                ELSE 'COUNT(*)'
            END || ' AS result
            FROM ' || quote_ident(table_name) || '
            GROUP BY ' || quote_ident(group_by_column) || '
            HAVING ' || having_condition || '
        ) t';
    EXECUTE query_text INTO json_result;
    RETURN json_result;
END;
$$ LANGUAGE plpgsql;

SELECT group_by_column_aggregate('DOCTOR', 'D_SPECIALIST');
SELECT group_by_column_aggregate('INVENTORY', 'M_PRICE', 'SUM', 'SUM("M_REMAIN") >= 10');
SELECT group_by_column_aggregate('CUSTOMER', 'C_AGE', 'AVG');


-------------------------Modify Table START------------

ALTER TABLE "DOCTOR" ADD COLUMN "D_PHOTO" TEXT;
ALTER TABLE "DOCTOR" DROP COLUMN "D_PHOTO";
ALTER TABLE "CUSTOMER"
ADD CONSTRAINT "CUSTOMER_FK1" FOREIGN KEY ("D_ID") REFERENCES "DOCTOR" ("D_ID");

-------------------------Modify Table END------------

-- Query data from the DOCTOR table START------------

-- Query find one data by unique thing
SELECT * FROM "DOCTOR" WHERE "D_ID" = 'D57'
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
\?;


-- Searching data in possible ways(at least ten ways)from single table
-- 1) USING = OPERATOR
SELECT *
FROM "DOCTOR"
WHERE "D_SPECIALIST" = 'Gastroenterology';

-- 2) USING > OPERATOR 
SELECT *
FROM "INVENTORY"
WHERE "M_TYPE" = 'Tablet' AND "M_REMAIN" > 0;

-- 3) USING ORDER BY
SELECT *
FROM "EMPLOYEES"
ORDER BY "E_AGE" ASC;

-- 4) USING BETWEEN
SELECT *
FROM "PAYMENT_HISTORY"
WHERE "TAKEN_DATE" BETWEEN '2023-01-01' AND '2023-10-19';

-- 5) USING LIKE
SELECT *
FROM "CUSTOMER"
WHERE "C_ADDRESS" LIKE '%chattogram%';

-- 6) USING AND OPERATOR
SELECT *
FROM "INVENTORY"
WHERE "M_TYPE" = 'tablet' AND "M_PRICE" < 50;

-- 7) USING IN
SELECT *
FROM "CUSTOMER"
WHERE "D_ID" IN (6, 2, 8);

-- 8) RENAME COLUMN NAME USING AS
SELECT "C_NAME" AS "CUSTOMER NAME"
FROM "CUSTOMER";

-- 9) USING BETWEEN AND
SELECT *
FROM "CUSTOMER"
WHERE "C_AGE" BETWEEN 25 AND 30;

-- 10) USING CONCATENATION OPERATOR
SELECT "M_NAME" || ' ' || INITCAP("M_TYPE") AS "Medicine Name and Details"
FROM "INVENTORY";

-- 11) USING INITCAP() FUNCTION
SELECT INITCAP("S_NAME") AS "S_NAME"
FROM "SUPPLIER";

-- 12) USING MAX() FUNCTION
SELECT MAX("M_PRICE") AS "MAX PRICE"
FROM "INVENTORY";

-- 13) USING SUM() FUNCTION
SELECT SUM("M_PRICE") AS "Total"
FROM "INVENTORY";


--  Searching data in possible ways(at least five ways)from multiple tables
-- 1) USING FULL OUTER JOIN TO DISPLAY TWO TABLES
SELECT *
FROM "SUPPLIER" s
FULL OUTER JOIN "SUPPLY_HISTORY" h
ON s."S_ID" = h."SUPPLIED_BY";

-- 2) USING JOIN TO DISPLAY TWO TABLES
SELECT c."C_NAME", c."C_AGE", d."D_NAME" AS "Prescribed By", d."D_EMAIL", d."D_SPECIALIST"
FROM "CUSTOMER" c
JOIN "DOCTOR" d ON c."D_ID" = d."D_ID";

-- 3) SHOW CUSTOMER AND PRESCRIPTION TABLES DETAILS
SELECT c."C_NAME", p."M_NAME", p."M_QUANTITY", p."TAKEN_DATE"
FROM "CUSTOMER" c
JOIN "PAYMENT_HISTORY" p ON c."C_ID" = p."C_ID";

-- 4) SHOW CUSTOMER AND EMPLOYEES TABLES DETAILS
SELECT c."C_NAME", e."E_NAME", p."TAKEN_DATE"
FROM "CUSTOMER" c
JOIN "PAYMENT_HISTORY" p ON c."C_ID" = p."C_ID"
JOIN "EMPLOYEES" e ON e."E_ID" = p."SERVED_BY";

-- 5) SHOW CUSTOMERS WHO PURCHASED MORE THAN 3 MEDICINES
SELECT c."C_NAME", p."M_NAME", p."M_QUANTITY"
FROM "CUSTOMER" c
JOIN "PAYMENT_HISTORY" p ON c."C_ID" = p."C_ID"
WHERE p."M_QUANTITY" > 3;

-- 6) MEDICINE ID AND TOTAL PRICE BROUGHT BY CUSTOMER “NAIM”
SELECT p."M_ID", SUM(p."M_QUANTITY" * i."M_PRICE") AS "TOTAL_PRICE"
FROM "PAYMENT_HISTORY" p
JOIN "INVENTORY" i ON p."M_NAME" = i."M_NAME"
WHERE p."C_ID" = (SELECT "C_ID" FROM "CUSTOMER" WHERE "C_NAME" = 'naim')
GROUP BY p."M_ID";

--  Searching data in possible ways(at least ten ways)from single table
-- ❖1) SUBQUERY IN SELECT: NAME OF MEDICINE, DOCTOR, AND TAKEN DATE BY CUSTOMER NAME “MUSTAFIZ”
SELECT "M_NAME",
    (SELECT "D_NAME" FROM "DOCTOR" WHERE "D_ID" = p."D_ID") AS "D_NAME",
    (SELECT "C_NAME" FROM "CUSTOMER" WHERE "C_ID" = p."C_ID") AS "C_NAME",
    "TAKEN_DATE"
FROM "PAYMENT_HISTORY" p
WHERE p."C_ID" = (SELECT "C_ID" FROM "CUSTOMER" WHERE "C_NAME" = 'mustafiz');

-- ❖2) NESTED SUBQUERY: DISPLAYING CUSTOMER NAMES WHO PURCHASE THE MAXIMUM COST MEDICINE
SELECT *
FROM "CUSTOMER" c
WHERE c."C_ID" IN (
    SELECT p."C_ID"
    FROM "PAYMENT_HISTORY" p
    WHERE c."C_ID" = p."C_ID"
    AND p."M_ID" = (
        SELECT "M_ID"
        FROM "INVENTORY"
        WHERE "M_PRICE" = (SELECT MAX("M_PRICE") FROM "INVENTORY")
    )
);

-- ❖3) SUBQUERY WITH GROUP BY: RETRIEVE DOCTORS WITH THE HIGHEST AVERAGE MEDICINE QUANTITY SERVED
SELECT "D_NAME", "D_SPECIALIST"
FROM "DOCTOR"
WHERE (SELECT AVG("M_QUANTITY") FROM "PAYMENT_HISTORY" WHERE "D_ID" = "DOCTOR"."D_ID") = (
    SELECT MAX(avg_quantity) 
    FROM (
        SELECT "D_ID", AVG("M_QUANTITY") AS avg_quantity 
        FROM "PAYMENT_HISTORY" 
        GROUP BY "D_ID"
    ) subquery
);

-- ❖4) SUBQUERY WITH ORDER BY AND LIMIT: RETRIEVE THE TOP CUSTOMERS WHO BUY THE MOST EXPENSIVE MEDICINE
SELECT *
FROM "CUSTOMER" c
WHERE c."C_ID" IN (
    SELECT m."C_ID"
    FROM "PAYMENT_HISTORY" m
    WHERE c."C_ID" = m."C_ID"
    AND m."M_ID" = (
        SELECT "M_ID"
        FROM "INVENTORY"
        WHERE "M_PRICE" = (SELECT MAX("M_PRICE") FROM "INVENTORY")
    )
);

-- ❖5) SUBQUERY WITH AGGREGATE FUNCTION: RETRIEVE CUSTOMERS WITH AGES GREATER THAN THE AVERAGE AGE OF DOCTORS.
SELECT "C_NAME"
FROM "CUSTOMER"
WHERE "C_AGE" > (SELECT AVG("D_AGE") FROM "DOCTOR");

-- ❖6) SUBQUERY WITH EXISTS: RETRIEVE DOCTORS WHO SERVED AT LEAST ONE CUSTOMER.
SELECT "D_NAME"
FROM "DOCTOR"
WHERE EXISTS (SELECT 1 FROM "PAYMENT_HISTORY" WHERE "D_ID" = "DOCTOR"."D_ID");

-- ❖7) SUBQUERY WITH MULTIPLE CONDITIONS: RETRIEVE CUSTOMERS WHO PURCHASED A MEDICINE SERVED BY A SPECIFIC DOCTOR.
SELECT "C_NAME"
FROM "CUSTOMER"
WHERE "C_ID" IN (
    SELECT "C_ID"
    FROM "PAYMENT_HISTORY"
    WHERE "M_ID" = 4 AND "D_ID" = 9
);

-- ❖8) SUBQUERY WITH MATHEMATICAL OPERATION: RETRIEVE MEDICINES WITH QUANTITIES GREATER THAN THE AVERAGE QUANTITY MULTIPLIED BY 2.
SELECT "M_NAME"
FROM "PAYMENT_HISTORY"
WHERE "M_QUANTITY" > (SELECT AVG("M_QUANTITY") * 2 FROM "PAYMENT_HISTORY");

-- ❖9) SUBQUERY IN UPDATE STATEMENT: UPDATE THE AGE OF A CUSTOMER BASED ON THE MAXIMUM AGE IN THE CUSTOMER TABLE.
UPDATE "CUSTOMER"
SET "C_AGE" = (SELECT MAX("C_AGE") FROM "CUSTOMER")
WHERE "C_NAME" = 'bijoy';

-- ❖10) SUBQUERY IN DELETE STATEMENT: DELETE A SUPPLIER BASED ON A CONDITION IN ANOTHER TABLE.
DELETE FROM "SUPPLIER"
WHERE "S_ID" IN (
    SELECT "S_ID"
    FROM "SUPPLY_HISTORY"
    WHERE "SUPPLY_CONDITION" = 'specific_condition'
);

--  Searching data in possible ways(at least ten ways)from single table
-- ❖1) SIMPLE SELECT STATEMENT
DO $$
DECLARE
    v_customer_name TEXT;
BEGIN
    SELECT c_name INTO v_customer_name FROM customer WHERE c_id = 1;
    RAISE NOTICE 'Customer Name: %', v_customer_name;
END $$;

-- ❖2) CURSOR LOOPS
DO $$
DECLARE
    customer_cursor CURSOR FOR SELECT c_name FROM customer;
    v_customer_name TEXT;
BEGIN
    FOR rec IN customer_cursor LOOP
        RAISE NOTICE 'Customer Name: %', rec.c_name;
    END LOOP;
END $$;

-- ❖3) SIMPLE SELECT STATEMENT WITH CONDITIONAL LOGIC
DO $$
DECLARE
    v_customer_age INT;
    v_message TEXT;
BEGIN
    -- Assuming you want to check the age of a customer with c_id = 1
    SELECT c_age INTO v_customer_age FROM customer WHERE c_id = 1;
    IF v_customer_age < 18 THEN
        v_message := 'Customer is a minor.';
    ELSIF v_customer_age >= 18 AND v_customer_age < 65 THEN
        v_message := 'Customer is an adult.';
    ELSE
        v_message := 'Customer is a senior citizen.';
    END IF;
    RAISE NOTICE '%', v_message;
END $$;

-- ❖4) CURSOR LOOPS WITH A SELECT STATEMENT
DO $$
DECLARE
    customer_cursor CURSOR FOR SELECT c_name FROM customer;
    v_customer_name TEXT;
BEGIN
    FOR rec IN customer_cursor LOOP
        RAISE NOTICE 'Customer Name: %', rec.c_name;
    END LOOP;
    -- Separate select statement for a specific customer
    SELECT c_name INTO v_customer_name FROM customer WHERE c_id = 1;
    RAISE NOTICE 'Customer Name: %', v_customer_name;
END $$;

-- ❖5) PRINT SUPPLIER INFORMATION PROCEDURE
CREATE OR REPLACE PROCEDURE print_supplier_info(p_supplier_id INT)
LANGUAGE plpgsql
AS $$
DECLARE
    v_supplier_name TEXT;
    v_supplier_address TEXT;
BEGIN
    SELECT s_name, s_address INTO v_supplier_name, v_supplier_address
    FROM supplier
    WHERE s_id = p_supplier_id;
    RAISE NOTICE 'Supplier: %, Address: %', v_supplier_name, v_supplier_address;
END $$;



















