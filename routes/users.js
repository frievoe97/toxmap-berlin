let express = require("express");
let router = express.Router();
var MongoClient = require("mongodb").MongoClient;

/* GET Benutzer auflisten. */
router.get("/", function (req, res, next) {
  res.status(200).json({ users: "bob" });
});

/* POST Benutzer erstellen. */
router.post("/", function (req, res) {
  let userToLogin = req.body;

  const url = "mongodb://127.0.0.1:27017/";

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    console.log("Verbindung hergestellt");
    var db = client.db("toxMap");
    db.collection("users").findOne(
      { firstName: userToLogin.firstName },
      function (err, result) {
        if (err) throw err;
        if (result == null) {
          console.log("Ungültige Anmeldeinformationen");
          res.status(401).send("Ungültige Anmeldeinformationen");
        } else if (result.password == null) {
          console.log("Ungültige Anmeldeinformationen");
          res.status(401).send("Ungültige Anmeldeinformationen");
        } else {
          if (result.password === simpleHashCode(userToLogin.password)) {
            console.log("Anmeldung erfolgreich");
            res
              .json({ username: result.firstName, role: result.role })
              .status(200);
          } else {
            console.log("Ungültige Anmeldeinformationen");
            res.status(401).send("Ungültige Anmeldeinformationen");
          }
        }
        client.close();
      }
    );
  });
});

/**
 * Vereinfachte Implementierung einer Hash-Funktion für Passwörter.
 * @param {string} str - Der zu hashende String.
 * @returns {number} - Der Hash-Wert des Strings.
 */
function simpleHashCode(str) {
  let hash = 0;

  for (const char of str) {
    hash += char.charCodeAt(0);
  }

  return hash;
}

module.exports = router;
