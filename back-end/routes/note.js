const express = require("express");
const router = express.Router();

const {
  addNote,
  deleteNote,
  getNoteById,
  getNotes,
  searchByChar,
  updateNote,
} = require("./../controllers/note-controller");

// Get requests
router.get("/get-note/:id", getNoteById);
router.get("/get-notes", getNotes);
router.get("/search-by-char/:chars", searchByChar);

// Post requests
router.post("/add-note", addNote);
router.post("/update-note/:id", updateNote);

// Delete requests
router.delete("/delete-note/:id", deleteNote);

module.exports = router;
