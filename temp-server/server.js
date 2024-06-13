require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = process.env.PORT || 5000;
var morgan = require("morgan");

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Get Data
app.get("/getDoctor", async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM "DOCTOR"');
    res
      .status(200)
      .json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error("Error fetching doctor data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getCustomer", async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM "CUSTOMER"');
    res
      .status(200)
      .json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getMedicalShop", async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM "MEDICAL_SHOP"');
    res
      .status(200)
      .json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error("Error fetching medical shop data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getEmployees", async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM "EMPLOYEES"');
    res
      .status(200)
      .json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error("Error fetching employees data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getInventory", async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM "INVENTORY"');
    res
      .status(200)
      .json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getCompanies", async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM "COMPANIES"');
    res
      .status(200)
      .json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error("Error fetching companies data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getPaymentHistory", async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM "PAYMENT_HISTORY"');
    res
      .status(200)
      .json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error("Error fetching payment history data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getSupplier", async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM "SUPPLIER"');
    res
      .status(200)
      .json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error("Error fetching supplier data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getSupplyHistory", async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM "SUPPLY_HISTORY"');
    res
      .status(200)
      .json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error("Error fetching supply history data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Data by id
app.get("/getDoctor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query('SELECT * FROM "DOCTOR" WHERE "D_ID" = $1', [
      id,
    ]);
    if (data.rows.length > 0) {
      res.status(200).json({ status: "success", data: data.rows[0] });
    } else {
      res.status(404).json({ error: "Doctor not found" });
    }
  } catch (error) {
    console.error("Error fetching doctor data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getCustomer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query('SELECT * FROM "CUSTOMER" WHERE "C_ID" = $1', [
      id,
    ]);
    if (data.rows.length > 0) {
      res.status(200).json({ status: "success", data: data.rows[0] });
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getMedicalShop/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      'SELECT * FROM "MEDICAL_SHOP" WHERE "SHOP_BATCH" = $1',
      [id]
    );
    if (data.rows.length > 0) {
      res.status(200).json({ status: "success", data: data.rows[0] });
    } else {
      res.status(404).json({ error: "Medical shop not found" });
    }
  } catch (error) {
    console.error("Error fetching medical shop data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getEmployees/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query('SELECT * FROM "EMPLOYEES" WHERE "E_ID" = $1', [
      id,
    ]);
    if (data.rows.length > 0) {
      res.status(200).json({ status: "success", data: data.rows[0] });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error("Error fetching employee data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getInventory/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query('SELECT * FROM "INVENTORY" WHERE "M_ID" = $1', [
      id,
    ]);
    if (data.rows.length > 0) {
      res.status(200).json({ status: "success", data: data.rows[0] });
    } else {
      res.status(404).json({ error: "Inventory item not found" });
    }
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getCompanies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      'SELECT * FROM "COMPANIES" WHERE "BATCH" = $1',
      [id]
    );
    if (data.rows.length > 0) {
      res.status(200).json({ status: "success", data: data.rows[0] });
    } else {
      res.status(404).json({ error: "Company not found" });
    }
  } catch (error) {
    console.error("Error fetching company data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getPaymentHistory/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      'SELECT * FROM "PAYMENT_HISTORY" WHERE "M_ID" = $1',
      [id]
    );
    if (data.rows.length > 0) {
      res.status(200).json({ status: "success", data: data.rows[0] });
    } else {
      res.status(404).json({ error: "Payment history not found" });
    }
  } catch (error) {
    console.error("Error fetching payment history data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getSupplier/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query('SELECT * FROM "SUPPLIER" WHERE "S_ID" = $1', [
      id,
    ]);
    if (data.rows.length > 0) {
      res.status(200).json({ status: "success", data: data.rows[0] });
    } else {
      res.status(404).json({ error: "Supplier not found" });
    }
  } catch (error) {
    console.error("Error fetching supplier data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getSupplyHistory/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.query(
      'SELECT * FROM "SUPPLY_HISTORY" WHERE "SUPPLIED_BY" = $1',
      [id]
    );
    if (data.rows.length > 0) {
      res.status(200).json({ status: "success", data: data.rows[0] });
    } else {
      res.status(404).json({ error: "Supply history not found" });
    }
  } catch (error) {
    console.error("Error fetching supply history data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Post Data
app.post("/addDoctor", async (req, res) => {
  try {
    const { D_NAME, D_ID, D_PHONE, D_EMAIL, D_SPECIALIST } = req.body;
    const insertQuery =
      'INSERT INTO "DOCTOR" ("D_NAME", "D_ID", "D_PHONE", "D_EMAIL", "D_SPECIALIST") VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [D_NAME, 4, D_PHONE, D_EMAIL, D_SPECIALIST];
    const insertedData = await db.query(insertQuery, values);
    res.status(201).json({ status: "success", data: insertedData[0] });
  } catch (error) {
    console.error("Error adding doctor data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/addCustomer", async (req, res) => {
  try {
    const { C_ID, C_NAME, C_AGE, C_ADDRESS, C_CONTACT, C_SERVE, D_ID } =
      req.body;
    const insertQuery =
      'INSERT INTO "CUSTOMER" ("C_ID", "C_NAME", "C_AGE", "C_ADDRESS", "C_CONTACT", "C_SERVE", "D_ID") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [C_ID, C_NAME, C_AGE, C_ADDRESS, C_CONTACT, C_SERVE, D_ID];
    const insertedData = await db.query(insertQuery, values);
    res.status(201).json({ status: "success", data: insertedData[0] });
  } catch (error) {
    console.error("Error adding customer data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/addMedicalShop", async (req, res) => {
  try {
    const { SHOP_BATCH, SHOP_NAME, SHOP_ADDRESS } = req.body;
    const insertQuery =
      'INSERT INTO "MEDICAL_SHOP" ("SHOP_BATCH", "SHOP_NAME", "SHOP_ADDRESS") VALUES ($1, $2, $3) RETURNING *';
    const values = [SHOP_BATCH, SHOP_NAME, SHOP_ADDRESS];
    const insertedData = await db.query(insertQuery, values);
    res.status(201).json({ status: "success", data: insertedData[0] });
  } catch (error) {
    console.error("Error adding medical shop data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/addEmployees", async (req, res) => {
  try {
    const { E_ID, E_NAME, E_AGE, E_BLOOD, E_SALARY, E_PHONE, E_DESIGNATION } =
      req.body;
    const insertQuery =
      'INSERT INTO "EMPLOYEES" ("E_ID", "E_NAME", "E_AGE", "E_BLOOD", "E_SALARY", "E_PHONE", "E_DESIGNATION") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [
      E_ID,
      E_NAME,
      E_AGE,
      E_BLOOD,
      E_SALARY,
      E_PHONE,
      E_DESIGNATION,
    ];
    const insertedData = await db.query(insertQuery, values);
    res.status(201).json({ status: "success", data: insertedData[0] });
  } catch (error) {
    console.error("Error adding employee data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/addInventory", async (req, res) => {
  try {
    const {
      M_ID,
      M_NAME,
      M_TYPE,
      M_PRICE,
      M_IMPORT_DATE,
      M_EXPIRE_DATE,
      M_REMAIN,
    } = req.body;
    const insertQuery =
      'INSERT INTO "INVENTORY" ("M_ID", "M_NAME", "M_TYPE", "M_PRICE", "M_IMPORT_DATE", "M_EXPIRE_DATE", "M_REMAIN") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [
      M_ID,
      M_NAME,
      M_TYPE,
      M_PRICE,
      M_IMPORT_DATE,
      M_EXPIRE_DATE,
      M_REMAIN,
    ];
    const insertedData = await db.query(insertQuery, values);
    res.status(201).json({ status: "success", data: insertedData[0] });
  } catch (error) {
    console.error("Error adding inventory data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/addCompanies", async (req, res) => {
  try {
    const {
      BATCH,
      NAME,
      ESTABLISHED,
      GROWTH,
      TOTAL_GENERICS,
      HEADQUARTER,
      MAIL,
    } = req.body;
    const insertQuery =
      'INSERT INTO "COMPANIES" ("BATCH", "NAME", "ESTABLISHED", "GROWTH", "TOTAL_GENERICS", "HEADQUARTER", "MAIL") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [
      BATCH,
      NAME,
      ESTABLISHED,
      GROWTH,
      TOTAL_GENERICS,
      HEADQUARTER,
      MAIL,
    ];
    const insertedData = await db.query(insertQuery, values);
    res.status(201).json({ status: "success", data: insertedData[0] });
  } catch (error) {
    console.error("Error adding company data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/addPaymentHistory", async (req, res) => {
  try {
    const { M_NAME, TAKEN_DATE, M_ID, C_ID, D_ID, M_QUANTITY, SERVED_BY } =
      req.body;
    const insertQuery =
      'INSERT INTO "PAYMENT_HISTORY" ("M_NAME", "TAKEN_DATE", "M_ID", "C_ID", "D_ID", "M_QUANTITY", "SERVED_BY") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [
      M_NAME,
      TAKEN_DATE,
      M_ID,
      C_ID,
      D_ID,
      M_QUANTITY,
      SERVED_BY,
    ];
    const insertedData = await db.query(insertQuery, values);
    res.status(201).json({ status: "success", data: insertedData[0] });
  } catch (error) {
    console.error("Error adding payment history data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/addSupplier", async (req, res) => {
  try {
    const { S_ID, S_NAME, S_AGE, S_ADDRESS, S_PHONE } = req.body;
    const insertQuery =
      'INSERT INTO "SUPPLIER" ("S_ID", "S_NAME", "S_AGE", "S_ADDRESS", "S_PHONE") VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [S_ID, S_NAME, S_AGE, S_ADDRESS, S_PHONE];
    const insertedData = await db.query(insertQuery, values);
    res.status(201).json({ status: "success", data: insertedData[0] });
  } catch (error) {
    console.error("Error adding supplier data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/addSupplyHistory", async (req, res) => {
  try {
    const { SUPPLIED_BY, SUPPLID_DATE, TOTAL_AMMOUNT, SUPPLY_COUNT } = req.body;
    const insertQuery =
      'INSERT INTO "SUPPLY_HISTORY" ("SUPPLIED_BY", "SUPPLID_DATE", "TOTAL_AMMOUNT", "SUPPLY_COUNT") VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [SUPPLIED_BY, SUPPLID_DATE, TOTAL_AMMOUNT, SUPPLY_COUNT];
    const insertedData = await db.query(insertQuery, values);
    res.status(201).json({ status: "success", data: insertedData[0] });
  } catch (error) {
    console.error("Error adding supply history data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Put Data by id
app.put("/updateDoctor/:id", async (req, res) => {
  const id = req.params.id;
  const { D_NAME, D_PHONE, D_EMAIL, D_SPECIALIST } = req.body;
  try {
    const updateQuery =
      'UPDATE "DOCTOR" SET "D_NAME" = $1, "D_PHONE" = $2, "D_EMAIL" = $3, "D_SPECIALIST" = $4 WHERE "D_ID" = $5 RETURNING *';
    const values = [D_NAME, D_PHONE, D_EMAIL, D_SPECIALIST, id];
    const updatedData = await db.query(updateQuery, values);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Error updating doctor data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/updateCustomer/:id", async (req, res) => {
  const id = req.params.id;
  const { C_NAME, C_AGE, C_ADDRESS, C_CONTACT, C_SERVE, D_ID } = req.body;
  try {
    const updateQuery =
      'UPDATE "CUSTOMER" SET "C_NAME" = $1, "C_AGE" = $2, "C_ADDRESS" = $3, "C_CONTACT" = $4, "C_SERVE" = $5, "D_ID" = $6 WHERE "C_ID" = $7 RETURNING *';
    const values = [C_NAME, C_AGE, C_ADDRESS, C_CONTACT, C_SERVE, D_ID, id];
    const updatedData = await db.query(updateQuery, values);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Error updating customer data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/updateMedicalShop/:id", async (req, res) => {
  const id = req.params.id;
  const { SHOP_NAME, SHOP_ADDRESS } = req.body;
  try {
    const updateQuery =
      'UPDATE "MEDICAL_SHOP" SET "SHOP_NAME" = $1, "SHOP_ADDRESS" = $2 WHERE "SHOP_BATCH" = $3 RETURNING *';
    const values = [SHOP_NAME, SHOP_ADDRESS, id];
    const updatedData = await db.query(updateQuery, values);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Error updating medical shop data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/updateEmployees/:id", async (req, res) => {
  const id = req.params.id;
  const { E_NAME, E_AGE, E_BLOOD, E_SALARY, E_PHONE, E_DESIGNATION } = req.body;
  try {
    const updateQuery =
      'UPDATE "EMPLOYEES" SET "E_NAME" = $1, "E_AGE" = $2, "E_BLOOD" = $3, "E_SALARY" = $4, "E_PHONE" = $5, "E_DESIGNATION" = $6 WHERE "E_ID" = $7 RETURNING *';
    const values = [
      E_NAME,
      E_AGE,
      E_BLOOD,
      E_SALARY,
      E_PHONE,
      E_DESIGNATION,
      id,
    ];
    const updatedData = await db.query(updateQuery, values);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Error updating employee data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/updateInventory/:id", async (req, res) => {
  const id = req.params.id;
  const { M_NAME, M_TYPE, M_PRICE, M_IMPORT_DATE, M_EXPIRE_DATE, M_REMAIN } =
    req.body;
  try {
    const updateQuery =
      'UPDATE "INVENTORY" SET "M_NAME" = $1, "M_TYPE" = $2, "M_PRICE" = $3, "M_IMPORT_DATE" = $4, "M_EXPIRE_DATE" = $5, "M_REMAIN" = $6 WHERE "M_ID" = $7 RETURNING *';
    const values = [
      M_NAME,
      M_TYPE,
      M_PRICE,
      M_IMPORT_DATE,
      M_EXPIRE_DATE,
      M_REMAIN,
      id,
    ];
    const updatedData = await db.query(updateQuery, values);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Error updating inventory data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/updateCompanies/:id", async (req, res) => {
  const id = req.params.id;
  const { NAME, ESTABLISHED, GROWTH, TOTAL_GENERICS, HEADQUARTER, MAIL } =
    req.body;
  try {
    const updateQuery =
      'UPDATE "COMPANIES" SET "NAME" = $1, "ESTABLISHED" = $2, "GROWTH" = $3, "TOTAL_GENERICS" = $4, "HEADQUARTER" = $5, "MAIL" = $6 WHERE "BATCH" = $7 RETURNING *';
    const values = [
      NAME,
      ESTABLISHED,
      GROWTH,
      TOTAL_GENERICS,
      HEADQUARTER,
      MAIL,
      id,
    ];
    const updatedData = await db.query(updateQuery, values);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Error updating company data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/updatePaymentHistory/:id", async (req, res) => {
  const id = req.params.id;
  const { M_NAME, TAKEN_DATE, M_QUANTITY, SERVED_BY } = req.body;
  try {
    const updateQuery =
      'UPDATE "PAYMENT_HISTORY" SET "M_NAME" = $1, "TAKEN_DATE" = $2, "M_QUANTITY" = $3, "SERVED_BY" = $4 WHERE "M_ID" = $5 RETURNING *';
    const values = [M_NAME, TAKEN_DATE, M_QUANTITY, SERVED_BY, id];
    const updatedData = await db.query(updateQuery, values);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Error updating payment history data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/updateSupplier/:id", async (req, res) => {
  const id = req.params.id;
  const { S_NAME, S_AGE, S_ADDRESS, S_PHONE } = req.body;
  try {
    const updateQuery =
      'UPDATE "SUPPLIER" SET "S_NAME" = $1, "S_AGE" = $2, "S_ADDRESS" = $3, "S_PHONE" = $4 WHERE "S_ID" = $5 RETURNING *';
    const values = [S_NAME, S_AGE, S_ADDRESS, S_PHONE, id];
    const updatedData = await db.query(updateQuery, values);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Error updating supplier data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/updateSupplyHistory/:id", async (req, res) => {
  const id = req.params.id;
  const { SUPPLIED_BY, SUPPLID_DATE, TOTAL_AMMOUNT, SUPPLY_COUNT } = req.body;
  try {
    const updateQuery =
      'UPDATE "SUPPLY_HISTORY" SET "SUPPLIED_BY" = $1, "SUPPLID_DATE" = $2, "TOTAL_AMMOUNT" = $3, "SUPPLY_COUNT" = $4 WHERE "SUPPLIED_BY" = $5 RETURNING *';
    const values = [SUPPLIED_BY, SUPPLID_DATE, TOTAL_AMMOUNT, SUPPLY_COUNT, id];
    const updatedData = await db.query(updateQuery, values);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Error updating supply history data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Data by id
app.delete("/deleteDoctor/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM "DOCTOR" WHERE "D_ID" = $1', [id]);
    res.json({ message: `Doctor with id: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting doctor data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/deleteCustomer/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM "CUSTOMER" WHERE "C_ID" = $1', [id]);
    res.json({ message: `Customer with id: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting customer data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/deleteMedicalShop/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM "MEDICAL_SHOP" WHERE "SHOP_BATCH" = $1', [id]);
    res.json({ message: `Medical shop with id: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting medical shop data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/deleteEmployees/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM "EMPLOYEES" WHERE "E_ID" = $1', [id]);
    res.json({ message: `Employee with id: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting employee data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/deleteInventory/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM "INVENTORY" WHERE "M_ID" = $1', [id]);
    res.json({ message: `Inventory item with id: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting inventory data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/deleteCompanies/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM "COMPANIES" WHERE "BATCH" = $1', [id]);
    res.json({ message: `Company with id: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting company data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/deletePaymentHistory/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM "PAYMENT_HISTORY" WHERE "M_ID" = $1', [id]);
    res.json({ message: `Payment history with id: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting payment history data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/deleteSupplier/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM "SUPPLIER" WHERE "S_ID" = $1', [id]);
    res.json({ message: `Supplier with id: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting supplier data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/deleteSupplyHistory/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM "SUPPLY_HISTORY" WHERE "SUPPLY_ID" = $1', [id]);
    res.json({ message: `Supply history with id: ${id} deleted` });
  } catch (error) {
    console.error("Error deleting supply history data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
