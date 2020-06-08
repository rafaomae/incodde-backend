const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workStationScheduleSchema = new Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    createdBy: { type: String, required: true },
    usedBy: { type: String, required: true },
  },
  { timestamps: true }
);

const workStationSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    schedules: { type: [workStationScheduleSchema], required: false },
  },
  { timestamps: true }
);

const WorkStation = mongoose.model("WorkStation", workStationSchema);

module.exports = WorkStation;
