const Note = require("../models/Note");

// Create Note
const addNote = async (req, res) => {
  const { date, description, status, title } = req.body;
  let { pinned } = req.body;
  if (status === "Archive") {
    pinned = false;
  }

  const newNote = new Note({
    date,
    description,
    pinned,
    status,
    title,
  });

  newNote
    .save()
    .then((note) => {
      res.status(200).send(note);
    })
    .catch((err) => res.status(500).send({ err }));
};

// Update Note
const updateNote = (req, res) => {
  const { id } = req.params;
  const { date, description, pinned, status, title } = req.body;

  Note.findById(id).then((note) => {
    (note.date = date),
      (note.description = description),
      (note.pinned = pinned),
      (note.status = status),
      (note.title = title);

    note
      .save()
      .then((note) => res.status(200).send(note))
      .catch((err) =>
        res.status(500).json({ err, message: "Update note failed" })
      );
  });
};

// Delete Note
const deleteNote = (req, res) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then(() => res.status(200).send("Note Deleted successfuly"))
    .catch((err) =>
      res.status(400).json({ err, message: "Note delete failed" })
    );
};

// Get Note By Id
const getNoteById = async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id);
  res.send(note);
};

// Get Notes
const getNotes = async (req, res) => {
  const { status } = req.query;

  const notes = await Note.find({ status: status }).sort({ date: "-1" });

  res.status(200).send(notes);
};

// Search by Characters
const searchByChar = async (req, res) => {
  const { chars } = req.params;

  const notes = await Note.find({
    $or: [
      { title: { $regex: chars, $options: "i" } },
      { description: { $regex: chars, $options: "i" } },
    ],
  });

  res.status(200).send(notes);
};
module.exports = {
  addNote,
  deleteNote,
  getNoteById,
  getNotes,
  searchByChar,
  updateNote,
};
