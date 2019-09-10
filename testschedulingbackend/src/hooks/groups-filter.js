// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    // Create a variable named 'data' that will hold
    // the query information returned.
    const data = context.result;

    // The result array will hold the group names extracted
    // from the result.
    let result = new Array();

    // Iterate through the data and add the
    // parsed group name into the result array.
    // Removes the Requestor, Manager, and Super Admin groups
    const excludedGroups = ['Manager', 'Requestor', 'Super Admin'];
    for (let i = 0; i < data.length; i++) {
      if (!excludedGroups.includes(data[i].cn)) {
        result.push(data[i].cn);
      }
    }

    // Sort the result alphabetically. We
    // may choose to have this delegated to the
    // front end.
    result = result.sort();

    let resultObj = {
      result: result
    };

    // Finally assign the result to the context
    // result field and return the context.
    context.result = resultObj;
    return context;
  };
};
