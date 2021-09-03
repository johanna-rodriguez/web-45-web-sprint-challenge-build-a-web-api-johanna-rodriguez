const express = require("express");
const {
  validateActionId,
  validateActionFields,
} = require("./actions-middlware");
const Actions = require("../actions/actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res, next) => {
  res.json(req.actions);
});

router.post("/", validateActionFields, (req, res, next) => {
  Actions.insert({
    project_id: req.project_id,
    description: req.description,
    completed: req.completed,
    notes: req.notes,
  }).then((newAction) => {
    res.status(201).json(newAction);
  });
});

router.put("/:id", validateActionId, validateActionFields, (req, res, next) => {
  Actions.update(req.params.id, {
    project_id: req.project_id,
    description: req.description,
    completed: req.completed,
    notes: req.notes,
  })
    .then(() => {
      return Actions.get(req.params.id);
    })
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.json(req.actions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
// Write your "actions" router here!
