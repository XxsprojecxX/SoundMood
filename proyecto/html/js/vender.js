/**
 * Función para mostrar un modal de confirmación al aceptar un pedido.
 * @param {HTMLElement} btn - El botón que desencadenó la acción de aceptar el pedido.
 * @returns {void}
 */
function aceptarPedido(btn) {
  var modal = document.getElementById("aceptarModal");
  modal.style.display = "block";
  var aceptarBtn = btn.parentElement.querySelector(".aceptar-btn");
  var rechazarBtn = btn.parentElement.querySelector(".rechazar-btn");
  var enviarBtn = btn.parentElement.querySelector(".enviar-btn");
  aceptarBtn.style.display = "none";
  rechazarBtn.style.display = "none";
}
//module.exports = aceptarPedido;

/**
 * Redirige a la página de detalles de un pedido.
 * @returns {void}
 */
function irADetalles() {
  window.location.href = "detalles.html";
}

/**
 * Función para cerrar un modal.
 * @param {string} modalId - El ID del modal que se va a cerrar.
 * @returns {void}
 */
function cerrarModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

/**
 * Función para enviar un pedido después de aceptarlo.
 * @returns {void}
 */
function enviarPedidoModal() {
  var fechaEnvio = document.getElementById("fechaEnvio").value;
  if (fechaEnvio) {
    alert("Pedido enviado con fecha de envío: " + fechaEnvio);
    cerrarModal('aceptarModal');
  } else {
    alert("Por favor, seleccione una fecha de envío válida.");
  }
}
//module.exports = enviarPedidoModal;

/**
 * Función para mostrar un modal de confirmación al rechazar un pedido.
 * @param {HTMLElement} btn - El botón que desencadenó la acción de rechazar el pedido.
 * @returns {void}
 */
function rechazarPedido(btn) {
  var modal = document.getElementById("rechazarModal");
  modal.style.display = "block";
  var aceptarBtn = btn.parentElement.querySelector(".aceptar-btn");
  var rechazarBtn = btn.parentElement.querySelector(".rechazar-btn");
  var enviarBtn = btn.parentElement.querySelector(".enviar-btn");
  aceptarBtn.style.display = "none";
  rechazarBtn.style.display = "none";
}

/**
 * Función para confirmar el rechazo de un pedido.
 * @returns {void}
 */
function confirmarRechazo() {
  var modal = document.getElementById("rechazarModal");
  modal.style.display = "none";
  // Eliminar el pedido
  var pedidoBox = modal.parentElement.parentElement;
  pedidoBox.remove();
  alert("Pedido rechazado. Se ha enviado un correo electrónico al comprador.");
}

/**
 * Función para enviar un pedido después de rechazarlo.
 * @param {HTMLElement} btn - El botón que desencadenó la acción de enviar el pedido.
 * @returns {void}
 */
function enviarPedido(btn) {
  // Envía un correo electrónico al usuario con la confirmación del envío
  var perfilInfo = btn.closest(".pedido-box").querySelector(".perfil-info");
  var usuario = perfilInfo.querySelector("h3").textContent;
  alert("Pedido de @" + usuario + " enviado.");
}

/**
 * Función para mostrar más pedidos.
 * @returns {void}
 */
function verMasPedidos() {
  alert("Mostrar más pedidos");
}

/**
 * Función para mostrar más envíos.
 * @returns {void}
 */
function verMasEnvios() {
  alert("Mostrar más envíos");
}

module.exports = {
  aceptarPedido,
  enviarPedidoModal,
  confirmarRechazo,
  verMasEnvios
};
