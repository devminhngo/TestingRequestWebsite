const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const contactsFilter = require('../../src/hooks/contacts-filter');

describe('\'contacts-filter\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      after: contactsFilter()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get({
      'data': [ {'name': 'John'} ]
    });
    
    assert.deepEqual(result, {'result': ['John'],
    });
  });
});
