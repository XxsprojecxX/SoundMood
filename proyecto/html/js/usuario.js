// Define la clase RecopilacionBuilder
class RecopilacionBuilder {
  constructor(nombre) {
    this.nombre = nombre;
    this.canciones = [];
  }

  // Método para agregar una canción a la recopilación
  agregarCancion(cancion) {
    this.canciones.push(cancion);
    return this; // Retorna el propio builder para permitir el encadenamiento de métodos
  }

  // Método para construir la recopilación
  build() {
    return { nombre: this.nombre, canciones: this.canciones };
  }
}

// Define la clase RecopilacionDirector
class RecopilacionDirector {
  constructor(builder) {
    this.builder = builder;
  }

  // Método para construir una recopilación
  construirRecopilacion(nombre) {
    this.builder = new RecopilacionBuilder(nombre);
  }

  // Método para agregar una canción a la recopilación en construcción
  agregarCancion(cancion) {
    this.builder.agregarCancion(cancion);
  }

  // Método para obtener la recopilación construida
  obtenerRecopilacion() {
    return this.builder.build();
  }
}

// Array de recopilaciones
var recopilaciones = [
  { nombre: "Recopilación 1", canciones: ["Canción 1", "Canción 2", "Canción 3"] },
  { nombre: "Recopilación 2", canciones: ["Canción 4", "Canción 5", "Canción 6"] },
  { nombre: "Recopilación 3", canciones: ["Canción 7", "Canción 8", "Canción 9"] }
];

/**
 * Muestra las recopilaciones disponibles.
 * @returns {void}
 */
function mostrarRecopilaciones() {
  var recopilacionesList = document.getElementById("recopilacionesList");
  recopilacionesList.innerHTML = "";
  recopilaciones.forEach(function(recopilacion) {
    var recopilacionBox = document.createElement("div");
    recopilacionBox.classList.add("recopilacion-box");
    var recopilacionName = document.createElement("h3");
    recopilacionName.textContent = recopilacion.nombre;
    recopilacionName.classList.add("recopilacion-name");
    recopilacionName.addEventListener("click", function() {
      verCancionesRecopilacion(recopilacion);
    });
    recopilacionBox.appendChild(recopilacionName);
    recopilacionesList.appendChild(recopilacionBox);
  });
}

/**
 * Muestra las canciones de una recopilación seleccionada.
 * @param {Object} recopilacion - La recopilación seleccionada.
 * @returns {void}
 */
function verCancionesRecopilacion(recopilacion) {
  var recopilacionBox = document.querySelector(".recopilacion-box.active");
  if (recopilacionBox) {
    recopilacionBox.classList.remove("active");
  }
  event.target.parentNode.classList.add("active");
  var recopilacionSongs = document.createElement("ul");
  recopilacionSongs.classList.add("canciones-recopilacion");
  recopilacion.canciones.forEach(function(cancion) {
    var cancionItem = document.createElement("li");
    cancionItem.textContent = cancion;
    recopilacionSongs.appendChild(cancionItem);
  });
  var recopilacionesList = document.querySelector("#recopilacionesList");
  recopilacionesList.appendChild(recopilacionSongs);
}

/**
 * Crea una nueva recopilación utilizando el patrón Builder.
 * @returns {void}
 */
function crearRecopilacion() {
  var nombreRecopilacion = prompt("Ingrese el nombre de la nueva recopilación:");
  if (nombreRecopilacion) {
    // Crear un nuevo director de recopilación
    var director = new RecopilacionDirector();
    // Construir la recopilación
    director.construirRecopilacion(nombreRecopilacion);
    // Obtener la recopilación en construcción
    var recopilacion = director.obtenerRecopilacion();
    // Agregar canciones a la recopilación
    var seguirAgregando = true;
    while (seguirAgregando) {
      var cancion = prompt("Ingrese el nombre de la canción (o deje en blanco para finalizar):");
      if (cancion) {
        director.agregarCancion(cancion);
      } else {
        seguirAgregando = false;
      }
    }
    // Obtener la recopilación final
    recopilacion = director.obtenerRecopilacion();
    // Agregar la recopilación al array de recopilaciones
    recopilaciones.push(recopilacion);
    // Mostrar las recopilaciones actualizadas
    mostrarRecopilaciones();
  }
}

/**
 * Califica la satisfacción del cliente al recibir un pedido.
 * @param {HTMLElement} star - La estrella seleccionada para calificar la satisfacción.
 * @returns {void}
 */
function calificarSatisfaccion(star) {
  // Obtiene la calificación seleccionada.
  var satisfaccion = parseInt(star.getAttribute("data-value"));
  // Muestra un campo de texto si la satisfacción es baja.
  if (satisfaccion === 1) {
    star.parentElement.nextElementSibling.style.display = "block";
  } else {
    alert("¡Gracias por tu opinión!");
  }
}

// Cargar las recopilaciones al cargar la página
window.addEventListener("load", function() {
  mostrarRecopilaciones();
});
