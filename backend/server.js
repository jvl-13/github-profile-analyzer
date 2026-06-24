const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyze");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/analyze", analyzeRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});