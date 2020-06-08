const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { errors } = require("celebrate");

const { PORT } = require("./config");
const database = require("./database");

const user = require("./routes/user");
const login = require("./routes/login");
const workstations = require("./routes/workStation");
const meetingRoom = require("./routes/meetingRoom");

const app = express();
database.init();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", user);
app.use("/api", login);
app.use("/api", workstations);
app.use("/api", meetingRoom);

app.use(errors());

app.listen(PORT, () => {
  console.log(`Backend running in port ${PORT}`);
});
