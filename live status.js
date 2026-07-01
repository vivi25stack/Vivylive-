// ==========================================
// VIVY LIVE STATUS SYSTEM (FINAL)
// ==========================================

let heartbeat = null;

// ================================
// Set Host Status
// ================================

async function setHostStatus(status){

    const user = window.auth.currentUser;

    if(!user) return;

    try{

        await window.updateDoc(

            window.doc(window.db,"hosts",user.uid),

            {

                status:status,

                lastSeen:new Date().toISOString()

            }

        );

    }catch(error){

        console.error(error);

    }

}

// ================================
// Start Heartbeat
// ================================

function startHeartbeat(){

    if(heartbeat) clearInterval(heartbeat);

    heartbeat = setInterval(async ()=>{

        const user = window.auth.currentUser;

        if(!user) return;

        try{

            await window.updateDoc(

                window.doc(window.db,"hosts",user.uid),

                {

                    lastSeen:new Date().toISOString()

                }

            );

        }catch(error){

            console.error(error);

        }

    },30000);

}

// ================================
// Stop Heartbeat
// ================================

function stopHeartbeat(){

    if(heartbeat){

        clearInterval(heartbeat);

        heartbeat = null;

    }

}

// ================================
// Going Offline
// ================================

window.addEventListener("beforeunload",()=>{

    setHostStatus("offline");

});

// ================================
// Going Online
// ================================

window.addEventListener("load",()=>{

    window.onAuthStateChanged(window.auth,user=>{

        if(user){

            setHostStatus("online");

            startHeartbeat();

        }

    });

});

// ================================
// Call Status
// ================================

async function setBusy(){

    await setHostStatus("busy");

}

async function setAway(){

    await setHostStatus("away");

}

async function setOnline(){

    await setHostStatus("online");

}

async function setOffline(){

    stopHeartbeat();

    await setHostStatus("offline");

}

// ================================
// Realtime Host List
// ================================

function watchHosts(callback){

    const hostsRef = window.collection(window.db,"hosts");

    return window.onSnapshot(hostsRef,(snapshot)=>{

        const hosts=[];

        snapshot.forEach(doc=>{

            hosts.push({

                id:doc.id,

                ...doc.data()

            });

        });

        callback(hosts);

    });

}

// ================================
// Exports
// ================================

window.setHostStatus = setHostStatus;
window.setBusy = setBusy;
window.setAway = setAway;
window.setOnline = setOnline;
window.setOffline = setOffline;
window.watchHosts = watchHosts;
