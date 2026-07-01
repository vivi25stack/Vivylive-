// ===================================
// VIVY WALLET SYSTEM v1
// ===================================

const COINS_PER_DOLLAR = 1000;
const MIN_WITHDRAW_USD = 10;

async function getCurrentUserData() {

    const user = window.auth.currentUser;

    if (!user) return null;

    const ref = window.doc(window.db, "users", user.uid);

    const snap = await window.getDoc(ref);

    if (!snap.exists()) return null;

    return snap.data();

}

async function addCoins(coins) {

    const user = window.auth.currentUser;

    if (!user) return;

    const ref = window.doc(window.db, "users", user.uid);

    const snap = await window.getDoc(ref);

    const balance = (snap.data().coins || 0) + coins;

    await window.updateDoc(ref, {

        coins: balance

    });

    updateWalletUI(balance);

}

async function deductCoins(coins) {

    const user = window.auth.currentUser;

    if (!user) return false;

    const ref = window.doc(window.db, "users", user.uid);

    const snap = await window.getDoc(ref);

    let balance = snap.data().coins || 0;

    if (balance < coins) {

        alert("Insufficient coins.");

        return false;

    }

    balance -= coins;

    await window.updateDoc(ref, {

        coins: balance

    });

    updateWalletUI(balance);

    return true;

}

function updateWalletUI(balance) {

    const coin = document.getElementById("coinBalance");

    if (coin)

        coin.innerText = balance;

}

function coinsToDollar(coins) {

    return coins / COINS_PER_DOLLAR;

}

function dollarToCoins(dollar) {

    return dollar * COINS_PER_DOLLAR;

}

function canWithdraw(coins) {

    return coinsToDollar(coins) >= MIN_WITHDRAW_USD;

}

async function requestWithdrawal(usdtAddress) {

    const user = await getCurrentUserData();

    if (!user) return;

    if (user.accountType !== "agency") {

        alert("Only Agencies can withdraw.");

        return;

    }

    if (!canWithdraw(user.coins)) {

        alert("Minimum withdrawal is $10.");

        return;

    }

    const withdrawal = {

        uid: window.auth.currentUser.uid,

        amountCoins: user.coins,

        amountUSD: coinsToDollar(user.coins),

        usdt: usdtAddress,

        status: "Pending",

        createdAt: new Date().toISOString()

    };

    const id = Date.now().toString();

    await window.setDoc(

        window.doc(window.db, "withdrawals", id),

        withdrawal

    );

    alert("Withdrawal request sent to Admin.");

}

async function loadWallet() {

    const user = await getCurrentUserData();

    if (!user) return;

    updateWalletUI(user.coins);

}

window.addCoins = addCoins;
window.deductCoins = deductCoins;
window.loadWallet = loadWallet;
window.requestWithdrawal = requestWithdrawal;
window.coinsToDollar = coinsToDollar;
window.dollarToCoins = dollarToCoins;
