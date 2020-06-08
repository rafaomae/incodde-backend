const {
  findById,
  getScheduleById,
  saveSchedule,
  updateSchedule,
  removeSchedule,
  hasScheduleConflict,
} = require("../services/workstation");

module.exports = {
  async getSchedule(req, res) {
    const { id, scheduleId } = req.params;
    return res.json(await getScheduleById(id, scheduleId));
  },
  async createSchedule(req, res) {
    const { id } = req.params;
    const schedule = req.body;

    const workstation = await findById(id);
    if (!workstation)
      return res.status(404).json({ error: "Workstation não encontrada" });

    const hasConflict = await hasScheduleConflict(id, null, schedule);

    if (hasConflict)
      return res
        .status(400)
        .json({ error: "Workstation já está sendo utilizada nesse horário" });

    try {
      await saveSchedule(workstation, schedule);
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: "Não foi possível salvar o agendamento" });
    }
  },

  async updateSchedule(req, res) {
    const { id, scheduleId } = req.params;
    const schedule = req.body;

    const workstation = await findById(id);
    if (!workstation)
      return res.status(404).json({ error: "Workstation não encontrada" });

    const hasConflict = await hasScheduleConflict(id, scheduleId, schedule);
    if (hasConflict)
      return res
        .status(400)
        .json({ error: "Workstation já está sendo utilizada nesse horário" });

    try {
      await updateSchedule(workstation, scheduleId, schedule);
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ err: "Não foi possível salvar o agendamento" });
    }
  },

  async removeSchedule(req, res) {
    const { id, scheduleId } = req.params;
    let workstation = await findById(id);

    if (workstation) {
      try {
        await removeSchedule(workstation, scheduleId);
        return res.status(204).send();
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ err: "Não foi possível deletar o agendamento" });
      }
    } else res.status(404).json({ err: "Workstation não encontrada" });
  },
};
