// ==========================================
// VIVY LEADERBOARD SYSTEM
// ==========================================

// Load Top Hosts
async function loadTopHosts() {

    const snapshot = await window.getDocs(
        window.collection(window.db, "hosts")
    );

    const hosts = [];

    snapshot.forEach(doc => {

        hosts.push({
            id: doc.id,
            ...doc.data()
        });

    });

    hosts.sort((a, b) => (b.totalCoins || 0) - (a.totalCoins || 0));

    const table = document.getElementById("topHosts");

    if (!table) return;

    table.innerHTML = "";

    hosts.slice(0, 100).forEach((host, index) => {

        table.innerHTML += `

        <tr>

            <td>#${index + 1}</td>

            <td>${host.displayName || "Host"}</td>

            <td>${host.country || "-"}</td>

            <td>${host.totalCalls || 0}</td>

            <td>${host.totalCoins || 0}</td>

            <td>$${((host.totalCoins || 0) / 1000).toFixed(2)}</td>

        </tr>

        `;

    });

}

// Load Top Agencies
async function loadTopAgencies() {

    const snapshot = await window.getDocs(
        window.collection(window.db, "agencies")
    );

    const agencies = [];

    snapshot.forEach(doc => {

        agencies.push({
            id: doc.id,
            ...doc.data()
        });

    });

    agencies.sort((a, b) => (b.totalCoins || 0) - (a.totalCoins || 0));

    const table = document.getElementById("topAgencies");

    if (!table) return;

    table.innerHTML = "";

    agencies.forEach((agency, index) => {

        table.innerHTML += `

        <tr>

            <td>#${index + 1}</td>

            <td>${agency.agencyName || "Agency"}</td>

            <td>${agency.totalHosts || 0}</td>

            <td>${agency.totalCoins || 0}</td>

            <td>$${((agency.totalCoins || 0) / 1000).toFixed(2)}</td>

        </tr>

        `;

    });

}

window.loadTopHosts = loadTopHosts;
window.loadTopAgencies = loadTopAgencies;
