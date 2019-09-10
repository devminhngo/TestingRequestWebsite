// Initializes the `pslcompanies` service on path `/pslcompanies`
const createService = require('feathers-mongodb');
const hooks = require('./pslcompanies.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/pslcompanies', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('pslcompanies');

  mongoClient.then(db => {
    service.Model = db.collection('PSLCompany');
  });

  service.hooks(hooks);
};
