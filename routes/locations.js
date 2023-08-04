let express = require("express");
let router = express.Router();
var MongoClient = require("mongodb").MongoClient;

const url = "mongodb://127.0.0.1:27017/";

// Handler für GET-Anfrage, um eine bestimmte Location anhand der ID abzurufen
router.get("/:id", function (req, res, next) {
  console.log("Abrufen der Location anhand der ID");
  console.log(req.params);

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    console.log("Verbindung zur MongoDB hergestellt");
    var db = client.db("toxMap");
    db.collection("locations").findOne(
      { id: req.params.id },
      function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log("Location gefunden");
        res.json(result).status(200);
        client.close();
      }
    );
  });
});

// Handler für GET-Anfrage, um alle Locations abzurufen
router.get("/", function (req, res, next) {
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    console.log("Verbindung zur MongoDB hergestellt");
    var db = client.db("toxMap");
    db.collection("locations")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log("Alle Locations abgerufen");
        res.json(result).status(200);
        client.close();
      });
  });
});

// Handler für POST-Anfrage, um eine neue Location hinzuzufügen
router.post("/", function (req, res) {
  console.log("Hinzufügen einer neuen Location");
  let locationToPut = req.body;
  locationToPut.id = generateRandomInt64String();
  console.log("Location: ", locationToPut);

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    console.log("Verbindung zur MongoDB hergestellt");
    var db = client.db("toxMap");
    db.collection("locations").insertOne(locationToPut, function (err, result) {
      if (err) throw err;
      console.log("Location eingefügt");
      console.log(result);
      res.json(result.ops).status(200);
      client.close();
    });
  });
});

// Handler für PUT-Anfrage, um eine Location zu aktualisieren
router.put("/:id", function (req, res) {
  console.log("Aktualisieren einer Location");
  console.log(req.body);
  let replacement = req.body;

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    console.log("Verbindung zur MongoDB hergestellt");
    var db = client.db("toxMap");
    db.collection("locations").replaceOne(
      { id: req.body.id },
      replacement,
      function (err, result) {
        if (err) throw err;
        console.log("Location aktualisiert");
        res.json(result.ops).status(200);
        client.close();
      }
    );
  });
});

// Handler für DELETE-Anfrage, um eine Location zu löschen
router.delete("/:id", function (req, res) {
  console.log("Löschen einer Location");

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    console.log("Verbindung zur MongoDB hergestellt");
    var db = client.db("toxMap");
    db.collection("locations").deleteOne(
      { id: req.body.id },
      function (err, result) {
        if (err) throw err;
        console.log("Location gelöscht");
        res.json(result).status(200);
        client.close();
      }
    );
  });
});

function generateRandomInt64String() {
  return String(Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER + 1)));
}

module.exports = router;
