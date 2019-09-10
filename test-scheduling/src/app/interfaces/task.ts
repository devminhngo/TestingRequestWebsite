export interface Task {
  _id: String,
  tool: String,
  resource: String,
  duration: String,
  //testContact: String,
  priority: String,
  companyPSL: String,
  group: String,
  PSLParticipation: Boolean,
  testDescription: String,
  startdate: Date,
  enddate: Date,
  status: String,
  id: String
  //selectedStartTime: Array<String>,
  //createdAt: Date,
  //someid: String,
  WorkRequestId?: String
  deniedReason?: String
}
