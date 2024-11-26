// Importa las librerías necesarias
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
// Configura Express

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://127.0.0.1:5500", // Dirección de tu cliente
        methods: ["GET", "POST"],
      }
});

app.use(cors()); // Habilitar CORS para solicitudes externas
// Servir archivos estáticos desde el frontend
app.use(express.static("public"));



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  
let acciones = [];
// Escucha conexiones de clientes
io.on("connection", (socket) => {
  console.log("Jugador conectado:", socket.id);
  // Enviar el historial inicial al jugador que se conecta
  socket.emit("historial-acciones", acciones);

  // Escuchar las acciones de los jugadores
  socket.on("jugada", (data) => {

    console.log("Acción recibida del cliente:", data , "usuario id : " ,socket.id );
 
    // Agregar el ID del jugador a la jugada
    const jugadaConID = { jugadorID: socket.id, ...data };

    // Agregar la acción al historial
    acciones.push(data);

    // Limitar el historial a las últimas 50 acciones (opcional)
    if (acciones.length > 50) {
      acciones.shift(); // Eliminar las más antiguas
    }

    // Retransmitir la acción a todos los jugadores
    //io.emit("actualizar-acciones", data);
    io.emit("actualizar-acciones", jugadaConID);
  });

  // Manejar desconexión
  socket.on("disconnect", () => {
    console.log("Jugador desconectado:", socket.id);
  });
});


// Inicia el servidor
const port = process.env.PORT || 3000; // Usar el puerto dinámico de Heroku
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

