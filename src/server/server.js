const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const Users = require("./routes/Users");
const Amenities = require("./routes/Amenities");
const Jobs = require("./routes/Jobs");
const Food = require("./routes/Food");
const Destinations = require("./routes/Destinations");

app.use("/api/users", Users);
app.use("/api/amenities", Amenities);
app.use("/api/jobs", Jobs);
app.use("/api/food", Food);
app.use("/api/destinations", Destinations);

app.use((req, res) => {
  res.status(404).send("Unknown Request");
});

const port = 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
