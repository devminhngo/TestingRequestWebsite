/* eslint-disable no-unused-vars */
const { Client } = require('ldapts');
const url = 'ldap://ldap.imjustatech.com:389';
const admin = 'cn=admin,dc=example,dc=org';
const bindDN = 'ou=users,dc=example,dc=org';
const groupsDN = 'ou=groups,dc=example,dc=org';
const password = 'admin';

class Service {
  constructor (config) {
    this.client = new Client({
      url,
    });
    this.id = 'uid';
  }

  setup(app) {
    this.app = app;
  }

  async find (params) {
    await this.client.bind(admin, password);

    const { searchEntries } = await this.client.search(bindDN, {
      scope: 'one',
      attributes: ['cn', 'uid', 'uidnumber', 'gidNumber'],
    });
    
    await this.client.unbind();
    return searchEntries;
  }

  async get (id, params) {
    await this.client.bind(admin, password);
    const { searchEntries } = await this.client.search(`${bindDN}`, {
      scope: 'one',
      filter: `uid=${id}`,
      attributes: ['cn', 'uid', 'uidnumber', 'gidNumber', 'userPassword'],
    });
    let user = searchEntries[0];
    const { searchEntries: groupEntries } = await this.client.search(`${groupsDN}`, {
      scope: 'one',
      attributes: ['memberuid', 'cn'],
    });
    user.groups = [];
    groupEntries.forEach(function (result) {
      if (result.memberUid.includes(user.uid)) {
        user.groups.push(result.cn);
      }
    });
    await this.client.unbind();
    return user;
  }
}

module.exports = function () {
  return new Service();
};

module.exports.Service = Service;
