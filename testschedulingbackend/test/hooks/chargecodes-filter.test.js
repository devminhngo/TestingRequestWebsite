const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const chargecodesFilter = require('../../src/hooks/chargecodes-filter');

describe('\'chargecodes-filter\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async find(data) {
        return data;
      }
    });

    // Register a dummy service to test our hook and then
    // register the hook.
    app.service('dummy').hooks({
      after: chargecodesFilter()
    });
  });

  it('runs the hook', async () => {
    let mockContextResult = {
      data: [
        {'_id': '1', 'code': 3},
        {'_id': '2', 'code': 1},
      ]
    };

    // Query the service to grab a response from the hook
    const result = await app.service('dummy').find(mockContextResult);
    
    assert.deepEqual(result, { 'result': [1, 3] } );
  });
});
