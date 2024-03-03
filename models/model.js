const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  modelname: { type: String, required: true, maxLength: 100 },
  summary: { type: String, required: true, minLength: 100 },
  number_in_stock: { type: Number },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Model", ModelSchema);