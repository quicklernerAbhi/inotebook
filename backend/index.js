const connectToMongo = require("./db");
var cors = require("cors");
const express = require("express");
connectToMongo();
const app = express();
const port = 5000;
// midelware for json in req body
app.use(express.json());
app.use(cors());
//available routes\
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
//homepage
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
