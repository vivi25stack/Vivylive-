document.addEventListener("DOMContentLoaded", () => {

const loginScreen = document.getElementById("loginScreen");
const registerScreen = document.getElementById("registerScreen");
const homeScreen = document.getElementById("homeScreen");

const loginBtn = document.getElementById("loginBtn");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const registerBtn = document.getElementById("registerBtn");
const backLoginBtn = document.getElementById("backLoginBtn");

// Show Register Screen
showRegisterBtn.addEventListener("click", () => {
    loginScreen.classList.add("hidden");
    registerScreen.classList.remove("hidden");
});

// Back to Login
backLoginBtn.addEventListener("click", () => {
    registerScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
});

// Register
registerBtn.addEventListener("click", async () => {

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const type = document.getElementById("accountType").value;

    if(!name || !email || !password){
        alert("Please fill all fields.");
        return;
    }

    try{

        const userCredential =
        await window.createUserWithEmailAndPassword(
            window.auth,
            email,
            password
        );

        const uid = userCredential.user.uid;

        await window.setDoc(
            window.doc(window.db,"users",uid),
            {
                uid:uid,
                name:name,
                email:email,
                accountType:type,
                coins:0,
                approved:type==="user",
                createdAt:new Date().toISOString()
            }
        );

        alert("Account created successfully.");

        registerScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");

    }catch(error){

        alert(error.message);

    }

});

// Login
loginBtn.addEventListener("click", async ()=>{

    const email=document.getElementById("loginEmail").value.trim();
    const password=document.getElementById("loginPassword").value;

    try{

        await window.signInWithEmailAndPassword(
            window.auth,
            email,
            password
        );

    }catch(error){

        alert(error.message);

    }

});

// Auth Listener
window.onAuthStateChanged(window.auth, async(user)=>{

    if(user){

        loginScreen.classList.add("hidden");
        registerScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");

        const snap=await window.getDoc(
            window.doc(window.db,"users",user.uid)
        );

        if(snap.exists()){

            const data=snap.data();

            document.getElementById("coinBalance").innerText=data.coins??0;

        }

    }else{

        homeScreen.classList.add("hidden");
        registerScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");

    }

});

});
