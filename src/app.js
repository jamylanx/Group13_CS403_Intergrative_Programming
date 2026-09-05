const express = require("express");
const playerRoutes = require("./routes/player.routes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/players", playerRoutes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
