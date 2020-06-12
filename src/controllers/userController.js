const {
  getAll,
  findById,
  findOneByEmail,
  findOneByCpf,
  create,
  update,
  setAdmin,
  setConfirmed,
  remove,
} = require("../services/user");

module.exports = {
  async index(req, res) {
    const users = await getAll();
    return res.json(users);
  },
  async getById(req, res) {
    const { userId } = req;
    let user = await findById(userId);
    user.password = "";
    return res.json(user);
  },
  async post(req, res) {
    const newUser = req.body;
    const userCpfDb = await findOneByCpf(newUser.cpf);
    if (userCpfDb)
      return res.status(400).json({
        statusCode: 400,
        message: "Já existe um usuário com esse cpf",
      });

    const userEmailDb = await findOneByEmail(newUser.email);
    if (userEmailDb)
      return res.status(400).json({
        statusCode: 400,
        message: "Já existe um usuário com esse e-mail",
      });
    try {
      const user = await create(newUser);
      return res.json({ id: user._id });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ statusCode: 500, message: "Não foi possível criar o usuário" });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const editedUser = req.body;

    let user = await findById(id);
    if (user) {
      user = update(id, editedUser);
      return res.status(204).send();
    } else
      return res
        .status(404)
        .json({ statusCode: 404, message: "Usuário não encontrado" });
  },
  async patch(req, res) {
    const { id, isAdmin } = req.params;
    const user = await findById(id);
    await setAdmin(user, isAdmin);

    return res.status(204).send();
  },
  async patchConfirmed(req, res) {
    const { id } = req.params;
    const user = await findById(id);
    await setConfirmed(user);

    return res.status(204).send();
  },
  async remove(req, res) {
    const { id } = req.params;

    let user = await findById(id);

    if (user) {
      await remove(id);
      return res.status(204).send();
    } else
      res
        .status(404)
        .json({ statusCode: 404, message: "Usuário não encontrado" });
  },
};
