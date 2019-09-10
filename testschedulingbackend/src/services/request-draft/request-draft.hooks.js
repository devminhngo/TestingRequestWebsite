const ValidateText = require('../../hooks/validate-text');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ValidateText()],
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
