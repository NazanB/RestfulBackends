"use strict";
// Aufgabe : über den button soll zufalls zitate angezeigt werden
//über die fetch API die daten ziehen und über den button einen zufälligen  im main anzeigen lassen
//adresse über die wir fetchen müssen 'https://dummy-apis.netlify.app/api/quote'

//variablen anlegen für den button & main
const buttonGet = document.querySelector(".button");
const quoteField = document.querySelector(".quoteField");
const authorField = document.querySelector(".authorField");

function randomQuote() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => response.json())
    .then((quoteData) => {
      quoteField.innerText = quoteData.quote;
      authorField.innerText = quoteData.author;
    });
}

randomQuote();

buttonGet.addEventListener("click", randomQuote);
