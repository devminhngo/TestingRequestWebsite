const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const toolsFilter = require('../../src/hooks/tools-filter');

describe('\'tools-filter\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      after: toolsFilter()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get({
      'data': [
        {'tool': 'tool 1'}
      ]
    });
    
    assert.deepEqual(result, {
      'result': ['tool 1']
    });
  });
});
