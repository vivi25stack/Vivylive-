import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
getFirestore,
doc,
setDoc,
getDoc,
updateDoc,
deleteDoc,
addDoc,
collection,
getDocs,
query,
where,
orderBy,
limit,
onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyAhO0SRR7DhA3iwy2F-aqOCk7PkxKs7vwA",

authDomain: "vivylive-ecc7e.firebaseapp.com",

projectId: "vivylive-ecc7e",

storageBucket: "vivylive-ecc7e.firebasestorage.app",

messagingSenderId: "1042174110031",

appId: "1:1042174110031:web:9c1d2ee22371d1ea807d3a"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

// Export Firebase
window.auth = auth;
window.db = db;

// Auth
window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.signOut = signOut;
window.onAuthStateChanged = onAuthStateChanged;

// Firestore
window.doc = doc;
window.setDoc = setDoc;
window.getDoc = getDoc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;
window.addDoc = addDoc;
window.collection = collection;
window.getDocs = getDocs;
window.query = query;
window.where = where;
window.orderBy = orderBy;
window.limit = limit;
window.onSnapshot = onSnapshot;
