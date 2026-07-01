// =========================================
// VIVY AI MODERATION SYSTEM v1
// =========================================

const AI = {

warningCoins: 500,

blockedWords: [

"whatsapp",
"telegram",
"t.me",
"instagram",
"snapchat",
"wechat",
"imo",
"line",
"kakao",
"discord",
"facebook",
"messenger",
"gmail",
"hotmail",
"yahoo",
"paypal",
"cashapp",
"venmo",
"bitcoin",
"btc",
"ethereum",
"eth",
"usdt",
"bank",
"account number",
"sort code",
"swift",
"iban"

],

phoneRegex:/(\+?\d[\d\s-]{7,}\d)/g,

emailRegex:/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/ig

};

async function moderateMessage(message){

let text=message.toLowerCase();

let violations=[];

// Blocked words

AI.blockedWords.forEach(word=>{

if(text.includes(word)){

violations.push(word);

}

});

// Phone Number

if(AI.phoneRegex.test(text)){

violations.push("Phone Number");

}

// Email

if(AI.emailRegex.test(text)){

violations.push("Email Address");

}

if(violations.length>0){

await punishUser(violations,message);

return false;

}

return true;

}

async function punishUser(violations,message){

const user=window.auth.currentUser;

if(!user) return;

const ref=window.doc(window.db,"users",user.uid);

const snap=await window.getDoc(ref);

if(!snap.exists()) return;

const data=snap.data();

let balance=data.coins||0;

balance=Math.max(0,balance-AI.warningCoins);

await window.updateDoc(ref,{

coins:balance,

lastViolation:new Date().toISOString(),

lastMessage:message,

violationList:violations,

flagged:true

});

const coin=document.getElementById("coinBalance");

if(coin){

coin.innerText=balance;

}

await window.setDoc(

window.doc(

window.db,

"violations",

Date.now().toString()

),

{

uid:user.uid,

email:data.email,

name:data.name,

message:message,

violations:violations,

coinsDeducted:AI.warningCoins,

createdAt:new Date().toISOString()

}

);

alert(

"⚠️ Warning\n\nSharing contact information or payment details is not allowed.\n\n500 coins have been deducted."

);

}

async function sendMessage(text){

const safe=await moderateMessage(text);

if(!safe){

return;

}

console.log("Message Sent:",text);

}

window.sendMessage=sendMessage;
window.moderateMessage=moderateMessage;
