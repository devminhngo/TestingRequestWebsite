const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const testLocationsFilter = require('../../src/hooks/test-locations-filter');

describe('\'test-locations-filter\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async find(result) {
        return result;
      }
    });

    app.service('dummy').hooks({
      after: testLocationsFilter()
    });
  });

  it('runs the hook', async () => {

    let mockContextResult = {
      'total': 1,
      'data': [{
        '_id': '5c80345221b1190ce0ddd569',
        'location': 'Houston, TX'
      }]
    };

    const result = await app.service('dummy').find(mockContextResult);

    assert.deepEqual(result, {'result': ['Houston, TX'] });
  });
});
