let nextId = 1;

const players = [
  { id: nextId++, name: "Miposhka", hero: "Mirana" },
  { id: nextId++, name: "Yatoro", hero: "Juggernaut" },
  { id: nextId++, name: "Satanic", hero: "Faceless Void" },
  { id: nextId++, name: "Collapse", hero: "Magnus" },
];

const getNextId = () => nextId++;

module.exports = {
  players,
  getNextId,
};
