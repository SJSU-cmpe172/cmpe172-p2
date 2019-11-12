const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// const Users = require("./routes/Users");
// const Amenities = require("./routes/Amenities");
const Food = require("./routes/Food");
// app.use("/api/users", Users);
// app.use("/api/amenities", Amenities);
app.use("/api/food", Food);

app.use((req, res) => {
  res.status(404).send("Unknown Request");
});

const port = 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
