const express = require(`express`);
const connectToDatabase = require("./db");

const authRoutes = require(`./routes/auth`);
const notesRoutes = require(`./routes/notes`);

connectToDatabase();
const app = express();
const port = 3000;

app.use(express.json());

app.get(`/`, (req, res) => {
  res.send(`Hello`);
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Server is listening at Port ${port}`);
});
