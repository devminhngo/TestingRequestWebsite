// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    let data = context.result.data;
    let result = new Array();
    for (let entry in data) {
      result.push(data[entry].name);
    }
    
    context.result = {
      'result': result
    };
    return context;
  };
};
