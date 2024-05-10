/**
 * Función que realiza una búsqueda de productos según un criterio especificado.
 * @returns {void}
 */
function buscar() {
  // Obtiene el valor de búsqueda y el filtro seleccionado
  var query = document.getElementById("searchInput").value;
  var filtro = document.getElementById("filtro").value;
  
  // Muestra la información de búsqueda en la consola
  console.log("Búsqueda: " + query);
  console.log("Filtro: " + filtro);
}

var cartTotal = 0;

/**
 * Agrega un producto al carrito de compras.
 * @param {string} artist - El nombre del artista del producto.
 * @param {string} album - El nombre del álbum del producto.
 * @param {number} price - El precio del producto.
 * @returns {void}
 */
function agregarAlCarrito(artist, album, price) {
  cartTotal += price;
  actualizarPrecioTotal();
}

/**
 * Actualiza el precio total del carrito en la interfaz de usuario.
 * @returns {void}
 */
function actualizarPrecioTotal() {
  var precioTotalElement = document.getElementById('cart-total');
  precioTotalElement.innerText = cartTotal;
}

/**
 * Redirige al usuario a la página de compra.
 * @returns {void}
 */
function comprar() {
  window.location.href = 'comprar.html';
}
