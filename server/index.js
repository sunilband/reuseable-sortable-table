const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const server = express();
const port = process.env.PORT || 5000;

// import routes
const routes = require("./routes/DataRoute");

// middlewares
server.use(express.json());
server.use(cors());
server.use("/", routes);

// connect mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
