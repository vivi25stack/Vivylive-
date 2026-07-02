import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const grid=document.getElementById("giftGrid");

async function loadGifts(){

const snapshot=await getDocs(collection(db,"gifts"));

grid.innerHTML="";

snapshot.forEach(doc=>{

const gift=doc.data();

grid.innerHTML+=`

<div class="giftCard"

onclick="sendGift('${doc.id}')">

<div class="giftEmoji">${gift.emoji}</div>

<div class="giftName">${gift.name}</div>

<div class="giftCoins">🪙 ${gift.coins}</div>

</div>

`;

});

}

window.sendGift=async(id)=>{

alert("Gift Selected : "+id);

// Next upgrade:
// deduct wallet
// add host earnings
// agency earnings
// leaderboard
// animation

}

loadGifts();
