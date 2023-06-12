const MongoClient = require("mongodb").MongoClient;

module.exports = {
  getCollection,
};

// Database Name
const dbName = "notes_db";

const connectionStr =
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : process.env.DB_DEV;

var dbConn = null;

async function getCollection(collectionName = "notes") {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    console.log("Failed to get Mongo collection", err);
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    dbConn = db;
    // console.log(db)
    return db;
  } catch (err) {
    console.log("Cannot Connect to DB", err);
    throw err;
  }
}
