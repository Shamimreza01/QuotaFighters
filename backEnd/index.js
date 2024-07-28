const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = process.env.URI;
console.log(uri);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Database is connected");
    const db = client.db("FreedomFighter");
    const FFList = db.collection("FFList");
    const TemporaryFFList=db.collection("TemporaryFFList");

    app.get('/api/data', async (req, res) => {
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
      try {
        const data = req.body;
        const response = await TemporaryFFList.insertOne(data);
        res.send(response);
      } catch (err) {
        console.error("Error submitting data:", err);
        res.status(500).send({ message: "Error submitting data" });
      }
    });
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
}
app.get('/',(req,res)=>{
   res.send({"data":"server is running"});
})
run();

const port = process.env.PORT||3000;
app.listen(port, () => {
  console.log("server is running ......");
});
