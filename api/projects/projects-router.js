const express = require("express");
const { validateProjectId, validateProject } = require("./projects-middleware");
const Projects = require("../projects/projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

// eslint-disable-next-line no-unused-vars
router.get("/:id", validateProjectId, (req, res, next) => {
  res.json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert({
    name: req.name,
    description: req.description,
    completed: req.completed,
  }).then((newProject) => {
    res.status(201).json(newProject);
  });
});

router.put("/:id", validateProjectId, (req, res, next) => {
  Projects.update(req.params.id, {
    name: req.name,
    description: req.description,
    complete: req.complete,
  })
    .then(() => {
      return Projects.get(req.params.id);
    })
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

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
