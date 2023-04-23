const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  income: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  car: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  phone_price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("propleData", Schema);
