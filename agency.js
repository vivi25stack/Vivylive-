// ==================================
// VIVY AGENCY SYSTEM v1
// ==================================

const MIN_WITHDRAW_USD = 10;
const COINS_PER_DOLLAR = 1000;

async function applyAsAgency(agencyName, invitationCode) {

    const user = window.auth.currentUser;

    if (!user) {
        alert("Please login first.");
        return;
    }

    const agency = {
        uid: user.uid,
        agencyName: agencyName,
        invitationCode: invitationCode,
        approved: false,
        hosts: 0,
        totalCoins: 0,
        totalPaidUSD: 0,
        createdAt: new Date().toISOString()
    };

    await window.setDoc(
        window.doc(window.db, "agencies", user.uid),
        agency
    );

    alert("Agency application submitted. Waiting for Admin approval.");

}

async function joinAgency(invitationCode) {

    const user = window.auth.currentUser;

    if (!user) return;

    const agencies = await window.getDocs(
        window.collection(window.db, "agencies")
    );

    let found = false;

    agencies.forEach(async(docSnap) => {

        const agency = docSnap.data();

        if (
            agency.invitationCode === invitationCode &&
            agency.approved
        ) {

            await window.updateDoc(
                window.doc(window.db, "hosts", user.uid),
                {
                    agencyId: agency.uid,
                    agencyName: agency.agencyName
                }
            );

            await window.updateDoc(
                window.doc(window.db, "agencies", agency.uid),
                {
                    hosts: (agency.hosts || 0) + 1
                }
            );

            found = true;

            alert("Agency joined successfully.");

        }

    });

    if (!found) {

        alert("Invalid invitation code.");

    }

}

async function creditAgencyCoins(agencyId, coins) {

    const ref = window.doc(window.db, "agencies", agencyId);

    const snap = await window.getDoc(ref);

    if (!snap.exists()) return;

    const agency = snap.data();

    await window.updateDoc(ref, {

        totalCoins: (agency.totalCoins || 0) + coins

    });

}

async function requestAgencyWithdrawal(usdtAddress) {

    const user = window.auth.currentUser;

    if (!user) return;

    const ref = window.doc(window.db, "agencies", user.uid);

    const snap = await window.getDoc(ref);

    if (!snap.exists()) {

        alert("Agency not found.");

        return;

    }

    const agency = snap.data();

    const usd = agency.totalCoins / COINS_PER_DOLLAR;

    if (usd < MIN_WITHDRAW_USD) {

        alert("Minimum withdrawal is $10.");

        return;

    }

    const request = {

        agencyId: user.uid,
        agencyName: agency.agencyName,
        coins: agency.totalCoins,
        usd: usd,
        usdtAddress: usdtAddress,
        status: "Pending",
        createdAt: new Date().toISOString()

    };

    await window.setDoc(

        window.doc(window.db, "agencyWithdrawals", Date.now().toString()),

        request

    );

    alert("Withdrawal request sent to Admin.");

}

window.applyAsAgency = applyAsAgency;
window.joinAgency = joinAgency;
window.creditAgencyCoins = creditAgencyCoins;
window.requestAgencyWithdrawal = requestAgencyWithdrawal;
