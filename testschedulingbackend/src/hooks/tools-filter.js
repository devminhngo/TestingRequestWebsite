// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const data = context.result.data;
    let result = new Array();
    for (let i in data) {
      result.push(data[i].tool);
    }
    context.result = {
      'result': result
    };
    return context;
  };
};
