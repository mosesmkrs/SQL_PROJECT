const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
require('dotenv').config();


const app = express();
app.use(cors());
const port = process.env.DB_PORT || 8081;

// MySQL connection configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database');
    return;
  }
  console.log('Connected to MySQL database');
});

// Reconnect on error
db.on('error', function(err) {
  console.error('Database error:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconnecting to database...');
    db.connect();
  } else {
    throw err;
  }
});


// Route to fetch data from MySQL
// Route to fetch data from MySQL
app.get('/api/data/', (req, res) => {
  db.query('SELECT * FROM farmersdetails_1', (err, results) => {
    if (err) {
      console.error('Error fetching data: ', err.message);
      res.status(500).send('Error fetching data'+ err.message);
      return;
    }
    res.json(results);
  });
});
app.get('/api/equipments/', (req, res) => {
  db.query('SELECT * FROM equipmenttable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/api/creditTransactions/', (req, res) => {
  db.query('SELECT * FROM credittransactiontable3', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/api/crops/', (req, res) => {
  db.query('SELECT * FROM cropstable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/api/farmercrops/', (req, res) => {
  db.query('SELECT * FROM farmerscropstable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/api/inputs/', (req, res) => {
  db.query('SELECT * FROM inputstable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/api/assessment/', (req, res) => {
  db.query('SELECT * FROM productivityassessmenttable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/api/surplus', (req, res) => {
  db.query('SELECT * FROM surplussalestable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
