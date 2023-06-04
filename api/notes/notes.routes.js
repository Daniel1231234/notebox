const express = require("express");

const {
  getRandomNote,
  addNote,
  checkIfHas24HoursPassed,
  getNotes,
} = require("./notes.controller");
const router = express.Router();

router.get("/", getNotes);
router.get("/random", getRandomNote);
router.get("/:id", checkIfHas24HoursPassed);
router.post("/", addNote);

module.exports = router;
