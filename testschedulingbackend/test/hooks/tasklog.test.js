const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const taskLog = require('../../src/hooks/tasklog');
describe('\'tasklog\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async create(data) {
        return  data ;
      }
    });

    app.service('dummy').hooks({
      before: taskLog({name: 'taskLog', action: 'Created by'})
    });
    //taskLog({name: 'taskLog', action: 'Created by'}),

    assert.ok(app.service('dummy'));
  });

  it('runs the hook', async () => {
    let mockContextData = {
      log: []
    };
    //var result[] = [];

    let result = await app.service('dummy').create(mockContextData);

    //assert.ok(result.log);
    assert.equal(result.log.length, 1);
  });
});
