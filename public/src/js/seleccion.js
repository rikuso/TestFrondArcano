export function seleccionar(personaje, familiar, ataqueBtn, defensaBtn, mensaje, seleccionActual, e) {
    const seleccionado = e.currentTarget;
    const nombre = seleccionado.dataset.nombre;
  
    [personaje, familiar].forEach((elem) => elem.classList.remove("activo"));
    seleccionado.classList.add("activo");
    seleccionActual = nombre;
  
    ataqueBtn.classList.remove("inactivo");
    defensaBtn.classList.remove("inactivo");
    mensaje.textContent = `Seleccionaste a ${nombre}`;
    return seleccionActual;
  }
  