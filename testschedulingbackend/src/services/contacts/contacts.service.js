// Initializes the `contacts` service on path `/contacts`
const createService = require('feathers-mongodb');
const hooks = require('./contacts.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/contacts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('contacts');

  mongoClient.then(db => {
    service.Model = db.collection('Users');
  });

  service.hooks(hooks);
};
