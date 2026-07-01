// ==========================================
// VIVY FOLLOW SYSTEM (FINAL)
// ==========================================

async function followHost(hostUid){

const user=window.auth.currentUser;

if(!user){

alert("Please login.");

return;

}

const followId=user.uid+"_"+hostUid;

const ref=window.doc(window.db,"follows",followId);

const snap=await window.getDoc(ref);

if(snap.exists()){

alert("Already following this host.");

return;

}

await window.setDoc(ref,{

userUid:user.uid,

hostUid:hostUid,

createdAt:new Date().toISOString()

});

const hostRef=window.doc(window.db,"hosts",hostUid);

const hostSnap=await window.getDoc(hostRef);

if(hostSnap.exists()){

const host=hostSnap.data();

await window.updateDoc(hostRef,{

followers:(host.followers||0)+1

});

}

alert("❤️ Host Followed");

}

async function unfollowHost(hostUid){

const user=window.auth.currentUser;

if(!user) return;

const followId=user.uid+"_"+hostUid;

const ref=window.doc(window.db,"follows",followId);

const snap=await window.getDoc(ref);

if(!snap.exists()) return;

await window.deleteDoc(ref);

const hostRef=window.doc(window.db,"hosts",hostUid);

const hostSnap=await window.getDoc(hostRef);

if(hostSnap.exists()){

const host=hostSnap.data();

await window.updateDoc(hostRef,{

followers:Math.max((host.followers||1)-1,0)

});

}

alert("Follow Removed");

}

async function isFollowing(hostUid){

const user=window.auth.currentUser;

if(!user) return false;

const followId=user.uid+"_"+hostUid;

const ref=window.doc(window.db,"follows",followId);

const snap=await window.getDoc(ref);

return snap.exists();

}

async function loadFollowing(){

const user=window.auth.currentUser;

if(!user) return [];

const snapshot=await window.getDocs(

window.collection(window.db,"follows")

);

let list=[];

snapshot.forEach(doc=>{

const data=doc.data();

if(data.userUid===user.uid){

list.push(data.hostUid);

}

});

return list;

}

window.followHost=followHost;
window.unfollowHost=unfollowHost;
window.isFollowing=isFollowing;
window.loadFollowing=loadFollowing;
