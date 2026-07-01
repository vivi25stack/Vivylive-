// ==========================================
// VIVY ZEGO CALL SYSTEM
// ==========================================

const ZEGO_CONFIG = {

    appID: 0, // Replace with your ZEGOCLOUD AppID

    server: "wss://webliveroom.zego.im/ws"

};

let zg = null;
let localStream = null;
let remoteStream = null;
let currentRoom = "";

async function initializeZego() {

    if (ZEGO_CONFIG.appID === 0) {

        console.log("Please add your ZEGOCLOUD AppID.");

        return;

    }

    console.log("ZEGOCLOUD Ready");

}

async function joinCall(roomID, userID, userName) {

    currentRoom = roomID;

    console.log("Joining Room:", roomID);

    // ZEGOCLOUD login will be added here

}

async function startVideoCall(hostID) {

    const roomID = "room_" + hostID;

    const user = window.auth.currentUser;

    if (!user) {

        alert("Please login first.");

        return;

    }

    await joinCall(

        roomID,

        user.uid,

        user.email

    );

    if (typeof timer === "undefined") {

        console.log("Coin timer not loaded.");

    } else {

        seconds = 0;

        timer = setInterval(callTimer, 1000);

    }

    alert("Starting Video Call...");

}

async function startAudioCall(hostID) {

    const roomID = "room_" + hostID;

    const user = window.auth.currentUser;

    if (!user) {

        alert("Please login first.");

        return;

    }

    await joinCall(

        roomID,

        user.uid,

        user.email

    );

    if (typeof timer === "undefined") {

        console.log("Coin timer not loaded.");

    } else {

        seconds = 0;

        timer = setInterval(callTimer, 1000);

    }

    alert("Starting Audio Call...");

}

function leaveCall() {

    if (timer) {

        clearInterval(timer);

    }

    timer = null;

    seconds = 0;

    currentRoom = "";

    console.log("Call Ended");

}

window.initializeZego = initializeZego;
window.startVideoCall = startVideoCall;
window.startAudioCall = startAudioCall;
window.leaveCall = leaveCall;
