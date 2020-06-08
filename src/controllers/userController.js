const {
  getAll,
  findById,
  findOneByEmail,
  findOneByCpf,
  create,
  update,
  remove,
} = require("../services/user");

module.exports = {
  async index(req, res) {
    const users = await getAll();
    return res.json(users);
  },
  async getById(req, res) {
    const { id } = req.params;
    return res.json(await findById(id));
  },
  async post(req, res) {
    const newUser = req.body;
    const userCpfDb = await findOneByCpf(newUser.cpf);
    if (userCpfDb)
      return res.status(400).json({ err: "Já existe um usuário com esse cpf" });

    const userEmailDb = await findOneByEmail(newUser.email);
    if (userEmailDb)
      return res
        .status(400)
        .json({ err: "Já existe um usuário com esse e-mail" });
    try {
      const user = await create(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: "Não foi possível criar o usuário" });
    }
    return res.status(204).send();
  },
  async update(req, res) {
    const { id } = req.params;
    const editedUser = req.body;

    let user = await findById(id);
    if (user) {
      user = update(id, editedUser);
      return res.status(204).send();
    } else return res.status(404).json({ err: "Usuário não encontrado" });
  },
  async remove(request, res) {
    const { id } = req.params;

    let user = await findById(id);

    if (user) {
      await remove(id);
      return res.status(204).send();
    } else res.status(404).json({ err: "Usuário não encontrado" });
  },
};
