
const { verMasEnvios } = require('../js/vender.js');

// Mock para la función alert
global.alert = jest.fn();


test('verMasEnvios debe mostrar una alerta con el mensaje "Mostrar más envíos"', () => {

  verMasEnvios();

  expect(global.alert).toHaveBeenCalledWith('Mostrar más envíos');
});
