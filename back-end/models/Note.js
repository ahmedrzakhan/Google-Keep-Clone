const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    description: { type: String, required: true, trim: true },
    pinned: { type: Boolean, required: true },
    status: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("notes", notesSchema);
