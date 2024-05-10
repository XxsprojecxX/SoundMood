/**
 * Muestra la ventana modal de compartir en redes sociales al hacer clic en "Compartir con amigo".
 */
function compartirEnRedes() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
}

/**
 * Oculta la ventana modal al hacer clic en la "x".
 */
var closeBtn = document.getElementsByClassName("close")[0];
closeBtn.onclick = function() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}

/**
 * Oculta la ventana modal al hacer clic fuera de ella.
 * 
 * @param {Event} event - El evento de clic fuera de la ventana modal.
 */
window.onclick = function(event) {
  var modal = document.getElementById("modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/**
 * Muestra una alerta al agregar la canción a la recopilación.
 * 
 * @returns {void}
 */
function agregarARecopilacion() {
  alert("Se ha agregado a la recopilación");
}

/**
 * Comparte la página actual en Facebook.
 * 
 * @returns {void}
 */
function compartirEnFacebook() {
  var nombre = document.querySelector(".song-name").innerText;
  var compartirURL = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href) + "&quote=" + encodeURIComponent("¡Escucha la canción '" + nombre + "' en este vinilo!");
  window.open(compartirURL, "_blank");
}

/**
 * Comparte la página actual en WhatsApp.
 * 
 * @returns {void}
 */
function compartirEnWhatsApp() {
  var nombre = document.querySelector(".song-name").innerText;
  var compartirURL = "whatsapp://send?text=" + encodeURIComponent("¡Escucha la canción '" + nombre + "' en este vinilo! " + window.location.href);
  window.open(compartirURL, "_blank");
}

/**
 * Comparte la página actual en Instagram.
 * 
 * @returns {void}
 */
function compartirEnInstagram() {
  var nombre = document.querySelector(".song-name").innerText;
  var compartirURL = "https://www.instagram.com/share?url=" + encodeURIComponent(window.location.href) + "&title=" + encodeURIComponent("¡Escucha la canción '" + nombre + "' en este vinilo!");
  window.open(compartirURL, "_blank");
}

/**
 * Cierra la ventana modal de compartir en redes sociales.
 * 
 * @returns {void}
 */
function cerrarModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}
