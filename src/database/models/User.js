const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    cpf: { type: String, required: true },
    address: { type: String, required: true },
    bio: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    confirmed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
