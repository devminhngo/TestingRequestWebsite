// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const { BadRequest } = require('@feathersjs/errors');
const moment = require('moment');

let validateTaskErrors = new Object();

module.exports = function () {
  return async  context=> {
    const { data } = context;
    if(typeof data.taskid !== 'string' || data.taskid.trim() === '') {
      validateTaskErrors.taskid = 'TaskId is invalid';
    }
    if(typeof data.testresource !== 'string' || data.testresource.trim() === '') {
      validateTaskErrors.testresource = 'Test resource is invalid';
    }
    if(moment(data.startdate,['MM-DD-YYYY', 'YYYY-MM-DD'],true).isValid() == false) {
      validateTaskErrors.startdate = 'Start date must be a timestamp';
    }
    if(moment(data.enddate,['MM-DD-YYYY', 'YYYY-MM-DD'],true).isValid() == false) {
      validateTaskErrors.enddate = 'End date must be a timestamp';
    }
    if(typeof data.schedule !== 'string' || data.schedule.trim() === '') {
      validateTaskErrors.schedule = 'Schedule is invalid';
    }
    if(typeof data.testdata !== 'string' || data.testdata.trim() === '') {
      validateTaskErrors.testdata = 'Test data is invalid';
    }
    if(typeof data.testlog !== 'string' || data.testlog.trim() === '') {
      validateTaskErrors.testlog = 'Test log is invalid';
    }
    if(typeof data.link !== 'string' || data.link.trim() === '') {
      validateTaskErrors.link = 'Link is invalid';
    }

    if (validateTaskErrors !== {}) {
      throw new BadRequest('You have some errors in your task form.',  {
        'errors': validateTaskErrors,
      });
    }
    else {
      return context;
    }
  };
};
