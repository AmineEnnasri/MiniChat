# FriendSphere

FriendSphere est un réseau social qui permet aux utilisateurs de partager des posts, discuter avec leurs amis, et gérer leur liste d'amis. L'application simule des interactions en utilisant des données JSON pour gérer les posts et les messages.

## Table des Matières
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Auteur](#auteur)

## Fonctionnalités

### Page de Feed
- Affichage de posts (texte ou photo + texte) ajoutés à partir d’un JSON en utilisant la gestion du DOM.
- Tous les articles (texte et photos) ont les mêmes formats et clés JSON, simulant ainsi le retour d’une API.
- **Réactions aux posts** : Les utilisateurs peuvent réagir aux posts avec des animations de particules pour chaque réaction (Like, Dislike, Love).
- **Commentaires** : Les utilisateurs peuvent commenter les posts et répondre aux commentaires.
- **Affichage en plein écran** : Les photos des posts peuvent être affichées en plein écran.

### Page de Messagerie
- Affichage d’une liste de conversations, gérée dynamiquement via le DOM depuis un JSON pour simuler une API ou websocket.
- **Dernier message** : Affichage du dernier message de chaque conversation.
- **Détails de la conversation** : Affichage de l'historique des messages avec horodatage, nom, photo de profil de l’expéditeur, et contenu du message.
- **Envoi de nouveaux messages** : Les nouveaux messages s'ajoutent à la fois dans le JSON et sur l'interface (à l'aide de json-server).

### Page de Liste d'Amis
- Pas besoin de JSON (amis codés en dur).
- **Filtrage** : Les utilisateurs peuvent filtrer les amis par nom et prénom.
- **Lien vers la messagerie** : Chaque ami a un lien vers la messagerie.
- **Drag and Drop** : Implémentation d'une fonction de "drag and drop" pour réorganiser la liste d’amis.

## Installation

Après avoir cloné le projet, suivez ces étapes pour le faire fonctionner :

**Installez les dépendances nécessaires** (si ce n'est pas déjà fait) :
   Vous aurez besoin d'installer `http-server` et `json-server` globalement pour exécuter les serveurs. Exécutez les commandes suivantes :
   ```bash
   npm install -g http-server
   npm install -g json-server
  ``` 

## Utilisation

**Lancez les serveurs** : Dans le terminal, exécutez la commande suivante pour démarrer les serveurs :
   ```bash
    npm start
  ``` 
    
    
Cette commande exécute le script défini dans le fichier package.json, qui démarre les deux serveurs suivants :

- **http-server** : Ce serveur sert les fichiers statiques de votre application à partir du répertoire courant (./) sur le port 8080. Il permet aux utilisateurs d'accéder à l'interface de l'application via leur navigateur.
- **json-server** : Ce serveur simule une API RESTful en surveillant le fichier data/messages.json sur le port 3000. Il permet de gérer dynamiquement les conversations et les messages, en fournissant des endpoints pour récupérer et mettre à jour les données.

**Accèder à l'application** : Une fois les serveurs lancés, vous pouvez accéder à sur votre navigateur à l'aide d'une de ces adresses que vous devez trouvé sur votre terminal :
Avaiable on:
- http://172.20.10.3:8080
- http://172.19.176.1:8080
- http://127.0.0.1:8080

## Auteur

ENNASRI Amine