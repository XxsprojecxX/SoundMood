/**
 * Guarda los datos de envío.
 * 
 * @returns {void}
 */
function guardarDatosEnvio() {
    alert("Datos de envío guardados exitosamente");
  }
  
  /**
   * Muestra el formulario de pago seleccionado.
   * 
   * @returns {void}
   */
  function mostrarFormularioPago() {
    var metodoPago = document.querySelector("input[name='pago']:checked").value;
    var formasPago = document.getElementsByClassName("payment-form");
    for (var i = 0; i < formasPago.length; i++) {
      formasPago[i].style.display = "none";
    }
    document.getElementById("forma-pago-" + metodoPago).style.display = "block";
  }
  
  /**
   * Realiza el pago en efectivo.
   * 
   * @returns {void}
   */
  function pagarEfectivo() {
    var corresponsalSeleccionado = document.querySelector("#forma-pago-efectivo select").value;
    alert("Pagar en corresponsal seleccionado: " + corresponsalSeleccionado);
  }
  
  /**
   * Realiza el pago final.
   * 
   * @returns {void}
   */
  function pagar() {
    
    alert("¡Gracias por tu compra!");
  }
  