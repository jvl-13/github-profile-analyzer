const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyze");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analyze", analyzeRoute);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})
