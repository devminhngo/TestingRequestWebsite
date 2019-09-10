let date = require('date-and-time');

let now = new Date();

// eslint-disable-next-line no-unused-vars
module.exports = ({ name, action }) => {
  return async context => {
    // Stores log information (user, time & date) of task actions
    // Need to change context.data.requestor to global user once implemented.
    // Action is just a variable with mock data for now.

    let log = context.data.log;

    const info = action + ' ' + context.data.requestor + ' on ' + date.format(now, 'ddd MMM DD YYYY') + ' at ' + date.format(now, 'hh:mm A [GMT]Z');
    log.push(info);
    context.data.log = log;
    return context;
  };
};
