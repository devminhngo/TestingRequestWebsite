const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const driversFilter = require('../../src/hooks/drivers-filter');

describe('\'drivers-filter\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      after: driversFilter()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get({
      'data': [ {'name': 'Driver 1'} ]
    });
    
    assert.deepEqual(result, {'result': ['Driver 1']});
  });
});
