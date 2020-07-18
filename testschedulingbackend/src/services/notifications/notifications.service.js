// Initializes the `notifications` service on path `/notifications`
const createService = require('feathers-mongodb');
const hooks = require('./notifications.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/notifications', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('notifications');

  mongoClient.then(db => {
    service.Model = db.collection('notifications');
  });

  service.hooks(hooks);
};