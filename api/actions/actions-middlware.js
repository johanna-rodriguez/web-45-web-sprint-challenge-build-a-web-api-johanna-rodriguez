// add middlewares here related to actions
const Actions = require("../actions/actions-model");

function actionsLogger(req, res, next) {
  const date = new Date();
  console.log(`
    REQUEST METHOD: ${req.method}
    REQUEST URL: ${req.originalUrl}
    TIMESTAMP: ${date.toLocaleString()}
  `);

  next();
}

function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then((actions) => {
      if (!actions) {
        next({
          message: "actions not found",
          status: 404,
        });
      } else {
        req.actions = actions;
        next();
      }
    })
    .catch(next);
}

function validateActionFields(req, res, next) {
  const { project_id, description, completed, notes } = req.body;
  console.log(req.body);
  if (!project_id || !description || completed === undefined || !notes) {
    res.status(400).json({
      message: "missing field",
    });
  } else {
    req.project_id = project_id;
    req.description = description;
    req.completed = completed;
    req.notes = notes;
    next();
  }
}

module.exports = { actionsLogger, validateActionId, validateActionFields };
