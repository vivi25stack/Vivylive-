// ==========================================
// VIVY PROFILE SYSTEM v1
// ==========================================

const DEFAULT_AVATAR = "assets/avatar.png";

// =========================
// CREATE PROFILE
// =========================

async function createProfile() {

    const user = window.auth.currentUser;

    if (!user) return;

    const ref = window.doc(window.db, "profiles", user.uid);

    const snap = await window.getDoc(ref);

    if (snap.exists()) return;

    await window.setDoc(ref, {

        uid: user.uid,

        name: user.displayName || "New User",

        email: user.email,

        photo: DEFAULT_AVATAR,

        gender: "",

        age: "",

        country: "",

        bio: "",

        language: "English",

        online: false,

        totalCalls: 0,

        totalMinutes: 0,

        totalCoins: 0,

        rating: 5,

        createdAt: new Date().toISOString()

    });

}

// =========================
// LOAD PROFILE
// =========================

async function loadProfile() {

    const user = window.auth.currentUser;

    if (!user) return;

    const snap = await window.getDoc(

        window.doc(window.db, "profiles", user.uid)

    );

    if (!snap.exists()) return;

    const profile = snap.data();

    if (document.getElementById("profileName"))
        document.getElementById("profileName").value = profile.name;

    if (document.getElementById("profileAge"))
        document.getElementById("profileAge").value = profile.age;

    if (document.getElementById("profileCountry"))
        document.getElementById("profileCountry").value = profile.country;

    if (document.getElementById("profileBio"))
        document.getElementById("profileBio").value = profile.bio;

    if (document.getElementById("profileImage"))
        document.getElementById("profileImage").src = profile.photo;

}

// =========================
// SAVE PROFILE
// =========================

async function saveProfile() {

    const user = window.auth.currentUser;

    if (!user) return;

    await window.updateDoc(

        window.doc(window.db, "profiles", user.uid),

        {

            name: document.getElementById("profileName").value,

            age: document.getElementById("profileAge").value,

            country: document.getElementById("profileCountry").value,

            bio: document.getElementById("profileBio").value

        }

    );

    alert("Profile Updated");

}

// =========================
// ONLINE STATUS
// =========================

async function setOnline(status) {

    const user = window.auth.currentUser;

    if (!user) return;

    await window.updateDoc(

        window.doc(window.db, "profiles", user.uid),

        {

            online: status

        }

    );

}

// =========================
// CALL STATISTICS
// =========================

async function updateCallStats(minutes, coins) {

    const user = window.auth.currentUser;

    if (!user) return;

    const ref = window.doc(window.db, "profiles", user.uid);

    const snap = await window.getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();

    await window.updateDoc(ref, {

        totalCalls: (data.totalCalls || 0) + 1,

        totalMinutes: (data.totalMinutes || 0) + minutes,

        totalCoins: (data.totalCoins || 0) + coins

    });

}

// =========================
// LOGOUT
// =========================

async function logout() {

    await window.signOut(window.auth);

    location.reload();

}

window.createProfile = createProfile
