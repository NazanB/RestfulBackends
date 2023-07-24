"use strict";
// aufgabe zufalls farbe durch den klick
// die zahlen und die slider müssen sich genauso anpassen zu dem zufallsFarbNummer
//daten aus der seite ziehen https://dummy-apis.netlify.app/api/color

//variablen zum ansprechen
let red = document.querySelector("#red");
let green = document.querySelector("#green");
let blue = document.querySelector("#blue");
const hexNum = document.querySelector("#hex-color");
const btn = document.querySelector(".buttonRandom");

//durch den klick
btn.addEventListener("click", getColor);

// über die funktion hole ich die daten für die rgb r, g, b
function getColor() {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((response) => response.json())
    .then((colorData) => {
      renderColor(colorData);
    });
}
//die farben rendern
function renderColor(colorObj) {
  //value werte vom colorData übergeben
  red.value = colorObj.rgb.r;
  green.value = colorObj.rgb.g;
  blue.value = colorObj.rgb.b;
  //auf website anzeigen lassen
  document.body.style.setProperty("--red", colorObj.rgb.r);
  document.body.style.setProperty("--green", colorObj.rgb.g);
  document.body.style.setProperty("--blue", colorObj.rgb.b);

  //rgb zahlen in hexidezumal umwandeln
  function hexStyle(n) {
    n = parseInt(n);
    let result = n.toString(16);
    return result.length < 2 ? "0" + result : result;
  }
  //auf Website die neuen hexidezimal zahlen anzeigen/umschreiben
  hexNum.innerText = `#${hexStyle(colorObj.rgb.r)}${hexStyle(
    colorObj.rgb.g
  )}${hexStyle(colorObj.rgb.b)}`;
}
getColor();
