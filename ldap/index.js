const { auth, groups } = require('./app');

(async function(username, password) {
    let user1 = await auth('otovar', 'password');
    let groupList = await groups();
    let groupsSet = new Object();
    for (let i = 1; i < groupList.length; i++) {
        let entry = groupList[i];
        let name = entry.cn;
        groupsSet[name] = new Object();
        groupsSet[name].gid = entry.gidNumber;
        groupsSet[name].members = entry.memberUid;
    }
    console.log(JSON.stringify(user1, null, 2));
    console.log(JSON.stringify(groupsSet, null, 2));
    for (let group in groupsSet) {
        name = group;
        group = groupsSet[group];
        if (group.members === user1.uid || group.members.includes(user1.uid)) {
            console.log(`${user1.uid} is part of ` + name);
        } 
    }
})();