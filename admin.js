// ==========================================
// VIVY ADMIN DASHBOARD
// ==========================================

async function loadAdminDashboard() {

    const users = await window.getDocs(
        window.collection(window.db, "users")
    );

    const hosts = await window.getDocs(
        window.collection(window.db, "hosts")
    );

    const agencies = await window.getDocs(
        window.collection(window.db, "agencies")
    );

    const withdrawals = await window.getDocs(
        window.collection(window.db, "agencyWithdrawals")
    );

    let totalCalls = 0;
    let totalRevenue = 0;
    let pendingWithdrawals = 0;

    document.getElementById("totalUsers").innerText = users.size;
    document.getElementById("totalHosts").innerText = hosts.size;
    document.getElementById("totalAgencies").innerText = agencies.size;

    // ==========================
    // HOST APPROVAL TABLE
    // ==========================

    const hostTable = document.getElementById("hostApprovalTable");
    hostTable.innerHTML = "";

    hosts.forEach(doc => {

        const host = doc.data();

        totalCalls += host.totalCalls || 0;
        totalRevenue += host.totalCoins || 0;

        hostTable.innerHTML += `

        <tr>

            <td>${host.displayName || "-"}</td>

            <td>${host.email || "-"}</td>

            <td>${host.approved ? "Approved" : "Pending"}</td>

            <td>

                <button onclick="approveHost('${doc.id}')">

                Approve

                </button>

            </td>

        </tr>

        `;

    });

    // ==========================
    // AGENCY APPROVAL TABLE
    // ==========================

    const agencyTable = document.getElementById("agencyApprovalTable");
    agencyTable.innerHTML = "";

    agencies.forEach(doc => {

        const agency = doc.data();

        agencyTable.innerHTML += `

        <tr>

            <td>${agency.agencyName || "-"}</td>

            <td>${agency.ownerName || "-"}</td>

            <td>${agency.approved ? "Approved" : "Pending"}</td>

            <td>

                <button onclick="approveAgency('${doc.id}')">

                Approve

                </button>

            </td>

        </tr>

        `;

    });

    // ==========================
    // WITHDRAWALS
    // ==========================

    const withdrawalTable =
        document.getElementById("withdrawalTable");

    withdrawalTable.innerHTML = "";

    withdrawals.forEach(doc => {

        const item = doc.data();

        if (item.status === "Pending") {

            pendingWithdrawals++;

        }

        withdrawalTable.innerHTML += `

        <tr>

            <td>${item.agencyName}</td>

            <td>$${item.amountUSD}</td>

            <td>${item.status}</td>

        </tr>

        `;

    });

    document.getElementById("totalCalls").innerText = totalCalls;

    document.getElementById("totalRevenue").innerText =
        "$" + (totalRevenue / 1000).toFixed(2);

    document.getElementById("pendingWithdrawals").innerText =
        pendingWithdrawals;

}

window.addEventListener("load", () => {

    window.onAuthStateChanged(window.auth, user => {

        if (user) {

            loadAdminDashboard();

        }

    });

});
