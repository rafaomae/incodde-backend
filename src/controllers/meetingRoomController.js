const {
  getAll,
  findById,
  create,
  update,
  remove,
} = require("../services/meetingRoom");

module.exports = {
  async getAll(req, res) {
    return res.json(await getAll());
  },
  async getById(req, res) {
    const { id } = req.params;
    return res.json(await findById(id));
  },
  async post(req, res) {
    const newMeetingRoom = req.body;
    try {
      const meetingRoom = await create(newMeetingRoom);
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: "Não foi possível criar a sala de reunião" });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const editedMeetingRoom = req.body;

    let meetingRoom = await findById(id);
    if (meetingRoom) {
      meetingRoom = await update(id, editedMeetingRoom);
      return res.status(204).send();
    } else
      return res.status(404).json({ err: "Sala de reunião não encontrada" });
  },
  async remove(req, res) {
    const { id } = req.params;
    let meetingRoom = await findById(id);

    if (meetingRoom) {
      await remove(id);
      return res.status(204).send();
    } else res.status(404).json({ err: "Sala de reunião não encontrada" });
  },
};
