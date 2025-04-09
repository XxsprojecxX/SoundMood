const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'html')));
app.use(session({
  secret: 'soundmoodsecret',
  resave: false,
  saveUninitialized: true
}));

// vistas config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admin123*',
  database: 'SoundMoodDB'
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Login
app.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?';

  connection.query(query, [correo, contrasena], (err, results) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.redirect('/login.html?error=1');
    }

    if (results.length > 0) {
      req.session.usuario = results[0];
      req.session.usuarioID = results[0].id_usuario;
      return res.redirect('/mood.html');
    } else {
      return res.redirect('/login.html?error=1');
    }
  });
});

// Registro
app.post('/registro', (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const checkEmail = 'SELECT * FROM Usuarios WHERE email = ?';

  connection.query(checkEmail, [correo], (err, results) => {
    if (err) {
      console.error('Error al verificar el correo:', err);
      return res.redirect('/registro.html?error=1');
    }

    if (results.length > 0) {
      return res.redirect('/registro.html?error=1');
    }

    const insertUser = 'INSERT INTO Usuarios (nombre, email, contraseña) VALUES (?, ?, ?)';
    connection.query(insertUser, [nombre, correo, contrasena], (err2) => {
      if (err2) {
        console.error('Error al registrar el usuario:', err2);
        return res.redirect('/registro.html?error=1');
      }

      res.redirect('/registro.html?success=1');
    });
  });
});

// Usuario info
app.get('/usuario-info', (req, res) => {
  if (req.session.usuario) {
    res.json({ nombre: req.session.usuario.nombre });
  } else {
    res.status(401).json({ error: "No autenticado" });
  }
});

// Registrar estado de ánimo
app.post('/estado', (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/login.html');
  }

  const { estado } = req.body;
  const user = req.session.usuario;

  const sqlHistorial = 'INSERT INTO HistorialEstados (id_usuario, estado) VALUES (?, ?)';
  connection.query(sqlHistorial, [user.id_usuario, estado], (err) => {
    if (err) {
      console.error('Error al guardar historial:', err);
      return res.redirect('/mood.html?error=1');
    }

    switch (estado) {
      case 'feliz': return res.redirect('/feliz.html');
      case 'triste': return res.redirect('/triste.html');
      case 'relajado': return res.redirect('/relajado.html');
      case 'energetico': return res.redirect('/energetico.html');
      default: return res.redirect('/mood.html');
    }
  });
});

// Reporte de mood (porcentaje + frase)
app.post("/reporte-mood", (req, res) => {
  const { fechaInicio, fechaFin } = req.body;
  const usuarioID = req.session.usuario?.id_usuario;

  if (!usuarioID) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  const fechaDesde = `${fechaInicio} 00:00:00`;
  const fechaHasta = `${fechaFin} 23:59:59`;

  const query = `
    SELECT estado, COUNT(*) AS cantidad
    FROM HistorialEstados
    WHERE id_usuario = ? AND fecha BETWEEN ? AND ?
    GROUP BY estado
  `;

  connection.query(query, [usuarioID, fechaDesde, fechaHasta], (err, resultados) => {
    if (err) {
      console.error("Error al consultar el historial:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (resultados.length === 0) {
      return res.json({ datos: [], estadoPrincipal: null, frase: "" });
    }

    const total = resultados.reduce((sum, row) => sum + row.cantidad, 0);
    const datos = resultados.map(row => ({
      estado: row.estado,
      porcentaje: ((row.cantidad / total) * 100).toFixed(1)
    }));

    let estadoPrincipal = null;
    let mayorCantidad = 0;
    resultados.forEach(row => {
      if (row.cantidad > mayorCantidad) {
        mayorCantidad = row.cantidad;
        estadoPrincipal = row.estado;
      }
    });

    const frases = {
      feliz: "¡Sigue disfrutando de la vida con esa energía positiva!",
      triste: "Todo mejora con el tiempo. ¡Sigue adelante, tú puedes!",
      relajado: "La paz interior es una gran fortaleza. ¡Bien por ti!",
      energetico: "¡Canaliza esa energía para alcanzar tus metas!"
    };

    res.json({ datos, estadoPrincipal, frase: frases[estadoPrincipal] || "" });
  });
});

// Datos para gráfico
app.get("/reporte-data", (req, res) => {
  const usuarioID = req.session.usuario?.id_usuario;
  const { desde, hasta } = req.query;

  if (!usuarioID) {
    return res.status(401).json({ error: "No autenticado" });
  }

  const fechaDesde = `${desde} 00:00:00`;
  const fechaHasta = `${hasta} 23:59:59`;

  const query = `
    SELECT fecha, estado
    FROM HistorialEstados
    WHERE id_usuario = ? AND fecha BETWEEN ? AND ?
    ORDER BY fecha ASC
  `;

  connection.query(query, [usuarioID, fechaDesde, fechaHasta], (err, resultados) => {
    if (err) {
      console.error("Error al obtener datos del historial:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    res.json(resultados);
  });
});

// Usuarios (debug)
app.get("/usuarios", (req, res) => {
  connection.query("SELECT id_usuario, nombre FROM Usuarios", (err, result) => {
    if (err) return res.status(500).json({ error: "Error al obtener usuarios" });
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
