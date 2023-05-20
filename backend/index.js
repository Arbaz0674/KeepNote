const express = require(`express`);
const connectToDatabase = require("./db");
const cors = require("cors");

const authRoutes = require(`./routes/auth`);
const notesRoutes = require(`./routes/notes`);

connectToDatabase();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get(`/`, (req, res) => {
  res.send(`Hello`);
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Server is listening at Port ${port}`);
});
