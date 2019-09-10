// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const { BadRequest } = require('@feathersjs/errors');
const validationTextErrors = new Object();

module.exports = function () {
  return async context => {
    const { data } = context;
    if(typeof data.requestor !== 'string' || data.requestor.trim() === '') {
      validationTextErrors.requestor = 'Requestor is invalid';
    }
    if(typeof data.description !== 'string' || data.description.trim() === '') {
      validationTextErrors.description = 'Description is invalid';
    }
    // parseInt returns NaN if it is unable to parse the input.
    // We can check then use this result with isNaN to check if
    // we received invalid input.
    if(isNaN(parseInt(data.chargecode))) {
      validationTextErrors.chargecode = 'Charge Code is invalid';
    }
    if(data.tasks == undefined) {
      validationTextErrors.task = 'Tasks is invalid';
    }
    
    if (Object.keys(validationTextErrors).length > 0) {
      throw new BadRequest('There are errors in your work request',  {
        'errors': validationTextErrors,
      });
    }
    else {
      return context;
    }
  };
};
