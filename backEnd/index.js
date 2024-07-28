const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }));
  

const uri = process.env.URI;
console.log("MongoDB URI:", uri);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  console.log("Starting run function");
  try {
    await client.connect();
    console.log("Database is connected");
    const db = client.db("FreedomFighter");
    const FFList = db.collection("FFList");
    const TemporaryFFList = db.collection("TemporaryFFList");

    app.get('/api/data', async (req, res) => {
      console.log("GET /api/data called");
      try {
        const data = await FFList.find().toArray();
        if (!data.length) {
          res.send({ message: "No data found" });
        } else {
          res.send(data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send({ message: "Error retrieving data" });
      }
    });

    app.post('/api/FFListSubmit', async (req, res) => {
      console.log("POST /api/FFListSubmit called");
      try {
        const data = req.body;
        const response = await TemporaryFFList.insertOne(data);
        res.send(response);
      } catch (err) {
        console.error("Error submitting data:", err);
        res.status(500).send({ message: "Error submitting data" });
      }
    });

    app.get('/', (req, res) => {
      res.send({ data: "server is running" });
    });
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
  console.log("End of run function");
}

run();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
