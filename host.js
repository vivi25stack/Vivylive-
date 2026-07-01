// ===============================
// VIVY HOST SYSTEM v1
// ===============================

const HOST_STATUS = {
    OFFLINE: "offline",
    ONLINE: "online",
    BUSY: "busy"
};

async function applyAsHost(displayName, age, country, gender) {

    const user = window.auth.currentUser;

    if (!user) {
        alert("Please login first.");
        return;
    }

    const hostData = {
        uid: user.uid,
        displayName: displayName,
        age: age,
        country: country,
        gender: gender,
        accountType: "host",
        approved: false,
        agencyId: "",
        agencyName: "",
        status: HOST_STATUS.OFFLINE,
        totalCoins: 0,
        totalCalls: 0,
        rating: 5,
        profileImage: "",
        createdAt: new Date().toISOString()
    };

    await window.setDoc(
        window.doc(window.db, "hosts", user.uid),
        hostData
    );

    alert("Host application submitted. Waiting for Admin approval.");

}

async function goOnline() {

    const user = window.auth.currentUser;

    if (!user) return;

    await window.updateDoc(
        window.doc(window.db, "hosts", user.uid),
        {
            status: HOST_STATUS.ONLINE
        }
    );

}

async function goOffline() {

    const user = window.auth.currentUser;

    if (!user) return;

    await window.updateDoc(
        window.doc(window.db, "hosts", user.uid),
        {
            status: HOST_STATUS.OFFLINE
        }
    );

}

async function addHostCoins(coins) {

    const user = window.auth.currentUser;

    if (!user) return;

    const ref = window.doc(window.db, "hosts", user.uid);

    const snap = await window.getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();

    await window.updateDoc(ref, {

        totalCoins: (data.totalCoins || 0) + coins,

        totalCalls: (data.totalCalls || 0) + 1

    });

}

async function loadHosts() {

    const container = document.getElementById("hostList");

    if (!container) return;

    container.innerHTML = "";

    const query = await window.getDocs(
        window.collection(window.db, "hosts")
    );

    query.forEach(docSnap => {

        const host = docSnap.data();

        if (!host.approved) return;

        const card = document.createElement("div");

        card.className = "hostCard";

        card.innerHTML = `
            <img src="${host.profileImage || "https://picsum.photos/300"}" class="hostImage">

            <div class="hostInfo">

                <h3>${host.displayName}</h3>

                <p>${host.country}</p>

                <p>${host.status}</p>

                <button onclick="startVideoCall('${host.uid}')">
                    Video Call
                </button>

                <button onclick="startAudioCall('${host.uid}')">
                    Audio Call
                </button>

            </div>
        `;

        container.appendChild(card);

    });

}

window.applyAsHost = applyAsHost;
window.loadHosts = loadHosts;
window.goOnline = goOnline;
window.goOffline = goOffline;
window.addHostCoins = addHostCoins;
