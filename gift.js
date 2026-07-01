// ==========================================
// VIVY GIFT SYSTEM v1
// ==========================================

const GIFTS = [

{
id:1,
name:"Rose",
coins:100,
emoji:"🌹"
},

{
id:2,
name:"Heart",
coins:300,
emoji:"❤️"
},

{
id:3,
name:"Coffee",
coins:500,
emoji:"☕"
},

{
id:4,
name:"Cake",
coins:1000,
emoji:"🎂"
},

{
id:5,
name:"Teddy",
coins:2000,
emoji:"🧸"
},

{
id:6,
name:"Diamond",
coins:5000,
emoji:"💎"
},

{
id:7,
name:"Sports Car",
coins:10000,
emoji:"🏎️"
},

{
id:8,
name:"Private Jet",
coins:50000,
emoji:"✈️"
}

];

// ==============================
// Show Gifts
// ==============================

function loadGifts(){

console.table(GIFTS);

}

// ==============================
// Send Gift
// ==============================

async function sendGift(hostUid,giftId){

const gift=GIFTS.find(g=>g.id===giftId);

if(!gift){

alert("Gift not found.");

return;

}

const success=await deductCoins(gift.coins);

if(!success) return;

// Credit Host

const ref=window.doc(window.db,"hosts",hostUid);

const snap=await window.getDoc(ref);

if(!snap.exists()) return;

const host=snap.data();

await window.updateDoc(ref,{

totalCoins:(host.totalCoins||0)+gift.coins

});

// Credit Agency

if(host.agencyId){

const agencyRef=window.doc(window.db,"agencies",host.agencyId);

const agencySnap=await window.getDoc(agencyRef);

if(agencySnap.exists()){

const agency=agencySnap.data();

await window.updateDoc(agencyRef,{

totalCoins:(agency.totalCoins||0)+gift.coins

});

}

}

await window.setDoc(

window.doc(

window.db,

"giftHistory",

Date.now().toString()

),

{

hostUid:hostUid,

gift:gift.name,

coins:gift.coins,

sender:window.auth.currentUser.uid,

createdAt:new Date().toISOString()

}

);

alert(

gift.emoji+

" "+gift.name+

" Sent!"

);

}

window.loadGifts=loadGifts;

window.sendGift=sendGift;
