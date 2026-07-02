import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const balanceText = document.getElementById("coinBalance");
const packageContainer = document.getElementById("packageContainer");
const transactionContainer = document.getElementById("transactionContainer");

// Wait until Firebase Auth is ready
onAuthStateChanged(auth, async (user) => {

    if (!user) {
        location.href = "login.html";
        return;
    }

    await loadWallet(user.uid);
    await loadPackages();
    await loadTransactions(user.uid);

});

// ==========================
// Load Wallet Balance
// ==========================

async function loadWallet(uid) {

    const walletRef = doc(db, "wallets", uid);
    const walletSnap = await getDoc(walletRef);

    if (walletSnap.exists()) {

        balanceText.innerText = walletSnap.data().coins || 0;

    } else {

        balanceText.innerText = "0";

    }

}

// ==========================
// Load Coin Packages
// ==========================

async function loadPackages() {

    packageContainer.innerHTML = "";

    const snapshot = await getDocs(collection(db, "coinPackages"));

    snapshot.forEach((docSnap) => {

        const pack = docSnap.data();

        if (!pack.active) return;

        packageContainer.innerHTML += `

        <div class="packageCard">

            <h3>${pack.coins + (pack.bonus || 0)} Coins</h3>

            <p class="price">$${pack.price}</p>

            <small>Bonus: ${pack.bonus || 0} Coins</small>

            <br><br>

            <button onclick="buyPackage('${docSnap.id}')">
                Buy Now
            </button>

        </div>

        `;

    });

}

// ==========================
// Load Transaction History
// ==========================

async function loadTransactions(uid) {

    transactionContainer.innerHTML = "";

    const q = query(
        collection(db, "transactions"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc"),
        limit(10)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

        transactionContainer.innerHTML =
            "<p>No transactions yet.</p>";

        return;

    }

    snapshot.forEach((docSnap) => {

        const tx = docSnap.data();

        transactionContainer.innerHTML += `

        <div class="transaction">

            <b>${tx.type}</b><br>

            🪙 ${tx.coins} Coins<br>

            💵 $${tx.amount}<br>

            ✅ ${tx.status}

        </div>

        `;

    });

}

// ==========================
// Buy Coin Package
// ==========================

window.buyPackage = async function(packageId) {

    const packageRef = doc(db, "coinPackages", packageId);

    const packageSnap = await getDoc(packageRef);

    if (!packageSnap.exists()) {

        alert("Package not found.");

        return;

    }

    const pack = packageSnap.data();

    // Open Paystack payment
    window.payWithPaystack(pack);

};
