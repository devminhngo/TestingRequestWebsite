// Initializes the `requestors` service on path `/requestors`
const createService = require('feathers-mongodb');
const hooks = require('./requestors.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/requestors', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('requestors');

  mongoClient.then(db => {
    service.Model = db.collection('Users');
  });

  service.hooks(hooks);
};
