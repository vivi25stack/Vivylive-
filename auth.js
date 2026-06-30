import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const auth = window.auth;

// Register
window.registerUser = async function(email,password){

try{

const user = await createUserWithEmailAndPassword(
auth,
email,
password
);

alert("Registration Successful");

console.log(user.user.uid);

}catch(err){

alert(err.message);

}

}

// Login
window.loginUser = async function(email,password){

try{

const user = await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Welcome to Vivy ❤️");

console.log(user.user.uid);

}catch(err){

alert(err.message);

}

}

// Logout
window.logoutUser = async function(){

await signOut(auth);

alert("Logged Out");

  }
