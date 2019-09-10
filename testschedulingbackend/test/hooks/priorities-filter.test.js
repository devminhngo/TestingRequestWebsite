const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const prioritiesFilter = require('../../src/hooks/priorities-filter');

describe('\'priorities-filter\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async find(result) {
        return result;
      }
    });

    app.service('dummy').hooks({
      after: prioritiesFilter()
    });
  });

  it('runs the hook', async () => {
    let mockContextResult = {
      'total': 2,
      'data': [{
        '_id': '5c8033ee21b1190ce0ddd564',
        'value': 'Low'
      }, {
        '_id': '5c8033df21b1190ce0ddd563',
        'value': 'Medium'
      }]
    };

    const result = await app.service('dummy').find(mockContextResult);

    assert.deepEqual(result, { 'result': ['Low', 'Medium' ] } );
  });
});
