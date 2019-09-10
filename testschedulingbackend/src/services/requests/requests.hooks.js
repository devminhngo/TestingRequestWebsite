const requestedtask = require('../../hooks/requestedtask');
const uniqid = require('../../hooks/unique-id');
const validateText = require('../../hooks/validate-text');
const search = require('feathers-mongodb-fuzzy-search');

module.exports = {
  before: {
    all: [
      search(),
      search({  // regex search on given fields
        fields: ['requestor','status','_id','driver','description']
      })
    ],
    find: [],
    get: [],
    create: [requestedtask({name: 'status'}), validateText(), uniqid({name: 'wrid-'})],
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
