document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/messages.json')
        .then(response => response.json())
        .then(data => {
            const conversationsDiv = document.getElementById('conversations');

            // Trier les conversations par date du dernier message
            data.conversations.sort((a, b) => {
                // Vérifiez si les conversations ont des messages
                if (a.messages.length === 0) return 1; // Si a n'a pas de messages, il vient après
                if (b.messages.length === 0) return -1; // Si b n'a pas de messages, il vient après

                // Obtenir le dernier message de chaque conversation
                const lastMessageA = a.messages[a.messages.length - 1].timestamp;
                const lastMessageB = b.messages[b.messages.length - 1].timestamp;

                // Comparer les dates
                return new Date(lastMessageB) - new Date(lastMessageA); // Tri décroissant
            });

            // Afficher les conversations triées
            data.conversations.forEach(conversation => {
                const conversationElement = document.createElement('div');
                conversationElement.className = 'conversation';

                // Vérifiez si la conversation a des messages
                if (conversation.messages && conversation.messages.length > 0) {
                    let lastMessage = conversation.messages[conversation.messages.length - 1];
                    let lastMessageContent = lastMessage.content;
                    let lastMessageTimestamp = new Date(lastMessage.timestamp).toLocaleString();
                    
                    // Indication si le dernier message est de "Moi"
                    let lastMessageIndicator = lastMessage.sender === "Moi" ? "Moi: " : `${lastMessage.sender}: `;

                    conversationElement.innerHTML = `
                        <div class="conversation-header">
                            <img src="${conversation.friendPhoto}" alt="${conversation.friendName}" class="profile-photo">
                            <h3 class="friend-name">${conversation.friendName}</h3>
                        </div>
                        <div class="last-message">
                            <p class="message-content">${lastMessageIndicator}${lastMessageContent}</p>
                            <span class="timestamp">${lastMessageTimestamp}</span>
                        </div>
                    `;
                    conversationElement.onclick = () => loadConversation(conversation.id);
                    conversationsDiv.appendChild(conversationElement);
                }
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des messages:', error));
});

function loadConversation(conversationId) {
    // Rediriger vers une nouvelle page avec l'ID de la conversation
    window.location.href = `conversation.html?conversationId=${conversationId}`;
}

// Fonction pour charger le header et le footer
function loadHTML() {
    fetch('../templates/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    fetch('../templates/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

// Appeler la fonction pour charger le contenu
loadHTML();