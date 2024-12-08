document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const conversationId = parseInt(urlParams.get('conversationId'));


    fetch('../data/messages.json')
        .then(response => response.json())
        .then(data => {
            const conversation = data.conversations.find(conv => parseInt(conv.id) === conversationId);

            if (conversation) {
                const conversationDetailDiv = document.getElementById('conversation-detail');
                conversationDetailDiv.innerHTML = `
                    <div class="conversation-header">
                        <img src="${conversation.friendPhoto}" alt="${conversation.friendName}" class="profile-photo">
                        <h2>${conversation.friendName}</h2>
                    </div>
                `;

                // Afficher les messages
                conversation.messages.forEach(message => {
                    const messageElement = document.createElement('div');
                    messageElement.className = 'message';
                    messageElement.innerHTML = `
                        <div class="message-content ${message.sender === "Moi" ? "sent" : "received"}">
                            <strong>${message.sender}</strong>: ${message.content}
                            <span class="timestamp">${new Date(message.timestamp).toLocaleString()}</span>
                        </div>
                    `;
                    conversationDetailDiv.appendChild(messageElement);
                });

                // Ajouter le champ de saisie de message
                const messageInputDiv = document.createElement('div');
                messageInputDiv.id = 'message-input';
                messageInputDiv.innerHTML = `
                    <input type="text" id="new-message" placeholder="Écrire un message..." aria-label="Écrire un message">
                    <button id="send-button" aria-label="Envoyer le message">Envoyer</button>
                `;
                conversationDetailDiv.appendChild(messageInputDiv); // Ajouter le champ de saisie à la conversation

                // Gérer l'envoi de messages
                const messageInput = document.getElementById('new-message');
                const sendButton = document.getElementById('send-button');

                // Fonction pour envoyer le message
                const sendMessageHandler = () => {
                    const messageContent = messageInput.value;
                    if (messageContent) {
                        sendMessage(conversationId, messageContent);
                        messageInput.value = ''; // Réinitialiser le champ de saisie
                    }
                };

                // Événement pour le bouton d'envoi
                sendButton.onclick = sendMessageHandler;

                // Événement pour la touche "Entrée"
                messageInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        sendMessageHandler();
                        event.preventDefault(); // Empêche le comportement par défaut de la touche "Entrée"
                    }
                });
            }
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