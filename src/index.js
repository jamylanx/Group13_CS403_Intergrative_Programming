const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Group 13's Page!");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Us</h1><p>We are students from Group 13.</p>");
});

app.get("/members", (req, res) => {
  res.send("<h1>Our Members</h1><p>Lebron James and Covid Bryant.</p>");
});

app.listen(PORT, () => {
  console.log(`Our server is running at http://localhost:${PORT}`);
});
