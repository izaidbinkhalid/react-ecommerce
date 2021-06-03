const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { compile } = require("morgan");
const fs = require("fs");
require("dotenv").config();

// app
const app = express();

// dataBase
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection error", err));

//middleWares
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());

// routes middlewares
fs.readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
//

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
