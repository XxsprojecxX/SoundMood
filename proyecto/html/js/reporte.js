// Partículas animadas
particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    color: { value: ["#ffa959", "#a259ff"] },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 140,
      color: "#a259ff",
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 140, line_linked: { opacity: 0.6 } } }
  },
  retina_detect: true
});

const graficoCanvas = document.getElementById("graficoEstados");
let chart;

function generarReporte() {
  const desde = document.getElementById("desde").value;
  const hasta = document.getElementById("hasta").value;

  // ⚡ Primero: traer datos para el gráfico
  fetch(`/reporte-data?desde=${desde}&hasta=${hasta}`)
    .then(res => res.json())
    .then(data => {
      const estados = data.map(d => d.estado);

      const conteo = {};
      estados.forEach(e => conteo[e] = (conteo[e] || 0) + 1);

      const estadosUnicos = Object.keys(conteo);
      const valores = Object.values(conteo);

      if (chart) chart.destroy();

      chart = new Chart(graficoCanvas, {
        type: 'bar',
        data: {
          labels: estadosUnicos,
          datasets: [{
            label: 'Frecuencia de estados',
            data: valores,
            backgroundColor: ['#ffa959', '#a259ff', '#6a40ff', '#ff5959'],
            borderRadius: 8
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#fff' },
              grid: { color: '#333' }
            },
            x: {
              ticks: { color: '#fff' },
              grid: { color: '#333' }
            }
          },
          plugins: {
            legend: { labels: { color: '#fff' } }
          }
        }
      });
    });

  // ⚡ Segundo: traer resumen y frase motivacional
  fetch('/reporte-mood', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fechaInicio: desde, fechaFin: hasta })
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('resultado-reporte');
      if (data.datos && data.datos.length > 0) {
        const resumen = data.datos.map(d => `${d.estado}: ${d.porcentaje}%`).join('<br>');
        container.innerHTML = `
          <h3>Resumen de Estados</h3>
          ${resumen}
          <br><br>
          <strong>Estado más frecuente:</strong> ${data.estadoPrincipal}<br>
          <em>"${data.frase}"</em>
        `;
      } else {
        container.textContent = 'No se encontraron datos en este rango de fechas.';
      }
    });
}
