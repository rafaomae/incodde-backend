const mongoose = require("mongoose");
const { DB } = require("../config");

module.exports = {
  init() {
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
