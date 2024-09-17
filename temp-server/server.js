require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = process.env.PORT || 5000;
var morgan = require("morgan");
app.use(express.static("public"));
const multer = require("multer");
const path = require("path");
const UPLOAD_FOLDER = "./public/image";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    if (file) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    }
  },
});

var upload = multer({
  storage: storage,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));



// Get all data routes
const handleDatabaseQuery = async (res, tableName, ID_COLUMN,num) => {
  const queryText = `
    SELECT * FROM "${tableName}"
    ORDER BY CAST(SUBSTRING("${ID_COLUMN}" FROM ${num}) AS INTEGER) ASC
  `;
  try {
    const data = await db.query(queryText);
    res.status(200).json({ status: "success", data: data.rows, total: data.rows.length });
  } catch (error) {
    console.error(`Database query error for table ${tableName}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/getTableData/:tableName", async (req, res) => {
  const { tableName } = req.params;
  const ID_COLUMN = getIDColumn(tableName);
  const TableNum = getTableNum(tableName);
  try {
    await handleDatabaseQuery(res, tableName, ID_COLUMN,TableNum);
  } catch (error) {
    console.error(`Error fetching data from table ${tableName}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function getIDColumn(tableName) {
  switch (tableName) {
    case "DOCTOR":
      return "D_ID";
    case "CUSTOMER":
      return "C_ID";
    case "MEDICAL_SHOP":
      return "SHOP_BATCH";
    case "EMPLOYEES":
      return "E_ID";
      case "INVENTORY":
      return "M_ID"; 
    case "COMPANIES":
      return "BATCH";
    case "PAYMENT_HISTORY":
      return "M_ID";
    case "SUPPLIER":
      return "S_ID";
    case "SUPPLY_HISTORY":
      return "SUPPLIED_BY";
    default:
      throw new Error(`Unknown table name: ${tableName}`);
  }
}
function getTableNum(tableName) {
  switch (tableName) {
    case "DOCTOR":
      return 2;
    case "CUSTOMER":
      return 2;
    case "MEDICAL_SHOP":
      return 3;
    case "EMPLOYEES":
      return 2;
    case "INVENTORY":
      return 2;
    case "COMPANIES":
      return 4;
    case "PAYMENT_HISTORY":
      return 2;
    case "SUPPLIER":
      return 3;
    case "SUPPLY_HISTORY":
      return 3;
    default:
      throw new Error(`Unknown table name: ${tableName}`);
  }
}

// Get data by id routes [ SELECT + WHERE ]
const handleSingleRecordQuery = async (res, tableName, idColumnName, id) => {
  const queryText = `SELECT * FROM "${tableName}" WHERE "${idColumnName}" = $1`;
  try {
    const data = await db.query(queryText, [id]);
    if (data.rows.length === 0) {
      res.status(404).json({ error: "Not found" });
    } else {
      res.status(200).json({ status: "success", data: data.rows[0] });
    }
  } catch (error) {
    console.error(`Database query error for table ${tableName}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/getSingleData/:tableName/:id", async (req, res) => {
  const { tableName, id } = req.params;

  switch (tableName.toUpperCase()) {
    case "DOCTOR":
      await handleSingleRecordQuery(res, tableName, "D_ID", id);
      break;
    case "CUSTOMER":
      await handleSingleRecordQuery(res, tableName, "C_ID", id);
      break;
    case "MEDICAL_SHOP":
      await handleSingleRecordQuery(res, tableName, "SHOP_BATCH", id);
      break;
    case "EMPLOYEES":
      await handleSingleRecordQuery(res, tableName, "E_ID", id);
      break;
    case "INVENTORY":
      await handleSingleRecordQuery(res, tableName, "M_ID", id);
      break;
    case "COMPANIES":
      await handleSingleRecordQuery(res, tableName, "BATCH", id);
      break;
    case "PAYMENT_HISTORY":
      await handleSingleRecordQuery(res, tableName, "M_ID", id);
      break;
    case "SUPPLIER":
      await handleSingleRecordQuery(res, tableName, "S_ID", id);
      break;
    case "SUPPLY_HISTORY":
      await handleSingleRecordQuery(res, tableName, "SUPPLIED_BY", id);
      break;
    default:
      res.status(400).json({ error: "Invalid table name" });
      break;
  }
});


// Post Data
const handleDatabaseInsert = async (res, tableName, data, filename) => {
  const path = "http://localhost:5001/image/";
  if (filename) {
    data.D_PHOTO = path + filename;
  }

  const columns = Object.keys(data).map(key => `"${key}"`).join(', ');
  const placeholders = Object.keys(data).map((_, index) => `$${index + 1}`).join(', ');

  const queryText = `
    INSERT INTO "${tableName}" (${columns})
    VALUES (${placeholders})
    RETURNING *`;

  try {
    const values = Object.values(data);
    const insertedData = await db.query(queryText, values);
    res.status(201).json({ status: "success", data: insertedData.rows[0] });
  } catch (error) {
    console.error(`Database insert error for table ${tableName}:`, error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

app.post("/addData/:tableName", upload.single("images"), async (req, res) => {
  const { tableName } = req.params;
  const filename = req.file ? req.file.filename : null;
  const data = req.body;
  
  switch (tableName.toUpperCase()) {
    case "DOCTOR":
    case "CUSTOMER":
    case "MEDICAL_SHOP":
    case "EMPLOYEES":
    case "INVENTORY":
    case "COMPANIES":
    case "PAYMENT_HISTORY":
    case "SUPPLIER":
    case "SUPPLY_HISTORY":
      await handleDatabaseInsert(res, tableName, data, filename);
      break;
    default:
      res.status(400).json({ error: "Invalid table name" });
      break;
  }
});



// Put or update Data by id
const handleDatabaseUpdate = async (res, tableName, idColumnName, id, data) => {
  try {
    const columns = Object.keys(data);
    const placeholders = columns.map((col, index) => `"${col}" = $${index + 1}`).join(', ');
    const queryParams = [...Object.values(data), id];
    
    const queryText = `
      UPDATE "${tableName}"
      SET ${placeholders}
      WHERE "${idColumnName}" = $${queryParams.length}
      RETURNING *`;

    const updatedData = await db.query(queryText, queryParams);
    res.status(200).json({ status: "success", data: updatedData.rows[0] });
  } catch (error) {
    console.error(`Database update error for ${tableName}:`, error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// PUT route for updating based on table name
app.put("/updateData/:tableName/:id", async (req, res) => {
  const { tableName, id } = req.params;
  const data = req.body;
  
  switch (tableName.toUpperCase()) {
    case "DOCTOR":
      await handleDatabaseUpdate(res, "DOCTOR", "D_ID", id, data);
      break;
    case "CUSTOMER":
      await handleDatabaseUpdate(res, "CUSTOMER", "C_ID", id, data);
      break;
    case "MEDICAL_SHOP":
      await handleDatabaseUpdate(res, "MEDICAL_SHOP", "SHOP_BATCH", id, data);
      break;
    case "EMPLOYEES":
      await handleDatabaseUpdate(res, "EMPLOYEES", "E_ID", id, data);
      break;
    case "INVENTORY":
      await handleDatabaseUpdate(res, "INVENTORY", "M_ID", id, data);
      break;
    case "COMPANIES":
      await handleDatabaseUpdate(res, "COMPANIES", "BATCH", id, data);
      break;
    case "PAYMENT_HISTORY":
      await handleDatabaseUpdate(res, "PAYMENT_HISTORY", "M_ID", id, data);
      break;
    case "SUPPLIER":
      await handleDatabaseUpdate(res, "SUPPLIER", "S_ID", id, data);
      break;
    case "SUPPLY_HISTORY":
      await handleDatabaseUpdate(res, "SUPPLY_HISTORY", "SUPPLIED_BY", id, data);
      break;
    default:
      res.status(400).json({ error: "Invalid table name" });
      break;
  }
});

// Delete Data by id
const handleDatabaseDelete = async (res, queryText, queryParams, entity) => {
  try {
    await db.query(queryText, queryParams);
    res.json({ message: `${entity} with id: ${queryParams[0]} deleted` });
  } catch (error) {
    console.error(`Error deleting ${entity} data:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE route for deleting records from different tables
app.delete("/delete/:entity/:id", async (req, res) => {
  const { entity, id } = req.params;

  let queryText, tableName;
  let queryParams = [id];

  switch (entity.toUpperCase()) {
    case "DOCTOR":
      tableName = "DOCTOR";
      queryText = `DELETE FROM "${tableName}" WHERE "D_ID" = $1`;
      break;
    case "CUSTOMER":
      tableName = "CUSTOMER";
      queryText = `DELETE FROM "${tableName}" WHERE "C_ID" = $1`;
      break;
    case "MEDICALSHOP":
      tableName = "MEDICAL_SHOP";
      queryText = `DELETE FROM "${tableName}" WHERE "SHOP_BATCH" = $1`;
      break;
    case "EMPLOYEES":
      tableName = "EMPLOYEES";
      queryText = `DELETE FROM "${tableName}" WHERE "E_ID" = $1`;
      break;
    case "INVENTORY":
      tableName = "INVENTORY";
      queryText = `DELETE FROM "${tableName}" WHERE "M_ID" = $1`;
      break;
    case "COMPANIES":
      tableName = "COMPANIES";
      queryText = `DELETE FROM "${tableName}" WHERE "BATCH" = $1`;
      break;
    case "PAYMENTHISTORY":
      tableName = "PAYMENT_HISTORY";
      queryText = `DELETE FROM "${tableName}" WHERE "M_ID" = $1`;
      break;
    case "SUPPLIER":
      tableName = "SUPPLIER";
      queryText = `DELETE FROM "${tableName}" WHERE "S_ID" = $1`;
      break;
    case "SUPPLYHISTORY":
      tableName = "SUPPLY_HISTORY";
      queryText = `DELETE FROM "${tableName}" WHERE "SUPPLY_ID" = $1`;
      break;
    default:
      return res.status(404).json({ error: "Invalid entity specified" });
  }

  await handleDatabaseDelete(res, queryText, queryParams, entity.toUpperCase());
});


// query route 
const handleSelectQuery = async (res, tableName, options) => {
  let queryText = `SELECT * FROM "${tableName}"`;

  if (options.where) {
    queryText += ` WHERE ${options.where}`;
  }

  if (options.groupBy) {
    queryText += ` GROUP BY ${options.groupBy}`;
  }

  if (options.having) {
    queryText += ` HAVING ${options.having}`;
  }

  if (options.orderBy) {
    queryText += ` ORDER BY ${options.orderBy}`;
  }
    console.log("🚀 ~ handleSelectQuery ~ queryText:", queryText)

  try {
    const data = await db.query(queryText);
    res.status(200).json({ status: "success", data: data.rows });
  } catch (error) {
    console.error(`Database query error for table ${tableName}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const handleJoinQuery = async (res, tableName, options) => {
  // Validate and extract options
  const { joinType = 'INNER', joinTable, joinCondition, columns, where, groupBy, having, orderBy } = options;

  // Validate join type
  const allowedJoinTypes = ['INNER', 'LEFT', 'RIGHT', 'FULL'];
  if (!allowedJoinTypes.includes(joinType.toUpperCase())) {
    return res.status(400).json({ error: `Invalid join type: ${joinType}` });
  }

  // Construct the initial query with selected columns
  let queryText = `SELECT ${columns ? columns.join(', ') : '*'} FROM "${tableName.toUpperCase()}"`;

  // Add JOIN clause
  if (joinTable && joinCondition) {
    queryText += ` ${joinType.toUpperCase()} JOIN "${joinTable.toUpperCase()}" ON ${joinCondition}`;
  } else {
    return res.status(400).json({ error: 'Missing joinTable or joinCondition in options' });
  }

  // Add WHERE clause if provided
  if (where) {
    queryText += ` WHERE ${where}`;
  }

  // Add GROUP BY clause if provided
  // if (groupBy) {
  //   queryText += ` GROUP BY ${groupBy}`;
  // }

  // // Add HAVING clause if provided
  // if (having) {
  //   queryText += ` HAVING ${having}`;
  // }

  // // Add ORDER BY clause if provided
  if (orderBy) {
    queryText += ` ORDER BY ${orderBy}`;
  }

  console.log("🚀 ~ handleJoinQuery ~ queryText:", queryText);

  try {
    // Execute the constructed query
    const data = await db.query(queryText);
    res.status(200).json({ status: 'success', data: data.rows });
  } catch (error) {
    // Handle any errors that occur during the query execution
    console.error(`Database query error for JOIN on table ${tableName}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

app.post("/query", async (req, res) => {
  const { tableName, queryType, options } = req.body;
  console.log("🚀 ~ app.post ~ req.body:", req.body)
  
  switch (queryType.toUpperCase()) {
    case "SELECT":
      // console.log("HEre")
      await handleSelectQuery(res, tableName, options);
      break;
    case "JOIN":
      await handleJoinQuery(res, tableName, options);
      break;
    default:
      res.status(400).json({ error: "Invalid query type" });
      break;
  }
});



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
