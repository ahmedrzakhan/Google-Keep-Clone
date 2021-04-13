const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

// Models
const Notes = require("./models/Note");
// Routes
const notesRoute = require("./routes/note");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRoute);

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log("Connection to database failed");
    } else {
      console.log("Database is successfully connected");
    }
  }
);

app.listen( process.env.PORT || 5000, () => {
  console.log("Server is up and running on 5000");
});
