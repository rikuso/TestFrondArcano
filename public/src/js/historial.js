export  function registrarAccion(listaAcciones, accion) {
    if(!listaAcciones){
      console.error("El elemento `listaAcciones` no es válido");
      return
    }
    const nuevaAccion = document.createElement("li");
    nuevaAccion.textContent = accion;
   
    listaAcciones.appendChild(nuevaAccion);
  
    if (listaAcciones.children.length > 5) {
      listaAcciones.removeChild(listaAcciones.firstChild);
    }

  }
