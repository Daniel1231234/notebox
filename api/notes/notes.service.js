const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;

async function query() {
  try {
    const criteria = {};
    const collection = await dbService.getCollection();
    var notes = await collection.find(criteria).toArray();
    return notes;
  } catch (err) {
    console.log("cannot find notes", err);
    throw err;
  }
}

async function updateNote(note) {
  try {
    const id = new ObjectId(note._id);
    console.log("id => ", id);
    const updatedNote = { ...note, _id: id };

    // noteToSave._id = ObjectId(note._id);
    const collection = await dbService.getCollection();
    await collection.updateOne({ _id: id }, { $set: updatedNote });
    return updatedNote;
  } catch (err) {
    console.log("cannot update note", err);
    throw err;
  }
}

async function add(note) {
  try {
    const collection = await dbService.getCollection();
    await collection.insertOne(note);
    return note;
  } catch (err) {
    console.log("cannot insert note", err);
    throw err;
  }
}

async function getById(noteId) {
  try {
    const id = new ObjectId(noteId);
    console.log("id => ", id);

    const collection = await dbService.getCollection();
    const note = await collection.findOne({ _id: id });
    return note;
  } catch (err) {
    console.log(`while finding user ${noteId}`, err);
    throw err;
  }
}

module.exports = {
  query,
  add,
  getById,
  updateNote,
};
