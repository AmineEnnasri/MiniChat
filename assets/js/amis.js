document.addEventListener('DOMContentLoaded', () => {
    const friends = [
        { id: 1, firstName: 'Alice', lastName: 'Dupont', photo: '../assets/images/amis/alice.jpg' },
        { id: 2, firstName: 'Bob', lastName: 'Martin', photo: '../assets/images/amis/bob.jpg' },
        { id: 3, firstName: 'Charlie', lastName: 'Bernard', photo: '../assets/images/amis/charlie.jpg' },
        { id: 4, firstName: 'David', lastName: 'Lefevre', photo: '../assets/images/amis/david.jpg' },
        { id: 5, firstName: 'Eve', lastName: 'Moreau', photo: '../assets/images/amis/eve.jpg' }
    ];

    const friendsList = document.getElementById('friends-list');

    // Générer la liste d'amis
    friends.forEach(friend => {
        const friendItem = document.createElement('li');
        friendItem.className = 'friend';
        friendItem.draggable = true;
        friendItem.setAttribute('data-id', friend.id);
        friendItem.innerHTML = `
            <img src="${friend.photo}" alt="${friend.firstName} ${friend.lastName}">
            <div class="friend-info">
                <h4>${friend.firstName} ${friend.lastName}</h4>
            </div>
            <a class="contact-link" onclick="">Contacter</a>
        `;

        friendsList.appendChild(friendItem);
    });
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