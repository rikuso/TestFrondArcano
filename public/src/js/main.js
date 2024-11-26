import { registrarAccion } from "./historial.js";

const personaje = document.getElementById("personaje");
const familiar = document.getElementById("familiar");
const ataqueBtn = document.getElementById("ataque-btn");
const defensaBtn = document.getElementById("defensa-btn");
const mensaje = document.getElementById("mensaje-accion");
const listaAcciones = document.getElementById("lista-acciones");
//NUEVO
const listaAccionesPropias = document.getElementById("lista-acciones-propias");
const listaAccionesOponente = document.getElementById("lista-acciones-oponente");
let seleccionActual = null;

// Inicializar socket.io
const socket = io(); // Conectar al servidor
let jugadorID = null;

// Obtener el ID del jugador al conectarse
socket.on("connect", () => {
  jugadorID = socket.id;
  console.log("Conectado con ID:", jugadorID);
});


// Escuchar actualizaciones desde el servidor
socket.on("actualizar-acciones", (data) => {
  const { jugadorID: id, jugador, accion } = data;

  console.log("Acción recibida del servidor:", data);
  console.log("usuario:",  socket.id);
   if (id === jugadorID) {
    // Acción propia
    registrarAccion(listaAccionesPropias, `Tú realizaste: ${jugador} ${accion}`);
    registrarAccion(listaAcciones, `Tú realizaste: ${jugador} ${accion}`);
  } else {
    // Acción de otro jugador
    registrarAccion(listaAcciones, `Otro jugador (${id.slice(0, 5)}) realizó: ${jugador} ${accion}`);
    // Acción del oponente
    registrarAccion(listaAccionesOponente, `Oponente realizó: ${jugador} ${accion}`);

  }
  //registrarAccion(listaAcciones,`${data.accion} con ${data.jugador} del usuario ${socket.id}`); // Mostrar acción recibida en el historial
});

// Enviar jugada al servidor
function enviarJugada(tipoAccion) {
  if (!seleccionActual) {
    console.warn("No se ha seleccionado ningún personaje o familiar");
    return;
  }

  const jugada = {
    jugador: seleccionActual,
    accion: tipoAccion,
    //timestamp: Date.now(), // Agregar un tiempo para diferenciar acciones
  };

  console.log("Enviando jugada:", jugada);
  socket.emit("jugada", jugada); // Enviar al servidor
}

// Manejar ataques
function manejarAtaque() {
  if (!seleccionActual) return;
  enviarJugada("Atacar"); // Enviar jugada al servidor
  desactivarSeleccion();
}

// Manejar defensas
function manejarDefensa() {
  if (!seleccionActual) return;
  enviarJugada("Defender"); // Enviar jugada al servidor
  desactivarSeleccion();
}

// Manejar selección de personaje o familiar
function seleccionar(e) {
  const seleccionado = e.currentTarget;
  const nombre = seleccionado.dataset.nombre;

  // Actualizar selección visual
  [personaje, familiar].forEach((elem) => elem.classList.remove("activo"));
  seleccionado.classList.add("activo");

  seleccionActual = nombre;

  // Activar botones de acción
  ataqueBtn.classList.remove("inactivo");
  defensaBtn.classList.remove("inactivo");

  mensaje.textContent = `Seleccionaste a ${nombre}`;
}

// Desactivar selección
function desactivarSeleccion() {
  mensaje.textContent = `Acción registrada: ${seleccionActual}`;
  ataqueBtn.classList.add("inactivo");
  defensaBtn.classList.add("inactivo");

  setTimeout(() => {
    [personaje, familiar].forEach((elem) => elem.classList.remove("activo"));
    mensaje.textContent = "Selecciona un Personaje o Familiar";
    seleccionActual = null;
  }, 3000); // Reducido a 3 segundos
}

// Event listeners
personaje.addEventListener("click", seleccionar);
familiar.addEventListener("click", seleccionar);
ataqueBtn.addEventListener("click", manejarAtaque);
defensaBtn.addEventListener("click", manejarDefensa);
