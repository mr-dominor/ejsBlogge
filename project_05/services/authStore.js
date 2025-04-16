const sessionToId = new Map();

function setUser(id,user){
    sessionToId.set(id,user);
}

function getUser(id){
    return sessionToId.get(id);
}

export {setUser, getUser}