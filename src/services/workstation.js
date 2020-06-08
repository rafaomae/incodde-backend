const mongoose = require("mongoose");
const WorkStation = require("../database/models/WorkStation");

module.exports = {
  async getAll() {
    return await WorkStation.find({});
  },
  async findById(id) {
    const idDb = mongoose.Types.ObjectId(id);
    return await WorkStation.findById(idDb);
  },
  async create(workStation) {
    return await WorkStation.create(workStation);
  },
  async update(id, data) {
    const idDb = mongoose.Types.ObjectId(id);
    return await WorkStation.findByIdAndUpdate(idDb, data, { new: true });
  },
  async remove(id) {
    const idDb = mongoose.Types.ObjectId(id);
    return await WorkStation.findByIdAndDelete(idDb);
  },

  async hasScheduleConflict(id, scheduleId, schedule) {
    const idDb = mongoose.Types.ObjectId(id);
    const { start, end } = schedule;

    const workStation = await WorkStation.findOne({
      _id: idDb,
      $or: [
        {
          $and: [
            { "schedules.start": { $gte: start } },
            { "schedules.start": { $lte: end } },
          ],
        },
        {
          $and: [
            { "schedules.start": { $lte: start } },
            { "schedules.end": { $gte: start } },
          ],
        },
      ],
    });

    if (workStation)
      return scheduleId ? workStation.schedules.length > 1 : true;

    return false;
  },
  async getScheduleById(id, scheduleId) {
    const workStation = await WorkStation.findOne({
      _id: mongoose.Types.ObjectId(id),
    }).select({
      schedules: { $elemMatch: { _id: mongoose.Types.ObjectId(scheduleId) } },
    });
    return workStation.schedules[0];
  },
  async saveSchedule(workStation, schedule) {
    workStation.schedules.push(schedule);
    await workStation.save();
  },
  async updateSchedule(workStation, scheduleId, schedule) {
    await WorkStation.findOneAndUpdate(
      {
        _id: workStation._id,
        schedules: { $elemMatch: { _id: mongoose.Types.ObjectId(scheduleId) } },
      },
      {
        $set: {
          "schedules.$.start": schedule.start,
          "schedules.$.end": schedule.end,
          "schedules.$.createdBy": schedule.createdBy,
          "schedules.$.usedBy": schedule.usedBy,
        },
      },
      { new: true }
    );
  },
  async removeSchedule(workStation, scheduleId) {
    workStation.schedules.pull(mongoose.Types.ObjectId(scheduleId));
    await workStation.save();
  },
};
