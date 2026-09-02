const express = require("express");
const port = 3000;

let nextId = 1;
const players = [
    { id: nextId++, name: "Miposhka", hero: "Mirana" },
    { id: nextId++, name: "Yatoro", hero: "Juggernaut" },
    { id: nextId++, name: "Satanic", hero: "Faceless Void" },
    { id: nextId++, name: "Collapse", hero: "Magnus" },
];

const app = express();

app.use(express.json());

app.post("/players", (request, response) => {
    const newName = request.body.name;
    const newHero = request.body.hero;

    const newPlayer = { id: nextId++, name: newName, hero: newHero };

    players.push(newPlayer);
    response.send(newPlayer);
});

app.get("/players", (request, response) => {
    response.send(players);
});

app.put("/players/:id", (request, response) => {
    const id = Number(request.params.id);

    const player = players.find(player =>  player.id === id);

    if(!player) {
        return response.status(404).send("Player not found");
    }
    
    player.name = request.body.name;
    player.hero = request.body.hero;

    response.send(player);
});

app.patch("/players/:id", (request, response) => {
    const id = Number(request.params.id);

    const player = players.find(player => player.id === id);

    if(!player) {
        return response.status(404).send("Player not found");
    }
    
    if (request.body.name) {
        player.name = request.body.name;
    }
        if (request.body.hero) {
        player.hero = request.body.hero;
    }
    response.send(player);
});

app.delete("/players/:id", (request, response) => {
    const id = Number(request.params.id);

    const playerIndex = players.findIndex(player => player.id === id);
     if (playerIndex === -1) {
        return response.status(404).send("Player not found");
    }

    players.splice(playerIndex, 1);

    response.send("Player deleted");
});

app.listen(port, () => {
    console.log(`App is running to port ${port}`);
});