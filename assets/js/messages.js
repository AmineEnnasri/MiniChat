document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/messages.json')
        .then(response => response.json())
        .then(data => {
            const conversationsDiv = document.getElementById('conversations');

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
                    conversationsDiv.appendChild(conversationElement);
                }
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des messages:', error));
});


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