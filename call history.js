// ==========================================
// VIVY CALL HISTORY SYSTEM
// ==========================================

async function saveCallHistory(data){

    try{

        const id = Date.now().toString();

        await window.setDoc(

            window.doc(window.db,"callHistory",id),

            {
                id:id,
                callerUid:data.callerUid,
                receiverUid:data.receiverUid,
                callType:data.callType,
                duration:data.duration,
                coins:data.coins,
                status:data.status,
                startedAt:data.startedAt,
                endedAt:data.endedAt,
                createdAt:new Date().toISOString()
            }

        );

    }catch(error){

        console.error(error);

    }

}

async function loadMyCallHistory(){

    const user = window.auth.currentUser;

    if(!user) return [];

    const snapshot = await window.getDocs(

        window.collection(window.db,"callHistory")

    );

    const calls=[];

    snapshot.forEach(doc=>{

        const call=doc.data();

        if(
            call.callerUid===user.uid ||
            call.receiverUid===user.uid
        ){

            calls.push(call);

        }

    });

    calls.sort((a,b)=>

        new Date(b.createdAt)-new Date(a.createdAt)

    );

    return calls;

}

async function deleteCallHistory(id){

    try{

        await window.deleteDoc(

            window.doc(window.db,"callHistory",id)

        );

    }catch(error){

        console.error(error);

    }

}

window.saveCallHistory=saveCallHistory;
window.loadMyCallHistory=loadMyCallHistory;
window.deleteCallHistory=deleteCallHistory;
