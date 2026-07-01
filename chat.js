// ==========================================
// VIVY CHAT SYSTEM v1
// ==========================================

let currentChatUser = "";
let unsubscribeMessages = null;

async function openChat(receiverUid) {

    currentChatUser = receiverUid;

    const chatBox = document.getElementById("chatMessages");

    if (chatBox) {

        chatBox.innerHTML = "";

    }

    await loadMessages();

}

function getChatId(uid1, uid2) {

    return [uid1, uid2].sort().join("_");

}

async function sendChatMessage() {

    const input = document.getElementById("chatInput");

    if (!input) return;

    const text = input.value.trim();

    if (text === "") return;

    const allowed = await moderateMessage(text);

    if (!allowed) return;

    const user = window.auth.currentUser;

    if (!user) return;

    const chatId = getChatId(user.uid, currentChatUser);

    const messageId = Date.now().toString();

    await window.setDoc(

        window.doc(
            window.db,
            "chats",
            chatId,
            "messages",
            messageId
        ),

        {

            sender: user.uid,

            receiver: currentChatUser,

            text: text,

            read: false,

            createdAt: new Date().toISOString()

        }

    );

    input.value = "";

    await loadMessages();

}

async function loadMessages() {

    const user = window.auth.currentUser;

    if (!user) return;

    const chatId = getChatId(user.uid, currentChatUser);

    const chatBox = document.getElementById("chatMessages");

    if (!chatBox) return;

    chatBox.innerHTML = "";

    const messages = await window.getDocs(

        window.collection(

            window.db,

            "chats",

            chatId,

            "messages"

        )

    );

    const list = [];

    messages.forEach(doc => {

        list.push(doc.data());

    });

    list.sort((a,b)=>

        new Date(a.createdAt)-new Date(b.createdAt)

    );

    list.forEach(msg=>{

        const bubble=document.createElement("div");

        bubble.style.margin="10px";

        bubble.style.padding="12px";

        bubble.style.borderRadius="12px";

        bubble.style.maxWidth="75%";

        if(msg.sender===user.uid){

            bubble.style.background="#933
