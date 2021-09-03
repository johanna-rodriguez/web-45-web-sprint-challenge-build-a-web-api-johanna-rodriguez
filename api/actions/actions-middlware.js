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

module.exports = { actionsLogger, validateActionId };
