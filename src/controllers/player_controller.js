let nextId = 1;

const players = [
  { id: nextId++, name: "Miposhka", hero: "Mirana" },
  { id: nextId++, name: "Yatoro", hero: "Juggernaut" },
  { id: nextId++, name: "Satanic", hero: "Faceless Void" },
  { id: nextId++, name: "Collapse", hero: "Magnus" },
];

const getAllPlayers = (request, response) => {
  response.send(players);
};

const getPlayerById = (request, response) => {
  const id = Number(request.params.id);

  const player = players.find((player) => player.id === id);

  if (!player) {
    return response.status(404).send("Player not found");
  }

  response.send(player);
};

const createPlayer = (request, response) => {
  const newPlayer = {
    id: nextId++,
    name: request.body.name,
    hero: request.body.hero,
  };

  players.push(newPlayer);

  response.send(newPlayer);
};

const updatePlayer = (request, response) => {
  const id = Number(request.params.id);

  const player = players.find((player) => player.id === id);

  if (!player) {
    return response.status(404).send("Player not found");
  }

  player.name = request.body.name;
  player.hero = request.body.hero;

  response.send(player);
};

const patchPlayer = (request, response) => {
  const id = Number(request.params.id);

  const player = players.find((player) => player.id === id);

  if (!player) {
    return response.status(404).send("Player not found");
  }

  if (request.body.name !== undefined) {
    player.name = request.body.name;
  }

  if (request.body.hero !== undefined) {
    player.hero = request.body.hero;
  }

  response.send(player);
};

const deletePlayer = (request, response) => {
  const id = Number(request.params.id);

  const playerIndex = players.findIndex((player) => player.id === id);

  if (playerIndex === -1) {
    return response.status(404).send("Player not found");
  }

  players.splice(playerIndex, 1);

  response.send("Player deleted");
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  patchPlayer,
  deletePlayer,
};
