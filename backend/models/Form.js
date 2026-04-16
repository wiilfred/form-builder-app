const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  label: String,
  type: String,
  required: Boolean,
  options: [String],
});

const formSchema = new mongoose.Schema({
  title: String,
  description: String,
  fields: [fieldSchema],
});

module.exports = mongoose.model("Form", formSchema);
