// Initializes the `request-drivers` service on path `/request-drivers`
const createService = require('feathers-mongodb');
const hooks = require('./request-drivers.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/request-drivers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('request-drivers');

  mongoClient.then(db => {
    service.Model = db.collection('RequestDriver');
  });

  service.hooks(hooks);
};
