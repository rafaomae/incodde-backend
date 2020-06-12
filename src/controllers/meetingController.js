const {
  findById,
  getAvailableMeetings,
  getMeetingById,
  saveMeeting,
  updateMeeting,
  removeMeeting,
  hasScheduleConflict,
} = require("../services/meetingRoom");

module.exports = {
  async getMeeting(req, res) {
    const { id, meetingId } = req.params;
    return res.json(await getMeetingById(id, meetingId));
  },
  async getAvailableMeetings(req, res) {
    return res.json(await getAvailableMeetings());
  },
  async createMeeting(req, res) {
    const { id } = req.params;
    const meeting = req.body;

    const meetingRoom = await findById(id);
    if (!meetingRoom)
      return res
        .status(404)
        .json({ statusCode: 404, message: "Sala de reunião não encontrada" });

    const count = await hasScheduleConflict(id, null, meeting);
    if (count > 0)
      return res.status(400).json({
        statusCode: 400,
        message: "Reunião conflita com outra reunião já criada",
      });

    try {
      await saveMeeting(meetingRoom, meeting);
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({
          statusCode: 500,
          message: "Não foi possível salvar a reunião",
        });
    }
  },

  async updateMeeting(req, res) {
    const { id, meetingId } = req.params;
    const meeting = req.body;

    const meetingRoom = await findById(id);
    if (!meetingRoom)
      return res
        .status(404)
        .json({ statusCode: 404, message: "Sala de reunião não encontrada" });

    const count = await hasScheduleConflict(id, meetingId, meeting);
    if (count > 0)
      return res.status(400).json({
        statusCode: 400,
        message: "Reunião conflita com outra reunião já criada",
      });

    try {
      await updateMeeting(meetingRoom, meetingId, meeting);
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({
          statusCode: 500,
          message: "Não foi possível salvar a reunião",
        });
    }
  },

  async removeMeeting(req, res) {
    const { id, meetingId } = req.params;
    let meetingRoom = await findById(id);

    if (meetingRoom) {
      try {
        await removeMeeting(meetingRoom, meetingId);
        return res.status(204).send();
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          statusCode: 500,
          message: "Não foi possível deletar a reunião",
        });
      }
    } else
      res
        .status(404)
        .json({ statusCode: 404, message: "Sala de reunião não encontrada" });
  },
};
