const express = require("express");
const cors = require("cors");

const database = require("./database/connect");
const routes = require("./routes");
const port = 3330;

const app = express();
database.init();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Backend running in port ${port}`);
});
