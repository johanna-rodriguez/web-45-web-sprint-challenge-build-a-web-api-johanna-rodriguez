const Projects = require("../projects/projects-model");

function logger(req, res, next) {
  const date = new Date();
  console.log(`
    REQUEST METHOD: ${req.method}
    REQUEST URL: ${req.originalUrl}
    TIMESTAMP: ${date.toLocaleString()}
  `);

  next();
}

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then((project) => {
      if (!project) {
        next({
          message: "project not found",
          status: 404,
        });
      } else {
        req.project = project;
        next();
      }
    })
    .catch(next);
}

function validateProjectFields(req, res, next) {
  const { name, description, completed } = req.body;
  console.log(completed);
  console.log(req.body);
  if (!name || !description || completed === undefined) {
    res.status(400).json({
      message: "missing field",
    });
  } else {
    req.name = name;
    req.description = description;
    req.completed = completed;
    next();
  }
}
module.exports = { logger, validateProjectId, validateProjectFields };
