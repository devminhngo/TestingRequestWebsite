// Application hooks that run for every service
const log = require('./hooks/log');
const setTimestamp = require('./hooks/timestamp.js');



module.exports = {
  before: {
    all: [ log() ],
    find: [],
    get: [],
    create: [setTimestamp({name: 'createdAt'})],
    update: [setTimestamp({name: 'updatedAt'})],
    patch: [],
    remove: []
  },

  after: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
