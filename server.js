const express = require('express');
const cors = require('cors');
require('dotenv').config();
const oracledb = require('oracledb');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8081;

// Oracle connection configuration
const dbConfig = {
  user: process.env.DB_USER || 'SYSDBA',
  password: process.env.DB_PASSWORD || 'sys123',
  connectString: process.env.DB_CONNECTION_STRING || 'localhost/XE'
};

// Function to establish connection to Oracle database
async function initializeOracle() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Oracle database connection pool created.');
  } catch (err) {
    console.error('Error creating Oracle database connection pool:', err);
    process.exit(1); // Exit the process if connection fails
  }
}

// Initialize Oracle connection
initializeOracle();

// Function to execute a query
async function executeQuery(query, params = []) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      ...dbConfig,
      privilege: oracledb.SYSDBA // Specify SYSDBA privilege here
    });
    const result = await connection.execute(query, params);
    return result.rows;
  } catch (err) {
    console.error('Error executing query: ', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing Oracle database connection:', err);
      }
    }
  }
}

// Routes to fetch data
app.get('/api/data/', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM Farmersdetails');
    res.json(results);
  } catch (err) {
    res.status(500).send('Error fetching data: ' + err.message);
  }
});

app.get('/api/equipments/', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM EquipmentTable');
    res.json(results);
  } catch (err) {
    res.status(500).send('Error fetching data: ' + err.message);
  }
});

app.get('/api/creditTransactions/', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM CreditTransactions');
    res.json(results);
  } catch (err) {
    res.status(500).send('Error fetching data: ' + err.message);
  }
});

app.get('/api/crops/', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM Crops');
    res.json(results);
  } catch (err) {
    res.status(500).send('Error fetching data: ' + err.message);
  }
});

app.get('/api/farmercrops/', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM FarmersCrops');
    res.json(results);
  } catch (err) {
    res.status(500).send('Error fetching data: ' + err.message);
  }
});

app.get('/api/inputs/', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM Inputs');
    res.json(results);
  } catch (err) {
    res.status(500).send('Error fetching data: ' + err.message);
  }
});

app.get('/api/assessment/', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM ProductivityAssessment');
    res.json(results);
  } catch (err) {
    res.status(500).send('Error fetching data: ' + err.message);
  }
});

app.get('/api/surplus', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM SurplusSalesTable');
    res.json(results);
  } catch (err) {
    res.status(500).send('Error fetching data: ' + err.message);
  }
});

// Post queries to add an entry
app.post("/api/data", async (req, res) => {
  const q = "INSERT INTO Farmersdetails (FarmerID, FirstName, Surname, HouseholdSize, ContactInfo, County, FarmSizeAcres) VALUES (:1, :2, :3, :4, :5, :6, :7)";
  const values = [
    req.body.FarmerID,
    req.body.FirstName,
    req.body.Surname,
    req.body.HouseholdSize,
    req.body.ContactInfo,
    req.body.County,
    req.body.FarmSizeAcres,
  ];
  try {
    await executeQuery(q, values);
    res.status(201).send('Entry added successfully');
  } catch (err) {
    res.status(500).send('Error adding entry: ' + err.message);
  }
});

app.post("/api/equipments", async (req, res) => {
  const q = "INSERT INTO EquipmentTable (EquipmentID, EquipmentName, ConditionGiven, ConditionReturned, FarmerAssigned, DateAssigned) VALUES (:1, :2, :3, :4, :5, :6)";
  const values = [
    req.body.EquipmentID,
    req.body.EquipmentName,
    req.body.ConditionGiven,
    req.body.ConditionReturned,
    req.body.FarmerAssigned,
    req.body.DateAssigned,
  ];
  try {
    await executeQuery(q, values);
    res.status(201).send('Entry added successfully');
  } catch (err) {
    res.status(500).send('Error adding entry: ' + err.message);
  }
});

app.post("/api/creditTransactions", async (req, res) => {
  const q = "INSERT INTO CreditTransactions (TransactionID, FarmerID, DateGiven, Amount, Purpose, RepaymentStatus) VALUES (:1, :2, :3, :4, :5, :6)";
  const values = [
    req.body.TransactionID,
    req.body.FarmerID,
    req.body.DateGiven,
    req.body.Amount,
    req.body.Purpose,
    req.body.RepaymentStatus,
  ];
  try {
    await executeQuery(q, values);
    res.status(201).send('Entry added successfully');
  } catch (err) {
    res.status(500).send('Error adding entry: ' + err.message);
  }
});

// Close Oracle pool and exit process on SIGINT
process.on('SIGINT', async () => {
  try {
    await oracledb.getPool().close(10);
    console.log('Oracle connection pool closed');
    process.exit(0);
  } catch (err) {
    console.error('Error closing Oracle connection pool:', err);
    process.exit(1);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
