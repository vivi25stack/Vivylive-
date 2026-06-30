// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getAuth
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
getStorage
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// Your Firebase Configuration
const firebaseConfig = {

apiKey: "AIzaSyAhO0SRR7DhA3iwy2F-aqOCk7PkxKs7vwA",

authDomain: "vivylive-ecc7e.firebaseapp.com",

projectId: "vivylive-ecc7e",

storageBucket: "vivylive-ecc7e.firebasestorage.app",

messagingSenderId: "1042174110031",

appId: "1:1042174110031:web:9c1d2ee22371d1ea807d3a"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

// Export
window.auth = auth;
window.db = db;
window.storage = storage;

console.log("✅ Firebase Connected");
