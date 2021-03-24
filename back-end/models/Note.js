const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    status: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    pinned: { type: Boolean, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("notes", notesSchema);
