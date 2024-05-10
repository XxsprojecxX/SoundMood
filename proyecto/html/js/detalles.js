/**
 * Clase que representa un producto.
 */
class Producto {
  /**
   * Constructor de la clase Producto.
   * 
   * @param {string} nombre - El nombre del producto.
   * @param {string} duracion - La duración del producto.
   */
  constructor(nombre, duracion) {
    this.nombre = nombre;
    this.duracion = duracion;
  }
}

/**
 * Clase que representa una canción.
 * Extiende de Producto.
 */
class Cancion extends Producto {
  /**
   * Constructor de la clase Cancion.
   * 
   * @param {string} nombre - El nombre de la canción.
   * @param {string} duracion - La duración de la canción.
   */
  constructor(nombre, duracion) {
    super(nombre, duracion);
  }
}

/**
 * Clase que representa un disco.
 * Extiende de Producto.
 */
class Disco extends Producto {
  /**
   * Constructor de la clase Disco.
   * 
   * @param {string} nombre - El nombre del disco.
   * @param {string} artista - El artista del disco.
   * @param {Date} fecha - La fecha de lanzamiento del disco.
   */
  constructor(nombre, artista, fecha) {
    super(nombre);
    this.artista = artista;
    this.fecha = fecha;
    this.canciones = [];
  }

  /**
   * Método para agregar una nueva canción al disco.
   * 
   * @param {string} nombre - El nombre de la canción a agregar.
   * @param {string} duracion - La duración de la canción a agregar.
   * @returns {void}
   */
  agregarCancion(nombre, duracion) {
    this.canciones.push(new Cancion(nombre, duracion));
  }
}

/**
 * Clase que representa una fábrica de productos.
 */
class ProductoFactory {
  /**
   * Método estático para crear un producto.
   * 
   * @param {string} tipo - El tipo de producto a crear ("cancion" o "disco").
   * @param {string} nombre - El nombre del producto.
   * @param {string} artista - El artista del producto (solo para discos).
   * @param {Date} fecha - La fecha de lanzamiento del producto (solo para discos).
   * @returns {Producto} - El producto creado.
   * @throws {Error} - Se lanza un error si el tipo de producto no es válido.
   */
  static crearProducto(tipo, nombre, artista, fecha) {
    if (tipo === "cancion") {
      return new Cancion(nombre, artista, fecha);
    } else if (tipo === "disco") {
      return new Disco(nombre, artista, fecha);
    } else {
      throw new Error("Tipo de producto no válido");
    }
  }
}

/**
 * Función para agregar una nueva canción al formulario de productos.
 * 
 * @returns {void}
 */
function agregarCancion() {
  var cancionesDiv = document.getElementById("canciones");
  var nuevaCancion = document.createElement("div");
  nuevaCancion.classList.add("cancion");
  nuevaCancion.innerHTML = `
    <input type="text" placeholder="Nombre de la canción">
    <input type="text" placeholder="Duración">
  `;
  cancionesDiv.appendChild(nuevaCancion);
}

/**
 * Función para guardar el producto y redirigir a la página de venta.
 * 
 * @returns {void}
 */
function guardarProducto() {
  var nombre = document.getElementById("nombre").value;
  var artista = document.getElementById("artista").value;
  var fecha = document.getElementById("fecha").value;

  var tipoProducto = document.querySelector('input[name="tipoProducto"]:checked').value;
  var producto;

  if (tipoProducto === "cancion") {
    producto = ProductoFactory.crearProducto(tipoProducto, nombre, artista, fecha);
  } else if (tipoProducto === "disco") {
    producto = ProductoFactory.crearProducto(tipoProducto, nombre, artista, fecha);
    var canciones = document.querySelectorAll(".cancion");
    canciones.forEach(cancion => {
      var nombreCancion = cancion.querySelector("input:nth-child(1)").value;
      var duracion = cancion.querySelector("input:nth-child(2)").value;
      producto.agregarCancion(nombreCancion, duracion);
    });
  }

  console.log(producto);
  alert("Producto guardado exitosamente");
  // Redirigir a la página de vender
  window.location.href = "vender.html";
}

