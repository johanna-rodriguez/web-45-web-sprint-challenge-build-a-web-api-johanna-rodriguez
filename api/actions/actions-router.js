const express = require("express");
const { validateActionId } = require("./actions-middlware");
const Actions = require("../actions/actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.project);
});

router.post("/", (req, res) => {});

router.put("/:id", validateActionId, (req, res) => {});

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
