# ToxMap Berlin (English Version)

ToxMap Berlin is an interactive website that displays environmentally harmful locations on a map in Berlin. Locations can be added either via coordinates or by providing an address (street, house number, postal code, and city). Each location can be accompanied by a description, specifying the type and severity of environmental pollution.

## Features

- Two user roles:
  - Admin (Username: Admina, Password: password) - Can add, edit, and delete locations.
  - Normal user (Username: Normalo, Password: password) - Can only view locations.

## Technologies

- Map display: Mapbox
- Geocoding (Address and coordinate lookup): nominatim.openstreetmap.org
- Styling: Tailwind CSS

## Requirements

To run the project locally, the following requirements must be met:

1. For the version without MongoDB (master branch):
   - No additional requirements. The project can be opened directly in a web browser.

2. For the version with MongoDB (node-mongo-db-version branch):
   - Local MongoDB database with the collections "locations" and "user" in the database "toxMap".
   - The required data is stored in the ".json" format in the "database" folder.

## Installation

1. Clone the repository:

```
git clone https://github.com/frievoe97/toxmap-berlin.git
cd toxmap-berlin
```

2. Open the `index.html` in your preferred web browser.

## Live Demo

You can find a live demo of the website at [toxmap.friedrichvoelkers.de](https://toxmap.friedrichvoelkers.de).

# ToxMap Berlin (German Version)

ToxMap Berlin ist eine interaktive Webseite, die umweltschädliche Standorte in Berlin auf einer Karte anzeigt. Die Standorte können entweder über Koordinaten oder über eine Adresse (Straße, Hausnummer, PLZ und Stadt) hinzugefügt werden. Jeder Standort kann mit einer Beschreibung versehen werden, die die Art der Umweltverschmutzung beschreibt und wie stark sie ist.

## Funktionen

- Zwei Benutzerrollen:
  - Admin (Name: Admina, Passwort: password) - Kann Standorte hinzufügen, bearbeiten und löschen.
  - Normaler Nutzer (Name: Normalo, Passwort: password) - Kann nur Standorte ansehen.

## Technologien

- Kartenanzeige: Mapbox
- Geocoding (Adress- und Koordinatenabfrage): nominatim.openstreetmap.org
- Styling: Tailwind CSS

## Anforderungen

Um das Projekt lokal auszuführen, sind folgende Voraussetzungen zu erfüllen:

1. Für die Version ohne MongoDB (master branch):
   - Keine weiteren Anforderungen. Das Projekt kann direkt im Browser geöffnet werden.

2. Für die Version mit MongoDB (node-mongo-db-version branch):
   - Lokale MongoDB-Datenbank mit den Collections "locations" und "user" in der Datenbank "toxMap".
   - Die benötigten Daten sind im .json-Format im "database" Ordner gespeichert.

## Installation

1. Klone das Repository:

```
git clone https://github.com/frievoe97/toxmap-berlin.git
cd toxmap-berlin
```

2. Öffne die `index.html` im Browser deiner Wahl.

## Live-Demo

Eine Live-Demo der Webseite findest du unter [toxmap.friedrichvoelkers.de](https://toxmap.friedrichvoelkers.de).

