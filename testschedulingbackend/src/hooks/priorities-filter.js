// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const data = context.result.data;

    // The result array will hold the group names extracted
    // from the result.
    let result = new Array();
    
    // Iterate through the data and add the
    // priority into the result array.
    for (let i = 0; i < data.length; i++) {
      result.push(data[i].value);
    }


    // Finally assign the result to the context
    // result field and return the context.
    let resultObj = {
      'result': result
    };

    context.result = resultObj;

    return context;
  };
};
