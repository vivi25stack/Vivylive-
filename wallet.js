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

const user = auth.currentUser;

async function loadWallet() {

    if (!user) return;

    const walletRef = doc(db, "wallets", user.uid);
    const walletSnap = await getDoc(walletRef);

    if (walletSnap.exists()) {

        const wallet = walletSnap.data();

        balanceText.innerText = wallet.coins || 0;

    } else {

        balanceText.innerText = "0";

    }

}

async function loadPackages() {

    packageContainer.innerHTML = "";

    const snapshot = await getDocs(collection(db, "coinPackages"));

    snapshot.forEach((docSnap) => {

        const pack = docSnap.data();

        if (!pack.active) return;

        packageContainer.innerHTML += `

        <div class="packageCard"
        onclick="buyPackage('${docSnap.id}')">

            <h3>${pack.coins + pack.bonus} Coins</h3>

            <p class="price">$${pack.price}</p>

            <small>Bonus: ${pack.bonus}</small>

        </div>

        `;

    });

}

async function loadTransactions() {

    transactionContainer.innerHTML = "";

    const q = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(10)
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((docSnap) => {

        const tx = docSnap.data();

        transactionContainer.innerHTML += `

        <div class="transaction">

            <b>${tx.type}</b><br>

            ${tx.coins} Coins<br>

            ${tx.status}

        </div>

        `;

    });

}

window.buyPackage = function(packageId){

    alert("Selected Package: " + packageId);

    // Next step:
    // Launch Paystack or Flutterwave
};

loadWallet();
loadPackages();
loadTransactions();
