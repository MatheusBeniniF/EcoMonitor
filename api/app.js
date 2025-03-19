const express = require("express");
const leiturasRouter = require("./routes/leituras");
const swaggerSetup = require("./swagger/swagger");

const app = express();

app.use((_req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use("/api/leituras", leiturasRouter);
swaggerSetup(app);

module.exports = app;
