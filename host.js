// ==========================================
// VIVY HOST DASHBOARD
// ==========================================

async function loadHostDashboard() {

    const user = window.auth.currentUser;

    if (!user) return;

    const ref = window.doc(window.db, "hosts", user.uid);

    const snap = await window.getDoc(ref);

    if (!snap.exists()) {

        alert("Host profile not found.");

        return;

    }

    const host = snap.data();

    const totalCoins = host.totalCoins || 0;
    const totalCalls = host.totalCalls || 0;
    const totalMinutes = host.totalMinutes || 0;
    const totalGifts = host.totalGifts || 0;
    const rating = host.rating || 5;

    document.getElementById("hostCoins").innerText = totalCoins;

    document.getElementById("todayCoins").innerText =
        (host.todayCoins || 0) + " Coins";

    document.getElementById("todayUSD").innerText =
        ((host.todayCoins || 0) / 1000).toFixed(2);

    document.getElementById("weeklyCoins").innerText =
        (host.weeklyCoins || 0) + " Coins";

    document.getElementById("monthlyCoins").innerText =
        (host.monthlyCoins || 0) + " Coins";

    document.getElementById("totalCoins").innerText =
        totalCoins + " Coins";

    document.getElementById("totalCalls").innerText =
        totalCalls;

    document.getElementById("minutes").innerText =
        totalMinutes;

    document.getElementById("giftCount").innerText =
        totalGifts;

    document.getElementById("rating").innerText =
        rating.toFixed(1);

    document.getElementById("hostLevel").innerText =
        calculateLevel(totalCoins);

    document.getElementById("onlineSwitch").checked =
        host.status === "online";

}

function calculateLevel(coins){

    if(coins>=5000000) return "Elite";

    if(coins>=2000000) return "Diamond";

    if(coins>=1000000) return "Platinum";

    if(coins>=500000) return "Gold";

    if(coins>=100000) return "Silver";

    return "Bronze";

}

async function toggleOnline(){

    const user = window.auth.currentUser;

    if(!user) return;

    const status = document.getElementById("onlineSwitch").checked
        ? "online"
        : "offline";

    await window.updateDoc(

        window.doc(window.db,"hosts",user.uid),

        {

            status:status

        }

    );

}

window.addEventListener("load",()=>{

    window.onAuthStateChanged(window.auth,user=>{

        if(user){

            loadHostDashboard();

        }

    });

});

document.addEventListener("change",(e)=>{

    if(e.target.id==="onlineSwitch"){

        toggleOnline();

    }

});
