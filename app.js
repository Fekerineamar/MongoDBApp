const express = require("express");
const ejs = require("ejs");

const { db, getDb } = require("./data/db");

app = express();
app.set("view engine", "ejs");
app.set("views", "public");
app.use(express.static(__dirname + "/data"));

let data;
db((err) =>
  !err
    ? (() => {
        data = getDb();
        const movie = data.collection("Hobbit");
        const result = movie.find();
        let Data = [];
        result.forEach((e) => Data.push(e));

        app.get("/", (req, res) => {
          res.render("index", { Data: Data });
        });
      })()
    : console.log("could't connect")
);

app.listen(3000, console.log("Go To http://localhost:3000"));
