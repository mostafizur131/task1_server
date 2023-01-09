const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const options = require("./options.json");

//Initial route
app.get("/", (req, res) => {
  res.send("server running");
});

app.get("/options", (req, res) => {
  res.send(options);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
