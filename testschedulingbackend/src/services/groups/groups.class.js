/* eslint-disable no-unused-vars */
const { Client } = require('ldapts');
const url = 'ldap://ldap.imjustatech.com:389';
const admin = 'cn=admin,dc=example,dc=org';
const bindDN = 'ou=groups,dc=example,dc=org';
const password = 'admin';

class Service {
  constructor (options) {
    this.client = new Client({
      url,
    });
    this.id = 'cn';
  }

  async find (params) {
    await this.client.bind(admin, password);

    const { searchEntries } = await this.client.search(bindDN, {
      scope: 'one',
      attributes: ['cn', 'gidNumber'],
    });

    await this.client.unbind();
    return searchEntries;
  }
  
}

module.exports = function () {
  return new Service();
};

module.exports.Service = Service;
