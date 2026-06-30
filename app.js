// VIVY APP

const hostList = document.getElementById("hostList");

const hosts = [

{
name:"Sophia",
country:"🇺🇸",
image:"https://picsum.photos/300/400?1"
},

{
name:"Emma",
country:"🇬🇧",
image:"https://picsum.photos/300/400?2"
},

{
name:"Ava",
country:"🇨🇦",
image:"https://picsum.photos/300/400?3"
},

{
name:"Olivia",
country:"🇦🇺",
image:"https://picsum.photos/300/400?4"
}

];

function loadHosts(){

hostList.innerHTML="";

hosts.forEach((host)=>{

hostList.innerHTML += `

<div class="hostCard">

<img class="hostImage" src="${host.image}">

<div class="hostInfo">

<div class="hostName">

${host.country} ${host.name}

</div>

<div class="online">

🟢 Online

</div>

<button class="callBtn">

Call Now

</button>

</div>

</div>

`;

});

}

loadHosts();
