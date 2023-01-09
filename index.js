const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// const options = require("./options.json");

//Initial route
app.get("/", (req, res) => {
  res.send("server running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.b8fg4md.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const optionCollections = client.db("jobTask1").collection("options");
const selectionCollections = client.db("jobTask1").collection("selection");

async function run() {
  try {
    app.get("/options", async (req, res) => {
      const query = {};
      const result = await optionCollections.find(query).toArray();
      res.send(result);
    });

    app.get("/selection", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = selectionCollections.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/selection", async (req, res) => {
      const query = req.body;
      const result = await selectionCollections.insertOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
