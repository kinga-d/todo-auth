const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use(router);

//todo: config the app
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000);
});
