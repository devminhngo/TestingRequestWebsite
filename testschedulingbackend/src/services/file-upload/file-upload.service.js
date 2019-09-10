// Initializes the `file-upload` service on path `/file-upload`
const createService = require('feathers-mongodb');
const hooks = require('./file-upload.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/file-upload', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('file-upload');

  mongoClient.then(db => {
    service.Model = db.collection('file-upload');
  });

  service.hooks(hooks);
};
