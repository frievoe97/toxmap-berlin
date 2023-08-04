/////////////////////////////////////////////////////////////////////////////// KONSTANTEN //////////////////////////////////////////////////////////////////////////////

const apiKey = window.env.API_KEY;

// Konstanten für die Bildschirme
const SCREENS = {
  LOGIN: "login-screen",
  MAP: "map-screen",
  ADD: "add-screen",
  UPDATE_DELETE: "update-delete-screen",
  IMPRINT: "imprint-screen",
  PRIVACY_POLICY: "privacy-policy-screen",
};

// Konstanten für die Buttons
const BUTTONS = {
  ABMELDE_BUTTON: "abmelden-btn",
  HAMBURGER_MENU: "hamburger-btn",
  ADD_BUTTON: "add-btn",
  SAVE_BUTTON: "save-btn",
  UPDATE_BUTTON: "update-btn",
  DELETE_BUTTON: "delete-btn",
  CANCEL_ADD_BUTTON: "cancel-add-btn",
  CLEAR_BUTTON: "clear-btn",
  CANCEL_UPDATE_DELETE_BUTTON: "cancel-update-delete-btn",
  CLOSE_IMPRINT_BUTTON: "close-button-imprint",
  CLOSE_PRIVACY_BUTTON: "close-button-privacy",
};

// DOM-Elemente
let updateDeleteForm = document.getElementById("update-delete-form");
let addForm = document.getElementById("add-form");
let listItems = document.querySelectorAll("#location-list li");

// Sidebar-Element und Hamburger-Menü
const sidebar = $("#sidebar");
const hamburgerBtn = $("#hamburger-btn");

// Status für die Anzeige des Imprints/Privacy-Policy Screen.
// Status des zuletzt oder aktuellen Screen
// Aktuell noch nicht in verwendung
// Mein Gefühl sagt mir, dass sowas nützlich sein könnte
let showImprint = false;
let showPrivacyPolicy = false;
let lastOpenedScreen = SCREENS.LOGIN;

// Liste mit allen Locations. Standard sind diese drei hartkodierten Locations
const locationData = [
  {
    name: "Bundesgeschäftsstelle FDP",
    description: "Bundesgeschäftsstelle Freie Demokratische Partei",
    latitude: 52.5238688,
    longitude: 13.3849966,
    street: "Reinhardtstraße",
    zipcode: 10117,
    city: "Berlin",
    housenumber: 14,
    marker: L.marker([52.5238688, 13.3849966]),
    category: "stark",
  },
  {
    name: "Vattenfall Heizkraftwerk Moabit",
    description: "Vattenfall Heizkraftwerk Moabit",
    latitude: 52.53872,
    longitude: 13.3522,
    street: "Friedrich-Krause-Ufer",
    zipcode: 13353,
    city: "Berlin",
    housenumber: 10,
    marker: L.marker([52.5371787, 13.3451339]),
    category: "stark",
  },
  {
    name: "Fernheizwerk Neukölln AG",
    description: "Fernheizwerk Neukölln AG",
    latitude: 52.4787321,
    longitude: 13.4542272,
    street: "Weigandufer",
    zipcode: 12059,
    city: "Berlin",
    housenumber: 49,
    marker: L.marker([52.4787321, 13.4542272]),
    category: "stark",
  },
];

// Berlin Umrandung (grob)
const latMin = 52.28196;
const latMax = 52.77391;
const lonMin = 13.001171;
const lonMax = 14.015573;

////////////////////////////////////////////////////////////////////////////// SCREEN WECHSEL //////////////////////////////////////////////////////////////////////////
/**
 * Öffnet den Add-Screen
 */
function openAddScreen() {
  // Elemente anzeigen/verstecken
  hide(SCREENS.LOGIN);
  hide(SCREENS.MAP);
  show(SCREENS.ADD);
  hide(SCREENS.UPDATE_DELETE);
  hide(SCREENS.IMPRINT);
  hide(SCREENS.PRIVACY_POLICY);
  show(BUTTONS.ABMELDE_BUTTON);
  show(BUTTONS.HAMBURGER_MENU);

  // Sidebar ausblenden
  toggleSidebar(false);

  // Update last opened screen
  lastOpenedScreen = SCREENS.ADD;

  // Form zurücksetzen (gleicher ablauf wie handleClearButton() -> könnte in eine funktion)
  // hier oder bei cancel klick ?!
  // Speichert das aktuelle Formular von Add-Screen
  const addForm = document.getElementById("add-form");

  // Setzt die Werte der Add-Formualrs zurück
  addForm.elements.city.value = "";
  addForm.elements.zipcode.value = "";
  addForm.elements.housenumber.value = "";
  addForm.elements.street.value = "";
  addForm.elements.name.value = "";
  addForm.elements.lat.value = "";
  addForm.elements.lon.value = "";
  addForm.elements.description.value = "";
  addForm.elements.category.value = "";
}

/**
 * Öffnet den Update-Delete-Screen
 */
function openUpdateDeleteScreen() {
  // Elemente anzeigen/verstecken
  hide(SCREENS.LOGIN);
  hide(SCREENS.MAP);
  hide(SCREENS.ADD);
  show(SCREENS.UPDATE_DELETE);
  hide(SCREENS.IMPRINT);
  hide(SCREENS.PRIVACY_POLICY);
  show(BUTTONS.ABMELDE_BUTTON);
  show(BUTTONS.HAMBURGER_MENU);

  // Sidebar ausblenden
  toggleSidebar(false);

  // Update last opened screen
  lastOpenedScreen = SCREENS.UPDATE_DELETE;
}

/**
 * Öffnet den Login-Screen
 */
function openLoginScreen() {
  // Elemente anzeigen/verstecken
  show(SCREENS.LOGIN);
  hide(SCREENS.MAP);
  hide(SCREENS.ADD);
  hide(SCREENS.UPDATE_DELETE);
  hide(SCREENS.IMPRINT);
  hide(SCREENS.PRIVACY_POLICY);
  hide(BUTTONS.ABMELDE_BUTTON);
  hide(BUTTONS.HAMBURGER_MENU);

  // Sidebar ausblenden
  toggleSidebar(false);

  // Update last opened screen
  lastOpenedScreen = SCREENS.LOGIN;
}

/**
 * Öffnet den Map-Screen
 */
function openMapScreen() {
  // Elemente anzeigen/verstecken
  hide(SCREENS.LOGIN);
  show(SCREENS.MAP);
  hide(SCREENS.ADD);
  hide(SCREENS.UPDATE_DELETE);
  hide(SCREENS.IMPRINT);
  hide(SCREENS.PRIVACY_POLICY);
  show(BUTTONS.ABMELDE_BUTTON);
  show(BUTTONS.HAMBURGER_MENU);

  // Sidebar ausblenden
  toggleSidebar(true);

  // Update last opened screen
  lastOpenedScreen = SCREENS.MAP;

  window.dispatchEvent(new Event("resize"));
}

function openImprintScreen() {
  hide(SCREENS.LOGIN);
  hide(SCREENS.MAP);
  hide(SCREENS.ADD);
  hide(SCREENS.UPDATE_DELETE);
  show(SCREENS.IMPRINT);
  hide(SCREENS.PRIVACY_POLICY);
  show(BUTTONS.ABMELDE_BUTTON);
  show(BUTTONS.HAMBURGER_MENU);
  toggleSidebar(false);
}

function openPrivacyPolicyScreen() {
  hide(SCREENS.LOGIN);
  hide(SCREENS.MAP);
  hide(SCREENS.ADD);
  hide(SCREENS.UPDATE_DELETE);
  hide(SCREENS.IMPRINT);
  show(SCREENS.PRIVACY_POLICY);
  show(BUTTONS.ABMELDE_BUTTON);
  show(BUTTONS.HAMBURGER_MENU);
  toggleSidebar(false);
}

/**
 * Versteckt ein HTML-Element anhand seiner ID.
 * @param {string} id - Die ID des HTML-Elements.
 */
function hide(id) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.add("hidden");
  }
}

/**
 * Zeigt ein HTML-Element anhand seiner ID.
 * @param {string} id - Die ID des HTML-Elements.
 */
function show(id) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.remove("hidden");
  }
}

/////////////////////////////////////////////////////////////////////////////// SIDEBAR & HEADCLICK ///////////////////////////////////////////////////////////////////////////

/**
 * Eventhandler für das Klicken auf den Hamburger-Button.
 * Wechselt den Zustand der Sidebar zwischen geöffnet und geschlossen.
 */
$(document).ready(function () {
  hamburgerBtn.click(function () {
    toggleSidebar(!sidebar.hasClass("open"));
  });
});

/**
 * Zeigt oder versteckt die Sidebar.
 * @param {boolean} showSidebar - Gibt an, ob die Sidebar angezeigt werden soll (true) oder nicht (false).
 */
function toggleSidebar(showSidebar) {
  if (showSidebar) {
    // Fügt die CSS-Klasse "open" hinzu, um die Sidebar anzuzeigen
    sidebar.addClass("open");
  } else {
    // Entfernt die CSS-Klasse "open", um die Sidebar zu verstecken
    sidebar.removeClass("open");
  }
}

////////////////////////////////////////////////////////////////////////// MAP & MARKER /////////////////////////////////////////////////////////////////////////////////

// Legt die Optionen für die Karte fest
const mapOptions = {
  center: [52.507878, 13.416298],
  zoom: 14,
};

// Fügt die Karte dem div mit der id 'map' hinzu
const map = new L.map("map", mapOptions);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
    id: "mapbox/streets-v11",
    accessToken: apiKey,
  }
).addTo(map);

// Zoom-Buttons oben links entfernen
map.zoomControl.remove();

// Zoom-Buttons oben rechts hinzufügen
L.control.zoom({ position: "topright" }).addTo(map);

// Scale hinzufügen
const scale = L.control.scale();
scale.addTo(map);

// Liste für die Marker auf der Karte
const markerList = [];

/**
 * Aktualisiert die Markerliste auf der Karte.
 */
function updateMarkerList() {
  // Entfernt alle Marker aus der Karte
  for (let i = 0; i < markerList.length; i++) {
    markerList[i].off("click");
    map.removeLayer(markerList[i]);
  }

  // Fügt die Marker der aktuellen locationData-Liste zur Karte hinzu
  for (let i = 0; i < locationData.length; i++) {
    markerList.push(
      locationData[i].marker
        .on("click", function () {
          clickOnLocationMarker(locationData[i].name);
        })
        .addTo(map)
    );
  }
}

function clickOnLocationMarker(msg) {
  alert(msg);
}

/////////////////////////////////////////////////////////////////////////// LOGIN ///////////////////////////////////////////////////////////////////////////////////////

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

// Benutzerdaten
const allUserData = new Map();
allUserData.set("admina", {
  password: simpleHashCode("password"),
  isAdmin: true,
});
allUserData.set("normalo", {
  password: simpleHashCode("password"),
  isAdmin: false,
});

// Aktuell angemeldeter Benutzer
let currentUser = "";

// Zuletzt angeklickte Location
let lastClickedLocation;

/**
 * Eventhandler für den Login-Button.
 * Überprüft die Benutzerdaten und meldet den Benutzer an.
 * Zeigt die entsprechenden Screen und Buttons basierend auf der Benutzerrolle an.
 * @param {Event} event - Das Klick-Event des Login-Buttons.
 */
function pressLoginButton(event) {
  event.preventDefault();

  const loginForm = document.getElementById("login-form");
  const usernameInput = loginForm.elements["username"];
  const passwordInput = loginForm.elements["password"];
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Überprüfung der Benutzerdaten
  if (
    !allUserData.has(username) ||
    allUserData.get(username).password != simpleHashCode(password)
  ) {
    alert("Login fehlgeschlagen!");
    loginForm.reset();
    return;
  }

  // Aktuell angemeldeter Benutzer wird gespeichert
  currentUser = username;

  // Begrüßungsnachricht anzeigen
  document.getElementById("welcome-message").innerHTML = `Willkommen ${
    currentUser.charAt(0).toUpperCase() + currentUser.slice(1).toLowerCase()
  }!`;

  openMapScreen();

  // Buttons basierend auf Benutzerrolle anzeigen/verstecken
  if (allUserData.get(username).isAdmin) {
    show(BUTTONS.ADD_BUTTON);
    show(BUTTONS.UPDATE_BUTTON);
    show(BUTTONS.DELETE_BUTTON);
  } else {
    hide(BUTTONS.ADD_BUTTON);
    hide(BUTTONS.UPDATE_BUTTON);
    hide(BUTTONS.DELETE_BUTTON);
  }

  // Sidebar einblenden
  toggleSidebar(true);

  // Formular zurücksetzen
  loginForm.reset();

  console.log("Erfolgreich angemeldet als:", currentUser);
  console.log("isAdmin:", allUserData.get(username).isAdmin);
}

/**
 * Eventhandler für den Logout-Button.
 * Meldet den Benutzer ab und zeigt den Login-Bildschirm an.
 */
function pressLogoutButton() {
  // Elemente anzeigen/verstecken
  openLoginScreen();

  // Sidebar ausblenden
  toggleSidebar(false);

  lastOpenedScreen = SCREENS.LOGIN;

  // Setzt den aktuell angemeldeten Benutzer zurücks
  currentUser = "";
}

/////////////////////////////////////////////////////////////////////////////// ADD UPDATE DELETE ///////////////////////////////////////////////////////////////////////

/**
 * Fügt Eventlistener für die Listenelemente hinzu.
 */
function addEventListenerForListElements() {
  const listItems = document.querySelectorAll("#location-list li");
  listItems.forEach(function (item) {
    item.addEventListener("click", function () {
      clickOnLocationListElement(this);
    });
  });
}

/**
 * Fügt Eventlistener für die Formulare im Add- und Update/Delete-Bildschirm hinzu.
 */
function addEventListenerForAddAndUpdateDeleteScreenForms() {
  // Eventlistener für das Update-Delete-Formular hinzufügen
  updateDeleteForm.addEventListener("click", function (event) {
    event.preventDefault();
    const clickedButton = event.target;
    if (clickedButton.id === BUTTONS.UPDATE_BUTTON) {
      handleUpdateButton(event);
    } else if (clickedButton.id === BUTTONS.DELETE_BUTTON) {
      handleDeleteButton(event);
    } else if (clickedButton.id === BUTTONS.CANCEL_UPDATE_DELETE_BUTTON) {
      handleCancelButton(event);
    }
  });
  // Eventlistener für das Add-Formular hinzufügen
  addForm.addEventListener("click", function (event) {
    event.preventDefault();
    const clickedButton = event.target;
    if (clickedButton.id === BUTTONS.SAVE_BUTTON) {
      handleSaveButton(event);
    } else if (clickedButton.id === BUTTONS.CANCEL_ADD_BUTTON) {
      handleCancelButton(event);
    } else if (clickedButton.id === BUTTONS.CLEAR_BUTTON) {
      handleClearButton(event);
    }
  });
}

// function pressButtonOnUpdateDeleteScreen(event) {
//   event.preventDefault();
//   const clickedButton = event.target;
//   if (clickedButton.id === BUTTONS.UPDATE_BUTTON) {
//     handleUpdateButton(event);
//   } else if (clickedButton.id === BUTTONS.DELETE_BUTTON) {
//     handleDeleteButton(event);
//   } else if (clickedButton.id === BUTTONS.CANCEL_UPDATE_DELETE_BUTTON) {
//     handleCancelButton(event);
//   }
// }

// function pressButtonOnAddcreen(event) {
//   event.preventDefault();
//   const clickedButton = event.target;
//   if (clickedButton.id === BUTTONS.SAVE_BUTTON) {
//     handleSaveButton(event);
//   } else if (clickedButton.id === BUTTONS.CANCEL_ADD_BUTTON) {
//     handleCancelButton(event);
//   } else if (clickedButton.id === BUTTONS.CLEAR_BUTTON) {
//     handleClearButton(event);
//   }
// }

/**
 * Eventhandler für das Klicken auf eine Location.
 * Aktualisiert das Update-Delete-Formular mit den Daten der angeklickten Location.
 * @param {HTMLElement} element - Das geklickte Listenelement.
 */
function clickOnLocationListElement(element) {
  // Speichert den Namen der angeklickten Location
  const locationName = element.firstChild.firstChild.textContent;

  // Speichert das zugehörige Element aus der locationData-Liste
  lastClickedLocation = locationData.find((item) => item.name === locationName);

  // Speichert das aktuelle Update-Delete-Formular
  const updateDeleteForm = document.getElementById("update-delete-form");

  // Aktualisiert die Felder des Formulars mit den Daten der geklickten Location
  updateDeleteForm.elements["name"].value = lastClickedLocation.name;
  updateDeleteForm.elements["street"].value = lastClickedLocation.street;
  updateDeleteForm.elements["housenumber"].value =
    lastClickedLocation.housenumber;
  updateDeleteForm.elements["zipcode"].value = lastClickedLocation.zipcode;
  updateDeleteForm.elements["city"].value = lastClickedLocation.city;
  updateDeleteForm.elements["lat"].value = lastClickedLocation.latitude;
  updateDeleteForm.elements["lon"].value = lastClickedLocation.longitude;
  updateDeleteForm.elements["description"].value =
    lastClickedLocation.description;
  updateDeleteForm.elements["category"].value = lastClickedLocation.category;

  // Anzeigen des Update-Delete-Screen
  openUpdateDeleteScreen();
}

/**
 * Wandelt eine Adresse in geografische Koordinaten um.
 * Ruft die Nominatim API auf, um die Koordinaten abzurufen.
 * @param {string} street - Straßenname.
 * @param {string} housenumber - Hausnummer.
 * @param {string} zipcode - Postleitzahl.
 */
async function convertAdressIntoCoordinates(street, housenumber, zipcode) {
  const address = `${street} ${housenumber}, ${zipcode}`;

  console.log("address request: ", address);

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const latitude = parseFloat(data[0].lat);
      const longitude = parseFloat(data[0].lon);

      return {
        latitude: latitude,
        longitude: longitude,
      };
    } else {
      alert("Es konnte keine passende Adresse gefunden werden.");
      return null;
    }
  } catch (error) {
    alert("Es gab einen Fehler bei der API-Abfrage. Bitte versuche es erneut.");
    return null;
  }
}

/**
 * Hier wird überprüft ob die pbergebenen Coordinaten innerhalb Berlins sind
 * @param {} coordinates
 * @returns true wenn innerhalb Berlins, false wenn außerhalb
 */
function coordinatesInBerlin(coordinates) {
  if (
    latMin > coordinates.latitude ||
    latMax < coordinates.latitude ||
    lonMin > coordinates.longitude ||
    lonMax < coordinates.longitude
  ) {
    console.log("coordinaten not in berlin");
    return false;
  }
  console.log("coordinaten in berlin");
  return true;
}

////// UPDATE BUTTON //

/**
 * Gibt die Eingabedaten aus dem Update/Delete-Formular zurück.
 * @returns {Array} - Ein Array mit den Eingabedaten [lat, lon, city, zipcode, housenumber, street, locationName].
 */
function getInputFromUpdateDeleteForm() {
  const {
    lat,
    lon,
    city,
    zipcode,
    housenumber,
    street,
    name,
    description,
    category,
  } = updateDeleteForm.elements;

  return [
    lat.value,
    lon.value,
    city.value,
    zipcode.value,
    housenumber.value,
    street.value,
    name.value,
    description.value,
    category.value,
  ];
}

/**
 * Eventhandler für den Update-Button im Update/Delete-Bildschirm.
 * Aktualisiert eine Location basierend auf den Eingabedaten im Formular.
 * @param {Event} event - Das Klick-Event des Update-Buttons.
 */
async function handleUpdateButton(event) {
  // Verhindert das Standardverhalten des Klickereignisses
  event.preventDefault();

  // Speichert die Eingabedaten aus dem Update-Delete-Formular
  const [
    lat,
    lon,
    city,
    zipcode,
    housenumber,
    street,
    locationName,
    description,
    category,
  ] = getInputFromUpdateDeleteForm();

  // Überprüft, wenn name verändert wurde, ob der Name bereits existiert
  if (lastClickedLocation.name != locationName) {
    if (isNameAlreadyExists(locationName)) {
      alert("Der Name " + locationName + " existiert bereits");
      return;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////// OLE INPUT CHECK AND CONVERT TO COORDINATES >>>>>>>>>>>>>>>>>>>>>>>>
  // kann irgend wie in eine funktion gekapselt werden weil es beim save nochmal gebraucht wird
  // problem dabei: wir müssen informationen über falsche eingaben oder coordinaten zurückgeben

  // coordinaten objekt hier deklarieren sonst meckert der compiler
  let coordinates = {
    latitude: null,
    longitude: null,
  };

  // eingabecheck nach use-cases siehe moodle übung KW19

  if (!locationName) {
    console.log("no name, return");
    alert("Name fehlt");
    return;
  }

  if (street && housenumber && zipcode) {
    console.log("get coordinates from addres");
    // Konvertiert die Adresse in Koordinaten
    coordinates = await convertAdressIntoCoordinates(
      street,
      housenumber,
      zipcode
    );
  } else if (lat && lon) {
    console.log("get coordinates from input");
    coordinates.latitude = Number(lat);
    coordinates.longitude = Number(lon);
  } else {
    console.log("invalid input");
    alert("Eingabe unvollständig");
    return;
  }

  if (!coordinatesInBerlin(coordinates)) {
    alert("Location nicht in Berlin");
    return;
  }

  console.log("coordinates to put to locationData", coordinates);

  ///////////////////////////////////////////////////////////////////////////////////////// OLE INPUT CHECK AND CONVERT TO COORDINATES <<<<<<<<<<<<<<<<<<<

  // Entfernt das Element aus der locationData-Liste
  for (let i = 0; i < locationData.length; i++) {
    if (locationData[i].name == lastClickedLocation.name) {
      locationData.splice(i, 1);
    }
  }

  if (coordinates) {
    // Fügt die aktualisierte Location zur locationData-Liste hinzu
    locationData.push({
      name: locationName,
      description: description,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      street: street,
      zipcode: zipcode,
      city: city,
      housenumber: housenumber,
      marker: L.marker([coordinates.latitude, coordinates.longitude]),
      category: category,
    });

    // Aktualisiert die Markerliste
    updateMarkerList();

    // Rendert die LocationData-Liste neu und wechselt zum Map-Screen
    renderList();
    openMapScreen();
  } else {
    alert("Fehler beim Konvertieren der Adresse in Koordinaten.");
  }
}

/////////////////////////////////////////////////////////////////////////////// IMPRINT AND PRIVACY ///////////////////////////////////////////////////////////////////////

function addEventListenerClosingButton() {
  const closeImprintButton = document.getElementById(
    BUTTONS.CLOSE_IMPRINT_BUTTON
  );
  const closePrivacyButton = document.getElementById(
    BUTTONS.CLOSE_PRIVACY_BUTTON
  );

  closeImprintButton.addEventListener("click", function () {
    switch (lastOpenedScreen) {
      case SCREENS.MAP:
        openMapScreen();
        break;
      case SCREENS.LOGIN:
        openLoginScreen();
        break;
      case SCREENS.UPDATE_DELETE:
        openUpdateDeleteScreen();
        break;
      case SCREENS.ADD:
        openAddScreen();
        break;
      default:
        openLoginScreen();
    }
  });
  closePrivacyButton.addEventListener("click", function () {
    switch (lastOpenedScreen) {
      case SCREENS.MAP:
        openMapScreen();
        break;
      case SCREENS.LOGIN:
        openLoginScreen();
        break;
      case SCREENS.UPDATE_DELETE:
        openUpdateDeleteScreen();
        break;
      case SCREENS.ADD:
        openAddScreen();
        break;
      default:
        openLoginScreen();
    }
  });
}

////// DELETE BUTTON //

/**
 * Eventhandler für den Delete-Button im Update/Delete-Bildschirm.
 * Löscht die aktuelle Location aus der locationData-Liste.
 * @param {Event} event - Das Klick-Event des Delete-Buttons.
 */
function handleDeleteButton(event) {
  // Verhindert das Standardverhalten des Klickereignisses
  event.preventDefault();

  // Durchläuft die locationData-Liste und sucht nach der zu löschenden Location
  for (let i = 0; i < locationData.length; i++) {
    if (locationData[i].name == lastClickedLocation.name) {
      // Entfernt die Location aus der locationData-Liste
      locationData.splice(i, 1);
    }
  }

  // Aktualisiert die Markerliste und rendert die Locationliste neu
  updateMarkerList();
  renderList();

  // Wechselt zum Map-Screen
  openMapScreen();
}

////// CANCEL BUTTON //

/**
 * Eventhandler für den Cancel-Button im Update/Delete-Bildschirm.
 * Zeigt den Map-Screen an und versteckt den Update/Delete-Bildschirm.
 * @param {Event} event - Das Klick-Event des Cancel-Buttons.
 */
function handleCancelButton(event) {
  // Verhindert das Standardverhalten des Klickereignisses
  event.preventDefault();

  // Wechselt zum Map-Screen
  openMapScreen();
}

////// SAVE BUTTON //

/**
 * Gibt die Eingabedaten aus dem Add-Formular zurück.
 * @returns {Array} - Ein Array mit den Eingabedaten [city, zipcode, housenumber, street, locationName].
 */
function getInputFromAddForm() {
  console.log(addForm.elements.category.value);
  const {
    lat,
    lon,
    city,
    zipcode,
    housenumber,
    street,
    name,
    description,
    category,
  } = addForm.elements;
  return [
    lat.value,
    lon.value,
    city.value,
    zipcode.value,
    housenumber.value,
    street.value,
    name.value,
    description.value,
    category.value,
  ];
}

/**
 * Eventhandler für den Save-Button im Add-Formular.
 * Fügt eine neue Location zur locationData-Liste hinzu.
 * @param {Event} event - Das Klick-Event des Save-Buttons.
 */
async function handleSaveButton(event) {
  // Verhindert das Standardverhalten des Klickereignisses
  event.preventDefault();

  // Speichert die Eingabedaten aus dem Add-Formular
  const [
    lat,
    lon,
    city,
    zipcode,
    housenumber,
    street,
    locationName,
    description,
    category,
  ] = getInputFromAddForm();

  console.log(
    "extracted from add form",
    lat,
    lon,
    city,
    zipcode,
    housenumber,
    street,
    locationName
  );

  // Überprüft, ob der Name bereits vorhanden ist
  if (isNameAlreadyExists(locationName)) {
    alert("Der Name " + locationName + " existiert bereits");
    return;
  }

  ///////////////////////////////////////////////////////////////////////////////////////// OLE INPUT CHECK AND CONVERT TO COORDINATES >>>>>>>>>>>>>>>>>>>>>>>>
  // kann irgend wie in eine funktion gekapselt werden weil es beim update nochmal gebraucht wird
  // problem dabei: wir müssen informationen über falsche eingaben oder coordinaten zurückgeben

  // coordinaten objekt hier deklarieren sonst meckert compiler
  let coordinates = {
    latitude: null,
    longitude: null,
  };

  // Eingabecheck nach Use-Cases siehe moodle Übung KW19

  if (!locationName) {
    console.log("no name, return");
    alert("Name fehlt");
    return;
  }

  if (street && housenumber && zipcode) {
    console.log("get coordinates from addres");
    // Konvertiert die Adresse in Koordinaten
    coordinates = await convertAdressIntoCoordinates(
      street,
      housenumber,
      zipcode
    );
    // hier coordinaten auf null untersuchen
  } else if (lat && lon) {
    console.log("get coordinates from input");
    coordinates.latitude = Number(lat);
    coordinates.longitude = Number(lon);
  } else {
    console.log("invalid input");
    alert("Eingabe unvollständig");
    return;
  }

  if (!coordinatesInBerlin(coordinates)) {
    alert("Location nicht in Berlin");
    return;
  }

  console.log("coordinates to put to locationData", coordinates);

  ///////////////////////////////////////////////////////////////////////////////////////// OLE INPUT CHECK AND CONVERT TO COORDINATES <<<<<<<<<<<<<<<<<<<

  if (coordinates) {
    // Fügt eine neue Location zur locationData-Liste hinzu
    locationData.push({
      name: locationName,
      description: description,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      street: street,
      zipcode: zipcode,
      city: city,
      housenumber: housenumber,
      marker: L.marker([coordinates.latitude, coordinates.longitude]),
      category: category,
    });

    // Aktualisiert die Markerliste und rendert die Locationliste neu
    updateMarkerList();
    renderList();

    // Wechselt zum Map-Screen
    openMapScreen();
  } else {
    alert("Fehler beim Konvertieren der Adresse in Koordinaten.");
  }
}

////// CLEAR BUTTON //

/**
 * Behandelt das Klicken auf den Clear-Button, um die Formularfelder zurückzusetzen.
 * @param {Event} event - Das Klickereignis
 */
function handleClearButton(event) {
  // Verhindert das Standardverhalten des Klickereignisses
  event.preventDefault();

  // Speichert das aktuelle Formular von Add-Screen
  const addForm = document.getElementById("add-form");

  // Setzt die Werte der Add-Formualrs zurück
  addForm.elements.city.value = "";
  addForm.elements.zipcode.value = "";
  addForm.elements.housenumber.value = "";
  addForm.elements.street.value = "";
  addForm.elements.name.value = "";
  addForm.elements.lat.value = "";
  addForm.elements.lon.value = "";
  addForm.elements.description.value = "";
  addForm.elements.category.value = "";
}

/**
 * Rendert die Locationliste auf der Webseite in der Sidebar.
 */
function renderList() {
  // Zugriff auf das Element, in dem die Locationliste angezeigt wird
  const locationList = document.getElementById("location-list");
  // Zurücksetzen des Inhalts, um vorherige Einträge zu löschen
  locationList.innerHTML = "";

  // Erstellen der Listenelemente basierend auf den Location-Daten
  const listItems = locationData.map((element) => {
    // Erstellen der DOM-Elemente für einen Listeneintrag
    const listItem = document.createElement("li");
    const locationBox = document.createElement("div");
    const heading = document.createElement("h3");
    const description = document.createElement("p");
    const category = document.createElement("p");

    // Festlegen des Inhalts für Überschrift und Beschreibung basierend auf den Location-Daten
    heading.textContent = element.name;
    description.textContent = element.description;
    element.category
      ? (category.textContent = "Kategorie: " + element.category)
      : (category.textContent = "");

    // Hinzufügen von CSS-Klassen zu den DOM-Elementen
    locationBox.classList.add("location-box");
    heading.classList.add("location-heading");
    description.classList.add("location-description");
    category.classList.add("location-category");

    // Aufbau der Struktur durch Hinzufügen von Elementen als Kindelementen
    locationBox.appendChild(heading);
    locationBox.appendChild(description);
    locationBox.appendChild(category);
    listItem.appendChild(locationBox);

    return listItem;
  });

  // Hinzufügen der Listenelemente zum Location-Listen-Element
  locationList.append(...listItems);
  // Hinzufügen von Eventlistenern für die Listenelemente
  addEventListenerForListElements();
}

/**
 * Überprüft, ob ein bestimmter Name bereits in einem Array von Objekten vorhanden ist.
 * @param {string} name - Der zu überprüfende Name.
 * @param {Array} array - Das Array von Objekten, in dem nach dem Namen gesucht werden soll.
 * @returns {boolean} - Gibt true zurück, wenn der Name bereits vorhanden ist, andernfalls false.
 */
function isNameAlreadyExists(name) {
  for (let i = 0; i < locationData.length; i++) {
    if (locationData[i].name === name) {
      return true;
    }
  }
  return false;
}

/////////////////////////////////////////////////////////////////////////////// INIT ////////////////////////////////////////////////////////////////////////////////////

// Initialisierung
function init() {
  openLoginScreen();
  addEventListenerClosingButton();
  addEventListenerForAddAndUpdateDeleteScreenForms();
  renderList();
  updateMarkerList();
}

init();

// DONE/TODO:
//
// -  Beschreibung und Dropdown implementieren (bis jetzt nur im .html vorhanden)
// >  TODO können wir evtl rausnehmen war eh optional und dann passt es auch besser mit lat lon
//
// -  Impressum und Datenschutzerklärung wieder ausblenden (Evtl. über erneutes
//    klicken oder auf den Titel "ToxMap" klicken)
// >  TODO
//
// -  Sidebar ausblenden beim Impressum/PrivacyPolicy öffnen und wieder einblenden,
//    falls das vorher der Fall war.
// >  TODO
//
// -  1. und 2. Aufgabenblatt durchgehen und sicherstellen, dass alles vorhanden ist.
// >  TODO kann man nicht oft genug machen :D
