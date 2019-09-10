const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const requestedtask = require('../../src/hooks/requestedtask');

describe('\'requestedtask\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async create(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      before: requestedtask({name: 'status'}),
    });
  });

  it('runs the hook', async () => {
    let mockContextData = {
      'requestor': 'John Doe',
    };

    const result = await app.service('dummy').create(mockContextData);
    
    assert.deepEqual(result, { 
      'requestor': 'John Doe',
      'status': 'requested'
    });
  });
});
