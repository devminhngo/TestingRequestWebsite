const requests = require('./requests/requests.service.js');
const tasks = require('./tasks/tasks.service.js');
const requestDraft = require('./request-draft/request-draft.service.js');
const taskDraft = require('./task-draft/task-draft.service.js');
const users = require('./users/users.service.js');
const adminrequests = require('./adminrequests/adminrequests.service.js');
const chargecodes = require('./chargecodes/chargecodes.service.js');
const groups = require('./groups/groups.service.js');
const pslcompanies = require('./pslcompanies/pslcompanies.service.js');
const priorities = require('./priorities/priorities.service.js');
const requestDrivers = require('./request-drivers/request-drivers.service.js');
const resources = require('./resources/resources.service.js');
const testLocations = require('./test-locations/test-locations.service.js');
const tools = require('./tools/tools.service.js');
const fileUpload = require('./file-upload/file-upload.service.js');
const requestors = require('./requestors/requestors.service.js');
const contacts = require('./contacts/contacts.service.js');
const ldap = require('./ldap/ldap.service.js');
const notifications = require('./notifications/notifications.service.js');
const search = require('./search/search.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(requests);
  app.configure(requestDraft);
  app.configure(tasks);
  app.configure(taskDraft);
  app.configure(users);
  app.configure(adminrequests);
  app.configure(chargecodes);
  app.configure(groups);
  app.configure(pslcompanies);
  app.configure(priorities);
  app.configure(requestDrivers);
  app.configure(resources);
  app.configure(testLocations);
  app.configure(tools);


  app.configure(fileUpload);
  app.configure(requestors);
  app.configure(contacts);
  app.configure(ldap);

  app.configure(search);
  app.configure(notifications);
};