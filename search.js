// ==========================================
// VIVY SEARCH SYSTEM (FINAL)
// ==========================================

let allHosts = [];
let filteredHosts = [];

async function loadAllHosts() {

    const snapshot = await window.getDocs(
        window.collection(window.db, "hosts")
    );

    allHosts = [];

    snapshot.forEach(doc => {

        const host = doc.data();

        if (host.approved !== true) return;

        allHosts.push({
            id: doc.id,
            ...host
        });

    });

    filteredHosts = [...allHosts];

    renderHosts(filteredHosts);

}

function searchHosts(keyword) {

    keyword = keyword.toLowerCase();

    filteredHosts = allHosts.filter(host => {

        return (
            (host.displayName || "")
            .toLowerCase()
            .includes(keyword)
        );

    });

    renderHosts(filteredHosts);

}

function filterCountry(country) {

    filteredHosts = allHosts.filter(host =>

        host.country === country

    );

    renderHosts(filteredHosts);

}

function filterGender(gender) {

    filteredHosts = allHosts.filter(host =>

        host.gender === gender

    );

    renderHosts(filteredHosts);

}

function showOnlineOnly() {

    filteredHosts = allHosts.filter(host =>

        host.status === "online"

    );

    renderHosts(filteredHosts);

}

function sortByRating() {

    filteredHosts.sort((a,b)=>

        (b.rating||0)-(a.rating||0)

    );

    renderHosts(filteredHosts);

}

function sortByCoins() {

    filteredHosts.sort((a,b)=>

        (b.totalCoins||0)-(a.totalCoins||0)

    );

    renderHosts(filteredHosts);

}

function sortByCalls() {

    filteredHosts.sort((a,b)=>

        (b.totalCalls||0)-(a.totalCalls||0)

    );

    renderHosts(filteredHosts);

}

function resetSearch(){

    filteredHosts=[...allHosts];

    renderHosts(filteredHosts);

}

function renderHosts(list){

    const container=document.getElementById("hostList");

    if(!container) return;

    container.innerHTML="";

    list.forEach(host=>{

        container.innerHTML+=`

        <div class="hostCard">

            <img
            src="${host.profileImage||'assets/avatar.png'}"
            class="hostImage">

            <div class="hostInfo">

                <h3>${host.displayName}</h3>

                <p>${host.country}</p>

                <p>${host.status}</p>

                <p>⭐ ${host.rating||5}</p>

                <button onclick="startVideoCall('${host.id}')">

                📹 Video

                </button>

                <button onclick="startAudioCall('${host.id}')">

                🎙 Audio

                </button>

            </div>

        </div>

        `;

    });

}

window.loadAllHosts=loadAllHosts;
window.searchHosts=searchHosts;
window.filterCountry=filterCountry;
window.filterGender=filterGender;
window.showOnlineOnly=showOnlineOnly;
window.sortByRating=sortByRating;
window.sortByCoins=sortByCoins;
window.sortByCalls=sortByCalls;
window.resetSearch=resetSearch;
