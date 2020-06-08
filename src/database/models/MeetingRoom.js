const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    createdBy: { type: String, required: true },
    participants: { type: [String], required: true },
  },
  { timestamps: true }
);

const meetingRoomSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    meetings: { type: [meetingSchema], required: false },
  },
  { timestamps: true }
);

const MeetingRoom = mongoose.model("MeetingRoom", meetingRoomSchema);

module.exports = MeetingRoom;
