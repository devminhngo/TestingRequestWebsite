const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const resourceFilter = require('../../src/hooks/resource-filter');

describe('\'resource-filter\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      after: resourceFilter()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get({
      'data': [ {'name': 'resource'} ]
    });
    
    assert.deepEqual(result, {
      'result': ['resource'],
    });
  });
});
