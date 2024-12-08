document.addEventListener('DOMContentLoaded', () => {
    fetch('data/posts.json')
        .then(response => response.json())
        .then(data => {
            const feed = document.getElementById('feed');
            data.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    ${post.image ? `<img src="${post.image}" alt="Image" onclick="openFullScreen('${post.image}')">` : ''}
                    <div class="reactions">
                        <span class="reaction" onclick="react('like', this)">👍</span>
                        <span class="reaction" onclick="react('dislike', this)">👎</span>
                        <span class="reaction" onclick="react('love', this)">❤️</span>
                    </div>
                    <div>
                        <input type="text" placeholder="Ajouter un commentaire..." onkeypress="addComment(event, this, '${post.title}')">
                        <ul class="comments"></ul>
                    </div>
                `;
                feed.appendChild(postElement);
            });
        });
});

function openFullScreen(image) {
    const img = document.createElement('img');
    img.src = image;

    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.className = 'fullscreen'; // Ajoutez la classe CSS

    fullScreenDiv.onclick = () => document.body.removeChild(fullScreenDiv);
    fullScreenDiv.appendChild(img);
    document.body.appendChild(fullScreenDiv);
}

function react(type, element) {
    // Logique pour gérer les réactions avec animation de particules
    console.log(`Réaction: ${type}`);
    
    // Animation de réaction
    const reactionAnimation = document.createElement('div');
    reactionAnimation.className = 'reaction-animation';
    reactionAnimation.innerText = type === 'like' ? '👍' : type === 'dislike' ? '👎' : '❤️';
    document.body.appendChild(reactionAnimation);
    
    // Positionner l'animation au bon endroit
    const rect = element.getBoundingClientRect();
    reactionAnimation.style.left = `${rect.left + rect.width / 2}px`;
    reactionAnimation.style.top = `${rect.top}px`;
    
    // Animation
    setTimeout(() => {
        reactionAnimation.style.transform = 'translateY(-50px)';
        reactionAnimation.style.opacity = '0';
    }, 10);
    
    // Retirer l'animation après un certain temps
    setTimeout(() => {
        document.body.removeChild(reactionAnimation);
    }, 1000);
}

function addComment(event, input, postTitle) {
    if (event.key === 'Enter') {
        const commentText = input.value;
        if (commentText) {
            const commentElement = document.createElement('li');
            commentElement.textContent = commentText;
            commentElement.innerHTML += `
                <input type="text" placeholder="Répondre..." onkeypress="addReply(event, this, '${commentText}')">
                <ul class="replies"></ul>
            `;
            const postElement = input.closest('.post');
            postElement.querySelector('.comments').appendChild(commentElement);
            input.value = ''; // Réinitialiser le champ de commentaire
        }
    }
}

function addReply(event, input, commentText) {
    if (event.key === 'Enter') {
        const replyText = input.value;
        if (replyText) {
            const replyElement = document.createElement('li');
            replyElement.textContent = replyText;
            replyElement.innerHTML += `
                <input type="text" placeholder="Répondre..." onkeypress="addReply(event, this, '${replyText}')">
                <ul class="replies"></ul>
            `;
            const commentElement = input.closest('li');
            commentElement.querySelector('.replies').appendChild(replyElement);
            input.value = ''; // Réinitialiser le champ de réponse
        }
    }
}

// Fonction pour charger le header et le footer
function loadHTML() {
    fetch('templates/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    fetch('templates/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

// Appeler la fonction pour charger le contenu
loadHTML();