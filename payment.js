// ==========================================
// VIVY PAYMENT SYSTEM v1
// Paystack + Flutterwave
// ==========================================

const PAYMENT = {

COINS_PER_DOLLAR:1000,

PAYSTACK_PUBLIC_KEY:"",

FLUTTERWAVE_PUBLIC_KEY:"",

CURRENCY:"USD"

};

// =========================
// BUY COINS
// =========================

async function buyCoins(method,dollarAmount){

const user=window.auth.currentUser;

if(!user){

alert("Please login.");

return;

}

const coins=dollarAmount*PAYMENT.COINS_PER_DOLLAR;

if(method==="paystack"){

payWithPaystack(dollarAmount,coins);

return;

}

if(method==="flutterwave"){

payWithFlutterwave(dollarAmount,coins);

return;

}

}

// =========================
// PAYSTACK
// =========================

function payWithPaystack(amount,coins){

if(PAYMENT.PAYSTACK_PUBLIC_KEY===""){

alert("Paystack key not added.");

return;

}

alert(

"Paystack Payment\n\n$"+amount+

"\n\nCoins: "+coins

);

// Paystack integration here

}

// =========================
// FLUTTERWAVE
// =========================

function payWithFlutterwave(amount,coins){

if(PAYMENT.FLUTTERWAVE_PUBLIC_KEY===""){

alert("Flutterwave key not added.");

return;

}

alert(

"Flutterwave Payment\n\n$"+amount+

"\n\nCoins: "+coins

);

// Flutterwave integration here

}

// =========================
// PAYMENT SUCCESS
// =========================

async function paymentSuccessful(coins){

const user=window.auth.currentUser;

if(!user) return;

const ref=window.doc(window.db,"users",user.uid);

const snap=await window.getDoc(ref);

if(!snap.exists()) return;

const data=snap.data();

const balance=(data.coins||0)+coins;

await window.updateDoc(ref,{

coins:balance

});

const wallet=document.getElementById("coinBalance");

if(wallet){

wallet.innerText=balance;

}

alert(coins+" Coins Added");

}

// =========================
// PAYMENT FAILED
// =========================

function paymentFailed(){

alert("Payment Failed");

}

// =========================
// ADMIN CREDIT
// =========================

async function adminCredit(uid,coins){

const ref=window.doc(window.db,"users",uid);

const snap=await window.getDoc(ref);

if(!snap.exists()) return;

const data=snap.data();

await window.updateDoc(ref,{

coins:(data.coins||0)+coins

});

}

// =========================

window.buyCoins=buyCoins;

window.paymentSuccessful=paymentSuccessful;

window.paymentFailed=paymentFailed;

window.adminCredit=adminCredit;
