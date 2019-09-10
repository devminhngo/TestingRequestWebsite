// eslint-disable-next-line no-unused-vars
const uniqid = require('uniqid');

module.exports = ({ name }) => {
  return async context => {
    // Generate a uniqid and add it to the task or work request
    context.data['id'] = uniqid(name).toUpperCase();
    return context;
  };
};
