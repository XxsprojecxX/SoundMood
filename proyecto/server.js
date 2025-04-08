const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'html')));
app.use(session({
    secret: 'soundmood_secret',
    resave: false,
    saveUninitialized: true
}));

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

// Ruta para login
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
            return res.redirect('/mood.html');
        } else {
            return res.redirect('/login.html?error=1');
        }
    });
});

// Ruta para registrar usuario
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

// Ruta para obtener info del usuario
app.get('/usuario-info', (req, res) => {
    if (req.session.usuario) {
        res.json({ nombre: req.session.usuario.nombre });
    } else {
        res.status(401).json({ error: "No autenticado" });
    }
});

// Ruta para registrar estado de ánimo
// Ruta para registrar estado de ánimo
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

    // Redirigir según el estado de ánimo
    switch (estado) {
      case 'feliz':
        return res.redirect('/feliz.html');
      case 'triste':
        return res.redirect('/triste.html');
      case 'relajado':
        return res.redirect('/relajado.html');
      case 'energetico':
        return res.redirect('/energetico.html');
      default:
        return res.redirect('/mood.html');
    }
  });
});




// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
