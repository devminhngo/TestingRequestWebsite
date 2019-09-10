// Initializes the `tasks` service on path `/tasks`
const createService = require('feathers-mongodb');
const hooks = require('./tasks.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = {
    paginate,
    multi: ['patch', 'delete'],
    whitelist: ['$regex','$text','$search']
  };

  // Initialize our service with any options it requires
  app.use('/tasks', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tasks');

  mongoClient.then(db => {
    service.Model = db.collection('tasks');
  });

  service.hooks(hooks);
};
