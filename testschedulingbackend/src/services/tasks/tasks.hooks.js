const uniqid = require('../../hooks/unique-id');
const taskLog = require('../../hooks/tasklog');
const requestedtask = require('../../hooks/requestedtask');
const createLog = require('../../hooks/create-log');
const search = require('feathers-mongodb-fuzzy-search');
const sendNotifications = require('../../hooks/notifications');
// eslint-disable-next-line no-unused-vars
const { authenticate } = require('@feathersjs/authentication').hooks;
const updateStatusTask = require('../../hooks/updatestatus-task');
// 'date' should probably be named update task log instead. Confusing on what it does.
// action variable is only being used as mock data. Will be replaced later.
module.exports = {
  before: {
    all: [
      search(),
      search({  // regex search on given fields
        fields: ['tool','testcontact','testdescription','resource']
      })
    ],
    find: [],
    get: [],
    create: [
      uniqid({name: 'tid-'}),
      createLog({}),
      taskLog({name: 'taskLog', action: 'Created by'}),
      requestedtask({name: 'status'}),
    ],
    update: [],
    patch: [
      sendNotifications({}),
      updateStatusTask({name: 'taskLog', action: ['Denied', 'Approved']}),
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
