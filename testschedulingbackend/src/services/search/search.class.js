/* eslint-disable no-unused-vars */

class Service {
  
  constructor (options) {
  }
  setup(app) {
    this.app = app;
  }
   
  async find (params) {
    
    let searchText = params.query['search'];
    let searchResults = {
      workrequest: [],
      tasks: []
    };
    let requestorSearch = await this.app.service('requests').find( { query: {requestor: { $search: searchText } } });
    let descripSearch = await this.app.service('requests').find( { query: {description: { $search: searchText } } });
    let statusSearch = await this.app.service('requests').find( { query: {status: { $search: searchText } } });
    let driverSearch = await this.app.service('requests').find( { query: {driver: { $search: searchText } } });

    let toolSearch = await this.app.service('tasks').find( { query: {tool: { $search: searchText } } });
    let testContactSearch = await this.app.service('tasks').find( { query: {testcontact: { $search: searchText } } });
    let testdescriptionSearch = await this.app.service('tasks').find( { query: {testdescription: { $search: searchText } } });
    let resourceSearch = await this.app.service('tasks').find( { query: {resource: { $search: searchText } } });
    
    searchResults.workrequest = requestorSearch['data'];
    searchResults.workrequest.push.apply(searchResults.workrequest, descripSearch['data']);
    searchResults.workrequest.push.apply(searchResults.workrequest, statusSearch['data']);
    searchResults.workrequest.push.apply(searchResults.workrequest, driverSearch['data']);
    const uniqueWorkRequestArray = searchResults.workrequest.filter((workrequest,index) => {
      return index === searchResults.workrequest.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(workrequest);
      });
    });
    searchResults.workrequest = uniqueWorkRequestArray;
    searchResults.tasks = toolSearch['data'];
    searchResults.tasks.push.apply(searchResults.tasks, testContactSearch['data']);
    searchResults.tasks.push.apply(searchResults.tasks, testdescriptionSearch['data']);
    searchResults.tasks.push.apply(searchResults.tasks, resourceSearch['data']);
    const uniqueTaskArray = searchResults.tasks.filter((tasks,index) => {
      return index === searchResults.tasks.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(tasks);
      });
    });
    searchResults.tasks = uniqueTaskArray;
    
    return [searchResults];
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
