const { exec } = require('child_process');

// Démarrer http-server
const httpServer = exec('http-server ./ -p 8080');

// Démarrer json-server
const jsonServer = exec('json-server --watch data/messages.json --port 3000');

// Afficher les sorties des serveurs dans la console
httpServer.stdout.on('data', (data) => {
    console.log(`http-server: ${data}`);
});

httpServer.stderr.on('data', (data) => {
    console.error(`http-server error: ${data}`);
});

jsonServer.stdout.on('data', (data) => {
    console.log(`json-server: ${data}`);
});

jsonServer.stderr.on('data', (data) => {
    console.error(`json-server error: ${data}`);
});