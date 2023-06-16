const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ToySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  productionDate: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("toys", ToySchema);
