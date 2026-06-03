const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const router = require("./src/routes");
const app = express();
app.use(express.json());

app.use(cors());
app.use('/api',router);
app.listen(4000, () => {
  console.log("serer started at http://localhost:3000");
});
