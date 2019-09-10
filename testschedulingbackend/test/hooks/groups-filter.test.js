/* eslint-disable no-console */
const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const groupsFilter = require('../../src/hooks/groups-filter');

describe('\'groups-filter\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async find(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      after: groupsFilter()
    });
  });

  it('expects the hook to return a sorted array composed of just the names', async function () {
    let mockContextResult = [
      {
        'cn': 'Group 1'
      }, {
        'cn': 'Group 3'
      }, {
        'cn': 'Manager'
      }
    ];

    let result = await app.service('dummy').find(mockContextResult);

    // Due to the way that JavaScript assertions work, we compare
    // the results as strings. If not, the test will fail even if the array contents
    // are identical. This is due to the assert checking memory locations and not
    // contents.
    assert.deepEqual(result, { result: ['Group 1', 'Group 3'] });
  });
});
