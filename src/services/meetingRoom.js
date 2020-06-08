const mongoose = require("mongoose");
const MeetingRoom = require("../database/models/MeetingRoom");

module.exports = {
  async getAll() {
    return await MeetingRoom.find({});
  },
  async findById(id) {
    const idDb = mongoose.Types.ObjectId(id);
    return await MeetingRoom.findById(idDb);
  },
  async create(meetingRoom) {
    return await MeetingRoom.create(meetingRoom);
  },
  async update(id, data) {
    const idDb = mongoose.Types.ObjectId(id);
    return await MeetingRoom.findByIdAndUpdate(idDb, data, { new: true });
  },
  async remove(id) {
    const idDb = mongoose.Types.ObjectId(id);
    return await MeetingRoom.findByIdAndDelete(idDb);
  },
  async hasScheduleConflict(id, meetingId, meeting) {
    const idDb = mongoose.Types.ObjectId(id);
    const { start, end } = meeting;

    const meetingRoom = await MeetingRoom.findOne({
      _id: idDb,
      $or: [
        {
          $and: [
            { "meetings.start": { $gte: start } },
            { "meetings.start": { $lte: end } },
          ],
        },
        {
          $and: [
            { "meetings.start": { $lte: start } },
            { "meetings.end": { $gte: start } },
          ],
        },
      ],
    });

    if (meetingRoom) {
      if (meetingId) return meetingRoom.meetings.length > 1;

      return true;
    }

    return false;
  },

  async getMeetingById(id, meetingId) {
    const meetingRoom = await MeetingRoom.findOne({
      _id: mongoose.Types.ObjectId(id),
    }).select({
      meetings: { $elemMatch: { _id: mongoose.Types.ObjectId(meetingId) } },
    });
    return meetingRoom.meetings[0];
  },
  async saveMeeting(meetingRoom, meeting) {
    meetingRoom.meetings.push(meeting);
    await meetingRoom.save();
  },
  async updateMeeting(meetingRoom, meetingId, meeting) {
    await MeetingRoom.findOneAndUpdate(
      {
        _id: meetingRoom._id,
        meetings: { $elemMatch: { _id: mongoose.Types.ObjectId(meetingId) } },
      },
      {
        $set: {
          "meetings.$.name": meeting.name,
          "meetings.$.description": meeting.description,
          "meetings.$.start": meeting.start,
          "meetings.$.end": meeting.end,
          "meetings.$.createdBy": meeting.createdBy,
          "meetings.$.participants": meeting.participants,
        },
      },
      { new: true }
    );
  },
  async removeMeeting(meetingRoom, meetingId) {
    meetingRoom.meetings.pull(mongoose.Types.ObjectId(meetingId));
    await meetingRoom.save();
  },
};
