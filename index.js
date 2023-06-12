require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3030;

const corsOptions = {};
app.use(cors(corsOptions));

app.get("/", (req, res) => res.sendStatus(404));

const notedRoutes = require("./api/notes/notes.routes");

app.use("/api/notes", notedRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

module.exports = app;
