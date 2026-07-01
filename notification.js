// ==========================================
// VIVY NOTIFICATION SYSTEM
// ==========================================

const NotificationSystem = {

enabled: false,

sound: new Audio(
"https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
)

};

// ===============================
// Request Permission
// ===============================

async function initializeNotifications(){

if(!("Notification" in window)){

console.log("Notifications not supported.");

return;

}

const permission=await Notification.requestPermission();

if(permission==="granted"){

NotificationSystem.enabled=true;

console.log("Notifications Enabled");

}

}

// ===============================
// Local Notification
// ===============================

function showNotification(title,message){

if(!NotificationSystem.enabled) return;

new Notification(title,{

body:message,

icon:"assets/logo.png",

badge:"assets/logo.png"

});

try{

NotificationSystem.sound.play();

}catch(e){

console.log(e);

}

}

// ===============================
// Incoming Call
// ===============================

function incomingCall(hostName,type){

showNotification(

"📞 Incoming "+type+" Call",

hostName+" is calling you."

);

}

// ===============================
// Missed Call
// ===============================

function missedCall(hostName){

showNotification(

"Missed Call",

"You missed a call from "+hostName

);

}

// ===============================
// Call Ended
// ===============================

function callEnded(){

showNotification(

"Call Ended",

"Thanks for using Vivy."

);

}

// ===============================
// Coins Deducted
// ===============================

function coinsDeducted(amount){

showNotification(

"Coins Deducted",

amount+" coins deducted."

);

}

// ===============================
// Wallet Recharge
// ===============================

function walletRecharge(amount){

showNotification(

"Wallet Updated",

amount+" coins added."

);

}

// ===============================
// AI Warning
// ===============================

function aiWarning(){

showNotification(

"AI Warning",

"Sharing contact information is prohibited."

);

}

// ===============================

window.initializeNotifications=initializeNotifications;

window.showNotification=showNotification;

window.incomingCall=incomingCall;

window.missedCall=missedCall;

window.callEnded=callEnded;

window.coinsDeducted=coinsDeducted;

window.walletRecharge=walletRecharge;

window.aiWarning=aiWarning;
