const express = require("express");
const mongodb = require("mongodb");
const { db, getDb } = require("./data/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "public");
app.use(express.static(__dirname + "/data"));

let data;
db((err) =>
  !err
    ? (app.listen(3000, console.log("Go To http://localhost:3000")),
      (data = getDb()))
    : console.log("could't connect")
);
app.get("/", (req, res) => {
  let Data = [];
  data
    .collection("Hobbit")
    .find()
    .forEach((e) => Data.push(e))
    .then(() => res.render("index", { Data: Data }));
});

app.post("/addmovies", (req, res) => {
  let movies = {
    _id: new mongodb.ObjectId(),
    Title: req.body[0] ? req.body[0] : "No Name",
    Director: req.body[1] ? req.body[1] : "No Name",
    Duration: req.body[2] ? req.body[2] : "0",
    Year: req.body[3] ? req.body[3] : "1990",
    Rating: req.body[4] ? Number(req.body[4]) : 0,
    img: req.body[5],
  };
  console.log(movies._id);

  data.collection("Hobbit").insertOne(movies, (err) => {
    if (err) throw err;
    console.log("1 document inserted");
    //db.close();
  });
  res.send(movies._id);
});

app.delete("/rmmovies", (req, res) => {
  console.log(req.body.id.toString());
  data
    .collection("Hobbit")
    .deleteOne({ _id: new mongodb.ObjectId(req.body.id) }, (err) => {
      if (err) throw err;
      console.log("1 document Deleted");
      //db.close();
    });
  res.send("ok");
});
