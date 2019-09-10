module.exports = function () {

  return async function(context) {
    let action = context.data.status;
    let id = context.id;
    // let uid = context.params.payload.uid;
    // let uname = context.params.payload.uname;
    let uid = 1337;
    let uname = 'jdoe';

    const io = context.app.io;
    const tasks = context.app.service('tasks');
    const { testContact } = await tasks.get(id);
    const notifications = context.app.service('notifications');
    const data = {user: uname + ' ' + uid, message: `Task ID ${id} has been ${action}.`};

    io.emit('Test Event', data);
    data.user = testContact;
    notifications.create(data);

    return context;

  };
};
