// Initializes the `requestDraft` service on path `/request-draft`
const createService = require('feathers-mongodb');
const hooks = require('./request-draft.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/request-draft', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('request-draft');

  mongoClient.then(db => {
    service.Model = db.collection('request-draft');
  });

  service.hooks(hooks);
};
