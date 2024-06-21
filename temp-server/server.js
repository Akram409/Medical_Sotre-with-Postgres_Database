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

const handleDatabaseQuery = async (res, queryText, queryParams = []) => {
  try {
    const data = await db.query(queryText, queryParams);
    res
      .status(200)
      .json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all data routes
app.get("/getDoctor", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "DOCTOR"')
);
app.get("/getCustomer", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "CUSTOMER"')
);
app.get("/getMedicalShop", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "MEDICAL_SHOP"')
);
app.get("/getEmployees", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "EMPLOYEES"')
);
app.get("/getInventory", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "INVENTORY"')
);
app.get("/getCompanies", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "COMPANIES"')
);
app.get("/getPaymentHistory", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "PAYMENT_HISTORY"')
);
app.get("/getSupplier", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "SUPPLIER"')
);
app.get("/getSupplyHistory", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "SUPPLY_HISTORY"')
);

// Get data by id routes
app.get("/getDoctor/:id", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "DOCTOR" WHERE "D_ID" = $1', [
    req.params.id,
  ])
);
app.get("/getCustomer/:id", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "CUSTOMER" WHERE "C_ID" = $1', [
    req.params.id,
  ])
);
app.get("/getMedicalShop/:id", (req, res) =>
  handleDatabaseQuery(
    res,
    'SELECT * FROM "MEDICAL_SHOP" WHERE "SHOP_BATCH" = $1',
    [req.params.id]
  )
);
app.get("/getEmployees/:id", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "EMPLOYEES" WHERE "E_ID" = $1', [
    req.params.id,
  ])
);
app.get("/getInventory/:id", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "INVENTORY" WHERE "M_ID" = $1', [
    req.params.id,
  ])
);
app.get("/getCompanies/:id", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "COMPANIES" WHERE "BATCH" = $1', [
    req.params.id,
  ])
);
app.get("/getPaymentHistory/:id", (req, res) =>
  handleDatabaseQuery(
    res,
    'SELECT * FROM "PAYMENT_HISTORY" WHERE "M_ID" = $1',
    [req.params.id]
  )
);
app.get("/getSupplier/:id", (req, res) =>
  handleDatabaseQuery(res, 'SELECT * FROM "SUPPLIER" WHERE "S_ID" = $1', [
    req.params.id,
  ])
);
app.get("/getSupplyHistory/:id", (req, res) =>
  handleDatabaseQuery(
    res,
    'SELECT * FROM "SUPPLY_HISTORY" WHERE "SUPPLIED_BY" = $1',
    [req.params.id]
  )
);

// Post Data
const handleDatabaseInsert = async (res, queryText, queryParams) => {
  try {
    const insertedData = await db.query(queryText, queryParams);
    res.status(201).json({ status: "success", data: insertedData.rows[0] });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// POST route for adding a doctor
app.post("/addDoctor", async (req, res) => {
  const { D_NAME, D_ID, D_PHONE, D_EMAIL, D_SPECIALIST } = req.body;
  const queryText = `
    INSERT INTO "DOCTOR" ("D_NAME", "D_ID", "D_PHONE", "D_EMAIL", "D_SPECIALIST")
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [D_NAME, D_ID, D_PHONE, D_EMAIL, D_SPECIALIST];
  await handleDatabaseInsert(res, queryText, values);
});
// POST route for adding a customer
app.post("/addCustomer", async (req, res) => {
  const { C_ID, C_NAME, C_AGE, C_ADDRESS, C_CONTACT, C_SERVE, D_ID } = req.body;
  const queryText = `
    INSERT INTO "CUSTOMER" ("C_ID", "C_NAME", "C_AGE", "C_ADDRESS", "C_CONTACT", "C_SERVE", "D_ID")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [C_ID, C_NAME, C_AGE, C_ADDRESS, C_CONTACT, C_SERVE, D_ID];
  await handleDatabaseInsert(res, queryText, values);
});
// POST route for adding a medical shop
app.post("/addMedicalShop", async (req, res) => {
  const { SHOP_BATCH, SHOP_NAME, SHOP_ADDRESS } = req.body;
  const queryText = `
    INSERT INTO "MEDICAL_SHOP" ("SHOP_BATCH", "SHOP_NAME", "SHOP_ADDRESS")
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [SHOP_BATCH, SHOP_NAME, SHOP_ADDRESS];
  await handleDatabaseInsert(res, queryText, values);
});
// POST route for adding an employee
app.post("/addEmployees", async (req, res) => {
  const { E_ID, E_NAME, E_AGE, E_BLOOD, E_SALARY, E_PHONE, E_DESIGNATION } =
    req.body;
  const queryText = `
    INSERT INTO "EMPLOYEES" ("E_ID", "E_NAME", "E_AGE", "E_BLOOD", "E_SALARY", "E_PHONE", "E_DESIGNATION")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [
    E_ID,
    E_NAME,
    E_AGE,
    E_BLOOD,
    E_SALARY,
    E_PHONE,
    E_DESIGNATION,
  ];
  await handleDatabaseInsert(res, queryText, values);
});
// POST route for adding inventory
app.post("/addInventory", async (req, res) => {
  const {
    M_ID,
    M_NAME,
    M_TYPE,
    M_PRICE,
    M_IMPORT_DATE,
    M_EXPIRE_DATE,
    M_REMAIN,
  } = req.body;
  const queryText = `
    INSERT INTO "INVENTORY" ("M_ID", "M_NAME", "M_TYPE", "M_PRICE", "M_IMPORT_DATE", "M_EXPIRE_DATE", "M_REMAIN")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [
    M_ID,
    M_NAME,
    M_TYPE,
    M_PRICE,
    M_IMPORT_DATE,
    M_EXPIRE_DATE,
    M_REMAIN,
  ];
  await handleDatabaseInsert(res, queryText, values);
});
// POST route for adding a company
app.post("/addCompanies", async (req, res) => {
  const {
    BATCH,
    NAME,
    ESTABLISHED,
    GROWTH,
    TOTAL_GENERICS,
    HEADQUARTER,
    MAIL,
  } = req.body;
  const queryText = `
    INSERT INTO "COMPANIES" ("BATCH", "NAME", "ESTABLISHED", "GROWTH", "TOTAL_GENERICS", "HEADQUARTER", "MAIL")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [
    BATCH,
    NAME,
    ESTABLISHED,
    GROWTH,
    TOTAL_GENERICS,
    HEADQUARTER,
    MAIL,
  ];
  await handleDatabaseInsert(res, queryText, values);
});
// POST route for adding payment history
app.post("/addPaymentHistory", async (req, res) => {
  const { M_NAME, TAKEN_DATE, M_ID, C_ID, D_ID, M_QUANTITY, SERVED_BY } =
    req.body;
  const queryText = `
    INSERT INTO "PAYMENT_HISTORY" ("M_NAME", "TAKEN_DATE", "M_ID", "C_ID", "D_ID", "M_QUANTITY", "SERVED_BY")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [M_NAME, TAKEN_DATE, M_ID, C_ID, D_ID, M_QUANTITY, SERVED_BY];
  await handleDatabaseInsert(res, queryText, values);
});
// POST route for adding a supplier
app.post("/addSupplier", async (req, res) => {
  const { S_ID, S_NAME, S_AGE, S_ADDRESS, S_PHONE } = req.body;
  const queryText = `
    INSERT INTO "SUPPLIER" ("S_ID", "S_NAME", "S_AGE", "S_ADDRESS", "S_PHONE")
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [S_ID, S_NAME, S_AGE, S_ADDRESS, S_PHONE];
  await handleDatabaseInsert(res, queryText, values);
});
// POST route for adding supply history
app.post("/addSupplyHistory", async (req, res) => {
  const { SUPPLIED_BY, SUPPLID_DATE, TOTAL_AMMOUNT, SUPPLY_COUNT } = req.body;
  const queryText = `
    INSERT INTO "SUPPLY_HISTORY" ("SUPPLIED_BY", "SUPPLID_DATE", "TOTAL_AMMOUNT", "SUPPLY_COUNT")
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [SUPPLIED_BY, SUPPLID_DATE, TOTAL_AMMOUNT, SUPPLY_COUNT];
  await handleDatabaseInsert(res, queryText, values);
});

// Put Data by id
// Generic function for handling PUT requests
const handleDatabaseUpdate = async (res, queryText, queryParams) => {
  try {
    const updatedData = await db.query(queryText, queryParams);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Database update error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// PUT route for updating a doctor
app.put("/updateDoctor/:id", async (req, res) => {
  const id = req.params.id;
  const { D_NAME, D_PHONE, D_EMAIL, D_SPECIALIST } = req.body;

  // Log received data for debugging
  console.log("Received request to update doctor with ID:", id);
  console.log("Updated values:", { D_NAME, D_PHONE, D_EMAIL, D_SPECIALIST });

  const queryText = `
    UPDATE "DOCTOR" 
    SET "D_NAME" = $1, "D_PHONE" = $2, "D_EMAIL" = $3, "D_SPECIALIST" = $4
    WHERE "D_ID" = $5
    RETURNING *`;
  const values = [D_NAME, D_PHONE, D_EMAIL, D_SPECIALIST, id];

  try {
    const updatedData = await db.query(queryText, values);
    // Log updated data for verification
    console.log("Updated doctor data:", updatedData.rows[0]);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error("Database update error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});


// PUT route for updating a customer
app.put("/updateCustomer/:id", async (req, res) => {
  const id = req.params.id;
  const { C_NAME, C_AGE, C_ADDRESS, C_CONTACT, C_SERVE, D_ID } = req.body;
  const queryText = `
    UPDATE "CUSTOMER" SET "C_NAME" = $1, "C_AGE" = $2, "C_ADDRESS" = $3, "C_CONTACT" = $4, "C_SERVE" = $5, "D_ID" = $6
    WHERE "C_ID" = $7 RETURNING *`;
  const values = [C_NAME, C_AGE, C_ADDRESS, C_CONTACT, C_SERVE, D_ID, id];
  await handleDatabaseUpdate(res, queryText, values);
});

// PUT route for updating a medical shop
app.put("/updateMedicalShop/:id", async (req, res) => {
  const id = req.params.id;
  const { SHOP_NAME, SHOP_ADDRESS } = req.body;
  const queryText = `
    UPDATE "MEDICAL_SHOP" SET "SHOP_NAME" = $1, "SHOP_ADDRESS" = $2
    WHERE "SHOP_BATCH" = $3 RETURNING *`;
  const values = [SHOP_NAME, SHOP_ADDRESS, id];
  await handleDatabaseUpdate(res, queryText, values);
});

// PUT route for updating an employee
app.put("/updateEmployees/:id", async (req, res) => {
  const id = req.params.id;
  const { E_NAME, E_AGE, E_BLOOD, E_SALARY, E_PHONE, E_DESIGNATION } = req.body;
  const queryText = `
    UPDATE "EMPLOYEES" SET "E_NAME" = $1, "E_AGE" = $2, "E_BLOOD" = $3, "E_SALARY" = $4, "E_PHONE" = $5, "E_DESIGNATION" = $6
    WHERE "E_ID" = $7 RETURNING *`;
  const values = [E_NAME, E_AGE, E_BLOOD, E_SALARY, E_PHONE, E_DESIGNATION, id];
  await handleDatabaseUpdate(res, queryText, values);
});

// PUT route for updating inventory
app.put("/updateInventory/:id", async (req, res) => {
  const id = req.params.id;
  const { M_NAME, M_TYPE, M_PRICE, M_IMPORT_DATE, M_EXPIRE_DATE, M_REMAIN } =
    req.body;
  const queryText = `
    UPDATE "INVENTORY" SET "M_NAME" = $1, "M_TYPE" = $2, "M_PRICE" = $3, "M_IMPORT_DATE" = $4, "M_EXPIRE_DATE" = $5, "M_REMAIN" = $6
    WHERE "M_ID" = $7 RETURNING *`;
  const values = [
    M_NAME,
    M_TYPE,
    M_PRICE,
    M_IMPORT_DATE,
    M_EXPIRE_DATE,
    M_REMAIN,
    id,
  ];
  await handleDatabaseUpdate(res, queryText, values);
});

// PUT route for updating a company
app.put("/updateCompanies/:id", async (req, res) => {
  const id = req.params.id;
  const { NAME, ESTABLISHED, GROWTH, TOTAL_GENERICS, HEADQUARTER, MAIL } =
    req.body;
  const queryText = `
    UPDATE "COMPANIES" SET "NAME" = $1, "ESTABLISHED" = $2, "GROWTH" = $3, "TOTAL_GENERICS" = $4, "HEADQUARTER" = $5, "MAIL" = $6
    WHERE "BATCH" = $7 RETURNING *`;
  const values = [
    NAME,
    ESTABLISHED,
    GROWTH,
    TOTAL_GENERICS,
    HEADQUARTER,
    MAIL,
    id,
  ];
  await handleDatabaseUpdate(res, queryText, values);
});

// PUT route for updating payment history
app.put("/updatePaymentHistory/:id", async (req, res) => {
  const id = req.params.id;
  const { M_NAME, TAKEN_DATE, M_QUANTITY, SERVED_BY } = req.body;
  const queryText = `
    UPDATE "PAYMENT_HISTORY" SET "M_NAME" = $1, "TAKEN_DATE" = $2, "M_QUANTITY" = $3, "SERVED_BY" = $4
    WHERE "M_ID" = $5 RETURNING *`;
  const values = [M_NAME, TAKEN_DATE, M_QUANTITY, SERVED_BY, id];
  await handleDatabaseUpdate(res, queryText, values);
});

// PUT route for updating a supplier
app.put("/updateSupplier/:id", async (req, res) => {
  const id = req.params.id;
  const { S_NAME, S_AGE, S_ADDRESS, S_PHONE } = req.body;
  const queryText = `
    UPDATE "SUPPLIER" SET "S_NAME" = $1, "S_AGE" = $2, "S_ADDRESS" = $3, "S_PHONE" = $4
    WHERE "S_ID" = $5 RETURNING *`;
  const values = [S_NAME, S_AGE, S_ADDRESS, S_PHONE, id];
  await handleDatabaseUpdate(res, queryText, values);
});

// PUT route for updating supply history
app.put("/updateSupplyHistory/:id", async (req, res) => {
  const id = req.params.id;
  const { SUPPLIED_BY, SUPPLID_DATE, TOTAL_AMMOUNT, SUPPLY_COUNT } = req.body;
  const queryText = `
    UPDATE "SUPPLY_HISTORY" SET "SUPPLIED_BY" = $1, "SUPPLID_DATE" = $2, "TOTAL_AMMOUNT" = $3, "SUPPLY_COUNT" = $4
    WHERE "SUPPLIED_BY" = $5 RETURNING *`;
  const values = [SUPPLIED_BY, SUPPLID_DATE, TOTAL_AMMOUNT, SUPPLY_COUNT, id];
  await handleDatabaseUpdate(res, queryText, values);
});

// Delete Data by id
// Generic function for handling DELETE requests
const handleDatabaseDelete = async (res, queryText, queryParams, entity) => {
  try {
    await db.query(queryText, queryParams);
    res.json({ message: `${entity} with id: ${queryParams[0]} deleted` });
  } catch (error) {
    console.error(`Error deleting ${entity} data:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE route for deleting a doctor
app.delete("/deleteDoctor/:id", async (req, res) => {
  const id = req.params.id;
  const queryText = 'DELETE FROM "DOCTOR" WHERE "D_ID" = $1';
  await handleDatabaseDelete(res, queryText, [id], "Doctor");
});

// DELETE route for deleting a customer
app.delete("/deleteCustomer/:id", async (req, res) => {
  const id = req.params.id;
  const queryText = 'DELETE FROM "CUSTOMER" WHERE "C_ID" = $1';
  await handleDatabaseDelete(res, queryText, [id], "Customer");
});

// DELETE route for deleting a medical shop
app.delete("/deleteMedicalShop/:id", async (req, res) => {
  const id = req.params.id;
  const queryText = 'DELETE FROM "MEDICAL_SHOP" WHERE "SHOP_BATCH" = $1';
  await handleDatabaseDelete(res, queryText, [id], "Medical shop");
});

// DELETE route for deleting an employee
app.delete("/deleteEmployees/:id", async (req, res) => {
  const id = req.params.id;
  const queryText = 'DELETE FROM "EMPLOYEES" WHERE "E_ID" = $1';
  await handleDatabaseDelete(res, queryText, [id], "Employee");
});

// DELETE route for deleting an inventory item
app.delete("/deleteInventory/:id", async (req, res) => {
  const id = req.params.id;
  const queryText = 'DELETE FROM "INVENTORY" WHERE "M_ID" = $1';
  await handleDatabaseDelete(res, queryText, [id], "Inventory item");
});

// DELETE route for deleting a company
app.delete("/deleteCompanies/:id", async (req, res) => {
  const id = req.params.id;
  const queryText = 'DELETE FROM "COMPANIES" WHERE "BATCH" = $1';
  await handleDatabaseDelete(res, queryText, [id], "Company");
});

// DELETE route for deleting payment history
app.delete("/deletePaymentHistory/:id", async (req, res) => {
  const id = req.params.id;
  const queryText = 'DELETE FROM "PAYMENT_HISTORY" WHERE "M_ID" = $1';
  await handleDatabaseDelete(res, queryText, [id], "Payment history");
});

// DELETE route for deleting a supplier
app.delete("/deleteSupplier/:id", async (req, res) => {
  const id = req.params.id;
  const queryText = 'DELETE FROM "SUPPLIER" WHERE "S_ID" = $1';
  await handleDatabaseDelete(res, queryText, [id], "Supplier");
});

// DELETE route for deleting supply history
app.delete("/deleteSupplyHistory/:id", async (req, res) => {
  const id = req.params.id;
  const queryText = 'DELETE FROM "SUPPLY_HISTORY" WHERE "SUPPLY_ID" = $1';
  await handleDatabaseDelete(res, queryText, [id], "Supply history");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
