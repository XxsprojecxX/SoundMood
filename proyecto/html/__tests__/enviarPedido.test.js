
const { enviarPedidoModal } = require('../js/vender.js');

describe('enviarPedidoModal', () => {
  test('debe mostrar una alerta y llamar a cerrarModal cuando se proporciona una fecha de envío válida', () => {

    document.body.innerHTML = `
      <input type="text" id="fechaEnvio" value="2023-05-17" />
    `;

    // Mock de la función cerrarModal
    const cerrarModalMock = jest.fn();
    global.cerrarModal = cerrarModalMock;

    // Mock de la función alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    enviarPedidoModal();

    expect(alertMock).toHaveBeenCalledWith('Pedido enviado con fecha de envío: 2023-05-17');

  });

  test('debe mostrar una alerta pidiendo una fecha de envío válida cuando no se proporciona una fecha', () => {
    document.body.innerHTML = `
      <input type="text" id="fechaEnvio" value="" />
    `;

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    enviarPedidoModal();

    expect(alertMock).toHaveBeenCalledWith('Por favor, seleccione una fecha de envío válida.');

    expect(global.cerrarModal).not.toHaveBeenCalled();
  });
});