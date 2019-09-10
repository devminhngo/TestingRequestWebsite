const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const companiesFilter = require('../../src/hooks/companies-filter');

describe('\'companies\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      after: companiesFilter()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get({
      'data': [ {'name': 'result'} ]
    });
    
    assert.deepEqual(result, { 'result': ['result'] });
  });
});
