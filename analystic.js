// ==========================================
// VIVY ANALYTICS SYSTEM (FINAL)
// ==========================================

// Track Event
async function trackEvent(type, value = 1) {

    try {

        const today = new Date().toISOString().split("T")[0];

        const ref = window.doc(
            window.db,
            "analytics",
            today
        );

        const snap = await window.getDoc(ref);

        if (!snap.exists()) {

            await window.setDoc(ref, {

                date: today,

                newUsers: 0,
                totalCalls: 0,
                totalMinutes: 0,
                totalCoins: 0,
                totalGifts: 0,
                newFollowers: 0,

                createdAt: new Date().toISOString()

            });

        }

        const data = (await window.getDoc(ref)).data();

        switch(type){

            case "user":

               
