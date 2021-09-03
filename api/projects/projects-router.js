const express = require("express");
const { validateProjectId } = require("./projects-middleware");
const Projects = require("../projects/projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res, next) => {
  res.json(req.project);
});

router.post("/", (req, res) => {});

router.put("/:id", validateProjectId, (req, res, next) => {});

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Projects.getProjectActions();
});

module.exports = router;
