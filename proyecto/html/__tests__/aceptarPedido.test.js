
const { aceptarPedido } = require('../js/vender.js');

describe('aceptarPedido', () => {
  let btn;
  let modal;
  let aceptarBtn;
  let rechazarBtn;
  let enviarBtn;

  beforeEach(() => {
    // Configurar el cuerpo del documento
    document.body.innerHTML = `
      <div id="aceptarModal" style="display: none;"></div>
      <div class="parent">
        <button class="trigger-btn"></button>
        <button class="aceptar-btn"></button>
        <button class="rechazar-btn"></button>
        <button class="enviar-btn"></button>
      </div>
    `;

    modal = document.getElementById('aceptarModal');
    btn = document.querySelector('.trigger-btn');
    aceptarBtn = document.querySelector('.aceptar-btn');
    rechazarBtn = document.querySelector('.rechazar-btn');
    enviarBtn = document.querySelector('.enviar-btn');
  });

  test('debe mostrar el modal y ocultar los botones correctamente', () => {


    aceptarPedido(btn);

   
    expect(modal.style.display).toBe('block');

    expect(aceptarBtn.style.display).toBe('none');
    expect(rechazarBtn.style.display).toBe('none');
  });
});
