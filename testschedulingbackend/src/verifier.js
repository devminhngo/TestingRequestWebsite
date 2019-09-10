/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { Verifier } = require('@feathersjs/authentication-local');
const sha1 = require('node-forge').md.sha1;

class CustomVerifier extends Verifier {
  async verify(req, username, password, done) {
    const users = this.app.service('user');
    let user = await users.get(username);

    if (!user) {
      done(null, false, {});
    }
    let md = sha1.create();
    let hashedpw = md.update(password).digest().toHex();
    let buffer = Buffer.from(hashedpw, 'hex');
    hashedpw = '{SHA}' + buffer.toString('base64');

    if (user.userPassword != hashedpw) {
      done(null, false, {});
    }

    done(null, user, {
      uname: user.uid,
      uid: user.uidNumber,
      gid: user.gidNumber,
      groups: user.groups,
    });
  }
}

module.exports = {
  CustomVerifier,
};