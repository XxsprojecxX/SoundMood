const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admin123*',
  database: 'SongStock'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

app.post('/register', (req, res) => {
  let sql = 'INSERT INTO usuario (contraseña, nombre_usuario, edad, tipo_cuenta) VALUES (?, ?, ?, ?)';
  let values = [req.body.password, req.body.username, req.body.age, req.body.accountType];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al crear el usuario:', err);
      return;
    }
    console.log('Usuario creado', result);
    res.redirect('/success.html');
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
