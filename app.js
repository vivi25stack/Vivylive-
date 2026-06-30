function showRegister(){

document.getElementById("loginPage").classList.add("hidden");
document.getElementById("registerPage").classList.remove("hidden");

}

function showLogin(){

document.getElementById("registerPage").classList.add("hidden");
document.getElementById("loginPage").classList.remove("hidden");

}

function openHome(){

document.getElementById("loginPage").classList.add("hidden");
document.getElementById("registerPage").classList.add("hidden");

document.getElementById("homePage").classList.remove("hidden");

}
