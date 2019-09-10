const ValidateTaskElements = require('../../hooks/validate-task-elements');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ValidateTaskElements],
    update: [],
    patch: [],
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
  