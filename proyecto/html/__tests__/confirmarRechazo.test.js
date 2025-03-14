
const { confirmarRechazo } = require('../js/vender.js');

describe('confirmarRechazo', () => {
  test('debe ocultar el modal, eliminar el pedido y mostrar una alerta', () => {
    // Configura el cuerpo del documento con un elemento con el ID "rechazarModal"
    document.body.innerHTML = `
      <div id="rechazarModal">
      </div>
    `;

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    confirmarRechazo();

    const modal = document.getElementById('rechazarModal');

    expect(alertMock).toHaveBeenCalledWith("Pedido rechazado. Se ha enviado un correo electrónico al comprador.");

    alertMock.mockRestore();
  });
});
