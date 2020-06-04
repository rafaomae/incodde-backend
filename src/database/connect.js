const uri = "mongodb://root:root@localhost:27017/crud?authSource=admin";
const mongoose = require("mongoose");

module.exports = {
  init() {
    mongoose
      .connect(uri, {
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
