const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const requestorsFilter = require('../../src/hooks/requestors-filter');

describe('\'requestors-filter\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      after: requestorsFilter()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get({
      'data': [
        {'name': 'Firstname Middlename Lastname'}
      ]
    });
    
    assert.deepEqual(result, { 'result': ['Firstname Middlename Lastname'] });
  });
});
