const { MongoClient } = require("mongodb");

let connected;

const db = (cb) => {
  MongoClient.connect("mongodb://127.0.0.1:27017")
    .then((client) => {
      connected = client.db("Movie");
      return cb();
    })
    .catch((err) => {
      return cb(err);
    });
};
const getDb = () => connected;

module.exports = { db, getDb };
