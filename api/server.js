const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const server = express();
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/api/hello", (req, res) => {
  res.json({ message: "api is working" });
});

server.use("*", (req, res) => {
  res.send(`<h1>Hello!</h1>`);
});
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({
    message: err.message,
  });
});
module.exports = server;
