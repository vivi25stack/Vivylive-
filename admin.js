// =======================================
// VIVY ADMIN SYSTEM v1
// =======================================

const ADMIN_EMAIL = "admin@vivy.com";

async function isAdmin() {

    const user = window.auth.currentUser;

    if (!user) return false;

    return user.email === ADMIN_EMAIL;

}

// =========================
// APPROVE HOST
// =========================

async function approveHost(hostUid) {

    if (!(await isAdmin())) return;

    await window.updateDoc(
        window.doc(window.db, "hosts", hostUid),
        {
            approved: true,
            status: "offline"
        }
    );

    await window.updateDoc(
        window.doc(window.db, "users", hostUid),
        {
            approved: true
        }
    );

    alert("Host Approved.");

}

// =========================
// REJECT HOST
// =========================

async function rejectHost(hostUid) {

    if (!(await isAdmin())) return;

    await window.updateDoc(
        window.doc(window.db, "hosts", hostUid),
        {
            approved: false
        }
    );

    alert("Host Rejected.");

}

// =========================
// APPROVE AGENCY
// =========================

async function approveAgency(agencyUid) {

    if (!(await isAdmin())) return;

    await window.updateDoc(
        window.doc(window.db, "agencies", agencyUid),
        {
            approved: true
        }
    );

    alert("Agency Approved.");

}

// =========================
// REJECT AGENCY
// =========================

async function rejectAgency(agencyUid) {

    if (!(await isAdmin())) return;

    await window.updateDoc(
        window.doc(window.db, "agencies", agencyUid),
        {
            approved: false
        }
    );

    alert("Agency Rejected.");

}

// =========================
// PAY AGENCY
// =========================

async function payAgency(agencyUid, usdAmount, txHash) {

    if (!(await isAdmin())) return;

    const ref = window.doc(window.db, "agencies", agencyUid);

    const snap = await window.getDoc(ref);

    if (!snap.exists()) return;

    const agency = snap.data();

    await window.updateDoc(ref, {

        totalCoins: 0,

        totalPaidUSD:
            (agency.totalPaidUSD || 0) + usdAmount

    });

    await window.setDoc(

        window.doc(
            window.db,
            "payroll",
            Date.now().toString()
        ),

        {

            agencyId: agencyUid,

            agencyName: agency.agencyName,

            amountUSD: usdAmount,

            transactionHash: txHash,

            paidAt: new Date().toISOString()

        }

    );

    alert("Agency Paid Successfully.");

}

// =========================
// DASHBOARD STATS
// =========================

async function adminStats() {

    if (!(await isAdmin())) return;

    const hosts =
        await window.getDocs(
            window.collection(window.db, "hosts")
        );

    const agencies =
        await window.getDocs(
            window.collection(window.db, "agencies")
        );

    const withdrawals =
        await window.getDocs(
            window.collection(window.db, "agencyWithdrawals")
        );

    console.log("Hosts:", hosts.size);

    console.log("Agencies:", agencies.size);

    console.log("Withdrawals:", withdrawals.size);

}

window.approveHost = approveHost;
window.rejectHost = rejectHost;

window.approveAgency = approveAgency;
window.rejectAgency = rejectAgency;

window.payAgency = payAgency;

window.adminStats = adminStats;
