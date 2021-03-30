const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    date: { type: Date, required: true },
    description: { type: [String], trim: true },
    pinned: { type: Boolean, required: true },
    status: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("notes", notesSchema);
