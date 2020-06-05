const bcrypt = require("bcrypt");
const User = require("../database/models/User");

module.exports = {
  async getAll() {
    return await User.find({});
  },
  async findById(id) {
    return await User.findById(id);
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
    return await User.findByIdAndUpdate(id, data, { new: true });
  },
  async remove(id) {
    return await User.findOneAndDelete(id);
  },
};
