import { registrarAccion } from "./historial.js";
import { obtenerSeleccion, desactivarSeleccion } from "./seleccion.js";

const ataqueBtn = document.getElementById("ataque-btn");
const defensaBtn = document.getElementById("defensa-btn");

function atacar() {
  const seleccion = obtenerSeleccion();
  if (seleccion) {
    registrarAccion(`Atacando con ${seleccion}`);
    desactivarSeleccion();
  }
}

function defender() {
  const seleccion = obtenerSeleccion();
  if (seleccion) {
    registrarAccion(`Defendiendo con ${seleccion}`);
    desactivarSeleccion();
  }
}

export function setupAcciones() {
  ataqueBtn.addEventListener("click", atacar);
  defensaBtn.addEventListener("click", defender);
}
