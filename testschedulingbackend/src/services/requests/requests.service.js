// Initializes the `requests` service on path `/requests`
const createService = require('feathers-mongodb');
const hooks = require('./requests.hooks');



module.exports = async function (app) {
  
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = {
    paginate,
    multi: ['patch', 'delete'], // Allows for patching through queries.
    whitelist: ['$regex','$text','$search']
  };
  
  app.use('/requests', createService(options));

  const service = app.service('requests');
   
  await mongoClient.then(db => {
    service.Model = db.collection('requests');     
  });
  service.hooks(hooks);

};
