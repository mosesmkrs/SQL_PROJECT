const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
require('dotenv').config();


const app = express();
app.use(cors());
const port = process.env.PORT || 8081;

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'csv_db 6'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database');
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to fetch data from MySQL
// Route to fetch data from MySQL
app.get('/data', (req, res) => {
  db.query('SELECT * FROM farmersdetails_1', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/equipments', (req, res) => {
  db.query('SELECT * FROM equipmenttable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/creditTransactions', (req, res) => {
  db.query('SELECT * FROM credittransactiontable3', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/crops', (req, res) => {
  db.query('SELECT * FROM cropstable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/farmercrops', (req, res) => {
  db.query('SELECT * FROM farmerscropstable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/inputs', (req, res) => {
  db.query('SELECT * FROM inputstable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/assessment', (req, res) => {
  db.query('SELECT * FROM productivityassessmenttable', (err, results) => {
    if (err) {
      console.error('Error fetching data: ');
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});
app.get('/surplus', (req, res) => {
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
