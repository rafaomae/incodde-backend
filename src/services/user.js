const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../database/models/User");

module.exports = {
  async getAll() {
    return await User.find({});
  },
  async findById(id) {
    const idDb = mongoose.Types.ObjectId(id);
    return await User.findById(idDb);
  },
  async findOneByEmail(email) {
    return await User.findOne({ email: email });
  },
  async findOneByCpf(cpf) {
    return await User.findOne({ cpf: cpf });
  },
  async create(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  },
  async update(id, data) {
    const idDb = mongoose.Types.ObjectId(id);
    return await User.findByIdAndUpdate(idDb, data, { new: true });
  },
  async remove(id) {
    const idDb = mongoose.Types.ObjectId(id);
    return await User.findOneAndDelete(idDb);
  },
};
