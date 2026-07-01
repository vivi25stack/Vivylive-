// ==========================================
// VIVY AGENCY DASHBOARD
// ==========================================

async function loadAgencyDashboard() {

    const user = window.auth.currentUser;

    if (!user) return;

    const agencyRef = window.doc(window.db, "agencies", user.uid);
    const agencySnap = await window.getDoc(agencyRef);

    if (!agencySnap.exists()) {
        alert("Agency not found.");
        return;
    }

    let totalHosts = 0;
    let onlineHosts = 0;
    let totalCoins = 0;
    let totalCalls = 0;

    const tbody = document.getElementById("hostTable");
    tbody.innerHTML = "";

    const hosts = await window.getDocs(
        window.collection(window.db, "hosts")
    );

    hosts.forEach(doc => {

        const host = doc.data();

        if (host.agencyId !== user.uid) return;

        totalHosts++;

        if (host.status === "online") {
            onlineHosts++;
        }

        totalCoins += host.totalCoins || 0;
        totalCalls += host.totalCalls || 0;

        const usd = ((host.totalCoins || 0) / 1000).toFixed(2);

        tbody.innerHTML += `
        <tr>
            <td>${host.displayName}</td>
            <td>${host.status}</td>
            <td>${host.totalCoins || 0}</td>
            <td>$${usd}</td>
        </tr>
        `;

    });

    document.getElementById("totalHosts").innerText = totalHosts;
    document.getElementById("onlineHosts").innerText = onlineHosts;
    document.getElementById("totalCalls").innerText = totalCalls;
    document.getElementById("totalCoins").innerText = totalCoins;

    document.getElementById("weeklyCoins").innerText = totalCoins;
    document.getElementById("monthlyCoins").innerText = totalCoins;

    document.getElementById("agencyBalance").innerText =
        (totalCoins / 1000).toFixed(2);

}

window.addEventListener("load", () => {

    window.onAuthStateChanged(window.auth, user => {

        if (user) {

            loadAgencyDashboard();

        }

    });

});
