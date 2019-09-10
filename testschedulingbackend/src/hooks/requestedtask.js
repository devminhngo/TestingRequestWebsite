// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = ({ name }) => {
  return async context => {
    context.data[name] = 'requested';
    return context;
  };
};
