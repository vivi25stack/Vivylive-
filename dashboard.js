// ======================================
// VIVY DASHBOARD SYSTEM v1
// ======================================

const Dashboard = {

adminLink: "/admin.html",

agencyLink: "/agency.html",

hostLink: "/host.html"

};

// Open Dashboard

function openDashboard(type){

switch(type){

case "admin":

window.location.href = Dashboard.adminLink;

break;

case "agency":

window.location.href = Dashboard.agencyLink;

break;

case "host":

window.location.href = Dashboard.hostLink;

break;

default:

alert("Dashboard not found.");

}

}

// Check Approval

async function checkApproval(){

const user = window.auth.currentUser;

if(!user) return;

const snap = await window.getDoc(

window.doc(window.db,"users",user.uid)

);

if(!snap.exists()) return;

const data = snap.data();

if(data.accountType==="host" && !data.approved){

alert("Your Host account is waiting for Admin approval.");

}

if(data.accountType==="agency" && !data.approved){

alert("Your Agency account is waiting for Admin approval.");

}

}

// Load Dashboard

async function loadDashboard(){

await checkApproval();

console.log("Dashboard Loaded");

}

window.openDashboard = openDashboard;
window.loadDashboard = loadDashboard;
