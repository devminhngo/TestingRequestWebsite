
// eslint-disable-next-line no-unused-vars
module.exports = ({ name }) => {
  return async context => {
    const service = context.app.service('tasks');
    const id = context.id;
    const action = context.data.status;
    let { log } = await service.get(id);

    const status = `The task was ${action} on ${Date()} by jdoe#10000`;
    log.push(status);
    context.data.log = log;
    return context;
  };
};