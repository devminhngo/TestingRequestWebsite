const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const timeStamp = require('../../src/hooks/timestamp');

describe('\'timestamp\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async create(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      before: timeStamp({name: 'date'}),
    });
  });

  it('runs the hook', async () => {
    let mockContextData = {
      'requestor': 'John Doe',
    };

    const result = await app.service('dummy').create(mockContextData);
    
    assert.ok(result.date);
  });
});
