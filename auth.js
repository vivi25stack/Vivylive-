document.addEventListener("DOMContentLoaded", () => {

const loginScreen = document.getElementById("loginScreen");
const registerScreen = document.getElementById("registerScreen");
const homeScreen = document.getElementById("homeScreen");

const loginBtn = document.getElementById("loginBtn");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const registerBtn = document.getElementById("registerBtn");
const backLoginBtn = document.getElementById("backLoginBtn");

// Show Register
showRegisterBtn.onclick = () => {
    loginScreen.classList.add("hidden");
    registerScreen.classList.remove("hidden");
};

// Back to Login
backLoginBtn.onclick = () => {
    registerScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
};

// Register
registerBtn.onclick = async () => {

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const type = document.getElementById("accountType").value;

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const result = await window.createUserWithEmailAndPassword(
            window.auth,
            email,
            password
        );

        const uid = result.user.uid;

        // User document
        await window.setDoc(
            window.doc(window.db, "users", uid),
            {
                uid: uid,
                name: name,
                email: email,
                accountType: type,
                avatar: "images/default-avatar.png",
                coins: 0,
                approved: type === "user",
                createdAt: Date.now()
            }
        );

        // Wallet document
        await window.setDoc(
            window.doc(window.db, "wallets", uid),
            {
                coins: 0,
                totalPurchased: 0,
                totalSpent: 0,
                createdAt: Date.now()
            }
        );

        alert("Registration Successful!");

    } catch (error) {

        alert(error.message);

    }

};

// Login
loginBtn.onclick = async () => {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Enter email and password.");
        return;
    }

    try {

        await window.signInWithEmailAndPassword(
            window.auth,
            email,
            password
        );

    } catch (error) {

        alert(error.message);

    }

};

// Auth State
window.onAuthStateChanged(window.auth, async (user) => {

    if (user) {

        loginScreen.classList.add("hidden");
        registerScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");

        const userRef = window.doc(window.db, "users", user.uid);
        const snap = await window.getDoc(userRef);

        if (snap.exists()) {

            const data = snap.data();

            document.getElementById("coinBalance").innerText = data.coins || 0;

        }

    } else {

        homeScreen.classList.add("hidden");
        registerScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");

    }

});

});
