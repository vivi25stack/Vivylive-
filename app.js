document.addEventListener("DOMContentLoaded", () => {

const walletBtn = document.getElementById("walletBtn");
const navHome = document.getElementById("navHome");
const navMessages = document.getElementById("navMessages");
const navCalls = document.getElementById("navCalls");
const navProfile = document.getElementById("navProfile");

walletBtn.addEventListener("click", () => {
    alert("Wallet page coming soon.");
});

navHome.addEventListener("click", () => {
    alert("Home");
});

navMessages.addEventListener("click", () => {
    alert("Messages coming soon.");
});

navCalls.addEventListener("click", () => {
    alert("Call History coming soon.");
});

navProfile.addEventListener("click", async () => {

    const user = window.auth.currentUser;

    if (!user) return;

    const snap = await window.getDoc(
        window.doc(window.db, "users", user.uid)
    );

    if (!snap.exists()) {
        alert("Profile not found.");
        return;
    }

    const data = snap.data();

    alert(
`Name: ${data.name}

Email: ${data.email}

Account: ${data.accountType}

Coins: ${data.coins}

Approved: ${data.approved ? "Yes" : "Pending"}`
    );

});

const videoButtons = document.querySelectorAll(".callButton");

videoButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert("Video Calling will use ZEGOCLOUD.");

    });

});

const audioButtons = document.querySelectorAll(".audioButton");

audioButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert("Audio Calling will use ZEGOCLOUD.");

    });

});

});
