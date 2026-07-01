// ==========================================
// VIVY BLOCK SYSTEM (FINAL)
// ==========================================

async function blockUser(blockedUid){

const user=window.auth.currentUser;

if(!user){

alert("Please login.");

return;

}

if(user.uid===blockedUid){

alert("You cannot block yourself.");

return;

}

const blockId=user.uid+"_"+blockedUid;

const ref=window.doc(window.db,"blocks",blockId);

const snap=await window.getDoc(ref);

if(snap.exists()){

alert("User already blocked.");

return;

}

await window.setDoc(ref,{

userUid:user.uid,

blockedUid:blockedUid,

createdAt:new Date().toISOString()

});

alert("🚫 User Blocked");

}

async function unblockUser(blockedUid){

const user=window.auth.currentUser;

if(!user) return;

const blockId=user.uid+"_"+blockedUid;

const ref=window.doc(window.db,"blocks",blockId);

const snap=await window.getDoc(ref);

if(!snap.exists()) return;

await window.deleteDoc(ref);

alert("✅ User Unblocked");

}

async function isBlocked(uid){

const user=window.auth.currentUser;

if(!user) return false;

const ref=window.doc(

window.db,

"blocks",

user.uid+"_"+uid

);

const snap=await window.getDoc(ref);

return snap.exists();

}

async function canMessage(uid){

const blocked=await isBlocked(uid);

return !blocked;

}

async function canCall(uid){

const blocked=await isBlocked(uid);

return !blocked;

}

async function loadBlockedUsers(){

const user=window.auth.currentUser;

if(!user) return [];

const snapshot=await window.getDocs(

window.collection(window.db,"blocks")

);

const blocked=[];

snapshot.forEach(doc=>{

const data=doc.data();

if(data.userUid===user.uid){

blocked.push(data.blockedUid);

}

});

return blocked;

}

window.blockUser=blockUser;
window.unblockUser=unblockUser;
window.isBlocked=isBlocked;
window.canMessage=canMessage;
window.canCall=canCall;
window.loadBlockedUsers=loadBlockedUsers;
