                          // ================================
// VIVY CALL SYSTEM v1
// ================================

let currentCall = null;
let timer = null;
let seconds = 0;

const COINS_PER_INTERVAL = 200;
const INTERVAL = 30;

function startVideoCall(hostId){

    currentCall={
        hostId:hostId,
        type:"video"
    };

    seconds=0;

    alert("Connecting Video Call...");

    timer=setInterval(callTimer,1000);

}

function startAudioCall(hostId){

    currentCall={
        hostId:hostId,
        type:"audio"
    };

    seconds=0;

    alert("Connecting Audio Call...");

    timer=setInterval(callTimer,1000);

}

async function callTimer(){

    seconds++;

    console.log("Call Time:",seconds);

    if(seconds % INTERVAL===0){

        await deductCoins(COINS_PER_INTERVAL);

    }

}

async function deductCoins(amount){

    const user=window.auth.currentUser;

    if(!user) return;

    const ref=window.doc(window.db,"users",user.uid);

    const snap=await window.getDoc(ref);

    if(!snap.exists()) return;

    const data=snap.data();

    let balance=data.coins||0;

    if(balance<amount){

        alert("Insufficient Coins");

        endCall();

        return;

    }

    balance-=amount;

    await window.updateDoc(ref,{
        coins:balance
    });

    document.getElementById("coinBalance").innerText=balance;

    console.log(amount+" Coins Deducted");

}

function endCall(){

    clearInterval(timer);

    timer=null;

    seconds=0;

    currentCall=null;

    alert("Call Ended");

}
