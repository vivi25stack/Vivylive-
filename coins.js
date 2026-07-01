// ==========================================
// VIVY COIN SYSTEM v1
// ==========================================

const COIN_SYSTEM = {

COINS_PER_DOLLAR:1000,

CALL_COST:200,

CALL_INTERVAL:30,

HOST_SHARE:70,

PLATFORM_SHARE:30

};

// ==============================
// Deduct Call Coins
// ==============================

async function deductCallCoins(hostUid){

const user=window.auth.currentUser;

if(!user) return false;

const userRef=window.doc(window.db,"users",user.uid);

const userSnap=await window.getDoc(userRef);

if(!userSnap.exists()) return false;

const userData=userSnap.data();

let balance=userData.coins||0;

if(balance<COIN_SYSTEM.CALL_COST){

alert("Insufficient Coins");

leaveCall();

return false;

}

balance-=COIN_SYSTEM.CALL_COST;

await window.updateDoc(userRef,{

coins:balance

});

document.getElementById("coinBalance").innerText=balance;

const hostCoins=Math.floor(

COIN_SYSTEM.CALL_COST*

COIN_SYSTEM.HOST_SHARE/100

);

await creditHost(hostUid,hostCoins);

return true;

}

// ==============================
// Credit Host
// ==============================

async function creditHost(hostUid,coins){

const ref=window.doc(window.db,"hosts",hostUid);

const snap=await window.getDoc(ref);

if(!snap.exists()) return;

const host=snap.data();

await window.updateDoc(ref,{

totalCoins:(host.totalCoins||0)+coins

});

if(host.agencyId){

await creditAgency(host.agencyId,coins);

}

}

// ==============================
// Credit Agency
// ==============================

async function creditAgency(agencyUid,coins){

const ref=window.doc(window.db,"agencies",agencyUid);

const snap=await window.getDoc(ref);

if(!snap.exists()) return;

const agency=snap.data();

await window.updateDoc(ref,{

totalCoins:(agency.totalCoins||0)+coins

});

}

// ==============================
// Convert Coins
// ==============================

function coinsToUSD(coins){

return coins/COIN_SYSTEM.COINS_PER_DOLLAR;

}

function usdToCoins(usd){

return usd*COIN_SYSTEM.COINS_PER_DOLLAR;

}

// ==============================

window.deductCallCoins=deductCallCoins;

window.creditHost=creditHost;

window.creditAgency=creditAgency;

window.coinsToUSD=coinsToUSD;

window.usdToCoins=usdToCoins;
