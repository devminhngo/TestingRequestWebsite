const { Client } = require('ldapts');
 
const url = 'ldap://ldap.imjustatech.com:389';
const admin = 'cn=admin,dc=example,dc=org';
const bindDN = 'ou=users,dc=example,dc=org';
const password = 'admin';

const client = new Client({
    url,
});

/*
 * searchDN - the distinguished name for which we would like to search for
 */
async function auth(username, pass) {
    try {
        await client.bind(admin, password);
        const {
          searchEntries,
        } = await client.search('ou=users,dc=example,dc=org', {
            scope: 'sub',
            filter: `(uid=${username})`,
        });
        await client.unbind();
        let user = await searchEntries[0];
        username = user.cn;
        await client.bind(`cn=${username},${bindDN}`, pass);
        await client.unbind();
        return user; 
    } catch (error) {
        await client.unbind();
        throw error;
    }
}

async function groups() {
    await client.bind(admin, password);
    const { searchEntries } = await client.search('ou=groups,dc=example,dc=org', {
        scope: 'sub',
    });
    await client.unbind();
    return searchEntries;
}

module.exports = {
    auth,
    groups
};