const noteService = require("./notes.service");

async function getNotes(req, res) {
  try {
    const notes = await noteService.query(req.query);
    res.send(notes);
  } catch (err) {
    console.log("Cannot get notes", err);
    res.status(500).send({ err: "Failed to get notes" });
  }
}

async function getRandomNote(req, res) {
  try {
    const notes = await noteService.query(req.query);
    const unseenNotes = notes.filter((item) => !item.seenAt);
    if (unseenNotes.length > 0) {
      const randomNote =
        unseenNotes[Math.floor(Math.random() * unseenNotes.length)];
      res.send(randomNote);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log("Cannot get notes", err);
    res.status(500).send({ err: "Failed to get notes" });
  }
}

async function checkIfHas24HoursPassed(req, res) {
  try {
    const note = await noteService.getById(req.params.id);

    if (note.seenAt === null) {
      note.seenAt = Date.now();
      const updatedNote = await noteService.updateNote(note);
      res.status(200).send({ message: "OK", updatedNote });
      return;
    }

    // let currentTimeStamp = Date.now();
    // let timeDifference = currentTimeStamp - +note.seenAt;
    // var hoursDifference = timeDifference / (1000 * 60 * 60);
    res.status(200).send({ message: "OK" });
    // if (hoursDifference >= 24) {
    // } else res.status(200).send({ message: "NOT OK" });
  } catch (err) {
    console.log("Cannot check id 24 hours passed", err);
    res.status(500).send({ err: "Failed to check id 24 hours passed" });
  }
}

async function addNote(req, res) {
  try {
    var note = req.body;
    note.seenAt = null;
    note = await noteService.add(note);
    res.send(note);
  } catch (err) {
    console.log("Failed to add note", err);
    res.status(500).send({ err: "Failed to add note" });
  }
}

module.exports = {
  getRandomNote,
  addNote,
  checkIfHas24HoursPassed,
  getNotes,
};
