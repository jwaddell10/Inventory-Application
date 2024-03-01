const mongoose = require("mongoose");

const Schema = mongoose.Schema;
async function modelCreate(index, model_name, summary, number_in_stock, price) {
    const modeldetail = {
      model_name: model_name,
      summary: summary,
      number_in_stock: number_in_stock,
      price: price,
    };

const ModelSchema = new Schema({
  model: { type: String, required: true, maxLength: 100 },
  summary: { type: String, required: true, minLength: 100 },
  number_in_stock: { type: Number },
  price: { type: Number, required: true },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
