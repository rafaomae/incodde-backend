const mongoose = require("mongoose");
const {
  getAll,
  findById,
  create,
  update,
  remove,
} = require("../services/workstation");

module.exports = {
  async getAll(req, res) {
    return res.json(await getAll());
  },
  async getById(req, res) {
    const { id } = req.params;
    return res.json(await findById(id));
  },
  async post(req, res) {
    const newWorkStation = req.body;
    try {
      const workstation = await create(newWorkStation);
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Não foi possível criar o WorkStation",
      });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const editedWorkStation = req.body;

    let workStation = await findById(id);
    if (workStation) {
      workStation = await update(id, editedWorkStation);
      return res.status(204).send();
    } else
      return res
        .status(404)
        .json({ statusCode: 404, message: "WorkStation não encontrado" });
  },
  async remove(req, res) {
    const { id } = req.params;
    let workStation = await findById(id);

    if (workStation) {
      await remove(id);
      return res.status(204).send();
    } else
      res
        .status(404)
        .json({ statusCode: 404, message: "WorkStation não encontrado" });
  },
};
