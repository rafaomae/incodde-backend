const moongose = require("mongoose");
const User = require("../database/models/User");

module.exports = {
  async index(req, res) {
    const users = await User.find({});

    return res.json(users);
  },
  async post(req, res) {
    const newUser = req.body;
    const userDb = await User.findOne({ cpf: newUser.cpf });
    if (userDb)
      return res.status(400).json({ err: "Já existe um usuário com esse cpf" });

    const user = await User.create(newUser);
    return res.status(204).send();
  },
  async update(req, res) {
    const { id } = request.params;
    const editedUser = req.body;

    const idDb = mongoose.Types.ObjectId(id);
    let user = await User.findById(idDb);
    if (user) {
      user = await User.findByIdAndUpdate(idDb, editedUser, {
        new: true,
      });

      return res.status(204).send();
    } else return res.status(404).json({ err: "Usuário não encontrado" });
  },
  async delete(request, res) {
    const { id } = request.params;

    const idDb = mongoose.Types.ObjectId(id);
    let user = await User.findById(idDb);

    if (user) {
      await User.findByIdAndDelete(mongoose.Types.ObjectId(id));
      return res.status(204).send();
    } else res.status(404).json({ err: "Usuário não encontrado" });
  },
};
