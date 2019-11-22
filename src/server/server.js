const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// const http = require("http").Server(app);
// const io = require("socket.io")(http);

const getApiAndEmit = async socket => {
  try {
    let params = {};
    params.TableName = "hotel";
    params.Key = { hotelid: 1 };
    params.ProjectionExpression = "jobs";

    docClient.get(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let buffer = data.Item.jobs;
        let filtered = buffer.filter(function(buffer) {
          return buffer.status === "new";
        });
        socket.emit("FromServer", filtered);
      }
    });
  } catch (err) {
    console.log("server side problem " + err);
  }
};

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

// let interval;
// io.on("connection", socket => {
//   console.log("new connection");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 10000);
//   socket.on("disconnect", () => console.log("client disconnected"));
// });

const port = 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
