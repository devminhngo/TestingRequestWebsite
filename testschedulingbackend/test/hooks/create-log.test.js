const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const createLog = require('../../src/hooks/create-log');

describe('\'create-log\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async create(data) {
        return { data };
      }
    });

    app.service('dummy').hooks({
      before: createLog()
    });

    assert.ok(app.service('dummy'));
  });

  it('runs the hook', async () => {
    let mockContextData = {
      'requestor': 'test data',
    };

    const result = await app.service('dummy').create(mockContextData);

    assert.ok(result.data);
  });
});
