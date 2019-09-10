export interface NewWorkRequest {
    chargecode: Number,
    companypsl: String,
    description: String,
    driver: String,
    duration: String,
    group: String,
    priority: String,
    pslparticipation: Boolean,
    requestcomments: String
    requestor: String,
    resource: String,
    tasks: Array<String>
    testcontact: String,
    testdescription: String,
    testlocation: String,
    tool: String
  }